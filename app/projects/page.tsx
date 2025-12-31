
"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Building2, Wallet, Calendar, CheckCircle2, Factory } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import projectsData from "@/data/projects.json"
import profileData from "@/data/profile.json"

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    // Combine data for search (flattened)
    const allProjects = [
        ...projectsData.ongoing_projects.map(p => ({ ...p, status: "Ongoing", type: "committed" })),
        ...projectsData.completed_projects.map(p => ({ ...p, status: "Completed", type: "completed" }))
    ]

    const filteredProjects = useMemo(() => {
        return allProjects.filter(p =>
            p.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.location ? p.location.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
            p.client.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery, allProjects])

    const ongoing = filteredProjects.filter(p => p.type === "committed")
    const completed = filteredProjects.filter(p => p.type === "completed")

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Header Section */}
            <div className="bg-[#0B2C4D] text-white pt-28 pb-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mb-8">
                            A showcase of our engineering excellence across Infrastructure, Irrigation, and Industrial sectors.
                            <span className="block mt-2 text-[#F28C28] font-semibold text-lg">
                                Total Order Book: ₹{profileData.key_stats.current_order_book_crores} Crores
                            </span>
                        </p>

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
                    <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                        <TabsTrigger value="ongoing" className="data-[state=active]:bg-[#0B2C4D] data-[state=active]:text-white rounded-lg">
                            <Factory className="w-4 h-4 mr-2" />
                            Ongoing Projects ({ongoing.length})
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="data-[state=active]:bg-[#2C9F45] data-[state=active]:text-white rounded-lg">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Completed ({completed.length})
                        </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <TabsContent value="ongoing" key="ongoing">
                            <ProjectGrid projects={ongoing} type="ongoing" />
                        </TabsContent>
                        <TabsContent value="completed" key="completed">
                            <ProjectGrid projects={completed} type="completed" />
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </div>
        </main>
    )
}

function ProjectGrid({ projects, type }: { projects: any[], type: "ongoing" | "completed" }) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                <Factory className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No projects found matching your search.</p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {projects.map((project, idx) => (
                <ProjectCard key={project.id || `project-${type}-${idx}`} project={project} type={type} index={idx} />
            ))}
        </motion.div>
    )
}

function ProjectCard({ project, type, index }: { project: any, type: string, index: number }) {
    const isOngoing = type === "ongoing"
    const value = project.contract_value_millions
        ? `₹${(project.contract_value_millions / 10).toFixed(2)} Cr` // Convert millions to Crores
        : (project.contract_value_inr ? `₹${(parseInt(project.contract_value_inr.replace(/,/g, '')) / 10000000).toFixed(2)} Cr` : "N/A")

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="h-full border-gray-200 hover:border-[#F28C28] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.project_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isOngoing ? 'bg-orange-50' : 'bg-green-50'}`}>
                            <Factory className={`w-12 h-12 ${isOngoing ? 'text-orange-200' : 'text-green-200'}`} />
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-full h-1 ${isOngoing ? 'bg-[#F28C28]' : 'bg-[#2C9F45]'}`} />
                </div>
                <CardHeader className="pb-3 pt-4">
                    <div className="flex justify-between items-start gap-4">
                        <Badge variant={isOngoing ? "default" : "secondary"}
                            className={`${isOngoing ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' : 'bg-green-100 text-green-800 hover:bg-green-100'} border-0 mb-2`}>
                            {isOngoing ? "Work in Progress" : "Successfully Delivered"}
                        </Badge>
                        {project.remaining_value_millions && (
                            <span className="text-xs font-mono text-gray-400">
                                {Math.round((1 - (project.remaining_value_millions / project.contract_value_millions)) * 100)}% Done
                            </span>
                        )}
                    </div>
                    <CardTitle className="text-lg font-bold text-[#0B2C4D] leading-tight line-clamp-2 min-h-[3rem]">
                        {project.project_name || project.description}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.location}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-gray-600 bg-gray-50 p-2 rounded-lg">
                            <span className="flex items-center"><Wallet className="w-4 h-4 mr-2 text-gray-400" /> Contract Value</span>
                            <span className="font-bold text-[#0B2C4D]">{value}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-600 p-2">
                            <span className="flex items-center"><Building2 className="w-4 h-4 mr-2 text-gray-400" /> Client</span>
                            <span className="text-right truncate max-w-[150px]" title={project.client}>{project.client}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-600 p-2">
                            <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400" /> {isOngoing ? 'Target' : 'Completed'}</span>
                            <span>{project.completion_date}</span>
                        </div>
                    </div>

                    {project.description && (
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <p className="text-gray-500 line-clamp-3 text-xs leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
