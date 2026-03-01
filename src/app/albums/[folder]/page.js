import Image from 'next/image';
import Link from 'next/link';

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

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo) => (
          <div key={photo.asset_id} className="break-inside-avoid rounded-xl overflow-hidden shadow-md">
            <Image
              src={photo.secure_url}
              alt={photo.public_id}
              width={photo.width}
              height={photo.height}
              className="w-full object-cover"
            />
            <div className="p-4 bg-white flex items-center justify-between">
              <a href={`${photo.secure_url}?fl_attachment=true`} download={true} className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition">
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
