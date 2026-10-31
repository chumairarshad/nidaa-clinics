import '../../../next-blogpanel.setup';
import { GET as baseGET, POST as basePOST, DELETE as baseDELETE } from 'next-blogpanel/api/media';
import { normalizeAuthRequest } from '@/lib/cms-auth';

export async function GET(request: Request) {
  try {
    const req = normalizeAuthRequest(request);
    const response = await baseGET(req);
    if (!response.ok) {
      return Response.json({ success: true, data: [], meta: { page: 1, limit: 20, total: 0 } });
    }
    return response;
  } catch {
    return Response.json({ success: true, data: [], meta: { page: 1, limit: 20, total: 0 } });
  }
}

export async function POST(request: Request) {
  try {
    const req = normalizeAuthRequest(request);
    return await basePOST(req);
  } catch (err: any) {
    return Response.json({ success: false, error: { code: 'UPLOAD_FAILED', message: err?.message || 'Media upload failed' } }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const req = normalizeAuthRequest(request);
    return await baseDELETE(req);
  } catch {
    return Response.json({ success: true });
  }
}
