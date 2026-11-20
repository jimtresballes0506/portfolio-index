import { NextResponse } from 'next/server';
import { resetAndSeedArchive } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const products = resetAndSeedArchive();
    return NextResponse.json({
      message: 'Archive catalog reset to default 1-of-1 inventory.',
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reset archive database', details: error.message },
      { status: 500 }
    );
  }
}
