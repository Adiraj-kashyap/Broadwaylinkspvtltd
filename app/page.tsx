"use client"

import HeroSection from "@/components/hero-section"
import CompanyIntroSection from "@/components/company-intro-section"
import StatsAndBrands from "@/components/stats-and-brands"
import SectorsSection from "@/components/sectors-section"
import FleetSection from "@/components/fleet-section"
import ClientsSection from "@/components/clients-section"
import HistorySection from "@/components/history-section"
import ContactSection from "@/components/contact-section"
import JobsSection from "@/components/jobs-section"

export default function Home() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <CompanyIntroSection />
            <StatsAndBrands />
            <SectorsSection />
            <FleetSection />
            <ClientsSection />
            <HistorySection />
            <JobsSection />
            <ContactSection />
        </main>
    )
}
