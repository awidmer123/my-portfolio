'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

function formatDate(yyyymm) {
  const [year, month] = yyyymm.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function AlbumGrid({ photos }) {
  const [activeFilters, setActiveFilters] = useState({ camera: null, film: null, date: null });

  function toggleFilter(category, value) {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? null : value, // nochmal klicken = abwählen
    }));
  }

  // Fotos, die zu ALLEN aktuell aktiven Filtern passen
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const meta = photo.context || {};
      return (!activeFilters.camera || meta.camera === activeFilters.camera)
          && (!activeFilters.film || meta.film === activeFilters.film)
          && (!activeFilters.date || meta.date === activeFilters.date);
    });
  }, [photos, activeFilters]);

  // Verfügbare Optionen pro Kategorie, unter Berücksichtigung der JEWEILS ANDEREN aktiven Filter
  function getAvailableOptions(category) {
    const relevantPhotos = photos.filter((photo) => {
      const meta = photo.context || {};
      return Object.entries(activeFilters).every(([key, value]) => {
        if (key === category || !value) return true; // eigene Kategorie ignorieren
        return meta[key] === value;
      });
    });
    const values = relevantPhotos.map((p) => p.context?.[category]).filter(Boolean);
    return [...new Set(values)].sort();
  }

  const cameraOptions = getAvailableOptions('camera');
  const filmOptions = getAvailableOptions('film');
  const dateOptions = getAvailableOptions('date');

  const hasActiveFilters = activeFilters.camera || activeFilters.film || activeFilters.date;

  return (
    <div>
      {/* Filter-Bereich */}
      <div className="mb-8 space-y-4">
        <FilterGroup
          label="Camera"
          options={cameraOptions}
          activeValue={activeFilters.camera}
          onToggle={(value) => toggleFilter('camera', value)}
        />
        <FilterGroup
          label="Film"
          options={filmOptions}
          activeValue={activeFilters.film}
          onToggle={(value) => toggleFilter('film', value)}
        />
        <FilterGroup
          label="Date"
          options={dateOptions}
          activeValue={activeFilters.date}
          onToggle={(value) => toggleFilter('date', value)}
          formatLabel={formatDate}
        />

        {hasActiveFilters && (
          <button
            onClick={() => setActiveFilters({ camera: null, film: null, date: null })}
            className="text-sm text-gray-500 hover:text-black underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      <p className="text-gray-500 mb-4 text-sm">{filteredPhotos.length} photos</p>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredPhotos.map((photo) => {
          const meta = photo.context || {};

          return (
            <div key={photo.asset_id} className="break-inside-avoid rounded-xl overflow-hidden shadow-md">
              <Image
                src={photo.secure_url}
                alt={photo.public_id}
                width={photo.width}
                height={photo.height}
                className="w-full object-cover"
              />
              <div className="p-4 bg-white">
                {(meta.camera || meta.film || meta.date) && (
                  <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-500">
                    {meta.camera && <span>{meta.camera}</span>}
                    {meta.film && <span>· {meta.film}</span>}
                    {meta.date && <span>· {formatDate(meta.date)}</span>}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <a href={`${photo.secure_url}?fl_attachment=true`} download={true} className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition">
                    Download
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterGroup({ label, options, activeValue, onToggle, formatLabel }) {
  if (options.length === 0) return null;

  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = activeValue === option;
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`text-sm px-3 py-1.5 rounded-full border transition ${
                isActive
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-black'
              }`}
            >
              {formatLabel ? formatLabel(option) : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
