/** 
 * Hero.tsx
 * Primárna hero sekcia – ľavý textový blok s nadpisom a CTA, pravý vizuál so štatistikami.
 * Update: Nadpis držaný v JEDNOM riadku na desktopoch (md+) a vyčistené zbytočné medzery v texte.
 */

import React from 'react'
import { CheckCircle, MapPin } from 'lucide-react'
import { smoothScrollToId } from '../../lib/scroll'

/**
 * FeatureItem
 * Jednoriadkový benefit s oranžovou ikonou a textom.
 */
function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-3">
      <CheckCircle className="h-6 w-6 text-orange-500" aria-hidden />
      <span className="text-orange-600">{children}</span>
    </div>
  )
}

/**
 * StatRight
 * Pravostranné textové štatistiky; sú súčasťou vizuálnej kolóny.
 */
function StatRight({
  value,
  label,
  className,
}: {
  value: string
  label: string
  /** Dodatočné triedy pre jemné posuny medzi riadkami. */
  className?: string
}) {
  return (
    <div className={`text-left select-none ${className ?? ''}`}>
      <div className="text-xl font-bold text-orange-600">{value}</div>
      <div className="text-sm text-gray-800">{label}</div>
    </div>
  )
}

/**
 * Hero
 * Čisté biele pozadie, typografia s dôrazom na čitateľnosť a CTA.
 * Zarovnanie: nadpis je vertikálne zarovnaný s „11+” napravo vďaka jemnému posunu.
 */
export function Hero() {
  return (
    <section id="domov" className="relative overflow-hidden bg-white">
      <div className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Ľavá kolóna – text */}
            <div className="flex flex-col">
              {/* Nadpis – v jednom riadku na md+ a vizuálne zdvihnutý na úroveň „11+” */}
              <h1
                className="
                  font-bold text-gray-900 leading-tight tracking-tight
                  md:whitespace-nowrap
                  text-[clamp(26px,5.8vw,46px)]
                  -mt-1
                  md:-translate-y-2 lg:-translate-y-3 xl:-translate-y-4
                "
              >
                Ušetríte až{' '}
                <span className="text-orange-600 underline decoration-orange-500 decoration-4 underline-offset-4">
                  35 %
                </span>{' '}
                na energiách !
              </h1>

              {/* Stredný obsah – rovnomerne rozložený smerom dole až k CTA bloku */}
              <div
                className="
                  mt-5 md:mt-6
                  flex flex-col
                  gap-5 md:gap-6 xl:gap-7
                "
              >
                {/* Textové odseky */}
                <div className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  <span className="block">
                    Pre väčšinu ľudí je svet energií zbytočne komplikovaný.
                  </span>
                  <span className="block md:whitespace-nowrap">
                    Moja práca = vaše nižšie účty za energie.
                  </span>
                  <span className="block">
                    Preto hľadám riešenia, ktoré sú jasné a ekonomicky výhodné.
                  </span>
                </div>

                {/* Podpis */}
                <p className="text-base text-gray-800 font-medium">
                  Karel Dlugoš - nezávislý energetik, audítor a konzultant.
                </p>
                {/* Informácia o pôsobnosti */}
                <div className="mt-2 inline-flex items-center gap-2 text-base text-gray-800">
                  <MapPin className="h-5 w-5 text-black" aria-hidden />
                  <span>Pôsobím na celkom Slovensku - osobne aj online</span>
                </div>

                {/* Benefity – rovnomerný rytmus v stĺpci */}
                <div className="space-y-5">
                  <FeatureItem>všetko na jednom mieste</FeatureItem>
                  <FeatureItem>jednoducho a zrozumiteľne</FeatureItem>
                  <FeatureItem>odborne so skúsenosťami</FeatureItem>
                </div>
              </div>

              {/* CTA: ponechané na pôvodnom mieste pod obsahom */}
              <div className="mt-8">
                <button
                  onClick={() => smoothScrollToId('kontakt')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-green-700 transition-colors shadow-lg"
                  aria-describedby="cta-capacity-note"
                >
                  Chcem ušetriť
                </button>
                {/* Doplňujúca poznámka pod CTA – ešte menšia a s väčšou medzerou */}
{/* cta capacity note removed */}
              </div>
            </div>

            {/* Pravá kolóna – vizuál + štatistiky */}
            <div className="relative">
              {/* Kontajner obrázka: znížená výška cez aspect-ratio, bez tieňa */}
              <div
                className="
                  relative w-full
                  aspect-[4/5] sm:aspect-[4/4.8] md:aspect-[4/4.6] lg:aspect-[4/4.4] xl:aspect-[4/4.2]
                  max-h-[440px] sm:max-h-[480px] md:max-h-[520px] lg:max-h-[560px] xl:max-h-[600px]
                "
              >
                <img
                  src="https://pub-cdn.sider.ai/u/U0AWH6E9A4X/web-coder/68b87a397b28bae4985adee4/resource/f49fd6a1-449c-4b47-922a-29a47ed8b439.png"
                  className="w-full h-full object-contain object-center select-none"
                  alt="Karel Dlugoš - energetický konzultant"
                  /* Mäkké okraje bez tieňa */
                  style={{
                    maskImage:
                      'radial-gradient(ellipse 130% 120% at 50% 50%, black 72%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 130% 120% at 50% 50%, black 72%, rgba(0,0,0,0) 100%)',
                    filter: 'none',
                  }}
                />

                {/* Štatistiky: držané hore, aby bol prvý riadok „11+” referenčným bodom */}
                <div className="absolute inset-x-0 top-2 sm:top-3 md:top-4 lg:top-5 px-0">
                  <div className="flex flex-col items-end gap-3 sm:gap-4 pr-0">
                    <StatRight value="11 +" label="Rokov skúseností" />
                    <StatRight value="4 300 +" label="Hodín konzultácií" />
                  </div>
                </div>
              </div>
            </div>
            {/* /Pravá kolóna */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
