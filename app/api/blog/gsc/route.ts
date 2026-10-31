import { NextResponse } from 'next/server';
import { getGSCStatus, notifyGoogleIndexing } from '@/lib/gsc';

export async function GET() {
  const status = getGSCStatus();
  return NextResponse.json(status);
}

export async function POST(request: Request) {
  try {
    const { url, type } = await request.json();
    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }
    const result = await notifyGoogleIndexing(url, type);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
