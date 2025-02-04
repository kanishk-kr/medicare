// components/Navbar.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu, ChevronDown, Building2, User, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [showGetStartedOptions, setShowGetStartedOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = [
    { name: 'Home', href: '/' },
    { 
      name: 'Features', 
      href: '#features',
      subLinks: [
        { name: 'Bed Tracking', href: '/features/beds' },
        { name: 'Doctor Search', href: '/features/doctors' },
        { name: 'Emergency Services', href: '/features/emergency' },
      ]
    },
    { name: 'Hospitals', href: '/hospitals' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowGetStartedOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav 
      className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HealthConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map((link) => (
                <div 
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.subLinks && setIsFeaturesOpen(true)}
                  onMouseLeave={() => link.subLinks && setIsFeaturesOpen(false)}
                >
                  <Link 
                    href={link.href}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {link.subLinks && (
                    <AnimatePresence>
                      {isFeaturesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100"
                        >
                          <div className="p-2 space-y-2">
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.name}
                                href={subLink.href}
                                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                              >
                                {subLink.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 ml-6" ref={dropdownRef}>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowGetStartedOptions(!showGetStartedOptions)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  Get Started
                  <ChevronDown className={`w-4 h-4 transition-transform ${showGetStartedOptions ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showGetStartedOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100"
                    >
                      <div className="p-2 space-y-2">
                        <Link
                          href="/auth/hospital/register"
                          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setShowGetStartedOptions(false)}
                        >
                          <Building2 className="w-5 h-5 text-purple-600" />
                          <span>Register Hospital</span>
                        </Link>
                        <Link
                          href="/auth/patient/login"
                          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setShowGetStartedOptions(false)}
                        >
                          <User className="w-5 h-5 text-blue-600" />
                          <span>Patient Login</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-500 hover:text-blue-600 rounded-lg"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 space-y-4">
                {links.map((link) => (
                  <div key={link.name} className="px-4">
                    <Link
                      href={link.href}
                      className="block py-2 text-gray-600 hover:text-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.subLinks?.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={subLink.href}
                        className="block py-2 pl-6 text-gray-500 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="px-4 pt-4 border-t border-gray-100 space-y-2">
                  <Link
                    href="/register-hospital"
                    className="block w-full text-center py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Register Hospital
                  </Link>
                  <Link
                    href="/patient-login"
                    className="block w-full text-center py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Patient Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}