"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import CompanyIntroSection from "@/components/company-intro-section"
import { ArrowRight, Calendar, Users, Briefcase, Award } from "lucide-react"
import CoreValuesSection from "@/components/core-values-section"
import historyData from "@/data/history.json"
import profileData from "@/data/profile.json"

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-20">
                <CompanyIntroSection hideJourneyButton={true} />

                {/* Certifications Section */}
                <section className="py-12 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <span className="text-[#F28C28] font-bold uppercase tracking-wider text-sm">Quality & Safety</span>
                            <h2 className="text-2xl font-bold mt-2 text-[#0B2C4D]">Accredited Excellence</h2>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 overflow-x-auto">
                            <div className="flex flex-col items-center group min-w-[200px]">
                                <div className="h-48 w-48 p-2 border border-gray-200 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-all">
                                    <img src="/images/iso-9001-2015.png" alt="ISO 9001" className="w-full h-full object-contain" />
                                </div>
                                <p className="mt-3 font-semibold text-[#0B2C4D]">ISO 9001:2015</p>
                            </div>
                            <div className="flex flex-col items-center group min-w-[200px]">
                                <div className="h-48 w-48 p-2 border border-gray-200 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-all">
                                    <img src="/images/iso-45001-2018.png" alt="ISO 45001" className="w-full h-full object-contain" />
                                </div>
                                <p className="mt-3 font-semibold text-[#0B2C4D]">ISO 45001:2018</p>
                            </div>
                            <div className="flex flex-col items-center group min-w-[200px]">
                                <div className="h-48 w-48 p-2 border border-gray-200 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-all">
                                    <img src="/images/iso-14001-2015.jpg" alt="ISO 14001" className="w-full h-full object-contain" />
                                </div>
                                <p className="mt-3 font-semibold text-[#0B2C4D]">ISO 14001:2015</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#F28C28] font-bold uppercase tracking-wider text-sm">Our Strength</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#0B2C4D]">Group Ecosystem</h2>
                            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                                A diversified conglomerate with a 30-year legacy in Infrastructure, Steel, Mining, and Energy.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* @ts-ignore */}
                            {profileData.group_companies.map((company: any, index: number) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:border-[#F28C28] group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-[#F28C28] transition-colors">
                                            {index === 3 ? <Briefcase className="text-[#0B2C4D] group-hover:text-white" /> : <Award className="text-[#0B2C4D] group-hover:text-white" />}
                                        </div>
                                        <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
                                            Estd. {company.established}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0B2C4D] mb-2">{company.name}</h3>
                                    <p className="text-[#F28C28] font-medium text-sm mb-3">{company.vertical}</p>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        {company.location}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold text-[#0B2C4D] mb-4">Our Vision</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    To be India's most trusted infrastructure partner, known for quality, speed, and self-reliance. We aim to build the arteries of the nation's development while fostering sustainable growth for our stakeholders.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold text-[#0B2C4D] mb-4">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    To execute complex infrastructure projects with zero subcontracting dependency, ensuring 100% quality control and timely delivery through our own massive fleet and skilled workforce.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <CoreValuesSection />

                {/* Timeline */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#F28C28] font-bold uppercase tracking-wider text-sm">Our History</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#0B2C4D]">Milestones of Excellence</h2>
                        </div>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block"></div>

                            <div className="space-y-12">
                                {historyData.slice().reverse().map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        <div className="flex-1 w-full md:w-1/2 p-6 bg-white rounded-xl shadow-md border hover:border-[#F28C28] transition-colors text-center md:text-left">
                                            <div className="text-2xl font-bold text-[#F28C28] mb-2">{item.year}</div>
                                            <h4 className="text-xl font-bold text-[#0B2C4D] mb-2">{item.title}</h4>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-[#0B2C4D] rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-lg">
                                            <Calendar className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1 w-full md:w-1/2"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
