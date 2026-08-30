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
            I'm a bioinformatician student based in Switzerland that pretends to have a hobby. Photography is one of those things I enjoy, yet somehow never do enough of, since I am, as all of my generation, addicted to screens and basically got no time to do anything else than doomscrolling. I also feel a need to share something with the world that is less unsettling than the current political climate or the various crises we face. I didn't like the idea of an instagram page, so there you go. Here you can find my best, or alternatively least bad, shots so far. So consider that as my contribution to a better world. I hope you find something nice and aesthetic.
            With this project I'm hoping to give myself a reason to pick up the camera more regularly (mind games).
          </p>
          <p>
            No professional here. My photos are unedited and straight from the camera, which is exactly how I want it (I am a lazy f*** who does neither have the money for proper software nor the skills to edit photos). I love being outside and capturing moments consciously ("consciously": Just hoping to get the settings right enough on an analog camera with a broken photosensor (Konica AF) to see at least something. For sure with the other cameras it is a bit less of a hassle.).
          </p>
          <p>
          Maybe some words about "my" cameras. 
          In the basement of my parents i found an old Pentax Espio 140. Initially it did not run but after buying new batteries (a super weird shape that is probably used for nothing else nowadays) it started. It is a "modern" film camera. It has an autofocus and sets aperture and shutter speed automatically. It got a fixed little zoomable lens. it may not be the most beatuiful camera, but i really like the portability and the photos.
          After the development of the first film roll, i decided to buy another analog camera. after some comparisons i went for a second hand konica AF. there are quite some lenses available online, the initial price was not too high and it is just looking gorgeous. in holidays i love to just carry it around as an accessory (on the brown leather strap) and let everyone immediately know that i am a tourist. Yet it got some down sides. the photometer/light sensor is broken. therefore i have to estimate aperture, shutter speed and zoom on my own. lately i got an app on my phone to do that for me. it always takes a while to set everything up for the perfect shot. therefore moving or spontaneous shots are not really a thing.
          Also I am currently often using my dads Olympus OMD. This is a modern digital camera that costs some real adult money. The resoulution of those pictues is higher than the one of my eyes (i wear glasses). i (he) got three lenses but none of them is a wide angle lens. So the variety of shots is limited. Yet considering the costs of developing analog films, it is a cheap way to make pictures and experimenting with settings.
          In theory i also got a small konica digital camera. but the battery is making troubles and the old 16mb memory card is always full.
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
