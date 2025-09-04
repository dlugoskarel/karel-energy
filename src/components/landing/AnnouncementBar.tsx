/**
 * AnnouncementBar.tsx
 * Žltý (amber) top promo bar so stručným odkazom a CTA vedúcou na kontakt.
 * Úprava: plná žltá farba (bez gradientu) + jemný pulse efekt za tlačidlom pre nenásilné zvýraznenie.
 * Update: CTA používa smartNavigateToId, aby fungovala aj z blogu.
 */

import React from 'react'
import { smartNavigateToId } from '../../lib/scroll'

/**
 * AnnouncementBar
 * Subtle, yet visible top bar – zladený so žltou (amber) témou a plynulým skrolovaním.
 */
export default function AnnouncementBar() {
  return (
    <div className="bg-amber-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between text-sm">
        <span className="font-medium">
          Chcete nižšie účty za energie alebo máte otázky ?
        </span>

        {/* CTA s jemným pulzom – žiara za tlačidlom, nie na celom bare */}
        <div className="relative inline-block">
          {/* Pulzujúca žiara (nenápadná, pod tlačidlom) */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-1 rounded-lg bg-amber-300/40 blur-sm animate-pulse"
          />
          <button
            onClick={() => smartNavigateToId('kontakt')}
            className="relative z-10 inline-flex items-center rounded-md bg-white text-gray-900 hover:bg-gray-100 transition-colors px-3 py-1.5 font-medium shadow-sm ring-1 ring-white/70"
            aria-label="Naplánujte si hovor"
          >
            Naplánujte si hovor →
          </button>
        </div>
      </div>
    </div>
  )
}
