'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SplitLines } from '../../../components/animations/SplitLines';

const About = () => {
  const [aboutText, setAboutText] = useState('');

  useEffect(() => {
    fetch('/api/site-settings')
      .then((r) => r.json())
      .then((data) => setAboutText(data.aboutText));
  }, []);

  if (!aboutText) return null;

  return (
    <section className="relative w-full overflow-hidden bg-pink-500 px-6 py-20 sm:px-8 md:py-24 lg:px-12 lg:py-28 xl:px-20">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center text-center gap-8 md:gap-10">
        <SplitLines
          text={aboutText}
          tag="h2"
          className="text-[1.55rem] leading-[1.35] text-white sm:text-[1.85rem] md:text-[2.25rem] lg:text-[3rem] max-w-[20ch] sm:max-w-[28ch] md:max-w-[34ch]"
          duration={1}
          stagger={0.06}
          ease="power3.out"
          yPercent={110}
          threshold={0.15}
          rootMargin="-80px"
        />

        <div className="overflow-hidden pt-2">
          <Link
            href="/about"
            className="btn-outline inline-flex items-center justify-center border border-white/80 px-[2.5rem] py-[.9rem] text-[.825rem] uppercase tracking-[-0.01em] text-white transition-all duration-300 hover:bg-white hover:text-pink-600"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;