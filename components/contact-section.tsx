"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDetails: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    projectDetails: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = { name: "", email: "", projectDetails: "" }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = "Project details are required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", company: "", projectDetails: "" })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  const contactCards = [
    { title: "Email", content: ["broadwaylink@rediffmail.com", "admin@broadwaylink.co.in", "jaimangla@hotmail.com"] },
    { title: "Phone", content: ["+91-9876-543-210", "+91-9876-543-211"] },
    { title: "Office", content: ["HEAD OFFICE: AT. SRI KRISHNA NAGAR, P.O.+DIST.- BEGUSARAI-851101 (BIHAR)", "REGISTERED OFFICE: C/O M/s Shakti Earth Movers LLP, NH-31, Singhol, Sushil Nagar, Begusarai, Bihar-851134"] },
  ]

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/bg-texture-4.jpg"
          alt="Background Texture"
          className="w-full h-full object-cover grayscale opacity-[0.2]"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-[#0B2C4D] text-balance"
        >
          Get in Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-transparent hover:border-[#F28C28] group"
            >
              <h3 className="text-lg font-bold text-[#F28C28] mb-4 group-hover:scale-105 transition-transform origin-left">{card.title}</h3>
              {card.content.map((line, i) => (
                <p key={i} className={`text-gray-700 ${i > 0 ? "mt-1" : ""} ${card.title === "Office" && i === 1 ? "text-sm text-gray-500 mt-2" : ""}`}>
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto border border-gray-100"
        >
          {submitted ? (
            <div className="text-center py-8 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold text-green-700 mb-2">Thank you for your interest!</p>
              <p className="text-gray-700">Our team typically responds within 2–3 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28] transition-shadow ${errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28] transition-shadow ${errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91-XXXX-XXXX-XX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28] transition-shadow"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28] transition-shadow"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label htmlFor="projectDetails" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  placeholder="Briefly describe your project, location, and expected timelines"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28] resize-none transition-shadow ${errors.projectDetails ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.projectDetails && <p className="text-red-500 text-sm mt-1">{errors.projectDetails}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#F28C28] text-white py-3 rounded-lg font-semibold hover:bg-[#d97b20] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>

              {/* Response Time Note */}
              <p className="text-xs text-gray-600 text-center">Our team typically responds within 2–3 business days.</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
