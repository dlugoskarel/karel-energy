/** 
 * Header.tsx
 * Glass-style sticky navigation with brand logo, in-page nav, and quick contact.
 * - Icons for phone and email are stacked vertically above the values (no divider).
 * - Uses smartNavigateToId to work both on Home and Blog routes (HashRouter compatible).
 */

import React from 'react'
import { Phone, Mail } from 'lucide-react'
import { smartNavigateToId } from '../../lib/scroll'
import { Link } from 'react-router'

/**
 * NavLink
 * A button-like anchor that smart-navigates to a target section, even across routes.
 */
function NavLink({ label, targetId }: { label: string; targetId: string }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        smartNavigateToId(targetId)
      }}
      className="text-gray-700 hover:text-green-700 transition-colors"
      aria-label={label}
    >
      {label}
    </a>
  )
}

/**
 * Header
 * Sticky header with brand logo, navigation, and phone + email contact.
 * Icons in the quick contacts are stacked vertically above the text values.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Brand logo - clickable to scroll to home */}
          <div className="flex items-center">
            <button
              onClick={() => smartNavigateToId('domov')}
              aria-label="Domov – KAREL:ENERGY"
              className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded-md"
            >
              <img
                src="https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/3d45df58-8100-4fab-8476-81563a44392f.png"
                alt="KAREL:ENERGY® logo"
                className="h-9 md:h-10 w-auto select-none"
              />
            </button>
          </div>

          {/* In-page navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink label="Domov" targetId="domov" />
            <NavLink label="Služby" targetId="sluzby" />
            <NavLink label="Referencie" targetId="referencie" />
            {/* Internal Blog page */}
            <Link
              to="/blog"
              aria-label="Blog – interná stránka"
              className="text-gray-700 hover:text-green-700 transition-colors"
            >
              Blog
            </Link>
            <NavLink label="Kontakt" targetId="kontakt" />
          </nav>

          {/* Quick contacts: phone + email with icons stacked vertically (no divider) */}
          <div className="flex items-center gap-6 md:gap-7">
            {/* Phone */}
            <a
              href="tel:+421422220001"
              aria-label="Zavolať na číslo 042 222 00 01"
              className="inline-flex flex-col items-center gap-1 text-sm font-medium text-gray-900 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded-md"
            >
              <Phone className="h-5 w-5 text-green-600" aria-hidden />
              <span className="leading-none">042 / 222 00 01</span>
            </a>

            {/* Email */}
            <a
              href="mailto:kontakt@karel.energy"
              aria-label="Napísať e‑mail na kontakt@karel.energy"
              className="inline-flex flex-col items-center gap-1 text-sm font-medium text-gray-900 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded-md"
            >
              <Mail className="h-5 w-5 text-green-600" aria-hidden />
              <span className="leading-none">kontakt@karel.energy</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
