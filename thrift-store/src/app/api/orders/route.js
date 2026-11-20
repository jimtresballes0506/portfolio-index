import { NextResponse } from 'next/server';
import { getAllOrders, createOrder, getAllProducts } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load orders', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Cannot submit an empty thrift order.' },
        { status: 400 }
      );
    }
    const order = createOrder(body);
    const products = getAllProducts();
    return NextResponse.json({ order, products }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to place order', details: error.message },
      { status: 500 }
    );
  }
}
