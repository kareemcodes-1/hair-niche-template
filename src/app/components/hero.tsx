'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SplitLines } from '../../../components/animations/SplitLines';

const Hero = () => {
  const [hero, setHero] = useState<any>(null);

  useEffect(() => {
    fetch('/api/site-settings')
      .then((r) => r.json())
      .then((data) => setHero(data.hero));
  }, []);

  if (!hero) return null;

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {hero.mediaType === 'video' ? (
        <video
          src={hero.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={hero.mediaUrl}
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      <div className="absolute bottom-0 left-0 z-20 w-full px-6 pb-10 sm:px-8 sm:pb-12 md:px-10 md:pb-14 lg:px-12 lg:pb-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 xl:gap-16">
          <SplitLines
            text={hero.title}
            tag="h1"
            className="max-w-xl text-[2.1rem] leading-[1.15] text-white sm:text-[2.6rem] md:text-[2.9rem] lg:max-w-[52%] lg:text-[3.4rem] xl:max-w-[48%] xl:text-[4rem]"
            duration={1}
            stagger={0.08}
            ease="power3.out"
            yPercent={120}
            threshold={0.1}
            rootMargin="0px"
          />

          <div className="flex w-full flex-col gap-5 lg:w-[320px] xl:w-[360px]">
            <SplitLines
              text={hero.description}
              tag="p"
              className="text-[0.8rem] uppercase leading-[1.65] tracking-[-0.01em] text-white/90 sm:text-[0.85rem]"
              duration={1}
              stagger={0.06}
              ease="power3.out"
              yPercent={120}
              threshold={0.1}
              rootMargin="0px"
            />
            <div className="overflow-hidden">
              <Link
                href="/shop"
                className="btn-primary inline-flex w-full items-center justify-center"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;