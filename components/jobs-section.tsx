"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { motion } from "framer-motion"

export default function JobsSection() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        experience: "Fresher",
        position: "Site Engineer",
        coverLetter: "",
        resume: null as File | null
    })
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, resume: e.target.files![0] }))
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!formData.fullName || !formData.email || !formData.phone || !formData.coverLetter) {
            setError("Please fill in all required fields.")
            return
        }
        // Simulate submission
        setError("")
        setSubmitted(true)
    }

    return (
        <section id="jobs" className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C4D] mb-4">Join Our Team</h2>
                    <p className="text-lg text-gray-600">
                        Build your career with Broadway Links. Apply for open positions below.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                >
                    <div className="bg-[#0B2C4D] px-6 py-4 border-b border-[#F28C28]">
                        <h3 className="text-xl font-bold text-white">Job Application</h3>
                    </div>

                    <div className="p-6 md:p-8">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="text-[#F28C28] text-5xl mb-4">✓</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                                <p className="text-gray-600">Thank you for applying. Our HR team will review your profile shortly.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-[#0B2C4D] font-medium hover:underline"
                                >
                                    Submit another application
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F28C28] focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F28C28] focus:border-transparent outline-none transition-all"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F28C28] focus:border-transparent outline-none transition-all"
                                            placeholder="+91 98765 43210"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Current City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F28C28] focus:border-transparent outline-none transition-all"
                                            placeholder="Mumbai"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                        <select
                                            id="experience"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F28C28] focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="Fresher">Fresher</option>
                                            <option value="0–2 years">0–2 years</option>
                                            <option value="2–5 years">2–5 years</option>
                                            <option value="5+ years">5+ years</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                        <select
                                            id="position"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F28C28] focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="Site Engineer">Site Engineer</option>
                                            <option value="Project Manager">Project Manager</option>
                                            <option value="QA/QC Engineer">QA/QC Engineer</option>
                                            <option value="Accountant">Accountant</option>
                                            <option value="Store Keeper">Store Keeper</option>
                                            <option value="Driver">Driver</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#F28C28] hover:bg-orange-50 transition-colors cursor-pointer group">
                                        <div className="space-y-1 text-center">
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label htmlFor="resume" className="relative cursor-pointer rounded-md font-medium text-[#F28C28] group-hover:text-[#d97b20] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#F28C28]">
                                                    <span>Upload a file</span>
                                                    <input id="resume" name="resume" type="file" className="sr-only" onChange={handleFileChange} />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {formData.resume ? formData.resume.name : "PDF, DOC up to 10MB"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                    <textarea
                                        id="coverLetter"
                                        name="coverLetter"
                                        rows={3}
                                        value={formData.coverLetter}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F28C28] focus:border-transparent outline-none transition-all"
                                        placeholder="Short cover letter..."
                                        required
                                    />
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#F28C28] hover:bg-[#e07b1e] hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28] uppercase tracking-wide transition-all duration-200"
                                >
                                    Submit Application
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
