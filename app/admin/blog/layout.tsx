import '../../next-blogpanel.setup';
import { AdminLayout } from 'next-blogpanel/admin';
import 'next-blogpanel/styles/admin.css';
import { getExpectedMasterKey } from '@/lib/cms-auth';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import fs from 'fs';
import path from 'path';

export default function AdminBlogLayout({ children }: { children: React.ReactNode }) {
  const masterKey = getExpectedMasterKey();

  // Read theme CSS for instant zero-flicker SSR injection
  let themeCss = '';
  try {
    const cssPath = path.join(process.cwd(), 'css', 'admin-nidaa-theme.css');
    themeCss = fs.readFileSync(cssPath, 'utf-8');
  } catch {
    // Fallback if read fails
  }

  return (
    <AdminAuthGuard masterKey={masterKey}>
      {themeCss && (
        <style id="nidaa-admin-theme" dangerouslySetInnerHTML={{ __html: themeCss }} />
      )}
      <AdminLayout apiKey={masterKey} adminPath="/admin/blog" apiPath="/api/blog" basePath="/blog">
        {children}
      </AdminLayout>
    </AdminAuthGuard>
  );
}
