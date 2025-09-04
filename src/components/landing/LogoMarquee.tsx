/**
 * LogoMarquee.tsx
 * Nekonečný plynulý pás s logami partnerov podľa presne dodaného poradia (10 ks).
 * - Bez externých závislostí; vlastné keyframes.
 * - Prístupné alt/aria, hover zvýraznenie, pauza animácie pri hoveri.
 */

import React from 'react'

/**
 * Logo
 * Reprezentuje položku s názvom a URL obrázka.
 */
interface Logo {
  /** Názov pre alt/aria */
  name: string
  /** URL obrázka */
  src: string
}

/**
 * LogoMarqueeProps
 * Prispôsobenie vzhľadu/animácie.
 */
interface LogoMarqueeProps {
  /** Extra class pre wrapper */
  className?: string
  /** Rýchlosť animácie */
  speed?: 'slow' | 'normal' | 'fast'
}

/**
 * LogoMarquee
 * Zobrazuje plynulú slučku log (zoznam je duplikovaný pre bezšvový scroll).
 */
export default function LogoMarquee({ className = '', speed = 'normal' }: LogoMarqueeProps) {
  // Mapovanie rýchlosti (kratšie = rýchlejšie)
  const duration = {
    slow: '55s',
    normal: '35s',
    fast: '22s',
  }[speed]

  // Presne dodané logá (10 ks) v poradí z poslednej správy.
  const logos: Logo[] = [
    {
      name: 'SPP',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/b7d22647-dd2f-4946-82f4-1d1f03d93eea.png',
    },
    {
      // Pozn.: v podkladoch je "UKE"; ak máš inú finálnu verziu, pošli URL a hneď vymením.
      name: 'UKE',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/3d6a3bac-f110-4efb-a3a8-67240fc30fdf.png',
    },
    {
      name: 'ZSE',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/d749a6a2-bab5-46b8-a17f-39927ac8e312.png',
    },
    {
      name: 'VSD',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/1530160f-8187-47b2-913f-58d55fa56291.png',
    },
    {
      name: 'greenlooy',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/8ad33edc-71a1-4450-85ab-1caa80ff224d.png',
    },
    {
      name: 'Stredoslovenská distribučná',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/bf1b8685-9a34-4ca5-a9c3-c45b4a24f79e.png',
    },
    {
      name: 'MVM CEEnergy Slovakia',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/ad611c9f-0eeb-414d-8c79-60e7c523046c.png',
    },
    {
      name: 'SSE',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/1ef5aaa0-425c-4d33-a7b3-d0034198bdf6.png',
    },
    {
      name: 'SIEA',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/139b8fa2-c228-463d-894f-8fe33d035bbf.png',
    },
    {
      name: 'ÚRSO',
      src: 'https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/88e6e970-ef73-4a8a-8542-0a6a49407f81.png',
    },
  ]

  // Duplikácia pre bezšvový loop.
  const loop = [...logos, ...logos]

  return (
    <section
      className={`relative w-full overflow-hidden bg-white border-y border-gray-100 ${className}`}
      aria-label="Partner and institution logos"
    >
      {/* Bočné gradienty pre jemný prechod */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />

      <div className="group flex items-center">
        <div
          className="flex min-w-max items-center gap-14 py-6 [animation-play-state:running] group-hover:[animation-play-state:paused]"
          style={{
            animation: `logo-marquee ${duration} linear infinite`,
          }}
        >
          {loop.map((item, i) => (
            <div key={`${item.name}-${i}`} className="flex items-center justify-center">
              <img
                src={item.src}
                alt={`${item.name} logo`}
                aria-label={item.name}
                className="h-10 w-auto object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Globálne keyframes */}
      <style>
        {`
          @keyframes logo-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  )
}
