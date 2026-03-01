import Image from 'next/image';
import Link from 'next/link';

async function getAlbums() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/albums`, {
    cache: 'no-store',
  });
  return res.json();
}

async function getCoverPhoto(folder) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/albums/${folder}`, {
    cache: 'no-store',
  });
  const photos = await res.json();
  return photos[0] || null;
}

export default async function Home() {
  const albums = await getAlbums();
  const albumsWithCovers = await Promise.all(
    albums.map(async (album) => {
      const cover = await getCoverPhoto(album.name);
      return { ...album, cover };
    })
  );

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-2">My Portfolio</h1>
      <p className="text-gray-500 mb-8">A collection of my photography</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albumsWithCovers.map((album) => (
          <Link key={album.name} href={`/albums/${album.name}`}>
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer">
              {album.cover && (
                <Image
                  src={album.cover.secure_url}
                  alt={album.name}
                  width={album.cover.width}
                  height={album.cover.height}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4 bg-white">
                <h2 className="font-semibold text-lg capitalize">{album.name.replace(/-/g, ' ')}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
