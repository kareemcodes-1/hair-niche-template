'use client';

import PixelRevealImage from '@/app/helpers/pixelated-image';
import { priceFormatter } from '@/lib/priceFormatter';
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ item }: { item: any }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <a
      href={`/products/p/${item?.name?.replace(/\s+/g, '-')}`}
      className="group flex flex-col w-full"
    >
      {/* Image */}
      <div className="bg-[#f6f6f4] rounded-[12px] sm:rounded-[16px] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/4] overflow-hidden">
        <PixelRevealImage
          className="relative h-full w-full rounded-[12px] sm:rounded-[16px] object-cover"
          src={item.imageUrl || item.img}
          alt={item.name}
        />
      </div>

      {/* Info */}
      <div className="mt-3 sm:mt-4 flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 flex-1">
          <p className="text-[0.65rem] sm:text-[0.75rem] uppercase tracking-wide text-black/50">
            Wigs
          </p>
          <h2 className="text-[0.95rem] sm:text-[1.05rem] lg:text-[1.25rem] text-black font-medium leading-snug line-clamp-2">
            {item.name}
          </h2>
          <p className="text-[1rem] sm:text-[1.15rem] lg:text-[1.2rem] text-black/90 font-semibold">
            {priceFormatter(item.price)}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className="flex-shrink-0 flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-pink-500 text-white mt-1"
        >
          <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.8} />
        </button>
      </div>
    </a>
  );
};

export default ProductCard;