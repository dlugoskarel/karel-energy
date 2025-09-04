/** 
 * services/types.ts
 * Typy pre položky služieb v sekciách služieb.
 */

import React from 'react'

/**
 * ServiceItem
 * Základná štruktúra služby: názov, popis a ikona.
 */
export interface ServiceItem {
  title: string
  description: string
  icon: React.ReactNode
}
