import SearchGrid from './SearchGrid';

async function getAllPhotos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function SearchPage() {
  const photos = await getAllPhotos();

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-2">Search</h1>
      <p className="text-gray-500 mb-8 max-w-2xl">
        Browse every photo across all albums, filtered by camera, film, or date. In case you are looking for something specific :)
      </p>

      <SearchGrid photos={photos} />
    </main>
  );
}
