'use client';

import dynamic from 'next/dynamic';

const PostList = dynamic(
  () => import('next-blogpanel/admin').then((m) => m.PostList),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: '2.5rem', color: '#BA181E', fontWeight: 600 }}>
        Loading Clinical Posts...
      </div>
    ),
  }
);

export default function AdminPosts() {
  return <PostList />;
}
