"use client"

import { Building2, Award, Users, Zap } from "lucide-react"

const stats = [
  {
    icon: Award,
    title: "ISO 9001:2015 Certified",
    description: "Maintaining highest quality standards since 2001",
  },
  {
    icon: Building2,
    title: "Order Book: ₹12,528 Million",
    description: "Strong portfolio from government and private sector",
  },
  {
    icon: Zap,
    title: "Automated Equipment Fleet",
    description: "Leading fleet ownership with industry-leading machinery",
  },
  {
    icon: Users,
    title: "Trusted Partners",
    description: "Serving major government and corporate clients",
  },
]

export default function CompanyIntroSection() {
  return (
    <section id="about" className="section-container bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">About Broadway Links Pvt. Ltd.</h2>
          <p className="section-subtitle">
            Incorporated in 2001, BLPL is headquartered in Begusarai, Bihar, and has established itself as a trusted
            leader in construction and infrastructure development.
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12 text-foreground">
          <p className="text-center text-base leading-relaxed">
            With a strong focus on quality, environmental management, and occupational health & safety, we deliver
            comprehensive solutions across multiple sectors. Our success is built on entrepreneurship, far-sighted
            vision, dynamic leadership, and the ability to overcome challenges through calculated risk-taking and agile
            teamwork.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{stat.title}</h3>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
