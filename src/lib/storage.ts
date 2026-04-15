// Storage - uses local files for now (Blob can be added later)
import fs from "fs/promises";
import path from "path";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  shortDescription: string;
  fullDescription: string;
  specifications: {
    diameter?: string;
    material?: string;
    noiseReduction?: string;
    weight?: string;
    dishwasherSafe?: boolean;
  };
  featured: boolean;
  usaMade: boolean;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const SITE_CONTENT_FILE = path.join(DATA_DIR, "site-content.json");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readProducts(): Promise<Product[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProducts(products: Product[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

async function readSiteContent(): Promise<any | null> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(SITE_CONTENT_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function writeSiteContent(content: any): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SITE_CONTENT_FILE, JSON.stringify(content, null, 2));
}

export async function getAllProducts(): Promise<Product[]> {
  return readProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find(p => p.slug === slug) || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await readProducts();
  return products.filter(p => p.featured);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await readProducts();
  return products.filter(p => p.category === category);
}

export async function createProduct(data: Partial<Product>): Promise<string> {
  const products = await readProducts();
  const id = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const product: Product = {
    id,
    name: data.name || "",
    slug: data.slug || "",
    price: data.price || 0,
    comparePrice: data.comparePrice,
    category: data.category || "dinner-plates",
    shortDescription: data.shortDescription || "",
    fullDescription: data.fullDescription || "",
    images: data.images || [],
    specifications: data.specifications || {},
    featured: data.featured || false,
    usaMade: data.usaMade ?? true,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  await writeProducts(products);
  return id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const products = await readProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...data };
    await writeProducts(products);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await readProducts();
  const filtered = products.filter(p => p.id !== id);
  await writeProducts(filtered);
}

export async function getSiteContent(): Promise<any | null> {
  return readSiteContent();
}

export async function saveSiteContent(content: any): Promise<void> {
  await writeSiteContent(content);
}