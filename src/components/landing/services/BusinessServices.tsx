/** 
 * BusinessServices.tsx
 * Zoznam služieb pre firemných zákazníkov v prehľadných rozbaľovacích kartách.
 * - Controlled správanie: držíme ID otvorenej karty (presne 1 naraz).
 * - Reset: pri zmene `resetKey` sa všetko zavrie.
 */

import React, { useEffect, useState } from 'react'
import { Zap, SlidersHorizontal, Recycle, Sun, BadgeCheck, FileText } from 'lucide-react'
import ExpandableServiceCard from './ExpandableServiceCard'
import type { ServiceItem } from './types'

/** Props pre BusinessServices – umožní resetovať otvorené karty zvonka. */
export default function BusinessServices({ resetKey = 0 }: { resetKey?: number }) {
  const services: ServiceItem[] = [
    {
      title: 'Najnižšia cena elektriny a plynu',
      description:
        'Výberom z viacerých kredibilných dodávateľov energií s fixnou alebo spotovou cenou či ich kombináciou pre všetky typy a veľkosti odberov a druhom viazanosti.',
      icon: <Zap className="h-6 w-6" aria-hidden />,
    },
    {
      title: 'Správne nastavenie distribučných parametrov',
      description:
        'Analýza taríf, ističov, MRK a jalového odberu za minimálne jeden kalendárny rok, resp. minimálne 12 vyúčtovacích faktúr s vyhodnotením jednotlivých distribučných položiek a určením správnych hodnôt s administratívou.',
      icon: <SlidersHorizontal className="h-6 w-6" aria-hidden />,
    },
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
    {
      title: 'ESG, BREEM, LEED, účelový a energetický audit',
      description:
        'So špecializovanými odborníkmi vypracujeme ESG, BREEM, LEED a energetický audit podľa zákona č. 321/2014 o energetickej efektívnosti. Pomôžeme získať dotácie na fotovoltiku a teplené čerpadlá s nárokom na podporu podľa aktuálnej výzvy.',
      icon: <BadgeCheck className="h-6 w-6" aria-hidden />,
    },
    {
      title: 'Energetický posudok',
      description:
        'Slúži na interné posúdenie aktuálneho stavu, podľa vašej definície rozsahu. Je prispôsobený vašim potrebám v ľudskej reči s ohľadom na aktuálny stav a budúci vývoj.',
      icon: <FileText className="h-6 w-6" aria-hidden />,
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
