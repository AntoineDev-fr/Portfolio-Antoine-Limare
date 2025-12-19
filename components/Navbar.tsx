'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Container } from './Container';

const links = [
  { href: '#apropos', label: 'À propos' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 backdrop-blur-xl transition-all',
        scrolled ? 'bg-dark/70 border-b border-white/10' : 'bg-transparent',
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="#" className="font-semibold text-white tracking-tight flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-primary font-bold">AL</span>
          <div className="leading-tight">
            <span className="block text-sm text-white/60">Portfolio</span>
            <span className="block text-base">Antoine Limare</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2 text-sm text-white/70">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:text-white hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            aria-label="GitHub"
            href="https://github.com/AntoineDev-fr"
            className="hidden rounded-full border border-white/10 p-2 text-white/80 transition hover:border-primary hover:text-primary md:inline-flex"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/antoine-limare-17aab62ab/"
            className="hidden rounded-full border border-white/10 p-2 text-white/80 transition hover:border-primary hover:text-primary md:inline-flex"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <div className="hidden sm:inline-flex">
            <Button href="#contact" variant="primary" className="text-xs px-4 py-2">
              Me contacter
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
