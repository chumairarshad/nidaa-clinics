import { isValidMasterKey } from '@/lib/cms-auth';

interface Props {
  params: Promise<{ action: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const { action } = await params;

  if (action === 'me') {
    const authHeader = request.headers.get('authorization');
    if (isValidMasterKey(authHeader)) {
      return Response.json({
        success: true,
        data: {
          _id: 'master-admin',
          email: 'admin@nidaaclinic.pk',
          name: 'Dr. Bilal Warraich',
          role: 'admin',
          active: true,
        },
      });
    }

    return Response.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
      { status: 401 }
    );
  }

  return Response.json({ success: false, error: { message: `Unknown action ${action}` } }, { status: 404 });
}

export async function POST(request: Request, { params }: Props) {
  const { action } = await params;

  if (action === 'login') {
    try {
      const body = await request.json().catch(() => ({}));
      const key = body?.apiKey || body?.password || body?.key;
      if (isValidMasterKey(key)) {
        return Response.json({
          success: true,
          data: {
            _id: 'master-admin',
            email: 'admin@nidaaclinic.pk',
            name: 'Dr. Bilal Warraich',
            role: 'admin',
          },
        });
      }
      return Response.json(
        { success: false, error: { code: 'INVALID_KEY', message: 'Invalid API key' } },
        { status: 401 }
      );
    } catch {
      return Response.json({ success: false, error: { message: 'Invalid login request' } }, { status: 400 });
    }
  }

  if (action === 'logout') {
    return Response.json({ success: true, message: 'Logged out successfully' });
  }

  return Response.json({ success: false, error: { message: `Unknown action ${action}` } }, { status: 404 });
}
