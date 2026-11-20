import { NextResponse } from 'next/server';
import { updateProductStatus, deleteProductById } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(request, context) {
  try {
    const { id } = await context.params;
    const updates = await request.json();
    const updated = updateProductStatus(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product status', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    const result = deleteProductById(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product', details: error.message },
      { status: 500 }
    );
  }
}
