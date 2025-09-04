/** 
 * BeforeAfter.tsx
 * Jednokartové porovnanie „Pred a Po“ – čisté, prehľadné a vizuálne sústredené len na tabuľku.
 * Úpravy:
 * - odstránený horný badge „Pred vs. Po“ a „VS“ nad nadpisom
 * - šmuhy (glow) premiestnené len okolo karty, nie cez celú sekciu
 * - zjednotená veľkosť ikon (krížik/fajka) a vertikálne centrovanie obsahu v riadku
 * - pridané CTA tlačidlo pod tabuľku, ktoré plynulo scrolluje na Kontakt
 * - na želanie: odstránená ikona telefónu z CTA (ostáva čistý text)
 */

import React from 'react'
import { Frown, Smile, XCircle, CheckCircle2 } from 'lucide-react'
import { smoothScrollToId } from '../../lib/scroll'

/**
 * CompareItem
 * Pár textov pre porovnanie jedného bodu (ľavý = bez stratégie, pravý = so stratégiou).
 */
interface CompareItem {
  /** Stav bez stratégie (negatívny) */
  left: string
  /** Stav so stratégiou (pozitívny) */
  right: string
}

/**
 * Badge
 * Kompaktná značka pre „Človek bez stratégie“ a „Klient so stratégiou“.
 */
function Badge({
  tone,
  children,
}: {
  tone: 'negative' | 'positive'
  children: React.ReactNode
}) {
  const styles =
    tone === 'positive'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : 'bg-rose-50 text-rose-800 border-rose-200'
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  )
}

/**
 * CompareRow
 * Jeden riadok porovnania – ľavý negatívny bod vs. pravý pozitívny bod.
 * Ikony majú rovnakú veľkosť a hrúbku ťahu pre optickú konzistenciu.
 */
function CompareRow({ item }: { item: CompareItem }) {
  return (
    <li className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 py-4 md:py-5 transition-colors hover:bg-white/70">
      {/* Ľavý – negatívny */}
      <div className="flex items-center gap-3">
        <XCircle className="h-5 w-5 shrink-0 text-rose-600" strokeWidth={2} aria-hidden />
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {item.left}
        </p>
      </div>

      {/* Stredný stĺpec – na väčších obrazovkách jemný oddeľovač */}
      <div className="hidden md:flex items-center justify-center" aria-hidden>
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white text-gray-600 shadow-sm">
          {/* nenápadná pomlčka ako smer/oddelenie */}
          <span className="text-xs">VS</span>
        </div>
      </div>

      {/* Pravý – pozitívny */}
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} aria-hidden />
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
          {item.right}
        </p>
      </div>
    </li>
  )
}

/**
 * BeforeAfter
 * Jedna karta, ktorá porovnáva kľúčové body: „Človek bez stratégie“ vs. „Klient so stratégiou“.
 * Umiestnenie: medzi Služby a Proces.
 */
export default function BeforeAfter() {
  // Obsahové páry pre porovnanie – krátke, jasné body.
  const items: CompareItem[] = [
    {
      left: 'Vyššie ceny za energie a nevýhodné zmluvne podmienky',
      right: 'Najnižšie možné ceny a prehľad o tom, čo ho čaká v budúcnosti.',
    },
    {
      left: 'Pokuty za jalový odber, zbytočne platená rezervovaná kapacita a distribučné poplatky.',
      right: 'Optimálne nastavené zmluvy a parametre. Včasné upozornenia na zmeny v legislatíve, ktoré sa ho týkajú',
    },
    {
      left: 'V prípade poruchy zariadení na vykurovanie a chladenie často predražené a menej efektívne riešenie.',
      right: 'Všetko vopred spočítané – modernizácia v správny čas, žiadne zbytočné investície.',
    },
    {
      left: 'Reaguje až keď je neskoro, prípadne sa niečo udeje - bez jasného plánu.',
      right: 'Riadi sa stratégiou, využíva dotácie a rozhoduje sa včas – nič ho nezaskočí.',
    },
  ]

  return (
    <section id="pred-po" aria-labelledby="pred-po-heading" className="py-16 sm:py-20 bg-white relative">
      {/* Žiadne sekčné šmuhy cez celú stránku – nechceme zasahovať do iných blokov */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Headline */}
        <div className="text-center mb-10 sm:mb-12">
          {/* Odstránené: horné „Pred vs. Po“ a „VS“ bublina nad nadpisom */}
          <h2 id="pred-po-heading" className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Pred a Po
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            Na jednom mieste vidíte, ako sa konkrétne problémy menia na konkurenčné výhody, keď existuje jasná stratégia a služby, ktoré pre vás zabezpečím.
          </p>
        </div>

        {/* Karta s porovnaním – glow iba okolo karty */}
        <div className="relative group">
          {/* Lokálne šmuhy okolo karty (nezasahujú mimo blok) */}
          <div className="pointer-events-none absolute -inset-6 md:-inset-8" aria-hidden>
            <div className="absolute -top-2 -left-2 h-40 w-40 rounded-full bg-rose-200/45 blur-3xl" />
            <div className="absolute -bottom-3 -right-3 h-44 w-44 rounded-full bg-emerald-200/50 blur-3xl" />
          </div>

          <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-rose-200 via-rose-100 to-transparent">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-emerald-100 to-emerald-200">
              <div className="relative rounded-2xl border border-gray-200 bg-white/90 backdrop-blur px-4 sm:px-6 md:px-8 py-5 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5 overflow-hidden">
                {/* Hlavička stĺpcov */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                      <Frown className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone="negative">Klient bez stratégie</Badge>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center text-[10px] uppercase tracking-wide text-gray-500">
                    VS
                  </div>

                  <div className="flex items-center gap-2 md:justify-end">
                    <div className="flex items-center gap-2 md:order-2">
                      <Badge tone="positive">Klient so stratégiou</Badge>
                    </div>
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 md:order-1">
                      <Smile className="h-5 w-5" aria-hidden />
                    </div>
                  </div>
                </div>

                {/* Oddelovacia čiara */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />

                {/* Zoznam porovnaní */}
                <ul className="divide-y divide-gray-200">
                  {items.map((item, idx) => (
                    <CompareRow key={idx} item={item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA pod tabuľkou: plynulé presunutie na Kontakt (bez ikony) */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => smoothScrollToId('kontakt')}
            className="inline-flex rounded-lg bg-emerald-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label="Prejsť na kontakt"
          >
            Mám záujem o vaše služby
          </button>
        </div>
      </div>
    </section>
  )
}
