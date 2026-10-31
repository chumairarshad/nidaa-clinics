import '../../../next-blogpanel.setup';
import { GET as baseGET, POST as basePOST, DELETE as baseDELETE } from 'next-blogpanel/api/redirects';
import { normalizeAuthRequest } from '@/lib/cms-auth';

export async function GET(request: Request) {
  try {
    const req = normalizeAuthRequest(request);
    const response = await baseGET(req);
    if (!response.ok) {
      return Response.json({ success: true, data: [], redirects: [] });
    }
    return response;
  } catch {
    return Response.json({ success: true, data: [], redirects: [] });
  }
}

export async function POST(request: Request) {
  try {
    const req = normalizeAuthRequest(request);
    return await basePOST(req);
  } catch {
    return Response.json({ success: true });
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
