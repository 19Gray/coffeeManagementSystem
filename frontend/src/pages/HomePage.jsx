"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiMenu,
  FiX,
  FiBarChart2,
  FiBox,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiLock,
  FiArrowRight,
  FiCheck,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi"

export default function HomePage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#e8f5e9] to-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/great-rift-logo.png" alt="Great Rift Coffee" className="h-10 w-auto" />
            <h1 className="text-xl font-bold text-[#2e7d32] hidden sm:block">Great Rift Coffee</h1>
          </div>

          <button className="md:hidden text-2xl text-[#2e7d32] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <ul
            className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-6 absolute md:static top-full left-0 right-0 md:top-auto bg-white md:bg-transparent p-4 md:p-0 w-full md:w-auto shadow-md md:shadow-none`}
          >
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className="hover:text-[#2e7d32] transition font-medium"
              >
                Features
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")} className="hover:text-[#2e7d32] transition font-medium">
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-[#2e7d32] transition font-medium"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                className="bg-[#2e7d32] text-white px-4 py-2 rounded-lg hover:bg-[#1b5e20] transition font-medium flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                Login <FiArrowRight size={16} />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Transform Your Coffee Farm Management</h1>
          <p className="text-lg text-gray-600 mb-6">
            Enterprise-grade technology to optimize production, track inventory, and manage your team efficiently across
            all roles.
          </p>
          <button
            className="bg-[#2e7d32] text-white px-8 py-3 rounded-lg hover:bg-[#1b5e20] transition text-lg font-semibold flex items-center gap-2"
            onClick={() => navigate("/login")}
          >
            Get Started <FiArrowRight size={20} />
          </button>
        </div>
        <div>
          <img
            src="/coffee-farm-landscape-with-workers-and-plants.jpg"
            alt="Coffee farm management"
            className="rounded-xl shadow-lg w-full h-80 object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Powerful Features</h2>
          <p className="text-lg text-gray-600">Everything you need to manage your coffee production</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FiBarChart2,
              title: "Real-Time Analytics",
              desc: "Monitor production metrics and track farm performance with comprehensive dashboards tailored to your role",
            },
            {
              icon: FiBox,
              title: "Inventory Management",
              desc: "Track coffee beans, supplies, and equipment with precision. Never run out of stock again",
            },
            {
              icon: FiUsers,
              title: "Team Coordination",
              desc: "Assign and manage tasks for your team. Ensure everyone knows their responsibilities",
            },
            {
              icon: FiTarget,
              title: "Production Planning",
              desc: "Plan and optimize your coffee production cycles with data-driven insights",
            },
            {
              icon: FiTrendingUp,
              title: "Performance Reports",
              desc: "Generate detailed reports on production, efficiency, and profitability",
            },
            {
              icon: FiLock,
              title: "Secure & Reliable",
              desc: "Enterprise-grade security with role-based access control for your peace of mind",
            },
          ].map((feature, idx) => {
            const IconComponent = feature.icon
            return (
              <div
                key={idx}
                className="bg-[#e8f5e9] p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-200"
              >
                <div className="text-4xl mb-4 text-[#2e7d32]">
                  <IconComponent size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center border-t border-gray-200">
        <div>
          <img
            src="/coffee-beans-harvesting-equipment.jpg"
            alt="Coffee harvesting"
            className="rounded-xl shadow-lg w-full h-96 object-cover"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Great Rift?</h2>
          <ul className="space-y-4">
            {[
              {
                title: "Increased Efficiency",
                desc: "Automate routine tasks and streamline workflows to boost productivity",
              },
              {
                title: "Data-Driven Decisions",
                desc: "Make informed decisions with real-time data and comprehensive analytics",
              },
              { title: "Cost Reduction", desc: "Optimize resources and reduce waste to improve your bottom line" },
              {
                title: "Better Quality Control",
                desc: "Maintain consistent quality standards across all production batches",
              },
            ].map((benefit, idx) => (
              <li key={idx} className="flex gap-4">
                <span className="text-[#2e7d32] text-2xl font-bold flex-shrink-0">
                  <FiCheck size={24} />
                </span>
                <div>
                  <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#e8f5e9] py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Great Rift Coffee</h2>
            <p className="text-gray-600 mb-4">
              We're dedicated to helping coffee farmers and agricultural professionals succeed in the modern era. Our
              platform combines cutting-edge technology with practical features designed specifically for coffee farm
              management.
            </p>
            <p className="text-gray-600">
              With support for multiple user roles—from farm workers to CEOs—Great Rift Coffee ensures every team member
              has the tools they need to contribute to your farm's success.
            </p>
          </div>
          <div>
            <img
              src="/coffee-roasting-process-close-up.jpg"
              alt="Coffee production"
              className="rounded-xl shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2e7d32] text-white py-16 text-center border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2">Ready to Optimize Your Coffee Farm?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join farmers already using Great Rift Coffee for improved productivity
          </p>
          <button
            className="bg-white text-[#2e7d32] px-8 py-3 rounded-lg hover:bg-gray-100 transition text-lg font-semibold inline-flex items-center gap-2"
            onClick={() => navigate("/login")}
          >
            Start Free Trial <FiArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-lg text-gray-600">We'd love to hear from you</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: FiMail, label: "Email", value: "support@greatrift.com" },
            { icon: FiPhone, label: "Phone", value: "+1 (555) 123-4567" },
            { icon: FiMapPin, label: "Location", value: "Kenya, East Africa" },
          ].map((contact, idx) => {
            const IconComponent = contact.icon
            return (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-4 text-[#2e7d32] mx-auto">
                  <IconComponent size={40} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{contact.label}</h4>
                <p className="text-gray-600">{contact.value}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2e7d32] text-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/great-rift-logo.png" alt="Great Rift Coffee" className="h-8 w-auto filter invert" />
              <h4 className="font-bold text-lg">Great Rift Coffee</h4>
            </div>
            <p className="opacity-90">Smart coffee farm management system</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 opacity-90">
              <li>
                <button onClick={() => scrollToSection("features")} className="hover:opacity-100 transition">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:opacity-100 transition">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="hover:opacity-100 transition">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 opacity-90">
              <li>
                <button className="hover:opacity-100 transition">Privacy Policy</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition">Terms of Service</button>
              </li>
              <li>
                <button className="hover:opacity-100 transition">Contact Support</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white border-opacity-20 pt-8 text-center opacity-90">
          <p>&copy; 2025 Great Rift Coffee Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
