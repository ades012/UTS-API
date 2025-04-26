module.exports = `
  type Category {
    id: ID!
    name: String!
  }

  type Location {
    id: ID!
    name: String!
  }

  type Supplier {
    id: ID!
    name: String!
    contact: String
  }

  type Item {
    id: ID!
    name: String!
    category: Category
    location: Location
    supplier: Supplier
    condition: String
  }

  type Stock {
    id: ID!
    item: Item
    quantity: Int
    updated_at: String
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
    categories: [Category]
    category(id: ID!): Category
    locations: [Location]
    location(id: ID!): Location
    suppliers: [Supplier]
    supplier(id: ID!): Supplier
    stock: [Stock]
  }

  type Mutation {
    addItem(name: String!, category_id: Int, location_id: Int, supplier_id: Int, condition: String): Item
    updateItem(id: ID!, name: String, category_id: Int, location_id: Int, supplier_id: Int, condition: String): Item
    deleteItem(id: ID!): Boolean

    addCategory(name: String!): Category
    updateCategory(id: ID!, name: String!): Category
    deleteCategory(id: ID!): Boolean

    addLocation(name: String!): Location
    updateLocation(id: ID!, name: String!): Location
    deleteLocation(id: ID!): Boolean

    addSupplier(name: String!, contact: String): Supplier
    updateSupplier(id: ID!, name: String!, contact: String): Supplier
    deleteSupplier(id: ID!): Boolean

    updateStock(item_id: Int!, quantity: Int!): Stock
  }
`;