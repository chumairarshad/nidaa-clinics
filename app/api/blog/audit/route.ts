import '../../../next-blogpanel.setup';
import { GET as baseGET } from 'next-blogpanel/api/audit';
import { normalizeAuthRequest } from '@/lib/cms-auth';

export async function GET(request: Request) {
  try {
    const req = normalizeAuthRequest(request);
    const response = await baseGET(req);
    if (!response.ok) {
      return Response.json({ success: true, data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } });
    }
    return response;
  } catch {
    return Response.json({ success: true, data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } });
  }
}
