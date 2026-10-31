'use client';

import dynamic from 'next/dynamic';

const PostEditor = dynamic(
  () => import('next-blogpanel/admin').then((m) => m.PostEditor),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: '2.5rem', color: '#BA181E', fontWeight: 600 }}>
        Loading Clinical Editor...
      </div>
    ),
  }
);

export default function NewPostRoute() {
  return <PostEditor />;
}
