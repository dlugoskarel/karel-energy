/**
 * About.tsx
 * Why choose section with key differentiators and compact stats card.
 */

import React from 'react'
import { Award, Users, TrendingUp } from 'lucide-react'

/**
 * FeatureRow
 * Icon with title and subtitle.
 */
function FeatureRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  )
}

/**
 * StatBox
 * Centered stat with label.
 */
function StatBox({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}

/**
 * About
 * Two-column layout explaining experience and results.
 */
export function About() {
  return (
    <section id="o-mne" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="referencie" className="text-4xl font-bold text-gray-900 mb-6 scroll-mt-28">Prečo si vybrať moje služby?</h2>
            <p className="text-xl text-gray-600 mb-8">
              S viac ako 11-ročnými skúsenosťami v energetike pomáham klientom ušetriť tisíce eur ročne
              na energetických nákladoch.
            </p>

            <div className="space-y-6">
              <FeatureRow
                icon={<Award className="h-8 w-8 text-green-600" aria-hidden />}
                title="Certifikovaný energetický audítor"
                subtitle="Oficiálne oprávnenie na vykonávanie energetických auditov"
              />
              <FeatureRow
                icon={<Users className="h-8 w-8 text-blue-600" aria-hidden />}
                title="Stovky spokojných klientov"
                subtitle="Domácnosti aj firmy, ktoré ušetrili vďaka mojim službám"
              />
              <FeatureRow
                icon={<TrendingUp className="h-8 w-8 text-orange-600" aria-hidden />}
                title="Priemerná úspora 25-35%"
                subtitle="Dokázané výsledky na energetických nákladoch"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Moje štatistiky</h3>
            <div className="grid grid-cols-2 gap-6">
              <StatBox value="11+" label="rokov praxe" color="text-green-600" />
              <StatBox value="500+" label="klientov" color="text-blue-600" />
              <StatBox value="4 300+" label="hodín konzultácií" color="text-orange-600" />
              <StatBox value="25–35%" label="typická úspora" color="text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
