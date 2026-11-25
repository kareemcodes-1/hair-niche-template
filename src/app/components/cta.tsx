'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitLines } from '../../../components/animations/SplitLines';

const CTA = () => {
  const ctaImageRef = useRef<HTMLImageElement | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [ctaImage, setCtaImage] = useState('');

  useEffect(() => {
    fetch('/api/site-settings')
      .then((r) => r.json())
      .then((data) => setCtaImage(data.ctaImageUrl));
  }, []);

  useEffect(() => {
    if (ctaImageRef.current) {
      gsap.fromTo(
        ctaImageRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: ctaImageRef.current,
            start: '200px 80%',
            end: 'bottom 60%',
            toggleActions: 'play none reverse none',
          },
        }
      );
    }
  }, [ctaImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative w-full flex flex-col md:flex-row lg:h-screen overflow-hidden">
      <div className="w-full md:w-1/2 h-[50vh] md:h-full overflow-hidden">
        {ctaImage && (
          <img
            src={ctaImage}
            alt="Newsletter CTA"
            className="w-full h-full object-cover"
            ref={ctaImageRef}
          />
        )}
      </div>

      <div className="bg-pink-500 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 text-white w-full md:w-1/2 flex flex-col justify-center">
        <SplitLines
          text="Be the first to know."
          tag="h2"
          className="text-[1.9rem] xs:text-[2.2rem] sm:text-[2.6rem] lg:text-[3.5rem] leading-[1.15] mb-4 md:mb-5 overflow-hidden max-w-[480px] font-medium"
          duration={1}
          stagger={0.08}
          ease="power3.out"
          yPercent={140}
          threshold={0.1}
          rootMargin="-100px"
        />

        <p className="text-[0.85rem] sm:text-[0.95rem] text-white/80 mb-8 md:mb-10 max-w-md leading-relaxed">
          Get early access to new drops, exclusive discounts, and the latest hair
          care tips — straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/15 border border-white/30 text-white placeholder:text-white/60 text-sm outline-none focus:border-white focus:bg-white/20 transition"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-7 py-3.5 bg-black text-white text-[.825rem] font-medium uppercase tracking-[-0.01em] rounded-full hover:bg-black/90 transition disabled:opacity-70 whitespace-nowrap"
            >
              {status === 'loading' ? 'Sending...' : 'Join the list'}
            </button>
          </div>

          {status === 'success' && (
            <p className="mt-3 text-sm text-white/90">
              You’re in! Check your inbox soon.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm text-white/90">
              Something went wrong. Please try again.
            </p>
          )}
        </form>

        <p className="mt-5 text-[0.7rem] text-white/50 max-w-sm">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
};

export default CTA;