import '../../../next-blogpanel.setup';
import { GET as baseGET, POST as basePOST, PUT as basePUT, DELETE as baseDELETE } from 'next-blogpanel/api/categories';
import { getLocalCategories, saveLocalCategory } from '@/lib/local-cms-db';
import { normalizeAuthRequest } from '@/lib/cms-auth';

export async function GET(request: Request) {
  if (!process.env.BLOGPANEL_MONGODB_URI) {
    const categories = getLocalCategories();
    return Response.json({ success: true, data: categories });
  }

  try {
    const req = normalizeAuthRequest(request);
    const response = await baseGET(req);
    if (!response.ok) {
      const categories = getLocalCategories();
      return Response.json({ success: true, data: categories });
    }
    return response;
  } catch {
    const categories = getLocalCategories();
    return Response.json({ success: true, data: categories });
  }
}

export async function POST(request: Request) {
  try {
    const clone = request.clone();
    const req = normalizeAuthRequest(request);
    const response = await basePOST(req);
    if (!response.ok) {
      const body = await clone.json();
      const saved = saveLocalCategory(body);
      return Response.json({ success: true, data: saved });
    }
    return response;
  } catch {
    const body = await request.json();
    const saved = saveLocalCategory(body);
    return Response.json({ success: true, data: saved });
  }
}

export async function PUT(request: Request) {
  try {
    const clone = request.clone();
    const req = normalizeAuthRequest(request);
    const response = await basePUT(req);
    if (!response.ok) {
      const body = await clone.json();
      const saved = saveLocalCategory(body);
      return Response.json({ success: true, data: saved });
    }
    return response;
  } catch {
    const body = await request.json();
    const saved = saveLocalCategory(body);
    return Response.json({ success: true, data: saved });
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
