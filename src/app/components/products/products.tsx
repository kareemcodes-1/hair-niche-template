'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from './product-card';
import { SplitText } from '../../../../components/animations/SplitText';

import 'swiper/css';
import 'swiper/css/navigation';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="products w-full py-12 sm:py-16 md:py-20 lg:py-[6rem] bg-white px-4 sm:px-6 md:px-8 lg:px-[3rem]">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Title */}
        <div className="flex items-center flex-col gap-4 sm:gap-6 justify-center w-full">
          <SplitText
            text="Featured Products"
            tag="h1"
            className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] text-center overflow-hidden w-full max-w-[90%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]"
            duration={1}
            ease="power3.out"
            splitType="chars"
            threshold={0.1}
            rootMargin="-100px"
            stagger={0.025}
          />
        </div>

        {/* Swiper */}
        <div className="relative w-full px-8 sm:px-10 md:px-12">
          {/* Previous Button */}
          <button
            ref={setPrevEl}
            type="button"
            aria-label="Previous products"
            className="absolute left-0 sm:left-1 top-[35%] sm:top-[40%] z-20 flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-white/95 shadow-sm backdrop-blur transition-colors duration-300 hover:bg-[#FD3F92] hover:text-white"
          >
            <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
          </button>

          {/* Next Button */}
          <button
            ref={setNextEl}
            type="button"
            aria-label="Next products"
            className="absolute right-0 sm:right-1 top-[35%] sm:top-[40%] z-20 flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-white/95 shadow-sm backdrop-blur transition-colors duration-300 hover:bg-[#FD3F92] hover:text-white"
          >
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
          </button>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-2xl aspect-[3/4] animate-pulse"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <Swiper
              className="w-full !overflow-hidden"
              modules={[Navigation, Autoplay]}
              spaceBetween={12}
              slidesPerView={1.15}
              breakpoints={{
                400: {
                  slidesPerView: 1.3,
                  spaceBetween: 14,
                },
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 18,
                },
                768: {
                  slidesPerView: 2.3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              loop={products.length > 3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl,
                nextEl,
              }}
              key={prevEl && nextEl ? 'with-nav' : 'no-nav'}
            >
              {products.map((product) => (
                <SwiperSlide key={product._id} className="!h-auto">
                  <ProductCard item={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-16 sm:py-20 text-gray-500 text-sm sm:text-base">
              No featured products yet.
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center w-full mt-2 sm:mt-4">
          <Link href="/shop" className="btn-primary">
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;