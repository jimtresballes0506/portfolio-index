import React from 'react';
import ThriftStoreClient from '../components/ThriftStoreClient';
import { getAllProducts, getAllOrders } from '../lib/db';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const initialProducts = getAllProducts();
  const initialOrders = getAllOrders();

  return (
    <ThriftStoreClient
      initialProducts={initialProducts}
      initialOrders={initialOrders}
    />
  );
}
