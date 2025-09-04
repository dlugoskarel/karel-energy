/** 
 * Services.tsx
 * Sekcia "Moje služby" s výberom cieľovej skupiny a adaptívnym správaním pre mobil.
 * - Mobil: po výbere sa druhá voľba presunie POD rozbalené služby.
 * - Desktop: ostáva pôvodná mriežka 2 stĺpcov, obsah pod ňou.
 * - Toggle správanie: opätovné kliknutie na vybranú voľbu zruší výber (návrat do defaultu).
 * - NOVÉ: Presne 1 otvorená karta naraz. Pri odchode zo sekcie sa všetko automaticky zavrie (IntersectionObserver).
 */

import React, { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { Building2, Home as HomeIcon, CheckCircle2 } from 'lucide-react'
import BusinessServices from './services/BusinessServices'
import HomeServices from './services/HomeServices'

/**
 * OptionCard
 * Prístupné tlačidlo v štýle karty (toggle). Klik opäť na vybranú voľbu výber zruší.
 */
function OptionCard({
  icon,
  label,
  description,
  selected,
  onSelect,
}: {
  icon: React.ReactNode
  label: string
  description: string
  selected: boolean
  onSelect: () => void
}) {
  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <button
      type="button"
      role="button"
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={handleKey}
      className={[
        'group relative w-full rounded-xl border transition-all p-5 sm:p-6 text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600',
        selected
          ? 'border-green-600 ring-2 ring-green-600 bg-green-50/70'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
      ].join(' ')}
    >
      {/* Selected check mark */}
      <span
        className={[
          'absolute right-3 top-3 inline-flex items-center gap-1 text-sm font-medium',
          selected ? 'text-green-700' : 'text-transparent',
        ].join(' ')}
        aria-hidden
      >
        <CheckCircle2 className="h-5 w-5" />
      </span>

      <div className="flex items-center gap-4">
        <div
          className={[
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
            // Oranžové pozadie + oranžová farba ikon
            'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700',
            'group-hover:from-orange-200 group-hover:to-orange-300',
          ].join(' ')}
          aria-hidden
        >
          {icon}
        </div>
        {/* Explicitne zarovnáme text naľavo, nech nezdedí text-center z rodiča */}
        <div className="text-left">
          <h3 className="text-xl font-semibold text-gray-900">{label}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  )
}

/**
 * PlaceholderList
 * Dočasné vizuálne miesto pre budúci obsah, kým nie je zvolený segment.
 */
