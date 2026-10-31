'use client';

import dynamic from 'next/dynamic';

const Dashboard = dynamic(
  () => import('next-blogpanel/admin').then((m) => m.Dashboard),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: '2.5rem', color: '#BA181E', fontWeight: 600 }}>
        Loading CMS Dashboard...
      </div>
    ),
  }
);

export default function AdminDashboard() {
  return <Dashboard />;
}
