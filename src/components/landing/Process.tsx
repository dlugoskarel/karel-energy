/**
 * Process.tsx
 * Four-step process explaining collaboration.
 * Updates:
 * - Step 1 renamed to "Úvodná komunikácia" with combined phone + mail icon.
 * - Step 2 shows FileCheck + Search icons to emphasize review and findings.
 * - Step 3 text updated and a document icon added next to the gauge.
 * - Step 4 title and text updated; Bell icon added next to PiggyBank.
 */

import React from 'react'
import { PhoneCall, Mail, FileCheck, Gauge, PiggyBank, FileText, Search, Bell } from 'lucide-react'

/**
 * StepCard
 * Small card with icon, number, title, and description.
 */
function StepCard({
  icon,
  number,
  title,
  text,
}: {
  icon: React.ReactNode
  number: string
  title: string
  text: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xs font-semibold text-gray-500">Krok {number}</div>
        <div>{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  )
}

/**
 * Process
 * Visual step-by-step flow to set expectations.
 */
export default function Process() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Ako prebieha spolupráca</h2>
          <p className="text-lg text-gray-600">Jasné kroky od prvého kontaktu po dosiahnuté úspory</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Step 1 – updated title and combined icon */}
          <StepCard
            icon={
              <span className="inline-flex items-center gap-1.5" aria-hidden>
                <PhoneCall className="h-5 w-5 text-emerald-600" />
                <Mail className="h-5 w-5 text-emerald-600" />
              </span>
            }
            number="1"
            title="Úvodná komunikácia"
            text="Krátke zmapovanie situácie a vašich cieľov. Zistíme, kde sa oplatí začať."
          />

          {/* Step 2 – FileCheck + Search (magnifying glass) */}
          <StepCard
            icon={
              <span className="inline-flex items-center gap-1.5" aria-hidden>
                <FileCheck className="h-6 w-6 text-blue-600" />
                <Search className="h-6 w-6 text-blue-600" />
              </span>
            }
            number="2"
            title="Analýza podkladov"
            text="Prejdem faktúry a dáta o spotrebe. Odhalím potenciál úspor a riziká."
          />

          {/* Step 3 – updated text and added document icon */}
          <StepCard
            icon={
              <span className="inline-flex items-center gap-1.5" aria-hidden>
                <Gauge className="h-6 w-6 text-orange-600" />
                <FileText className="h-6 w-6 text-orange-600" />
              </span>
            }
            number="3"
            title="Návrh riešení"
            text="Dostanete zrozumiteľné výstupy vrátane očakávaných výsledkov"
          />

          {/* Step 4 – updated title, text, and added Bell icon */}
          <StepCard
            icon={
              <span className="inline-flex items-center gap-1.5" aria-hidden>
                <PiggyBank className="h-6 w-6 text-green-600" />
                <Bell className="h-6 w-6 text-green-600" />
              </span>
            }
            number="4"
            title="Realizácia úspory"
            text="Pomôžem s implementáciou a upozorním na zmeny v energetike"
          />
        </div>
      </div>
    </section>
  )
}
