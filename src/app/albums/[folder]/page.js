import Link from 'next/link';
import AlbumGrid from './AlbumGrid';

async function getPhotos(folder) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/albums/${folder}`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function AlbumPage({ params }) {
  const { folder } = await params;
  const photos = await getPhotos(folder);
  const title = folder.replace(/-/g, ' ');

  return (
    <main className="p-8">
      <Link href="/" className="text-gray-500 hover:text-black transition mb-6 inline-block">
        ← Back to albums
      </Link>
      <h1 className="text-4xl font-bold mb-2 capitalize">{title}</h1>
      <p className="text-gray-500 mb-8">{photos.length} photos</p>

      <AlbumGrid photos={photos} />
    </main>
  );
}
