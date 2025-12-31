
"use client"

import { useState, useEffect, Suspense } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isHomePage = pathname === "/"

  const navItems = [
    { label: "Home", href: "/", id: "home", isScroll: true },
    { label: "About", href: "/about", id: "about", isScroll: true },
    { label: "Projects", href: "/projects", id: "", isScroll: false },
    { label: "Sectors", href: "/sectors", id: "sectors", isScroll: true },
    { label: "Fleet", href: "/fleet", id: "fleet", isScroll: true },
    { label: "Contact", href: "/contact", id: "contact", isScroll: true },
  ]

  // Handle initial scroll from query params (e.g. /?target=about)
  useEffect(() => {
    if (isHomePage) {
      const targetId = searchParams.get("target")
      if (targetId) {
        const element = document.getElementById(targetId)
        if (element) {
          // Wait a bit for layout
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" })
            // Clean URL to look like /about (not ?target=about)
            // Maps "about" -> "/about", "home" -> "/"
            const cleanPath = targetId === "home" ? "/" : `/${targetId}`
            window.history.replaceState(null, "", cleanPath)
          }, 100)
        }
      }
    }
  }, [isHomePage, searchParams])


  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      // Logic only applies on home page
      const sections = navItems.filter(i => i.isScroll).map((item) => item.id)
      let current = "home"

      for (const section of sections) {
        if (!section) continue;
        const element = document.getElementById(section)
        if (element && element.getBoundingClientRect().top < 150) {
          current = section
        }
      }

      // Map current ID back to href for active state
      // This part is tricky because activeSection is usually unrelated to href strictly
      // But we can map "about" id -> "/about" href
      // Just keep track of ID
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    setIsOpen(false)

    if (item.isScroll) {
      e.preventDefault()

      if (isHomePage) {
        // On Home Page: Just scroll and update URL
        const sectionId = item.id
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
          window.history.pushState(null, "", item.href)
          setActiveSection(sectionId)
        }
      } else {
        // Not on Home Page: Go to Home with target param
        // This ensures we land on home, scroll to target, then URL cleans up
        router.push(`/?target=${item.id}`)
      }
    }
  }

  // Helper to check active state
  // If isHomePage: check if activeSection matches item.id
  // If !isHomePage: check if pathname starts with item.href (for pages like /projects)
  const isActive = (item: any) => {
    if (isHomePage && item.isScroll) {
      return activeSection === item.id
    }
    if (!isHomePage && !item.isScroll) {
      return pathname === item.href || pathname.startsWith(item.href + "/")
    }
    return false
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0B2C4D] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.history.pushState(null, "", "/");
                }
              }}
              className="flex items-center gap-3"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src="/logo.jpg"
                  alt="BLPL Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Broadway Links Pvt. Ltd.
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${isActive(item)
                  ? "text-[#F28C28]"
                  : "text-gray-100 hover:text-[#F28C28]"
                  }`}
              >
                {item.label}
                {isActive(item) && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F28C28]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#F28C28]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 bg-[#0B2C4D]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`block w-full text-left px-3 py-2 text-sm font-medium ${isActive(item)
                  ? "text-[#F28C28]"
                  : "text-gray-100 hover:text-[#F28C28]"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

// Wrap in Suspense because usage of useSearchParams() 
// causes build errors/performance deopts if not wrapped in Suspense boundary
export default function Navbar() {
  return (
    <Suspense fallback={<nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0B2C4D] h-16" />}>
      <NavbarContent />
    </Suspense>
  )
}
