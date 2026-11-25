'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import { FaEnvelope, FaInstagram, FaPhone } from 'react-icons/fa';
import { SplitLines } from '../../../components/animations/SplitLines';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'Payment Methods', href: '/payment-methods' },
    { label: 'Returns & Complaints', href: '/returns' },
    { label: 'Shipping Info', href: '/shipping-policy' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'FAQ', href: '/faq' },
  ],
};

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [logoUrl, setLogoUrl] = useState('');
  const [businessName, setBusinessName] = useState('Your Business');

  useEffect(() => {
    fetch('/api/site-settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.logoUrl) setLogoUrl(data.logoUrl);
        if (data.businessName) setBusinessName(data.businessName);
      })
      .catch(() => {});
  }, []);

  useGSAP(
    () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (!isDesktop || !footerRef.current || !triggerRef.current) return;

      const footer = footerRef.current;
      const trigger = triggerRef.current;

      gsap.set(footer, { yPercent: -50 });

      const uncover = gsap.timeline({ paused: true });
      uncover.to(footer, { yPercent: 0, ease: 'none' });

      const scrollTrigger = ScrollTrigger.create({
        trigger,
        start: 'bottom bottom',
        end: '+=50%',
        animation: uncover,
        scrub: true,
        invalidateOnRefresh: true,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        scrollTrigger.kill();
        uncover.kill();
        gsap.set(footer, { clearProps: 'transform' });
      };
    },
    { dependencies: [pathname], scope: footerRef, revertOnUpdate: true }
  );

  return (
    <>
      <div ref={triggerRef} className="section hidden lg:block" />

      <div className="relative w-full overflow-hidden bg-black">
        <footer
          ref={footerRef}
          className="bg-black px-5 pb-8 pt-12 text-white sm:px-8 sm:pt-16 md:px-12 md:pb-8 md:pt-28 lg:px-[3rem]"
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-0">
            {/* Brand */}
            <div className="flex flex-col gap-5 sm:gap-6 lg:pr-10">
              <Link href="/" className="flex w-fit items-center">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={businessName}
                    className="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-neutral-200 sm:h-16 sm:w-16" />
                )}
              </Link>

              <p className="max-w-xs text-[0.9rem] leading-relaxed text-white/60 sm:text-base">
                Shop luxury hair wigs, beauty essentials and eyelashes.
                Premium quality, flawless textures and effortless glam.
              </p>

              <div className="mt-1 flex gap-3">
                <Link
                  href="mailto:"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#FD3F92] sm:h-11 sm:w-11"
                  aria-label="Email"
                >
                  <FaEnvelope size={15} />
                </Link>

                <Link
                  href="https://wa.me/"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#FD3F92] sm:h-11 sm:w-11"
                  aria-label="WhatsApp"
                >
                  <FaPhone size={15} />
                </Link>

                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#FD3F92] sm:h-11 sm:w-11"
                  aria-label="Instagram"
                >
                  <FaInstagram size={15} />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4 sm:gap-5 lg:px-10">
              <h4 className="text-[1.05rem] font-medium text-white sm:text-[1.2rem]">
                Quick Links
              </h4>

              <div className="flex flex-col gap-3 text-[0.9rem] text-white/60 sm:gap-4 sm:text-base">
                {footerLinks.nav.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="w-fit overflow-hidden transition hover:text-white"
                  >
                    <SplitLines
                      text={link.label}
                      tag="span"
                      className="block"
                      duration={1}
                      stagger={0.1}
                      ease="power3.out"
                      yPercent={120}
                      threshold={0.1}
                      rootMargin="-50px"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-4 sm:gap-5 lg:px-10">
              <h4 className="text-[1.05rem] font-medium text-white sm:text-[1.2rem]">
                Support
              </h4>

              <div className="flex flex-col gap-3 text-[0.9rem] text-white/60 sm:gap-4 sm:text-base">
                {footerLinks.support.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="w-fit overflow-hidden transition hover:text-white"
                  >
                    <SplitLines
                      text={link.label}
                      tag="span"
                      className="block"
                      duration={1}
                      stagger={0.1}
                      ease="power3.out"
                      yPercent={120}
                      threshold={0.1}
                      rootMargin="-50px"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4 sm:gap-5 lg:px-10">
              <h4 className="text-[1.05rem] font-medium text-white sm:text-[1.2rem]">
                Legal
              </h4>

              <div className="flex flex-col gap-3 text-[0.9rem] text-white/60 sm:gap-4 sm:text-base">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="w-fit overflow-hidden transition hover:text-white"
                  >
                    <SplitLines
                      text={link.label}
                      tag="span"
                      className="block"
                      duration={1}
                      stagger={0.1}
                      ease="power3.out"
                      yPercent={120}
                      threshold={0.1}
                      rootMargin="-50px"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-dashed border-pink-500/40 sm:mt-14 md:mt-16" />

          <div className="flex flex-col gap-4 pt-6 text-sm text-white/50 sm:pt-8 md:flex-row md:items-center md:justify-between md:gap-6 md:pt-10">
            <p>© 2026 {businessName}. All rights reserved.</p>

            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Link href="/shipping-policy" className="transition hover:text-white">
                Shipping Policy
              </Link>
              <Link href="/returns" className="transition hover:text-white">
                Returns Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;