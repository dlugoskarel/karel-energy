/**
 * CTASection.tsx
 * Purpose: This component previously rendered an amber gradient CTA banner
 * with the text: "Chcete nižšie účty alebo máte otázky ?" and a button
 * "Naplánujte si hovor →". It has been removed as requested.
 *
 * Implementation note:
 * - We return null to safely remove the UI while keeping the import stable
 *   wherever CTASection was used (e.g., on the Home page).
 */

import React from 'react'

/**
 * CTASection
 * Returns null to omit the banner from rendering.
 */
export default function CTASection(): null {
  return null
}
