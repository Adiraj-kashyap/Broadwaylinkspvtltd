"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">BL</span>
              </div>
              <span className="font-bold text-lg">BLPL</span>
            </div>
            <p className="text-sm opacity-80">Leading construction and infrastructure company in Bihar, India.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="#about" className="hover:text-secondary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#sectors" className="hover:text-secondary transition-colors">
                  Sectors
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="hover:text-secondary transition-colors">
                  Fleet
                </Link>
              </li>
              <li>
                <Link href="#clients" className="hover:text-secondary transition-colors">
                  Clients
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Begusarai, Bihar, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 XXXX XXXX XX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@blpl.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="p-2 hover:bg-secondary hover:text-foreground rounded-lg transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="p-2 hover:bg-secondary hover:text-foreground rounded-lg transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
            <p>&copy; {currentYear} Broadway Links Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
