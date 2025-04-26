# 📦 Inventory Management API

Sistem manajemen inventaris perangkat jaringan, CCTV, dan telepon menggunakan **Node.js**, **GraphQL**, dan **SQLite**.

---

## ✨ Fitur

- CRUD (Create, Read, Update, Delete) untuk:
  - Item
  - Kategori
  - Lokasi
  - Supplier
- Update stok barang
- Query data secara fleksibel menggunakan GraphQL
- Database ringan menggunakan SQLite

---

## 🛠️ Teknologi yang Digunakan

- Node.js
- Express.js
- GraphQL
- better-sqlite3 (SQLite driver)
- dotenv

---

## 📁 Struktur Folder

```
inventory-api/
├── app.js
├── db/
│   └── database.js
├── schema/
│   ├── resolvers.js
│   └── typeDefs.js
├── .env
└── README.md
```

---

## 🚀 Instalasi dan Menjalankan Project

1. **Clone repository ini:**

```bash
git clone https://github.com/ades012/uts-api.git
cd inventory-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Buat file **``** di root project dan isi:**

```env
PORT=3000
DB_PATH=inventory.db
```

4. **Jalankan server:**

```bash
npm start
```

Server akan berjalan di:

> [http://localhost:3000/graphql](http://localhost:3000/graphql)

---

## 🧪 Contoh Query GraphQL

### 🔹 Menambah Kategori Barang

```graphql
mutation {
  addCategory(name: "Router") {
    id
    name
  }
}
```

### 🔹 Menambah Lokasi

```graphql
mutation {
  addLocation(name: "Gudang 1") {
    id
    name
  }
}
```

### 🔹 Menambah Supplier / Vendor

```graphql
mutation {
  addSupplier(name: "PT Comtronics Systems", contact: "08123456789") {
    id
    name
    contact
  }
}
```


### 🔹 Menambah Item

```graphql
mutation {
  addItem(
    name: "Mikrotik RB450",
    category_id: 1,
    location_id: 1,
    supplier_id: 1,
    condition: "Baru"
  ) {
    id
    name
    condition
  }
}
```

### 🔹 Mengambil Semua Item

```graphql
query {
  items {
    id
    name
    condition
    category {
      name
    }
    location {
      name
    }
    supplier {
      name
    }
  }
}
```

### 🔹 Update Stok Barang

```graphql
mutation {
  updateStock(item_id: 1, quantity: 5) {
    id
    quantity
    updated_at
  }
}
```

### 🔹 Hapus Item

```graphql
mutation {
  deleteItem(id: 1)
}
```

---

## 📜 Lisensi

Proyek ini dikembangkan untuk keperluan pembelajaran dan tugas akademik.\
Hak cipta © 2025 Agung Deli Septian.

---

