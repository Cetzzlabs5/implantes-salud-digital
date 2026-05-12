import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { CLINIC_DATA } from '../lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Especialidades', href: '#especialidades' },
  { name: 'Tecnología', href: '#tecnologia' },
  { name: 'Testimonios', href: '#testimonios' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50'
          : 'bg-white/50 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <span 
              className="text-2xl font-extrabold tracking-tight transition-colors" 
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="text-gray-900">Implantes Salud </span>
              <span style={{ color: 'hsl(var(--primary))' }}>Digital</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href={CLINIC_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 hover:shadow-md transition-all duration-200 gap-2"
              style={{ backgroundColor: 'hsl(var(--primary))', fontFamily: "'Inter', sans-serif" }}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Agenda tu Consulta</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-600 hover:text-gray-900 py-2 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={CLINIC_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-colors gap-2 mt-2"
                style={{ backgroundColor: 'hsl(var(--primary))', fontFamily: "'Inter', sans-serif" }}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Agenda tu Consulta</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
