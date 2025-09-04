/** 
 * SectionBridgeCTA.tsx
 * CTA section bridging Services and the next block.
 * Updates:
 * - Headline text adjusted (single-line, refined wording).
 * - CTA button centered horizontally to improve visual balance.
 * - Warm orange palette kept to match the photo.
 */

import React from 'react'
import { Phone } from 'lucide-react'
import { smoothScrollToId } from '../../lib/scroll'

/**
 * SectionBridgeCTA
 * Visually appealing banner with a CTA that smooth-scrolls to the Contact section.
 */
export default function SectionBridgeCTA() {
  return (
    <section aria-label="Premostenie ku kontaktu" className="relative py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Text block */}
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Nie je až tak dôležité, odkiaľ energia prichádza, ale koľko zaplatíte.
              </h3>

              {/* Centered CTA */}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => smoothScrollToId('kontakt')}
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-white font-semibold shadow-sm hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
                  aria-label="Chcem platiť menej"
                >
                  <Phone className="h-5 w-5" aria-hidden />
                  Chcem platiť menej
                </button>
              </div>
            </div>

            {/* Image block */}
            <div className="relative">
              <div className="absolute inset-0">
                {/* Real image or smart placeholder allowed */}
                <img src="https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/6c130b15-3ded-45e9-83b0-4f05df3f307b.png" className="object-cover h-full w-full" />
              </div>
              {/* Orange-tinted overlay for better harmony with the photo and text legibility */}
              <div className="absolute inset-0 bg-orange-900/15 mix-blend-multiply" aria-hidden />
              {/* Aspect spacer for small screens */}
              <div className="md:hidden h-44" aria-hidden />
              <div className="hidden md:block" aria-hidden>
                <span className="sr-only">Ilustračný obrázok – mestská scenéria</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
