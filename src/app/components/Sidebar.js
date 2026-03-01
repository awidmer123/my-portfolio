'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar({ albums }) {
  const [isOpen, setIsOpen] = useState(false);
  const [albumsExpanded, setAlbumsExpanded] = useState(true);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md rounded-md p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-5 h-0.5 bg-black mb-1"></div>
        <div className="w-5 h-0.5 bg-black mb-1"></div>
        <div className="w-5 h-0.5 bg-black"></div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 p-6 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="mb-8">
          <h1 className="text-xl font-bold">📷 My Portfolio</h1>
        </div>

        <nav className="space-y-2">
          <Link href="/" className="block text-gray-700 hover:text-black transition font-medium" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          <div>
            <button
              className="w-full text-left text-gray-700 hover:text-black transition font-medium flex items-center justify-between"
              onClick={() => setAlbumsExpanded(!albumsExpanded)}
            >
              Albums
              <span>{albumsExpanded ? '▾' : '▸'}</span>
            </button>

            {albumsExpanded && (
              <div className="ml-4 mt-2 space-y-1">
                {albums.map((album) => (
                  <Link
                    key={album.name}
                    href={`/albums/${album.name}`}
                    className="block text-sm text-gray-500 hover:text-black transition capitalize py-0.5"
                    onClick={() => setIsOpen(false)}
                  >
                    {album.name.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
