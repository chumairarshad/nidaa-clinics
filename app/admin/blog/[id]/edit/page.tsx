'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

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

export default function EditPost() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  return <PostEditor postId={id} />;
}
