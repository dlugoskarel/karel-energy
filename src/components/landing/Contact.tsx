/** 
 * Contact.tsx
 * Kontakt sekcia: ľavý stĺpec – rýchle info + zvýraznené kľúčové informácie (dôveryhodnosť),
 * pravý stĺpec – prehľadný formulár.
 * Požiadavky:
 * - Meno, e‑mail a telefón sú povinné.
 * - Preferencia kontaktu: „Napísali mail“ alebo „Zavolali“ (rádio).
 * - Pri „Zavolali“ voliteľný výber preferovaného času.
 * - Výber služieb (viac možností – checkboxy).
 * - Klauzula GDPR pod tlačidlom.
 * - Zvýraznenie vyplnených polí zeleným rámikom.
 * - Karta „Kľúčové informácie“: bez viditeľného nadpisu, zväčšené položky pre vyššiu presvedčivosť.
 */

import React, { useCallback, useState } from 'react'
import { Phone, Mail, MapPin, ChevronDown, Award, TrendingUp, Percent } from 'lucide-react'

/**
 * InfoCard
 * Jednotná karta so štýlom (orámovanie, podklad, tieň) pre konzistentné bloky obsahu.
 */
function InfoCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={['rounded-2xl border border-gray-200 bg-white p-5 shadow-sm', className].join(' ')}>
      {children}
    </div>
  )
}

/**
 * ContactInfoRow
 * Ikona + label + hodnota s voliteľným linkom. Podporuje horizontálne aj vertikálne rozloženie.
 */
function ContactInfoRow({
  icon,
  label,
  value,
  href,
  layout = 'horizontal',
  showLabel = true,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  /** Orientácia rozloženia. */
  layout?: 'horizontal' | 'vertical'
  /** Skryje textový label a ponechá len ikonu + hodnotu. */
  showLabel?: boolean
}) {
  const verticalContent = (
    <div className="flex flex-col items-start">
      <div className="mb-2" aria-hidden>
        {icon}
      </div>
      {showLabel && <div className="text-sm text-gray-600">{label}</div>}
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  )

  const horizontalContent = (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        {showLabel && <div className="text-sm text-gray-600">{label}</div>}
        <div className="font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  )

  const content = layout === 'vertical' ? verticalContent : horizontalContent

  return href ? (
    <a href={href} className="block hover:bg-gray-50 rounded-lg p-3 transition-colors">
      {content}
    </a>
  ) : (
    <div className="rounded-lg p-3">{content}</div>
  )
}

/**
 * CredentialItem
 * Položka v bloku kľúčových informácií – väčší titulok a podtitulok pre vyššiu presvedčivosť.
 */
function CredentialItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
}) {
  return (
    <li className="flex items-start gap-4">
      <div className="mt-0.5" aria-hidden>
        {icon}
      </div>
      <div>
        <div className="text-base md:text-lg font-semibold text-gray-900 leading-tight">{title}</div>
        {subtitle ? <div className="text-sm text-gray-600">{subtitle}</div> : null}
      </div>
    </li>
  )
}

/** Dostupné časové sloty pre telefonát. */
const TIME_SLOTS = [
  '7:00 - 8:00',
  '8:00 - 11:30',
  '11:30 - 13:30',
  '13:30 - 16:00',
  'po 16:00',
] as const

/** Preferovaný spôsob kontaktu. */
type ContactMethod = 'email' | 'call'

/** Možnosti služieb, o ktoré môže mať používateľ záujem. */
const SERVICE_OPTIONS = [
  { id: 'elektrina-plyn', label: 'Najnižšia cena elektriny a plynu' },
  { id: 'distribucne-parametre', label: 'Správne nastavenie distribučných parametrov' },
  { id: 'prebytky', label: 'Riešenie na prebytky vyrobenej elektriny' },
  { id: 'hvac-fv', label: 'Vykurovanie, chladenie a fotovoltika' },
  { id: 'audity', label: 'ESG, BREEM, LEED, účelový a energetický audit' },
  { id: 'posudok', label: 'Energetický posudok' },
  { id: 'home-prebytky', label: 'Domácnosti – prebytky' },
  { id: 'home-hvac-fv', label: 'Domácnosti – kúrenie/chladenie/fotovoltika' },
] as const