function PlaceholderList({ title }: { title: string }) {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h4 className="text-lg font-semibold text-gray-900">{title} – pripravujeme</h4>
      <p className="mt-1 text-sm text-gray-600">
        Pošlite mi, prosím, zoznam služieb. Po doplnení sa zobrazia priamo tu.
      </p>

      {/* Skeleton-like items */}
      <div className="mt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-green-600" aria-hidden />
            <div className="h-3 w-full max-w-sm animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * EmptyPrompt
 * Zobrazuje sa pred výberom segmentu.
 * Doplnili sme druhý riadok so správou pre organizácie a verejnú správu.
 */
function EmptyPrompt() {
  return (
    <div className="mt-8 text-center text-gray-600">
      <p>Vyberte, pre koho hľadáte riešenia.</p>
      <p className="mt-2 text-sm text-gray-500">
        Pre organizácie a verejnú správu zabezpečím viaceré cenové ponuky tak, aby ste dodržali
        všetky platné legislatívne rámce.
      </p>
    </div>
  )
}

/**
 * Services
 * Sekcia s hlavičkou a selektorom cieľovej skupiny.
 * - Mobil: po výbere sa druhá voľba presúva POD obsah.
 * - Desktop: pôvodná mriežka s obsahom pod ňou.
 * - NOVÉ: sledujeme viditeľnosť sekcie a pri odchode zavrieme všetky otvorené karty.
 */
export default function Services() {
  const [audience, setAudience] = useState<'business' | 'home' | null>(null)

  /** Kľúč, ktorého zmena vyvolá reset otvorených kariet v podsekciách. */
  const [resetKey, setResetKey] = useState(0)

  /** Ref na koreňovú sekciu kvôli IntersectionObserveru. */
  const sectionRef = useRef<HTMLElement | null>(null)

  /** Toggle výberu: opätovné kliknutie na zvolenú možnosť vráti null a resetuje otvorené karty. */
  const toggleAudience = (key: 'business' | 'home') => {
    setAudience((prev) => {
      const next = prev === key ? null : key
      // Pri každej zmene publika resetujeme otvorené karty
      setResetKey((v) => v + 1)
      return next
    })
  }

  /** 
   * Sledujeme, či je sekcia "Moje služby" v zornom poli.
   * Keď prestane byť videná (odídeme na iné sekcie), zavrieme všetky otvorené karty.
   */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let lastIntersecting = true
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (!entry.isIntersecting && lastIntersecting) {
          // Práve sme odišli zo sekcie -> resetni otvorené karty
          setResetKey((v) => v + 1)
        }
        lastIntersecting = entry.isIntersecting
      },
      {
        root: null,
        threshold: 0.2, // ak je menej než ~20% sekcie viditeľných, berieme to ako "odišiel"
      }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="sluzby" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Moje služby</h2>
          <div className="max-w-3xl mx-auto text-gray-700 space-y-3">
            <p className="text-lg">
              Či ide o výrobný závod, segment HORECA, malú prevádzku, STK, družstvo, developerský
              projekt, panelák alebo rodinný dom - vždy hodnotím všetky súvisiace oblasti
              komplexne, zodpovedne a s ohľadom na vaše reálne potreby.
            </p>
            <p className="text-lg">
              Individuálny prístup neumožňuje mať cenníky a jednotné ceny za služby. Jedinečnosť
              tiež spočíva v rôznorodosti vašich potrieb.
            </p>
          </div>
        </div>

        {/* MOBILE LAYOUT: stacked flow with dynamic reordering */}
        <div className="md:hidden">
          {audience === null && (
            <>
              <div role="group" aria-label="Výber cieľovej skupiny" className="grid gap-4">
                <OptionCard
                  icon={<Building2 className="h-7 w-7 text-orange-700" aria-hidden />}
                  label="Som firemný zákazník"
                  description="Mám pridelené IČO"
                  selected={false}
                  onSelect={() => toggleAudience('business')}
                />
                <OptionCard
                  icon={<HomeIcon className="h-7 w-7 text-orange-700" aria-hidden />}
                  label="Domácnosti"
                  description="Bývam v rodinnom dome"
                  selected={false}
                  onSelect={() => toggleAudience('home')}
                />
              </div>
              <EmptyPrompt />
            </>
          )}

          {audience === 'business' && (
            <div className="space-y-4">
              {/* Vybraná voľba hore */}
              <OptionCard
                icon={<Building2 className="h-7 w-7 text-orange-700" aria-hidden />}
                label="Som firemný zákazník"
                description="Mám pridelené IČO"
                selected
                onSelect={() => toggleAudience('business')}
              />
              {/* Obsah pre firmy */}
              <BusinessServices resetKey={resetKey} />
              {/* Druhá voľba presunutá POD obsah */}
              <OptionCard
                icon={<HomeIcon className="h-7 w-7 text-orange-700" aria-hidden />}
                label="Domácnosti"
                description="Bývam v rodinnom dome"
                selected={false}
                onSelect={() => toggleAudience('home')}
              />
            </div>
          )}

          {audience === 'home' && (
            <div className="space-y-4">
              {/* Vybraná voľba hore */}
              <OptionCard
                icon={<HomeIcon className="h-7 w-7 text-orange-700" aria-hidden />}
                label="Domácnosti"
                description="Bývam v rodinnom dome"
                selected
                onSelect={() => toggleAudience('home')}
              />
              {/* Obsah pre domácnosti */}
              <HomeServices resetKey={resetKey} />
              {/* Druhá voľba presunutá POD obsah */}
              <OptionCard
                icon={<Building2 className="h-7 w-7 text-orange-700" aria-hidden />}
                label="Som firemný zákazník"
                description="Mám pridelené IČO"
                selected={false}
                onSelect={() => toggleAudience('business')}
              />
            </div>
          )}
        </div>

        {/* DESKTOP LAYOUT: original 2-column grid + content below */}
        <div className="hidden md:block">
          {/* Desktop: dve karty vedľa seba; obsah smerom k stredu stránky */}
          <div role="group" aria-label="Výber cieľovej skupiny" className="grid md:grid-cols-2 gap-3 md:gap-4">
            <OptionCard
              icon={<Building2 className="h-7 w-7 text-orange-700" aria-hidden />}
              label="Som firemný zákazník"
              description="Mám pridelené IČO"
              selected={audience === 'business'}
              onSelect={() => toggleAudience('business')}
              align="end"
              iconPosition="end"
            />
            <OptionCard
              icon={<HomeIcon className="h-7 w-7 text-orange-700" aria-hidden />}
              label="Domácnosti"
              description="Bývam v rodinnom dome"
              selected={audience === 'home'}
              onSelect={() => toggleAudience('home')}
            />
          </div>

          {/* Obsah pod selektorom */}
          {audience === null && <EmptyPrompt />}
          {audience === 'business' && <BusinessServices resetKey={resetKey} />}
          {audience === 'home' && <HomeServices resetKey={resetKey} />}
        </div>
      </div>
    </section>
  )
}
