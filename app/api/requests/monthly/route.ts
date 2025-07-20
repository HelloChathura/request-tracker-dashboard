// app/api/requests/monthly/route.ts
import { NextResponse } from 'next/server';
import { getMonthlyRequestCount } from '@/lib/db';

export async function GET() {
  try {
    const data = await getMonthlyRequestCount();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
