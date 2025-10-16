import { getMaps } from '@/lib/getMapData';
import { client } from '@/lib/sanity.client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const maps = await getMaps();
    return NextResponse.json(maps);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch maps' }, { status: 500 });
  }
}
