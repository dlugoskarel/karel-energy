/**
 * Footer.tsx
 * Simple bottom bar with brand logo and quick in-page navigation.
 * Update: Uses smartNavigateToId to work both on Home and Blog routes (HashRouter compatible).
 */

import React from 'react'
import { smartNavigateToId } from '../../lib/scroll'

/**
 * FooterLink
 * Small link that smart-navigates to a section, even across routes.
 */
function FooterLink({ label, targetId }: { label: string; targetId: string }) {
  return (
    <button
      onClick={() => smartNavigateToId(targetId)}
      className="text-sm text-gray-600 hover:text-green-700 transition-colors"
      aria-label={label}
    >
      {label}
    </button>
  )
}

/**
 * Footer
 * Bottom navigation and branding for the site.
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/3d45df58-8100-4fab-8476-81563a44392f.png"
              alt="KAREL:ENERGY® logo"
              className="h-8 w-auto select-none"
              loading="lazy"
            />
          </div>

          {/* Quick nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <FooterLink label="Domov" targetId="domov" />
            <FooterLink label="Služby" targetId="sluzby" />
            <FooterLink label="Referencie" targetId="referencie" />
            {/* Blog nechávame ako externý odkaz na /blog, ale v spodnej lište je žiadané aj "sfunkčniť".
                Môžete doplniť ešte tlačidlo s Link na /blog, no zvyšné smerujú na sekcie domovskej stránky. */}
            <a
              href="#/blog"
              className="text-sm text-gray-600 hover:text-green-700 transition-colors"
              aria-label="Blog – interná stránka"
            >
              Blog
            </a>
            <FooterLink label="Kontakt" targetId="kontakt" />
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center sm:text-right">
            © 2025 karel.energy ® – Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  )
}
