export default function Footer() {
  return (
    <footer className="bg-[#0B2C4D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#F28C28]">Broadway Links Pvt. Ltd.</h3>
            <p className="text-sm text-gray-200">Infrastructure and construction solutions for India's development.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-[#F28C28] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F28C28] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#sectors" className="hover:text-[#F28C28] transition-colors">
                  Our Sectors
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F28C28] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-sm text-gray-200">Email: broadwaylink@rediffmail.com</p>
            <p className="text-sm text-gray-200">Phone: +91-9876-543-210</p>
          </div>

          {/* Office Address */}
          <div>
            <h4 className="font-bold mb-4">Office</h4>
            <p className="text-sm text-gray-200">
              HEAD OFFICE: AT. SRI KRISHNA NAGAR, P.O.+DIST.- BEGUSARAI-851101 (BIHAR)
              <br />
              Pan-India Operations
            </p>
          </div>
        </div>

        <div className="border-t border-[#F28C28] pt-8">
          <p className="text-sm text-center text-gray-200">&copy; 2025 Broadway Links Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
