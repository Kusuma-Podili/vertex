import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface ProductGalleryProps {
  images: { id: string; url: string; altText?: string }[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main High-Res Viewer */}
      <div className="relative aspect-square w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden group">
        <img
          src={images[activeIndex]?.url}
          alt={images[activeIndex]?.altText || productTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 p-2.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white border border-slate-800"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                activeIndex === idx ? 'border-blue-500 shadow-md shadow-blue-500/25' : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.altText || 'Thumbnail'} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
