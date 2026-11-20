import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = getAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch archive catalog', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.title || !body.price) {
      return NextResponse.json(
        { error: 'Title and price are required to list an archival piece.' },
        { status: 400 }
      );
    }
    const product = createProduct(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create vintage listing', details: error.message },
      { status: 500 }
    );
  }
}
