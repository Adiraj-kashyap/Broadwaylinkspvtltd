"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] bg-gradient-to-br from-primary via-primary to-blue-900 text-white flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative section-container text-center">
        <div className="fade-in-up max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Building India's Infrastructure</h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Broadway Links Pvt. Ltd. is a leading construction and infrastructure company specializing in highways,
            bridges, industrial projects, and comprehensive engineering solutions across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#sectors"
              className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Explore Our Work
            </Link>
            <Link
              href="#contact"
              className="inline-block px-8 py-3 bg-white/10 text-white border border-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/50" />
        </div>
      </div>
    </section>
  )
}
