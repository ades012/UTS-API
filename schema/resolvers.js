const db = require('../db/database');

module.exports = {
  items: () => {
    const stmt = db.prepare(`
      SELECT i.*, c.name AS category_name, l.name AS location_name, s.name AS supplier_name, s.contact
      FROM items i
      LEFT JOIN categories c ON i.category_id = c.id
      LEFT JOIN locations l ON i.location_id = l.id
      LEFT JOIN suppliers s ON i.supplier_id = s.id
    `);
    return stmt.all().map(row => ({
      id: row.id,
      name: row.name,
      condition: row.condition,
      category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
      location: row.location_id ? { id: row.location_id, name: row.location_name } : null,
      supplier: row.supplier_id ? { id: row.supplier_id, name: row.supplier_name, contact: row.contact } : null,
    }));
  },
  item: ({ id }) => {
    const row = db.prepare(`
      SELECT i.*, c.name AS category_name, l.name AS location_name, s.name AS supplier_name, s.contact
      FROM items i
      LEFT JOIN categories c ON i.category_id = c.id
      LEFT JOIN locations l ON i.location_id = l.id
      LEFT JOIN suppliers s ON i.supplier_id = s.id
      WHERE i.id = ?
    `).get(id);
    return {
      id: row.id,
      name: row.name,
      condition: row.condition,
      category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
      location: row.location_id ? { id: row.location_id, name: row.location_name } : null,
      supplier: row.supplier_id ? { id: row.supplier_id, name: row.supplier_name, contact: row.contact } : null,
    };
  },
  categories: () => db.prepare(`SELECT * FROM categories`).all(),
  category: ({ id }) => db.prepare(`SELECT * FROM categories WHERE id = ?`).get(id),
  locations: () => db.prepare(`SELECT * FROM locations`).all(),
  location: ({ id }) => db.prepare(`SELECT * FROM locations WHERE id = ?`).get(id),
  suppliers: () => db.prepare(`SELECT * FROM suppliers`).all(),
  supplier: ({ id }) => db.prepare(`SELECT * FROM suppliers WHERE id = ?`).get(id),
  stock: () => {
    const stmt = db.prepare(`
      SELECT s.*, i.name AS item_name FROM stock s
      LEFT JOIN items i ON s.item_id = i.id
    `);
    return stmt.all().map(row => ({
      id: row.id,
      quantity: row.quantity,
      updated_at: row.updated_at,
      item: { id: row.item_id, name: row.item_name }
    }));
  },

  addItem: ({ name, category_id, location_id, supplier_id, condition }) => {
    const stmt = db.prepare(`INSERT INTO items (name, category_id, location_id, supplier_id, condition) VALUES (?, ?, ?, ?, ?)`);
    const result = stmt.run(name, category_id, location_id, supplier_id, condition);
    return { id: result.lastInsertRowid, name, category_id, location_id, supplier_id, condition };
  },
  updateItem: ({ id, name, category_id, location_id, supplier_id, condition }) => {
    db.prepare(`UPDATE items SET name = ?, category_id = ?, location_id = ?, supplier_id = ?, condition = ? WHERE id = ?`)
      .run(name, category_id, location_id, supplier_id, condition, id);
    return { id, name, category_id, location_id, supplier_id, condition };
  },
  deleteItem: ({ id }) => {
    db.prepare(`DELETE FROM stock WHERE item_id = ?`).run(id);
  
    const stmt = db.prepare(`DELETE FROM items WHERE id = ?`);
    const result = stmt.run(id);
    return result.changes > 0;
  },
  addCategory: ({ name }) => {
    const result = db.prepare(`INSERT INTO categories (name) VALUES (?)`).run(name);
    return { id: result.lastInsertRowid, name };
  },
  updateCategory: ({ id, name }) => {
    db.prepare(`UPDATE categories SET name = ? WHERE id = ?`).run(name, id);
    return { id, name };
  },
  deleteCategory: ({ id }) => {
    const result = db.prepare(`DELETE FROM categories WHERE id = ?`).run(id);
    return result.changes > 0;
  },
  addLocation: ({ name }) => {
    const result = db.prepare(`INSERT INTO locations (name) VALUES (?)`).run(name);
    return { id: result.lastInsertRowid, name };
  },
  updateLocation: ({ id, name }) => {
    db.prepare(`UPDATE locations SET name = ? WHERE id = ?`).run(name, id);
    return { id, name };
  },
  deleteLocation: ({ id }) => {
    const result = db.prepare(`DELETE FROM locations WHERE id = ?`).run(id);
    return result.changes > 0;
  },
  addSupplier: ({ name, contact }) => {
    const result = db.prepare(`INSERT INTO suppliers (name, contact) VALUES (?, ?)`).run(name, contact);
    return { id: result.lastInsertRowid, name, contact };
  },
  updateSupplier: ({ id, name, contact }) => {
    db.prepare(`UPDATE suppliers SET name = ?, contact = ? WHERE id = ?`).run(name, contact, id);
    return { id, name, contact };
  },
  deleteSupplier: ({ id }) => {
    const result = db.prepare(`DELETE FROM suppliers WHERE id = ?`).run(id);
    return result.changes > 0;
  },
  updateStock: ({ item_id, quantity }) => {
    const exists = db.prepare(`SELECT id FROM stock WHERE item_id = ?`).get(item_id);
    if (exists) {
      db.prepare(`UPDATE stock SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE item_id = ?`).run(quantity, item_id);
      return { id: exists.id, item: { id: item_id }, quantity, updated_at: new Date().toISOString() };
    } else {
      const result = db.prepare(`INSERT INTO stock (item_id, quantity, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)`).run(item_id, quantity);
      return { id: result.lastInsertRowid, item: { id: item_id }, quantity, updated_at: new Date().toISOString() };
    }
  },
};
