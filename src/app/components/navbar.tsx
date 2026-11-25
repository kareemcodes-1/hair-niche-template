'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import CartModal from './modals/cart-modal';
import MenuModal from './modals/menu-modal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [businessName, setBusinessName] = useState('');

  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/site-settings')
      .then((r) => r.json())
      .then((data) => {
        setLogoUrl(data.logoUrl);
        setBusinessName(data.businessName);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openMenuModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenuModal]);

  const links = [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {openCartModal && (
        <CartModal
          openCartModal={openCartModal}
          setOpenCartModal={setOpenCartModal}
        />
      )}
      {openMenuModal && (
        <MenuModal
          openMenuModal={openMenuModal}
          setOpenMenuModal={setOpenMenuModal}
        />
      )}

      <header
        className={`fixed top-0 left-0 w-full z-[300] bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <nav className="flex items-center justify-between w-full px-6 lg:px-12 py-4 lg:py-5">
          <Link href="/" className="flex items-center gap-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={businessName || 'Logo'}
                className="h-9 w-9 lg:h-10 lg:w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-full bg-neutral-200" />
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.9rem] uppercase tracking-[-0.01em] font-medium text-black hover:text-pink-500 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button className="text-black hover:text-pink-500 transition-colors">
              <Search size={20} strokeWidth={1.8} />
            </button>

            <button
              onClick={() => setOpenCartModal(true)}
              className="text-black hover:text-pink-500 transition-colors"
            >
              <ShoppingCart size={20} strokeWidth={1.8} />
            </button>

            <Link
              href="/auth/login"
              className="hidden lg:block text-black hover:text-pink-500 transition-colors"
            >
              <User size={20} strokeWidth={1.8} />
            </Link>

            <button
              className="lg:hidden text-black"
              onClick={() => setOpenMenuModal(true)}
            >
              <Menu size={24} strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;