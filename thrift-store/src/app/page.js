import React from 'react';
import ThriftStoreClient from '../components/ThriftStoreClient';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

async function loadInitialData() {
  if (process.env.GITHUB_PAGES === 'true') {
    return {
      initialProducts: INITIAL_PRODUCTS,
      initialOrders: [],
    };
  }
  try {
    const { getAllProducts, getAllOrders } = await import('../lib/db');
    return {
      initialProducts: getAllProducts(),
      initialOrders: getAllOrders(),
    };
  } catch {
    return {
      initialProducts: INITIAL_PRODUCTS,
      initialOrders: [],
    };
  }
}

export default async function HomePage() {
  const { initialProducts, initialOrders } = await loadInitialData();

  return (
    <ThriftStoreClient
      initialProducts={initialProducts}
      initialOrders={initialOrders}
    />
  );
}
