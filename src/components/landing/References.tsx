/** 
 * References.tsx
 * Testimonials (referencie) s karuselom pomocou embla-carousel-react.
 * - Upravené: zobrazenie 1 karty na všetkých šírkach, centrálne zarovnanie.
 * - Aktívna karta je jemne podfarbená a má decentné zvýraznenie (ring/border).
 * - Autoplay predĺžený na 9 sekúnd pre pohodlnejšie čítanie.
 * - Zachované id="referencie" kvôli prekliku z pätičky.
 */

import React from 'react'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * TestimonialItem
 * Položka referencie so štruktúrou: titulok, citácia a autor/rola.
 */
interface TestimonialItem {
  /** Krátky titulok referencie (napr. „Komplexná starostlivosť“). */
  title: string
  /** Citácia klienta. */
  quote: string
  /** Autor alebo rola (ak sa meno neuvádza). */
  author: string
}

/**
 * TestimonialCard
 * Jedna referencia – zvýraznený titulok, citácia a autor/rola.
 * @param isActive - či je snímka aktuálne zvolená (aplikuje jemné podfarbenie).
 */
function TestimonialCard({ item, isActive = false }: { item: TestimonialItem; isActive?: boolean }) {
  return (
    <article
      className={[
        'h-full rounded-xl p-6 transition-shadow border',
        isActive
          ? 'bg-emerald-50 border-emerald-100 shadow-md ring-1 ring-emerald-100'
          : 'bg-white border-gray-100 shadow-sm hover:shadow-md',
      ].join(' ')}
    >
      <h3 className="text-lg font-semibold text-emerald-700 mb-3">{item.title}</h3>
      <p className="text-gray-800 italic mb-4">„{item.quote}“</p>
      <div className="text-sm text-gray-600">
        — <span className="font-medium text-gray-900">{item.author}</span>
      </div>
    </article>
  )
}

/**
 * CarouselDots
 * Bodky reprezentujúce počet snímok a aktuálne zvolenú snímku.
 */
function CarouselDots({
  count,
  selectedIndex,
  onSelect,
}: {
  count: number
  selectedIndex: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Prejsť na snímku ${i + 1}`}
          aria-current={selectedIndex === i}
          className={`h-2.5 w-2.5 rounded-full transition-all ${
            selectedIndex === i ? 'bg-emerald-600 w-5' : 'bg-gray-300 hover:bg-gray-400'
          }`}
        />
      ))}
    </div>
  )
}

/**
 * TestimonialsCarousel
 * Karusel pre referencie: 1 centrálna karta, autoplay (9s), drag, šípky a bodky.
 */
function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [snapCount, setSnapCount] = React.useState(0)
  const timerRef = React.useRef<number | null>(null)

  /**
   * play
   * Spustí auto-prehrávanie (posúva na ďalší slide každých 9s).
   */
  const play = React.useCallback(() => {
    if (!emblaApi) return
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      if (document.hidden) return
      emblaApi.scrollNext()
    }, 9000)
  }, [emblaApi])

  /**
   * pause
   * Zastaví auto-prehrávanie.
   */
  const pause = React.useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  /**
   * onSelect
   * Aktualizuje index aktuálnej snímky (pre zvýraznenie aktívnej karty).
   */
  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    // Inicializácia bodiek + selected index
    setSnapCount(emblaApi.scrollSnapList().length)
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)

    // Autoplay
    play()
    return () => {
      pause()
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect, play, pause])

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = React.useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <div className="relative" onMouseEnter={pause} onMouseLeave={play}>
      {/* Gradientové náznaky po stranách (scroll hint) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent"
        aria-hidden
      />

      {/* Viewport */}
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="flex gap-6">
          {items.map((item, idx) => (
            <div key={item.title} className="min-w-0 flex-[0_0_100%]">
              <div className="max-w-2xl mx-auto">
                <TestimonialCard item={item} isActive={selectedIndex === idx} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ovládacie prvky */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Predchádzajúce svedectvo"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-gray-700 hover:bg-gray-50 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Nasledujúce svedectvo"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-gray-700 hover:bg-gray-50 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <CarouselDots count={snapCount} selectedIndex={selectedIndex} onSelect={scrollTo} />
      </div>
    </div>
  )
}

/**
 * References
 * Sekcia so štyrmi referenciami a karuselom (1 karta naraz, centrálne).
 */
export function References() {
  const items: TestimonialItem[] = [
    {
      title: 'Komplexná starostlivosť',
      quote:
        'Počas konzultácie s Karlom v našej firme sme sa dostali aj k téme môjho rodinného domu, ktorý bol ešte vo fáze hrubej stavby. Vďaka jeho cenným radám som odstránil množstvo chýb a vyhol sa dodatočným úpravám. Pomohol mi nielen s optimálnou fotovoltikou a nabíjaním nového ženinho elektromobilu, ale aj so zdieľaním prebytkov elektriny s domovom mojich rodičov. Navyše mi poradil aj v oblasti energetickej bezpečnosti a tak mám teraz dom nie len úsporný ale aj bezpečný.',
      author: 'COO spoločnosti a majiteľ novostavby',
    },
    {
      title: 'Poriadok v energiách',
      quote:
        'Ako obce sme mali viacero rôznych odberných miest u rôznych dodávateľov energií z minulosti s rôznymi cenami, čo spôsobilo zbytočný chaos a náklady. Pán Dlugoš nám pomohol všetko zjednotiť pod jedným dodávateľom, optimalizovať a zjednotiť zmluvné podmienky. Vďaka tomu sme získali prehľad v našich energiách. Keď sme neskôr doplnili verejné osvetlenie, tieto EIC kódy sme pridali praktický okamžite do zmluvy s aktuálnym dodávateľom.',
      author: 'Starostka',
    },
    {
      title: 'Optimalizácia, ktorá šetrí tisíce',
      quote:
        'Naše sezónne výkyvy v spotrebe elektriny nám spôsobovali pokuty za nedodržanie účinníka a ďalšie distribučné poplatky. Pán Dlugoš nám pomohol optimalizovať nastavenia, vďaka čomu sme ročne už neplatili pokutu viac ako 3200 eur. Navyše nás upozornil na riziká spojené s nedočerpaním odberu, čo nám pomohlo znížiť ďalší zbytočný náklad ktorý vieme použiť na rozvoj podniku.',
      author: 'Manažérka poľnohospodárskeho podniku',
    },
    {
      title: 'Bez zbytočných nákladov',
      quote:
        'Pôvodne sme mali cenové ponuky na fotovoltiku, kde sme mali omnoho vyššie výkony, než by sme dokázali využiť. Karel nám pomohol znížiť investíciu a nastaviť systém tak, aby sme ho využívali efektívne bez nutnosti prebytkov. Vyrobenú elektrinu počas víkendov a sviatkov, kedy sa nepracuje predávame zatiaľ dodávateľovi. Vďaka tomu sme ušetrili nemalé prostriedky.',
      author: 'Majiteľ rodinnej firmy',
    },
  ]

  return (
    <section id="referencie" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Referencie</h2>
          <p className="text-xl text-gray-600">Klientov o prístupe a spolupráci so mnou.</p>
        </div>

        <TestimonialsCarousel items={items} />
      </div>
    </section>
  )
}

export default References
