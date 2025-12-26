"use client"

const clientCategories = [
  {
    category: "Government Clients",
    clients: [
      "National Highways Authority of India",
      "Ministry of Road Transport & Highways",
      "Road Construction Department, Govt. of Bihar",
      "Water Resources Department, Govt. of Bihar",
      "Flood Control Department, Govt. of Bihar",
    ],
  },
  {
    category: "Public Sector",
    clients: ["IRCON International Limited", "Indian Oil Corporation Limited", "Hindustan Urvarak & Rasayan Limited"],
  },
  {
    category: "Private Sector",
    clients: [
      "Technip FMC",
      "Technip Energies",
      "McDermott",
      "Prodair/Air Products",
      "Punj Lloyd",
      "Linde",
      "IVRCL",
      "Lanco Infratech",
      "C&C Constructions Ltd.",
    ],
  },
]

export default function ClientsSection() {
  return (
    <section id="clients" className="section-container bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Clients</h2>
          <p className="section-subtitle">Trusted by major government, public sector, and private enterprises</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-primary mb-6">{category.category}</h3>
              <ul className="space-y-3">
                {category.clients.map((client, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground">{client}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
