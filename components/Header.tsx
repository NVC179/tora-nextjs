'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const menuItems = [
  { label: 'Studio', href: '/studio' },
  { label: 'Journal', href: '/category/design' },
  { label: 'Shop', href: '/' },
];

interface HeaderProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  showHeroContent?: boolean;
  showBackground?: boolean; // New prop
  isClickable?: boolean;
  clickUrl?: string; 
}

export default function Header({
  backgroundImage = '/logo/8.jpg',
  title = 'Seeson Pop-Up, Hồ Chí Minh',
  subtitle = 'Thiết kế & Thi công',
  showHeroContent = true,
  showBackground = true, // Default true để backward compatible
  isClickable = false,
  clickUrl = '/'
}: HeaderProps) {
  const [slideMenuOpen, setSlideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ... existing scroll handler and effects ...
  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine scroll direction
    setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 10);
    setScrolled(currentScrollY > 100);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (slideMenuOpen && !e.target.closest('.slide-menu')) {
        setSlideMenuOpen(false);
      }
    };

    if (slideMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [slideMenuOpen]);

  const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isClickable && clickUrl && showBackground) {
      return (
        <Link href={clickUrl} className="block">
          <div className="relative cursor-pointer group">
            {children}
            {/* Click indicator */}
            <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      );
    }

    return <div className="relative">{children}</div>;
  };

  // Navigation component để reuse
  const NavigationContent = ({ isDark = false }: { isDark?: boolean }) => (
    <>
      {/* Top bar with logo and social */}
      <div className="hidden xl:flex items-center justify-between px-6 py-4 container mx-auto">
        <div className="flex-1" />

        <a href="/" className="flex-shrink-0">
          <h1 className={`text-3xl font-bold tracking-wide transition-colors duration-300 ${
            isDark 
              ? 'text-gray-50 hover:text-orange-300' 
              : 'text-gray-900 hover:text-orange-600'
          }`}>
            tôra studio
          </h1>
        </a>

        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/torastudio.vn/"
              target="_blank"
              rel="noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'text-gray-50 hover:text-orange-300' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.1319 2.24243H6.86768C4.38239 2.24243 2.36768 4.25715 2.36768 6.74243V15.0067C2.36768 17.492 4.38239 19.5067 6.86767 19.5067H15.1319C17.6172 19.5067 19.6319 17.492 19.6319 15.0067V6.74243C19.6319 4.25715 17.6172 2.24243 15.1319 2.24243ZM6.86768 0.742432C3.55397 0.742432 0.867676 3.42872 0.867676 6.74243V15.0067C0.867676 18.3204 3.55396 21.0067 6.86767 21.0067H15.1319C18.4456 21.0067 21.1319 18.3204 21.1319 15.0067V6.74243C21.1319 3.42872 18.4456 0.742432 15.1319 0.742432H6.86768ZM11.0003 14.3995C12.9471 14.3995 14.5253 12.8213 14.5253 10.8745C14.5253 8.92777 12.9471 7.34959 11.0003 7.34959C9.05353 7.34959 7.47536 8.92777 7.47536 10.8745C7.47536 12.8213 9.05353 14.3995 11.0003 14.3995ZM11.0003 15.8995C13.7755 15.8995 16.0253 13.6497 16.0253 10.8745C16.0253 8.09934 13.7755 5.84959 11.0003 5.84959C8.2251 5.84959 5.97536 8.09934 5.97536 10.8745C5.97536 13.6497 8.2251 15.8995 11.0003 15.8995ZM16.0256 6.17693C16.6514 6.17693 17.1588 5.66956 17.1588 5.04368C17.1588 4.41781 16.6514 3.91044 16.0256 3.91044C15.3997 3.91044 14.8923 4.41781 14.8923 5.04368C14.8923 5.66956 15.3997 6.17693 16.0256 6.17693Z" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://facebook.com/torastudiovn/"
              target="_blank"
              rel="noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'text-gray-50 hover:text-orange-300' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <svg fill="currentColor" className="h-5 w-5" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="m1416.013 791.915-30.91 225.617h-371.252v789.66H788.234v-789.66H449.808V791.915h338.426V585.137c0-286.871 176.207-472.329 449.09-472.329 116.87 0 189.744 6.205 231.822 11.845l-3.272 213.66-173.5.338c-4.737-.451-117.771-9.25-199.332 65.655-52.568 48.169-79.191 117.433-79.191 205.65v181.96h402.162Zm-247.276-304.018c44.446-41.401 113.71-36.889 118.787-36.663l289.467-.113 6.204-417.504-43.544-10.717C1511.675 16.02 1426.053 0 1237.324 0 901.268 0 675.425 235.206 675.425 585.137v93.97H337v451.234h338.425V1920h451.234v-789.66h356.7l61.932-451.233H1126.66v-69.152c0-54.937 14.214-96 42.078-122.058Z" fillRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden xl:block container mx-auto px-6 py-4">
        <ul className="flex justify-center items-center space-x-8">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`font-medium transition-all duration-300 relative group py-2 ${
                  isDark 
                    ? 'text-gray-50 hover:text-orange-300' 
                    : 'text-gray-900 hover:text-orange-600'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isDark ? 'bg-orange-300' : 'bg-orange-600'
                }`} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );

  return (
    <>
      {/* Conditional Hero Background hoặc Simple Header */}
      {showBackground ? (
        /* Hero Background Layout */
        <BackgroundWrapper>
          {/* Background image */}
          <div
            className="absolute inset-0 h-[80vh] bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 h-[80vh] bg-gradient-to-b from-black/40 via-black/50 to-black/60"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)'
            }} />

          {/* Desktop Header */}
          <header className="relative z-30">
            <NavigationContent isDark={true} />
          </header>

          {/* Hero Content */}
          {showHeroContent && (
            <div className="absolute inset-0 h-[80vh] flex items-center justify-center z-20">
              <div className="text-center text-white">
                <div className="max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-50">
                    {title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-50 font-light">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
          )}
        </BackgroundWrapper>
      ) : (
        /* Simple Header Layout - No Background */
        <div className="relative bg-white shadow-sm">
          <header className="relative z-30">
            <NavigationContent isDark={false} />
          </header>
        </div>
      )}

      {/* Mobile Header - Fixed (unchanged) */}
      <div className="fixed top-0 left-0 right-0 z-50 xl:hidden">
        <div className="bg-white/95 backdrop-blur-sm shadow-lg px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setSlideMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <img src="/logo/icon_hambourger.svg" alt="menu" className="h-4 w-4" />
          </button>

          <a href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">
              tôra studio
            </h1>
          </a>

          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Sticky Header on Scroll (unchanged) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${scrolled && isScrollingUp
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[-100%] opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
              <button
                onClick={() => setSlideMenuOpen(true)}
                aria-label="Open menu"
                className="xl:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
              >
                <img src="/logo/icon_hambourger.svg" alt="menu" className="h-3.5 w-3.5" />
              </button>

              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="xl:mr-8">
                  <h1 className="text-xl xl:text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300">
                    tôra studio
                  </h1>
                </a>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex flex-1 justify-center">
                <ul className="flex items-center space-x-6">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-300 relative group py-2"
                      >
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Social icons */}
              <div className="hidden xl:flex items-center space-x-3">
                <a
                  href="https://www.instagram.com/torastudio.vn/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-orange-600 transition-all duration-300 hover:scale-110"
                >
                  <img src="/logo/icon_ig.svg" alt="Instagram" className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com/torastudiovn/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-orange-600 transition-all duration-300 hover:scale-110"
                >
                  <img src="/logo/icon_fb1.svg" alt="Facebook" className="h-4 w-4" />
                </a>
              </div>

              {/* Mobile center logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2 xl:hidden">
                <a href="/">
                  <h1 className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors duration-300">
                    tôra studio
                  </h1>
                </a>
              </div>

              <div className="w-8 h-8 xl:hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu (unchanged) */}
      <div
        className={`slide-menu fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${slideMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setSlideMenuOpen(false)}
        />

        <div className="absolute left-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl" style={{ backgroundColor: 'white' }}>
          <div className="p-6">
            <button
              onClick={() => setSlideMenuOpen(false)}
              className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
              aria-label="Close menu"
            >
              <img src="/logo/close_black.svg" alt="close" className="h-5 w-5" />
            </button>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">tôra studio</h2>
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setSlideMenuOpen(false)}
                      className="block text-lg font-medium text-gray-700 hover:text-orange-600 py-3 px-4 rounded-lg hover:bg-orange-50 transition-all duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.instagram.com/torastudio.vn/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors duration-300"
                  >
                    <img src="/logo/icon_ig.svg" alt="Instagram" className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com/torastudiovn/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors duration-300"
                  >
                    <img src="/logo/icon_fb1.svg" alt="Facebook" className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
