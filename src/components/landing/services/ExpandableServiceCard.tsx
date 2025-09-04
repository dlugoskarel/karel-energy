/** 
 * ExpandableServiceCard.tsx
 * Zdieľaný rozbaľovací panel pre zobrazenie služieb (názov + detail).
 * - Podporuje controlled režim (open + onChangeOpen), aj neovládaný interný stav.
 * - Kliknutím alebo klávesmi Enter/Space sa prepína otvorenie.
 * - Používa sa v BusinessServices a HomeServices pre konzistenciu UI.
 */

import React, { useState, KeyboardEvent, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ServiceItem } from './types'

/**
 * Props pre ExpandableServiceCard.
 * - Ak je zadané `open`, komponent je riadený zvonka a používa sa `onChangeOpen`.
 * - Inak si drží interný stav otvorenia.
 */
type ExpandableServiceCardProps = {
  item: ServiceItem
  open?: boolean
  onChangeOpen?: (open: boolean) => void
}

/**
 * ExpandableServiceCard
 * Jedna rozbaľovacia karta služby (title + detail) s podporou controlled/unstyled režimu.
 */
export default function ExpandableServiceCard({
  item,
  open,
  onChangeOpen,
}: ExpandableServiceCardProps) {
  const isControlled = useMemo(() => typeof open === 'boolean', [open])
  const [internalOpen, setInternalOpen] = useState(false)

  /** Aktuálny stav otvorenia (riadený zvonka alebo interný). */
  const isOpen = isControlled ? (open as boolean) : internalOpen

  /** Prepína otvorenie/zavretie detailu. */
  const toggle = () => {
    if (isControlled) {
      onChangeOpen?.(!isOpen)
    } else {
      setInternalOpen((v) => !v)
    }
  }

  /** Ovládanie cez klávesnicu (Enter/Space). */
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <div
      className={[
        'group rounded-xl border bg-white transition-all',
        isOpen
          ? 'border-green-600 ring-2 ring-green-600/60'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
      ].join(' ')}
    >
      <button
        type="button"
        className="w-full p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded-xl"
        aria-expanded={isOpen}
        aria-controls={`detail-${item.title}`}
        onClick={toggle}
        onKeyDown={onKey}
      >
        <div className="flex items-center gap-4">
          <div
            className={[
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
              'bg-gradient-to-br from-green-100 to-green-200 text-green-700',
              'group-hover:from-green-200 group-hover:to-green-300',
            ].join(' ')}
            aria-hidden
          >
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <ChevronDown
                className={[
                  'h-5 w-5 text-gray-500 transition-transform duration-200',
                  isOpen ? 'rotate-180' : '',
                ].join(' ')}
                aria-hidden
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Kliknite pre detail</p>
          </div>
        </div>
      </button>

      {isOpen && (
        <div id={`detail-${item.title}`} className="px-5 pb-5 sm:px-6 sm:pb-6">
          <p className="text-gray-700 leading-relaxed">{item.description}</p>
        </div>
      )}
    </div>
  )
}
