"use client"

import { CheckCircle2 } from "lucide-react"

const milestones = [
  {
    period: "2001",
    title: "Founded",
    description: "Broadway Links Pvt. Ltd. incorporated under the Companies Act, 1956",
  },
  {
    period: "2005-2013",
    title: "B2B Subcontracting Era",
    description: "Established expertise working with major contractors: Lanco, IVRCL, Punj Lloyd, Linde India",
  },
  {
    period: "2013",
    title: "Direct Business Expansion",
    description: "Transitioned to direct orders from government and private sector clients",
  },
  {
    period: "2015",
    title: "ISO Certification",
    description: "Achieved ISO 9001:2015 certification for quality management",
  },
  {
    period: "2020+",
    title: "Diversified Growth",
    description: "Expanded across infrastructure, oil & gas, and industrial sectors with ₹12.5B+ order book",
  },
]

export default function HistorySection() {
  return (
    <section id="history" className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle">From subcontractor roots to industry leader</p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              {/* Timeline marker */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                {index < milestones.length - 1 && <div className="w-1 h-20 bg-border mt-4" />}
              </div>

              {/* Content */}
              <div className="pb-8">
                <div className="text-sm font-semibold text-secondary mb-1">{milestone.period}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground text-sm">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-6">Our Core Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Entrepreneurship", "Vision", "Leadership", "Resilience", "Teamwork", "Agility"].map((value) => (
              <div key={value} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