/**
 * getFieldClass
 * Vráti Tailwind triedy pre vstup/textarea tak, aby mal zelený rámik pri vyplnenej hodnote.
 */
function getFieldClass(hasValue: boolean): string {
  return [
    'w-full rounded-lg',
    'focus:border-green-600 focus:ring-green-600',
    hasValue ? 'border-green-600 ring-1 ring-inset ring-green-600' : 'border-gray-300',
  ].join(' ')
}

/**
 * Contact
 * Dvojstĺpcový layout: vľavo kontaktné údaje + karta s kľúčovými informáciami (bez nadpisu), vpravo e‑mailový formulár.
 * Pozn.: Validácia prebieha cez HTML5 (required) + manuálne vyvolanie reportValidity pri submit-e.
 */
export function Contact() {
  // Základné polia formulára
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  // Preferencia kontaktu
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email')
  const [timeSlot, setTimeSlot] = useState<string>('')

  // Výber služieb (viac možností)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  /** Viditeľnosť sekcie s ponukou služieb (collapsible). */
  const [showServices, setShowServices] = useState(false)

  /**
   * toggleService
   * Prepína prítomnosť ID služby v zozname vybraných služieb.
   */
  const toggleService = useCallback((id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  /**
   * onSubmit
   * Skontroluje HTML validáciu, potom vytvorí mailto odkaz so subject a body a otvorí e‑mailového klienta.
   * Prenáša: meno, email, telefón, preferovaný spôsob kontaktu (+ čas), vybrané služby a správu.
   */
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.currentTarget
      if (!form.checkValidity()) {
        // Zabezpečíme natívne zobrazenie chýb (required, typ emailu atď.)
        form.reportValidity()
        return
      }

      const subject = encodeURIComponent('Dopyt z webu – Karel Energy')

      const selectedServiceLabels = SERVICE_OPTIONS.filter((o) =>
        selectedServices.includes(o.id)
      ).map((o) => o.label)

      const contactLine =
        contactMethod === 'call'
          ? `Preferovaný spôsob: Zavolať (${timeSlot || 'preferovaný čas neuvedený'})`
          : 'Preferovaný spôsob: Napísať e-mail'

      const bodyLines = [
        `Meno: ${name}`,
        `Email: ${email}`,
        `Telefón: ${phone}`,
        contactLine,
        `Služby: ${
          selectedServiceLabels.length ? selectedServiceLabels.join(', ') : 'neuvedené'
        }`,
        '',
        'Správa:',
        message || '(bez správy)',
      ]

      const body = encodeURIComponent(bodyLines.join('\n'))
      window.location.href = `mailto:info@karel-energy.sk?subject=${subject}&body=${body}`
    },
    [name, email, phone, message, contactMethod, timeSlot, selectedServices]
  )

  return (
    <section id="kontakt" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Ľavý stĺpec: rýchle kontaktné informácie + kľúčové informácie */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Kontakt</h2>
            <p className="text-lg text-gray-600 mb-8">
              Nie je vždy potrebné nasledovať aktuálne trendy alebo sa nechať zatlačiť do zbytočných riešení. Volám sa Karel Dlugoš a som na vašej strane.
            </p>

            {/* Rýchly kontakt – teraz v karte */}
            <InfoCard>
              <div className="space-y-4">
                <ContactInfoRow
                  icon={<Phone className="h-6 w-6 text-green-600" aria-hidden />}
                  label="Telefón"
                  value="042 / 222 00 01"
                  href="tel:+421422220001"
                  layout="horizontal"
                  showLabel={false}
                />
                <ContactInfoRow
                  icon={<Mail className="h-6 w-6 text-blue-600" aria-hidden />}
                  label="E‑mail"
                  value="kontakt@karel.energy"
                  href="mailto:kontakt@karel.energy"
                  layout="horizontal"
                  showLabel={false}
                />
                <ContactInfoRow
                  icon={<MapPin className="h-6 w-6 text-orange-600" aria-hidden />}
                  label="Sídlo"
                  value="celé Slovensko - osobne aj online"
                  layout="horizontal"
                  showLabel={false}
                />
              </div>
            </InfoCard>

            {/* Kľúčové informácie – dôveryhodnostný blok (bez nadpisu, väčšia typografia) */}
            <InfoCard className="mt-4 md:mt-6">
              <ul className="space-y-4">
                <CredentialItem
                  icon={<Award className="h-6 w-6 md:h-7 md:w-7 text-green-700" aria-hidden />}
                  title="Energetický audítor"
                  subtitle="podľa § 12 ods. 8 zákona č. 321/2014 Z.z."
                />
                <CredentialItem
                  icon={<TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-emerald-700" aria-hidden />}
                  title="11+ rokov skúseností"
                  subtitle="poradenstvo, analýzy, zmluvy a optimalizácie"
                />
                <CredentialItem
                  icon={<Percent className="h-6 w-6 md:h-7 md:w-7 text-orange-700" aria-hidden />}
                  title="Typická úspora 25–35 %"
                  subtitle="podľa typu objektu a spotreby"
                />
              </ul>
            </InfoCard>
            <p className="mt-3 text-[11px] text-gray-600">
              <span className="block">Kapacita konzultácií a príjimanie nových klientov je bohužiaľ podmienené časom.</span>
              <span className="block">Uprednostňujem spoluprácu tam, kde je o moje služby seriózny záujem.</span>
            </p>
          </div>

          {/* Pravý stĺpec: formulár */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Formulár</h3>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Polia: meno, telefón, e‑mail */}
              <div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Meno */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Meno Priezvisko
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={getFieldClass(Boolean(name))}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Telefón */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefón
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={getFieldClass(Boolean(phone))}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+421 900 123 456"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">Uveďte aktívne číslo (ideálne v tvare +421).</p>
                  </div>

                  {/* Email (plná šírka na mobile aj na veľkom) */}
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E‑mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={getFieldClass(Boolean(email))}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vas@email.sk"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Preferencia kontaktu */}
              <fieldset className="space-y-4">
                <legend className="block text-sm font-semibold text-gray-900">
                  Chcem aby ste mi:
                </legend>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Napísať e-mail */}
                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 has-[:checked]:border-green-600">
                    <input
                      type="radio"
                      name="contact-method"
                      value="email"
                      checked={contactMethod === 'email'}
                      onChange={() => setContactMethod('email')}
                      className="h-4 w-4 text-green-600 focus:ring-green-600"
                    />
                    <span className="text-sm font-medium text-gray-800">Napísali mail</span>
                  </label>

                  {/* Zavolať */}
                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 has-[:checked]:border-green-600">
                    <input
                      type="radio"
                      name="contact-method"
                      value="call"
                      checked={contactMethod === 'call'}
                      onChange={() => setContactMethod('call')}
                      className="h-4 w-4 text-green-600 focus:ring-green-600"
                    />
                    <span className="text-sm font-medium text-gray-800">Zavolali</span>
                  </label>
                </div>

                {/* Výber času pri telefonáte */}
                {contactMethod === 'call' && (
                  <div>
                    <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferovaný čas <span className="text-gray-400 font-normal">(voliteľné)</span>
                    </label>
                    <select
                      id="timeSlot"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className={getFieldClass(Boolean(timeSlot))}
                    >
                      <option value="">Vyberte čas</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </fieldset>

              {/* Výber služieb – prepínateľný panel (collapsible) */}
              <div className="space-y-4">
                <button
                  type="button"
                  aria-expanded={showServices}
                  aria-controls="services-list"
                  onClick={() => setShowServices((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Vybrať služby, o ktoré máte záujem
                  </span>
                  <ChevronDown
                    className={['h-5 w-5 text-gray-500 transition-transform', showServices ? 'rotate-180' : ''].join(' ')}
                    aria-hidden
                  />
                </button>

                {showServices && (
                  <div id="services-list" className="space-y-3">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SERVICE_OPTIONS.map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(opt.id)}
                            onChange={() => toggleService(opt.id)}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                          />
                          <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Nevadí, ak si nie ste istý/á – toto pole je nepovinné.
                    </p>
                  </div>
                )}
              </div>

              {/* Správa */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Správa</h4>
                <label htmlFor="message" className="sr-only">
                  Správa (nepovinné)
                </label>
                <textarea
                  id="message"
                  className={getFieldClass(Boolean(message)) + ' min-h-[140px]'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ako vám môžem pomôcť?"
                />
              </div>

              {/* Odoslanie + GDPR */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Odoslať dopyt
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  Odoslaním formulára súhlasíte so spracovaním osobných údajov podľa GDPR.
                </p>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
