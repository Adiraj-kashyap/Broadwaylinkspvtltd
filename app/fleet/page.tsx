
"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import fleetData from "@/data/fleet.json"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Truck, Activity, Search, ChevronLeft, ChevronRight, Hammer, Shovel, Disc, GripVertical, Settings } from "lucide-react"

// Helper to map equipment names to categories/icons
const getCategoryIcon = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes("excavator") || n.includes("backhoe")) return Shovel
    if (n.includes("paver") || n.includes("roller") || n.includes("compactor") || n.includes("grader")) return GripVertical
    if (n.includes("loader") || n.includes("bobcat") || n.includes("hydra") || n.includes("crane")) return Truck
    if (n.includes("batching") || n.includes("conveyor") || n.includes("plant") || n.includes("mixer") || n.includes("pump")) return Disc
    if (n.includes("truck") || n.includes("tanker") || n.includes("trailer") || n.includes("hyva")) return Truck
    if (n.includes("drill")) return Hammer
    return Settings
}

export default function FleetPage() {
    const [viewMode, setViewMode] = useState<"machinery" | "brand">("machinery")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [filteredItems, setFilteredItems] = useState<any[]>([]) // Initialize with an empty array

    const stats = useMemo(() => {
        const brandCounts: Record<string, number> = {}
        const equipmentCounts: Record<string, number> = {}
        let totalEquipment = 0
        let activeEquipment = 0

        fleetData.forEach((item) => {
            // Brand counting
            const brand = item.brand || "Unknown"
            brandCounts[brand] = (brandCounts[brand] || 0) + 1

            // Equipment counting
            const eq = item.equipment || "Other"
            equipmentCounts[eq] = (equipmentCounts[eq] || 0) + 1

            totalEquipment++
            if (item.status === "Active") activeEquipment++
        })

        const sortedBrands = Object.entries(brandCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([brand, count]) => ({ name: brand, count, type: "brand" }))
            .filter(item => item.name !== "Unknown")

        const sortedEquipment = Object.entries(equipmentCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([eq, count]) => ({ name: eq, count, type: "machinery" }))
            .filter(item => item.name !== "Unknown")

        return {
            brandCounts,
            sortedBrands,
            sortedEquipment,
            totalEquipment,
            activeEquipment
        }
    }, [])

    const allItems = viewMode === "machinery" ? stats.sortedEquipment : stats.sortedBrands

    // Filter for dropdown only
    const searchResults = searchQuery
        ? allItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : []

    // Pagination Logic
    const totalPages = Math.ceil(allItems.length / itemsPerPage)
    const currentItems = allItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // Reset pagination when view mode changes
    if (currentPage > 1 && totalPages < currentPage && totalPages > 0) {
        setCurrentPage(1)
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-[#0B2C4D] text-white pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Fleet Management</h1>
                    <p className="text-blue-200 max-w-2xl mx-auto text-lg">
                        Complete inventory of our heavy machinery, vehicles, and construction assets.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="bg-white shadow-lg border-none">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
                                <Truck className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold">Total Assets</p>
                                <p className="text-3xl font-bold text-[#0B2C4D]">{stats.totalEquipment}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg border-none">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-green-100 text-green-700 rounded-full">
                                <Activity className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold">Operational</p>
                                <p className="text-3xl font-bold text-[#0B2C4D]">{stats.activeEquipment}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg border-none">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-orange-100 text-orange-700 rounded-full">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold">
                                    {viewMode === "machinery" ? "Categories" : "Brands"}
                                </p>
                                <p className="text-3xl font-bold text-[#0B2C4D]">
                                    {viewMode === "machinery" ? stats.sortedEquipment.length : stats.sortedBrands.length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-[#0B2C4D] border-l-4 border-[#F28C28] pl-4">
                        {viewMode === "machinery" ? "Equipment Categories" : "Brands"}
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        {/* Search Bar - Udemy Style Autocomplete */}
                        <div className="flex items-center w-full sm:w-auto z-50">
                            <div className="relative flex w-full sm:w-[300px]">
                                <input
                                    type="text"
                                    placeholder={`Search ${viewMode}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-grow pl-4 pr-4 py-2.5 border border-gray-300 border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#0B2C4D] bg-white text-sm"
                                />
                                <button className="bg-[#0B2C4D] hover:bg-[#1a416a] text-white px-4 py-2.5 rounded-r-md border border-[#0B2C4D] transition-colors flex items-center justify-center">
                                    <Search className="w-4 h-4" />
                                </button>

                                {/* Dropdown Results */}
                                {searchQuery && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-xl border border-gray-100 max-h-[300px] overflow-y-auto z-50">
                                        {searchResults.length > 0 ? (
                                            searchResults.map((item) => (
                                                <Link
                                                    href={`/fleet/${encodeURIComponent(item.name)}`}
                                                    key={item.name}
                                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-none group transition-colors"
                                                >
                                                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#0B2C4D]">{item.name}</span>
                                                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-500 group-hover:bg-[#F28C28] group-hover:text-white">
                                                        {item.count}
                                                    </Badge>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-gray-400 italic">No matches found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="bg-white p-1 rounded-lg border border-gray-200 flex shadow-sm">
                            <button
                                onClick={() => { setViewMode("machinery"); setCurrentPage(1); }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === "machinery"
                                    ? "bg-[#0B2C4D] text-white shadow-md"
                                    : "text-gray-500 hover:text-[#0B2C4D]"
                                    }`}
                            >
                                Machinery
                            </button>
                            <button
                                onClick={() => { setViewMode("brand"); setCurrentPage(1); }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === "brand"
                                    ? "bg-[#0B2C4D] text-white shadow-md"
                                    : "text-gray-500 hover:text-[#0B2C4D]"
                                    }`}
                            >
                                Brand
                            </button>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="flex flex-wrap gap-6 justify-center sm:justify-start"
                >
                    <AnimatePresence mode="popLayout">
                        {currentItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="w-full sm:w-[280px] flex-shrink-0"
                            >
                                <Link href={`/fleet/${encodeURIComponent(item.name)}`} className="block h-full cursor-pointer relative z-20 group">
                                    <Card className="w-full !h-[320px] flex flex-col group-hover:shadow-2xl transition-all duration-300 border-gray-200 hover:border-[#F28C28] hover:-translate-y-2 overflow-hidden bg-white">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-[#F28C28] pointer-events-none z-0"></div>

                                        <CardHeader className="bg-gray-50 pb-4 border-b border-gray-100 flex-none h-[110px] flex items-center justify-center group-hover:bg-[#F28C28]/5 transition-colors relative z-10">
                                            <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center text-xl font-bold text-gray-400 group-hover:text-white group-hover:bg-[#F28C28] group-hover:scale-110 transition-all duration-300 shadow-inner overflow-hidden">
                                                {(() => {
                                                    const brandLogos: Record<string, string> = {
                                                        "L&T Komatsu": "/images/brands/komatsu.jpg",
                                                        "Komatsu": "/images/brands/komatsu.jpg",
                                                        "JCB": "/images/brands/jcb.jpg",
                                                        "Ashok Leyland": "/images/brands/ashok-leyland.jpg",
                                                        "Tata": "/images/brands/tata.png",
                                                        "Volvo": "/images/brands/volvo.png" // Assuming you might add this later
                                                    }

                                                    const logoSrc = brandLogos[item.name] || brandLogos[item.name.replace("L&T ", "")]

                                                    if (logoSrc) {
                                                        return (
                                                            <img
                                                                src={logoSrc}
                                                                alt={item.name}
                                                                className="w-full h-full object-contain p-2 group-hover:brightness-0 group-hover:invert transition-all"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                                }}
                                                            />
                                                        )
                                                    }

                                                    return item.name.charAt(0)
                                                })()}
                                                <span className="hidden">{item.name.charAt(0)}</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6 text-center flex-grow flex flex-col justify-between relative z-10">
                                            <div className="w-full">
                                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[56px] flex items-center justify-center break-words group-hover:text-[#F28C28] transition-colors" title={item.name}>{item.name}</h3>
                                                <Badge variant="secondary" className="px-3 py-1 text-[#0B2C4D] bg-blue-50 group-hover:bg-[#F28C28] group-hover:text-white transition-all duration-300">
                                                    {item.count} Units
                                                </Badge>
                                            </div>

                                            <div className="mt-4 flex items-center justify-center text-sm text-gray-400 group-hover:text-[#F28C28] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                View Inventory <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </CardContent>
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#F28C28] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>

                        {(() => {
                            const range = []
                            const siblingCount = 1
                            const totalPageNumbers = siblingCount + 5 // 1, ellipsis, cur, ellipsis, total

                            if (totalPages <= totalPageNumbers) {
                                // show all
                                for (let i = 1; i <= totalPages; i++) range.push(i)
                            } else {
                                const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
                                const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)
                                const showLeftDots = leftSiblingIndex > 2
                                const showRightDots = rightSiblingIndex < totalPages - 2 // Adjusted for better spacing

                                if (!showLeftDots && showRightDots) {
                                    const leftItemCount = 3 + 2 * siblingCount
                                    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
                                    range.push(...leftRange, "...", totalPages)
                                } else if (showLeftDots && !showRightDots) {
                                    const rightItemCount = 3 + 2 * siblingCount
                                    const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1)
                                    range.push(1, "...", ...rightRange)
                                } else {
                                    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i)
                                    range.push(1, "...", ...middleRange, "...", totalPages)
                                }
                            }

                            return range.map((page, index) => {
                                if (page === "...") {
                                    return (
                                        <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400 font-medium">...</span>
                                    )
                                }
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(Number(page))}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${currentPage === page
                                            ? "bg-[#0B2C4D] text-white shadow-md"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            })
                        })()}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}
