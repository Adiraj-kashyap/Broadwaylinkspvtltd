
"use client"

import { use } from "react"
import projectsData from "@/data/projects.json"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, Building2, CheckCircle2 } from "lucide-react"

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const projectId = parseInt(resolvedParams.id);
    const project = projectsData.find((p) => p.id === projectId);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-400">Project Not Found</h1>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <div className="h-[40vh] bg-[#0B2C4D] relative">
                {/* Hero Background Placeholder */}
                <div className="absolute inset-0 opacity-20 bg-[url('/placeholder-project.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
                    <Badge className={`w-fit mb-4 ${project.section === 'Completed' ? 'bg-green-600' : 'bg-blue-600'} text-white px-4 py-1 text-md`}>
                        {project.section}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0B2C4D] mb-4 text-balance drop-shadow-sm">{project.name}</h1>
                    <div className="flex flex-wrap gap-6 text-gray-700">
                        <div className="flex items-center gap-2">
                            <MapPin className="text-[#F28C28]" />
                            <span className="font-medium">{project.address || "Location Confidential"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="text-[#F28C28]" />
                            <span className="font-medium">{project.completion || "Ongoing"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                This project represents a significant milestone in our portfolio.
                                Executed for <strong>{project.address}</strong>, it demonstrates our capability in delivering complex
                                infrastructure solutions under challenging timelines.
                            </p>
                            <p>
                                Our team deployed advanced machinery and technical expertise to ensure the highest standards of quality and safety were met throughout the lifecycle of the project.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Scope & Specifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                                    <span>Complete Civil & Structural Works</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                                    <span>Advanced Engineering Implementation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                                    <span>Safety & Compliance Adherence</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-[#0B2C4D] text-white border-none">
                        <CardHeader>
                            <CardTitle className="text-white">Project Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-[#F28C28]">
                                {project.value || "Undisclosed"}
                            </div>
                            <p className="text-blue-200 mt-2 text-sm">Total Contract Value</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Client Details</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-start gap-4">
                            <div className="bg-gray-100 p-3 rounded-full">
                                <Building2 className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{project.address?.split(',')[0] || "Client Confidential"}</p>
                                <p className="text-sm text-gray-500 mt-1">Infrastructure & Development</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
