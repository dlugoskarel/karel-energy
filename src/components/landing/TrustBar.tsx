/** 
 * TrustBar.tsx
 * Pás sociálneho dôkazu bez "bublín" – čisté ikony s textom a pravidelnými rozostupmi.
 * Účel: byť vizuálne bližšie k hero obrázku a vytvoriť väčšiu medzeru pred logami (marquee).
 */

import React from 'react'
import { ShieldCheck, Users, Compass, Handshake } from 'lucide-react'
import LogoMarquee from './LogoMarquee'

/**
 * TrustItem
 * Položka so štítkom a ikonou (každá ikona má vlastnú farbu).
 */
interface TrustItem {
  label: string
  icon: React.ReactNode
}

/**
 * TrustRowItem
 * Jedna vodorovná položka: farebná ikona + text s vyváženými rozostupmi.
 */
function TrustRowItem({ icon, label }: TrustItem) {
  return (
    <li className="flex items-center gap-2.5">
      <span aria-hidden className="inline-flex items-center justify-center">
        {icon}
      </span>
      <span className="text-sm md:text-base text-gray-900 font-medium">{label}</span>
    </li>
  )
}

/**
 * TrustBar
 * Sekcia "dôvody prečo my" – 4 pravidelne rozmiestnené položky nad tickerom s logami.
 * - Mobile: položky pod sebou (1 stĺpec).
 * - Desktop (md+): 4 stĺpce.
 */
export default function TrustBar() {
  const items: TrustItem[] = [
    {
      label: 'Certifikovaný audítor',
      icon: <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-green-600" />,
    },
    {
      label: '500+ spokojných klientov',
      icon: <Users className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />,
    },
    {
      label: 'Nezávislé poradenstvo',
      icon: <Compass className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />,
    },
    {
      label: 'Overené zdroje',
      icon: <Handshake className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />,
    },
  ]

  return (
    <section
      id="dovody-preco-my"
      aria-label="Dôveryhodnosť a skúsenosti"
      className="
        relative
        -mt-4 sm:-mt-6
        md:-mt-12 lg:-mt-14
        bg-transparent
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mriežka: mobile = 1 stĺpec (stack), md+ = 4 stĺpce */}
        <ul
          className="
            grid grid-cols-1 md:grid-cols-4
            gap-x-6 sm:gap-x-8 md:gap-x-10
            gap-y-3 sm:gap-y-4
            justify-items-start md:justify-items-center
            mb-8 sm:mb-10 md:mb-12
          "
        >
          {items.map((it) => (
            <TrustRowItem key={it.label} icon={it.icon} label={it.label} />
          ))}
        </ul>

        {/* Logá – nekonečný ticker pod položkami */}
        <LogoMarquee />
      </div>
    </section>
  )
}
