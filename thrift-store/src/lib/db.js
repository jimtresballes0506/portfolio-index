import path from 'node:path';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

let dbInstance = null;

function mapRowToProduct(row) {
  if (!row) return null;
  let measurements = {};
  let tags = [];
  try {
    measurements = JSON.parse(row.measurementsJson || '{}');
  } catch {
    measurements = {};
  }
  try {
    tags = JSON.parse(row.tagsJson || '[]');
  } catch {
    tags = [];
  }

  return {
    id: row.id,
    sku: row.sku,
    title: row.title,
    brand: row.brand,
    category: row.category,
    era: row.era,
    size: row.size,
    fitsLike: row.fitsLike,
    conditionGrade: row.conditionGrade,
    conditionScore: Number(row.conditionScore),
    conditionNotes: row.conditionNotes,
    price: Number(row.price),
    originalRetail: Number(row.originalRetail),
    material: row.material,
    origin: row.origin,
    measurements,
    tags,
    waterSavedLiters: Number(row.waterSavedLiters),
    co2SavedKg: Number(row.co2SavedKg),
    image: row.image,
    featured: Boolean(row.featured),
    sold: Boolean(row.sold),
    createdAt: row.createdAt,
  };
}

function mapRowToOrder(row) {
  if (!row) return null;
  let items = [];
  try {
    items = JSON.parse(row.itemsJson || '[]');
  } catch {
    items = [];
  }

  return {
    id: row.id,
    orderNumber: row.orderNumber,
    customerName: row.customerName,
    customerEmail: row.customerEmail,
    shippingAddress: row.shippingAddress,
    deliveryMethod: row.deliveryMethod,
    promoCode: row.promoCode,
    subtotal: Number(row.subtotal),
    discount: Number(row.discount),
    shippingCost: Number(row.shippingCost),
    total: Number(row.total),
    waterSavedLiters: Number(row.waterSavedLiters),
    co2SavedKg: Number(row.co2SavedKg),
    items,
    createdAt: row.createdAt,
  };
}

