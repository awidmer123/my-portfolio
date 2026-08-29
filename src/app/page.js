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
        <h1 className="text-4xl font-bold mb-6">Some of my least bad shots</h1>
        <div className="space-y-4 text-gray-700 leading-relaxed max-w-2xl">
          <p>
            I'm a bioinformatician and computational biology student based in Switzerland that pretends to have a hobby to keep up his image of not being too nerdy. Photography is one of those things I enjoy, yet somehow never do enough of, since I am, as all of my generation, addicted to screens and basically got no time to do anything else than doomscrolling. I also feel a need to share something with the world that is less unsettling than the current political climate or the various crises we face. I didn't like the idea of an instagram page, so there you go. Here you can find my best, or alternatively least bad, shots so far. I hope you find something nice and aesthetic.
            With this project I'm hoping to change that, giving myself a reason to pick up the camera more regularly.
            A little self-imposed push, if you will (Eeeeew that sounds almost like one of those hypocritical alpha-male-life-coaches).
          </p>
          <p>
            No professional here. My photos are unedited and straight from the camera, which is exactly how I want it (I am a lazy f*** who does neither have the money for proper software nor the skills to edit photos). I love being outside and capturing moments consciously ("consciously": Just hoping to get the settings right enough on an analog camera with a broken photosensor (Konica AF) to see at least something. For sure with the other cameras it is a bit less of a hassle.).
          </p>
          <p>
            This website is a side project I built to learn web development (for a potential future employer), share my favourite shots, and have my own
            little space on the internet. Always a work in progress (Yes, like every 6 month I got some free time and change something minor). Claude is my best friend    and helps with the necessary technical support.
          </p>
          <p>
          At the bottom of the page you find a link to the github repo.
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
            {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-400">
        
          <a href="https://github.com/awidmer123/my-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
        >
          View source on GitHub
        </a>
      </footer>
    </main>
  );
}
