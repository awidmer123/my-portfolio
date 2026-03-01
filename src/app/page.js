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
    <main className="p-8 max-w-4xl mx-auto">

      {/* About section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">My Portfolio</h1>
        <div className="space-y-4 text-gray-700 leading-relaxed max-w-2xl">
          <p>
            I'm based in Switzerland and photography is one of those hobbies I truly enjoy — yet somehow never do enough of.
            With this project I'm hoping to change that, giving myself a reason to pick up the camera more regularly.
            A little self-imposed push, if you will.
          </p>
          <p>
            I love being outside and capturing moments consciously, slowing down rather than just snapping away.
          </p>
          <p>
            No professional here. My photos are unedited and straight from the camera, which is exactly how I want it.
            Honest moments, nothing more.
          </p>
          <p>
            Occasionally you'll spot a shot taken by my father too — he shares the same passion.
          </p>
          <p>
            This website is a side project I built to learn web development, share my favourite shots, and have my own
            little space on the internet — independent from big social media platforms. Always a work in progress, always learning.
          </p>
        </div>
      </section>

      {/* Albums section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Albums</h2>
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
                  <h3 className="font-semibold text-lg capitalize">{album.name.replace(/-/g, ' ')}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
