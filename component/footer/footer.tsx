"use client";

import { Facebook, Twitter, Youtube, Instagram, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">AGENCE.</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Auctor blandit dolorem primis eius odio soluta molestie? Malesuada
            elementum aut doloremque labo.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            {["About us", "Careers", "News & Articles", "Legal Notice"].map((item, i) => (
              <li key={i}>
                <Link href="#" className="hover:text-orange-400 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            {["Help Center", "Contact Us", "Payment Center", "Parent Community"].map((item, i) => (
              <li key={i}>
                <Link href="#" className="hover:text-orange-400 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Information</h3>
          <p className="text-sm text-gray-400 mb-4">
            Feel free to contact and reach us!
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-orange-500" />
              <span>3557 Derek Drive, Florida</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={16} className="text-orange-500" />
              <span>+1(456)657-887, 01 2599 12</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={16} className="text-orange-500" />
              <span>info@domain.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        Copyright © 2023 Agence. All rights reserved.
      </div>
    </footer>
  );
}