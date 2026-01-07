import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, CheckCircle, Clock, Building2, TrendingUp, DollarSign } from 'lucide-react'

import { ProjectImage } from "@/components/project-image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import projectsData from "@/data/projects-full.json"
import { ProjectProgressGraph } from "@/components/project-progress-graph"

export async function generateStaticParams() {
    return projectsData.map((project: any) => ({
        slug: project.id,
    }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = projectsData.find((p: any) => p.id === slug)

    if (!project) {
        return notFound()
    }

    // THEME COLORS (Strictly from globals & stats-and-brands)
    // Primary: #0B2C4D (Deep Navy)
    // Secondary: #F28C28 (Construction Orange)
    // Muted: #F5F7FA

    const isCompleted = project.status.toLowerCase() === "completed"

    // Status badges using Theme colors
    const statusBg = isCompleted ? "bg-[#e6f4ea]" : "bg-[#fff8e1]"
    const statusText = isCompleted ? "text-[#1e8e3e]" : "text-[#F28C28]"
    const statusIcon = isCompleted
        ? <CheckCircle className="w-4 h-4 mr-1 text-[#1e8e3e]" />
        : <Clock className="w-4 h-4 mr-1 text-[#F28C28]" />

    const hasYearlyData = project.yearly_quantities && project.yearly_quantities.length > 0

    return (
        <div className="min-h-screen bg-white text-[#0B2C4D] font-sans">

            {/* HERO SECTION */}
            <div className="relative min-h-[60vh] w-full bg-[#0B2C4D] pt-32 pb-16 flex flex-col justify-end">
                <div className="absolute inset-0 z-0 opacity-60">
                    <ProjectImage
                        src={`/images/projects/${(project as any).index || (project.title.length % 5) + 1}.jpg`}
                        alt={project.title}
                        fill
                        className="object-cover grayscale mix-blend-overlay"
                        priority
                        fallbackText={project.title}
                    />
                </div>
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C4D] via-[#0B2C4D]/80 to-transparent z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
                    <Link href="/projects" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-8 transition-colors group w-fit">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    <div className="max-w-4xl space-y-6">
                        <Badge variant="secondary" className={`${statusBg} ${statusText} border-none px-3 py-1 text-sm font-semibold tracking-wide`}>
                            {statusIcon} {project.status.toUpperCase()}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight drop-shadow-md break-words">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-gray-200 text-base md:text-lg font-light">
                            <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#F28C28]" />
                                {project.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-[#F28C28]" />
                                {project.client}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* MAIN CONTENT (8 Cols) */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Description */}
                        <section className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-[#0B2C4D] mb-6 flex items-center">
                                <span className="w-2 h-8 bg-[#F28C28] rounded-full mr-3"></span>
                                Project Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                                {project.description}
                            </p>
                            {project.status_text && (
                                <div className="mt-8 p-6 bg-[#fff8f2] border-l-4 border-[#F28C28] rounded-r-xl">
                                    <p className="text-[#0B2C4D] font-medium">
                                        <span className="text-[#F28C28] font-bold uppercase text-xs tracking-wider block mb-1">Status Note</span>
                                        {project.status_text}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* INTERACTIVE GRAPH */}
                        {hasYearlyData && (
                            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                                <ProjectProgressGraph data={project.yearly_quantities} />
                            </section>
                        )}

                        {/* QUANTITIES GRID */}
                        {Object.keys(project.quantities).length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-[#0B2C4D] mb-8">Technical Specifications</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Object.entries(project.quantities).map(([key, value]) => (
                                        <Card key={key} className="border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-white">
                                            <CardContent className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-[#f0f4f8] flex items-center justify-center group-hover:bg-[#F28C28] transition-colors duration-300">
                                                        <TrendingUp className="w-5 h-5 text-[#0B2C4D] group-hover:text-white" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{key}</span>
                                                </div>
                                                <p className="text-3xl font-bold text-[#0B2C4D] group-hover:translate-x-1 transition-transform">
                                                    {String(value)}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* SIDEBAR (4 Cols) */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Key Details Card - Floating Style */}
                        <div className="sticky top-24">
                            <Card className="border-none shadow-2xl bg-[#0B2C4D] text-white overflow-hidden relative rounded-2xl">
                                {/* Decorative Circles */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#F28C28] rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F28C28] rounded-full opacity-10 blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                                <CardContent className="p-8 relative z-10 space-y-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-300 mb-1">Contract Value</h3>
                                        <div className="flex items-center text-[#F28C28]">
                                            <DollarSign className="w-6 h-6 mr-1" />
                                            <span className="text-4xl font-bold tracking-tight">₹{project.contract_value}</span>
                                            <span className="text-sm font-medium ml-1 text-gray-400 mt-3">Cr</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-white/10">
                                        <div>
                                            <span className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Timeline</span>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-white font-medium">{project.start_date}</span>
                                                <span className="h-px flex-1 bg-white/20 mx-4"></span>
                                                <span className="text-white font-medium">{project.completion_date}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Scope</span>
                                            <p className="text-white text-base leading-snug font-medium">
                                                {project.description.split(',').slice(0, 3).join(', ')}...
                                            </p>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-[#F28C28] hover:bg-[#d97b20] text-white font-bold h-12 rounded-xl shadow-lg shadow-orange-500/20 mt-4 transition-all hover:scale-[1.02]" asChild>
                                        <Link href="/contact">Request Information</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    )
}
