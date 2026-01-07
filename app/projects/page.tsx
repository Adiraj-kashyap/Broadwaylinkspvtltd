
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Building2, Wallet, Calendar, CheckCircle2, Factory, ArrowRight, ArrowUpDown, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"

import projectsData from "@/data/projects-full.json"
import profileData from "@/data/profile.json"

type SortOption = "price_high" | "price_low" | "date_newest" | "date_oldest" | "completion_date"

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>("date_newest")

    // Helper to safe parse floats
    const getPrice = (p: any) => {
        const val = parseFloat(String(p.contract_value).replace(/[^0-9.]/g, ''))
        return isNaN(val) ? 0 : val
    }

    // Helper to parse DD.MM.YYYY
    const getDate = (dateStr: string) => {
        if (!dateStr) return 0
        const parts = dateStr.split('.') // Expecting DD.MM.YYYY
        if (parts.length === 3) {
            return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime()
        }
        return 0
    }

    const filteredAndSortedProjects = useMemo(() => {
        let result = projectsData.filter((p: any) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.client.toLowerCase().includes(searchQuery.toLowerCase())
        )

        return result.sort((a: any, b: any) => {
            switch (sortBy) {
                case "price_high":
                    return getPrice(b) - getPrice(a)
                case "price_low":
                    return getPrice(a) - getPrice(b)
                case "date_newest": // Start Date Newest First
                    return getDate(b.start_date) - getDate(a.start_date)
                case "date_oldest":
                    return getDate(a.start_date) - getDate(b.start_date)
                case "completion_date":
                    return getDate(b.completion_date) - getDate(a.completion_date)
                default:
                    return 0
            }
        })
    }, [searchQuery, sortBy])

    const ongoing = filteredAndSortedProjects.filter((p: any) => p.status === "Ongoing")
    const completed = filteredAndSortedProjects.filter((p: any) => p.status === "Completed")
    const bidding = filteredAndSortedProjects.filter((p: any) => p.status === "Under Bidding")

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Header Section */}
            <div className="bg-[#0B2C4D] text-white pt-28 pb-16 px-4 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src="/images/projects/2.jpg" alt="Projects Background" className="w-full h-full object-cover grayscale opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[#0B2C4D]/90"></div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 z-10">
                    <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
                                <p className="text-xl text-gray-300 max-w-2xl">
                                    A showcase of our engineering excellence across Infrastructure, Irrigation, and Industrial sectors.
                                    <span className="block mt-2 text-[#F28C28] font-semibold text-lg">
                                        Total Order Book: ₹{profileData.key_stats.current_order_book_crores} Crores
                                    </span>
                                </p>
                            </div>

                            {/* Sort Controls - Top Right */}
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                                            <ArrowUpDown className="w-4 h-4 mr-2" />
                                            Sort Projects
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                                            <DropdownMenuRadioItem value="date_newest">Date Started (Newest)</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="date_oldest">Date Started (Oldest)</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="completion_date">Completion Date</DropdownMenuRadioItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuRadioItem value="price_high">Value (High to Low)</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="price_low">Value (Low to High)</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Search by project name, location, or client..."
                                className="pl-12 py-6 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-[#F28C28] rounded-xl backdrop-blur-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Tabs defaultValue="ongoing" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-[600px] mb-8 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                        <TabsTrigger value="ongoing" className="data-[state=active]:bg-[#0B2C4D] data-[state=active]:text-white rounded-lg">
                            <Factory className="w-4 h-4 mr-2" />
                            Ongoing ({ongoing.length})
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="data-[state=active]:bg-[#2C9F45] data-[state=active]:text-white rounded-lg">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Completed ({completed.length})
                        </TabsTrigger>
                        <TabsTrigger value="bidding" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg">
                            <Wallet className="w-4 h-4 mr-2" />
                            Bidding ({bidding.length})
                        </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <TabsContent value="ongoing" key="ongoing">
                            <ProjectGrid projects={ongoing} type="ongoing" />
                        </TabsContent>
                        <TabsContent value="completed" key="completed">
                            <ProjectGrid projects={completed} type="completed" />
                        </TabsContent>
                        <TabsContent value="bidding" key="bidding">
                            <ProjectGrid projects={bidding} type="bidding" />
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </div>
        </main>
    )
}

