/** 
 * Home.tsx
 * Landing page – modern composition of all sections for Karel Energy.
 */

import React from 'react'
import AnnouncementBar from '../components/landing/AnnouncementBar'
import Header from '../components/landing/Header'
import Hero from '../components/landing/Hero'
import TrustBar from '../components/landing/TrustBar'
import Services from '../components/landing/Services'
import Process from '../components/landing/Process'
import BeforeAfter from '../components/landing/BeforeAfter'

import References from '../components/landing/References'
import FAQ from '../components/landing/FAQ'
import CTASection from '../components/landing/CTASection'
import Contact from '../components/landing/Contact'
import Footer from '../components/landing/Footer'
import SectionBridgeCTA from '../components/landing/SectionBridgeCTA'

/**
 * Home
 * Main page composition: Announcement -> Header -> sections -> Footer.
 * Update: FAQ je presunuté pod Referencie.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <Hero />
      <TrustBar />
      <Services />

      {/* Premostenie: CTA na kontakt pre organizácie/verejnú správu */}
      <SectionBridgeCTA />

      {/* Process (Ako prebieha spolupráca) ide pred Pred a Po */}
      <Process />
      <BeforeAfter />

      {/* Referencie a až potom FAQ */}
      <References />
      <FAQ />

      <CTASection />
      <Contact />
      <Footer />
    </div>
  )
}
