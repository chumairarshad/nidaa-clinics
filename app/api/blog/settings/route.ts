import '../../../next-blogpanel.setup';
import { GET as baseGET, PUT as basePUT } from 'next-blogpanel/api/settings';
import { isValidMasterKey, normalizeAuthRequest } from '@/lib/cms-auth';
import { getLocalSettings, updateLocalSettings } from '@/lib/local-cms-db';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  // If a valid master key is provided in ANY common format (raw, quotes, prefix, whitespace),
  // immediately authenticate and provide the settings
  if (isValidMasterKey(authHeader)) {
    if (process.env.BLOGPANEL_MONGODB_URI) {
      try {
        const normalizedReq = normalizeAuthRequest(request);
        const response = await baseGET(normalizedReq);
        if (response.ok) return response;
      } catch {
        // Offline fallback
      }
    }

    return Response.json({
      success: true,
      data: getLocalSettings(),
    });
  }

  // If no auth header at all
  if (!authHeader) {
    return Response.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Authorization header is required' } },
      { status: 401 }
    );
  }

  // Not a valid master key — try standard Next-BlogPanel DB token verification
  try {
    return await baseGET(request);
  } catch {
    return Response.json(
      { success: false, error: { code: 'FORBIDDEN', message: 'Invalid API key' } },
      { status: 403 }
    );
  }
}

export async function PUT(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (isValidMasterKey(authHeader)) {
    try {
      const clone = request.clone();
      const normalizedReq = normalizeAuthRequest(request);
      const response = await basePUT(normalizedReq);
      if (response.ok) return response;
      const body = await clone.json();
      const updated = updateLocalSettings(body);
      return Response.json({ success: true, data: updated });
    } catch {
      const body = await request.json();
      const updated = updateLocalSettings(body);
      return Response.json({ success: true, data: updated });
    }
  }

  return basePUT(request);
}