function ProjectGrid({ projects, type }: { projects: any[], type: "ongoing" | "completed" | "bidding" }) {
    const ITEMS_PER_PAGE = 6
    const [currentPage, setCurrentPage] = useState(1)

    // Reset page when projects change (search/sort)
    useMemo(() => {
        setCurrentPage(1)
    }, [projects])

    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    if (projects.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                <Factory className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No projects found matching your search.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {paginatedProjects.map((project, idx) => (
                    <ProjectCard key={project.id || idx} project={project} type={type} index={idx} />
                ))}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-full"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <span className="text-sm font-medium text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-full"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}

function ProjectCard({ project, type, index }: { project: any, type: string, index: number }) {
    const isOngoing = type === "ongoing"
    const isBidding = type === "bidding"

    let badgeColor = "bg-green-100 text-green-800 hover:bg-green-100" // Default Completed
    let statusText = "Successfully Delivered"
    let stripeColor = "bg-[#2C9F45]"
    let fallbackBg = "bg-green-50"

    if (isOngoing) {
        badgeColor = "bg-orange-100 text-orange-800 hover:bg-orange-100"
        statusText = "Work in Progress"
        stripeColor = "bg-[#F28C28]"
        fallbackBg = "bg-orange-50"
    } else if (isBidding) {
        badgeColor = "bg-purple-100 text-purple-800 hover:bg-purple-100"
        statusText = "Bid Submitted"
        stripeColor = "bg-purple-500"
        fallbackBg = "bg-purple-50"
    }

    // Ensure numeric formatting for display
    const displayValue = project.contract_value && !isNaN(parseFloat(project.contract_value))
        ? `₹${parseFloat(project.contract_value).toFixed(2)} Cr`
        : "TBD"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Link href={`/projects/${project.id}`}>
                <Card className="h-full border-gray-200 hover:border-[#F28C28] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        {/* Use a placeholder based on title length or generic if no image */}
                        <img
                            src={`/images/projects/${project.index || (project.title.length % 5) + 1}.jpg`}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                e.currentTarget.parentElement?.classList.add(fallbackBg);
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        {/* Fallback Icon if Image Fails (handled via error logic roughly above, or simple overlay) */}
                        <div className={`absolute top-0 left-0 w-full h-1 ${stripeColor}`} />
                    </div>

                    <CardHeader className="pb-3 pt-4 flex-grow">
                        <div className="flex justify-between items-start gap-4">
                            <Badge variant={"secondary"} className={`${badgeColor} border-0 mb-2`}>
                                {statusText}
                            </Badge>
                        </div>
                        <CardTitle className="text-lg font-bold text-[#0B2C4D] leading-tight line-clamp-2 min-h-[3rem]">
                            {project.title}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {project.location}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4 text-sm mt-auto">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-gray-600 bg-gray-50 p-2 rounded-lg">
                                <span className="flex items-center"><Wallet className="w-4 h-4 mr-2 text-gray-400" /> Value</span>
                                <span className="font-bold text-[#0B2C4D]">
                                    {displayValue}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600 p-2">
                                <span className="flex items-center"><Building2 className="w-4 h-4 mr-2 text-gray-400" /> Client</span>
                                <span className="text-right truncate max-w-[150px]" title={project.client}>{project.client}</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-600 p-2">
                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400" /> {isOngoing ? 'Started' : (isBidding ? 'Valid Till' : 'Completed')}</span>
                                <span>{isOngoing ? project.start_date : (isBidding ? 'Sept 2025' : project.completion_date)}</span>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center text-[#F28C28] font-medium text-xs group-hover:translate-x-1 transition-transform">
                            View Project Details <ArrowRight className="w-3 h-3 ml-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}
