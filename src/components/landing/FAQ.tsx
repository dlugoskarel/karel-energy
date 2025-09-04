/** 
 * FAQ.tsx
 * Accessible single-open accordion for Frequently Asked Questions.
 * - Only one answer open at a time (controlled state).
 * - Keyboard and screen-reader friendly via aria attributes.
 * - Visual: subtle amber glow emanating from the top-left behind the heading (no header accent/pills).
 */

import React, { useState } from 'react'

/**
 * QAItem
 * Single Q&amp;A row as a controlled accordion item.
 */
function QAItem({
  index,
  q,
  a,
  isOpen,
  onToggle,
}: {
  index: number
  q: string
  /** Accept ReactNode so answers can be rich (lists/links/paragraphs). */
  a: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}) {
  const contentId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
      >
        <h3 className="text-gray-900 font-medium">{q}</h3>
        <span
          className={[
            'ml-4 text-gray-400 transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0',
          ].join(' ')}
          aria-hidden
        >
          ⌄
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={['pt-3 text-gray-600', isOpen ? 'block' : 'hidden'].join(' ')}
      >
        {a}
      </div>
    </div>
  )
}

/**
 * FAQ
 * Controlled accordion list: at most one item open at any time.
 * Visual note: subtle amber glow emanating from the top-left behind the heading.
 */
export default function FAQ() {
  // openIndex: currently opened item index; null = all closed
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  /** Toggle handler to open clicked item and close the previous one. */
  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  const items: Array<{ q: string; a: React.ReactNode }> = [
    {
      q: 'Koľko môžem reálne ušetriť?',
      a: 'Typicky v priemere 25–35% v závislosti od spotreby, taríf, dodávateľa a stavu vašich zariadení v danej nehnuteľnosti. Po analýze vždy uvádzam realistický odhad s rozsahom úspor a možností.',
    },
    {
      q: 'Aké podklady budem potrebovať?',
      a: 'Faktúry za energie (ktoré si zadefinujeme) a základné údaje o odberných miestach. Ostatné vysvetlím podľa vašich individuálnych požiadaviek.',
    },
    {
      q: 'Je úvodná konzultácia spoplatnená?',
      a: 'Nie. 10-min. úvodný rozhovor je zdarma. Cieľom je porozumieť vašim potrebám, odhadnúť potenciál úspor a dohodnúť sa na následnom postupe.',
    },
    {
      q: 'Vaše služby sú určené pre firmy aj domácnosti?',
      a: 'Áno. Mám bohaté skúsenosti s oboma skupinami – od rodinných domov až po firmy z rôznych segmentov a štruktúr.',
    },
    // Pricing examples (requested)
    {
      q: 'Môžete uviesť príklady stanovenia vašich cien?',
      a: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Zmluvu na dodávku elektriny a plynu pre vaše podnikanie vám sprostredkujem zdarma.</li>
          <li>Analýza a nastavenie distribučných parametrov stojí približne 120 Eur za elektromer.</li>
          <li>Podľa rozsahu mojej práce sa vieme dohodnúť na hodinovej odmene alebo celkovej za odovzdaný projekt.</li>
          <li>Cieľom je obojstranná spokojnosť.</li>
        </ul>
      ),
    },
  ]

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Subtle amber glow from the top-left – localized and very soft */}
      <div
        className="pointer-events-none absolute -top-8 -left-10 h-64 w-64 sm:h-72 sm:w-72"
        aria-hidden
      >
        {/* Main soft blob */}
        <div className="absolute inset-0 rounded-full bg-amber-300/20 blur-[60px]" />
        {/* Secondary tint for depth */}
        <div className="absolute top-10 left-14 h-24 w-24 rounded-full bg-amber-200/25 blur-[40px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
            <p className="text-lg text-gray-600">
              Zodpovedané otázky, ktoré sa najčastejšie pýtate.
            </p>
          </div>
          <div className="space-y-4">
            {items.map((i, idx) => (
              <QAItem
                key={i.q}
                index={idx}
                q={i.q}
                a={i.a}
                isOpen={openIndex === idx}
                onToggle={() => handleToggle(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
