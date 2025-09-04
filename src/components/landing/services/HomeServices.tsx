/** 
 * HomeServices.tsx
 * Služby pre domácnosti v rozbaľovacích kartách – konzistentné s firemnou sekciou.
 * - Controlled správanie: držíme ID otvorenej karty (presne 1 naraz).
 * - Reset: pri zmene `resetKey` sa všetko zavrie.
 */

import React, { useEffect, useState } from 'react'
import { Recycle, Sun } from 'lucide-react'
import ExpandableServiceCard from './ExpandableServiceCard'
import type { ServiceItem } from './types'

/**
 * HomeServices
 * Grid dvoch služieb určených pre domácnosti.
 */
export default function HomeServices({ resetKey = 0 }: { resetKey?: number }) {
  const services: ServiceItem[] = [
    {
      title: 'Riešenie na prebytky vyrobenej elektriny',
      description:
        'Podľa veľkosti a typu výrobného zdroja s ohľadom na spotrebu elektriny v danom objekte prípadne na iných odberných miestach a ďalších kritérií, návrh a výber najlepšieho aktuálne možného dostupného riešenia.',
      icon: <Recycle className="h-6 w-6" aria-hidden />,
    },
    {
      title: 'Vykurovanie, chladenie a fotovoltika',
      description:
        'Poradím a navrhnem podľa typu budovy, aktuálneho stavu a vašich preferencií na základe praxe tepelné čerpadlá, kotle, termostaty, kolektory, zásobníky na vodu, rekuperácie, fotovoltiku a klimatizácie. Po dohode vám pomôžem pri orientácií v cenových ponukách vašich dopytov a dopĺňaní informácií od prípadného zhotoviteľa.',
      icon: <Sun className="h-6 w-6" aria-hidden />,
    },
  ]

  /** ID aktuálne otvorenej karty (presne jedna alebo žiadna). */
  const [openId, setOpenId] = useState<string | null>(null)

  /** Reset pri zmene resetKey – všetky karty sa zavrú. */
  useEffect(() => {
    setOpenId(null)
  }, [resetKey])

  return (
    <div className="mt-8">
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <ExpandableServiceCard
            key={s.title}
            item={s}
            open={openId === s.title}
            onChangeOpen={(next) => setOpenId(next ? s.title : null)}
          />
        ))}
      </div>
    </div>
  )
}
