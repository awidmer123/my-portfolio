import Image from 'next/image';

async function getPhotos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/photos`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function Home() {
  const photos = await getPhotos();

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-2">My Portfolio</h1>
      <p className="text-gray-500 mb-8">A collection of my photography</p>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo) => (
          <div key={photo.asset_id} className="break-inside-avoid rounded-xl overflow-hidden shadow-md">
            <Image
              src={photo.secure_url}
              alt={photo.display_name}
              width={photo.width}
              height={photo.height}
              className="w-full object-cover"
            />
            <div className="p-4 bg-white flex items-center justify-between">
              <h2 className="font-semibold text-lg capitalize">{photo.display_name}</h2>
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