export function getDb() {
  if (dbInstance) return dbInstance;

  const prismaDir = path.join(process.cwd(), 'prisma');
  if (!fs.existsSync(prismaDir)) {
    fs.mkdirSync(prismaDir, { recursive: true });
  }
  const dbPath = path.join(prismaDir, 'thrift.db');
  const db = new DatabaseSync(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS Product (
      id TEXT PRIMARY KEY,
      sku TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      brand TEXT NOT NULL,
      category TEXT NOT NULL,
      era TEXT NOT NULL,
      size TEXT NOT NULL,
      fitsLike TEXT NOT NULL,
      conditionGrade TEXT NOT NULL,
      conditionScore INTEGER NOT NULL,
      conditionNotes TEXT NOT NULL,
      price REAL NOT NULL,
      originalRetail REAL NOT NULL,
      material TEXT NOT NULL,
      origin TEXT NOT NULL,
      measurementsJson TEXT NOT NULL,
      tagsJson TEXT NOT NULL,
      waterSavedLiters INTEGER NOT NULL,
      co2SavedKg REAL NOT NULL,
      image TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      sold INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "Order" (
      id TEXT PRIMARY KEY,
      orderNumber TEXT UNIQUE NOT NULL,
      customerName TEXT NOT NULL,
      customerEmail TEXT NOT NULL,
      shippingAddress TEXT NOT NULL,
      deliveryMethod TEXT NOT NULL,
      promoCode TEXT,
      subtotal REAL NOT NULL,
      discount REAL NOT NULL,
      shippingCost REAL NOT NULL,
      total REAL NOT NULL,
      waterSavedLiters INTEGER NOT NULL,
      co2SavedKg REAL NOT NULL,
      itemsJson TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  const countRow = db.prepare('SELECT COUNT(*) as count FROM Product').get();
  if (!countRow || Number(countRow.count) === 0) {
    seedInitialProducts(db);
  }

  dbInstance = db;
  return dbInstance;
}

function seedInitialProducts(db) {
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO Product (
      id, sku, title, brand, category, era, size, fitsLike,
      conditionGrade, conditionScore, conditionNotes,
      price, originalRetail, material, origin,
      measurementsJson, tagsJson, waterSavedLiters, co2SavedKg,
      image, featured, sold, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  for (const item of INITIAL_PRODUCTS) {
    insertStmt.run(
      item.id,
      item.sku,
      item.title,
      item.brand,
      item.category,
      item.era,
      item.size,
      item.fitsLike,
      item.conditionGrade,
      item.conditionScore,
      item.conditionNotes,
      item.price,
      item.originalRetail,
      item.material,
      item.origin,
      JSON.stringify(item.measurements || {}),
      JSON.stringify(item.tags || []),
      item.waterSavedLiters,
      item.co2SavedKg,
      item.image,
      item.featured ? 1 : 0,
      item.sold ? 1 : 0,
      now
    );
  }
}

export function getAllProducts() {
  const db = getDb();
  const rows = db
    .prepare('SELECT * FROM Product ORDER BY featured DESC, createdAt DESC')
    .all();
  return rows.map(mapRowToProduct);
}

export function getProductById(id) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM Product WHERE id = ?').get(id);
  return mapRowToProduct(row);
}

export function createProduct(data) {
  const db = getDb();
  const id = `rt-${Date.now().toString(36)}`;
  const randomDigits = Math.floor(100 + Math.random() * 900);
  const sku = data.sku || `RT-26-${randomDigits}`;
  const now = new Date().toISOString();

  const scoreMap = {
    'Deadstock / Mint': 10,
    'Excellent Vintage': 9,
    'Good / Gently Worn': 8,
    'Distressed / Patina': 7,
  };

  const conditionGrade = data.conditionGrade || 'Excellent Vintage';
  const conditionScore =
    Number(data.conditionScore) || scoreMap[conditionGrade] || 9;
  const price = Number(data.price) || 65;
  const originalRetail = Number(data.originalRetail) || Math.round(price * 2.2);

  const stmt = db.prepare(`
    INSERT INTO Product (
      id, sku, title, brand, category, era, size, fitsLike,
      conditionGrade, conditionScore, conditionNotes,
      price, originalRetail, material, origin,
      measurementsJson, tagsJson, waterSavedLiters, co2SavedKg,
      image, featured, sold, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    sku,
    data.title,
    data.brand || 'Archival Curated Label',
    data.category || 'Outerwear & Jackets',
    data.era || '1990s',
    data.size || 'M',
    data.fitsLike || `True ${data.size || 'M'}`,
    conditionGrade,
    conditionScore,
    data.conditionNotes || 'Hand-inspected archival vintage condition.',
    price,
    originalRetail,
    data.material || '100% Vintage Cotton / Natural Fibers',
    data.origin || 'Archival Estate Sourcing',
    JSON.stringify(
      data.measurements || {
        pitToPit: 21.5,
        length: 27.0,
        shoulder: 18.5,
        sleeve: 23.5,
      }
    ),
    JSON.stringify(
      Array.isArray(data.tags) && data.tags.length > 0
        ? data.tags
        : [data.era || 'Vintage', '1-of-1 Curated', data.brand || 'Archive']
    ),
    Number(data.waterSavedLiters) || 3500,
    Number(data.co2SavedKg) || 8.5,
    data.image ||
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85',
    data.featured ? 1 : 0,
    0,
    now
  );

  return getProductById(id);
}

export function updateProductStatus(id, updates) {
  const db = getDb();
  const current = getProductById(id);
  if (!current) return null;

  const nextSold =
    typeof updates.sold === 'boolean' ? (updates.sold ? 1 : 0) : current.sold ? 1 : 0;
  const nextFeatured =
    typeof updates.featured === 'boolean'
      ? updates.featured
        ? 1
        : 0
      : current.featured
      ? 1
      : 0;
  const nextPrice =
    updates.price !== undefined ? Number(updates.price) : current.price;

  db.prepare(
    'UPDATE Product SET sold = ?, featured = ?, price = ? WHERE id = ?'
  ).run(nextSold, nextFeatured, nextPrice, id);

  return getProductById(id);
}

export function deleteProductById(id) {
  const db = getDb();
  db.prepare('DELETE FROM Product WHERE id = ?').run(id);
  return { deleted: true, id };
}

export function getAllOrders() {
  const db = getDb();
  const rows = db
    .prepare('SELECT * FROM "Order" ORDER BY createdAt DESC')
    .all();
  return rows.map(mapRowToOrder);
}

export function createOrder(payload) {
  const db = getDb();
  const id = `ord-${Date.now().toString(36)}`;
  const orderNumber = `RT-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();
  const items = Array.isArray(payload.items) ? payload.items : [];

  const stmt = db.prepare(`
    INSERT INTO "Order" (
      id, orderNumber, customerName, customerEmail, shippingAddress,
      deliveryMethod, promoCode, subtotal, discount, shippingCost,
      total, waterSavedLiters, co2SavedKg, itemsJson, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    orderNumber,
    payload.customerName || 'Archive Collector',
    payload.customerEmail || 'collector@rethread.archive',
    payload.shippingAddress || 'Flagship Studio Pickup',
    payload.deliveryMethod || 'Carbon-Neutral Ground',
    payload.promoCode || null,
    Number(payload.subtotal) || 0,
    Number(payload.discount) || 0,
    Number(payload.shippingCost) || 0,
    Number(payload.total) || 0,
    Number(payload.waterSavedLiters) || 0,
    Number(payload.co2SavedKg) || 0,
    JSON.stringify(items),
    now
  );

  // Mark every purchased 1-of-1 garment as sold in SQLite
  const markSoldStmt = db.prepare('UPDATE Product SET sold = 1 WHERE id = ?');
  for (const item of items) {
    if (item && item.id) {
      markSoldStmt.run(item.id);
    }
  }

  const row = db.prepare('SELECT * FROM "Order" WHERE id = ?').get(id);
  return mapRowToOrder(row);
}

export function resetAndSeedArchive() {
  const db = getDb();
  db.exec('DELETE FROM Product;');
  seedInitialProducts(db);
  return getAllProducts();
}
