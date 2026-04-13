"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DollarSign,
  Wrench,
  Users,
  Play,
  Facebook,
  Instagram,
  Link,
  Twitter,
  Youtube,
} from "lucide-react";

export default function MissionVisionComponent() {
  const features = [
    {
      icon: DollarSign,
      title: "Best Price Guaranteed",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: Wrench,
      title: "Finance Analysis",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: Users,
      title: "Professional Team",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const teamMembers = [
    {
      name: "Sony Madison",
      role: "CEO, Director",
      img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    },
    {
      name: "Hary Warth",
      role: "Head Manager",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
    {
      name: "Jenny Hobb",
      role: "Branch Manager",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      name: "Johny Smith",
      role: "Supervisor",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center mt-10">
      {/* Header */}
      <div className="flex items-center gap-2 shadow px-4 py-2 rounded mb-6 md:mr-240">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          About Us
        </span>
        <span className="h-2 w-2 rounded-full bg-red-500" />
      </div>

      {/* Intro Section */}
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-6 px-6 mb-14">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            <span className="text-red-500">Introduction</span> To Best
            <br />
            Digital Agency!
          </h2>
        </div>

        <div className="flex-1 text-sm text-gray-500 leading-relaxed">
          <h1 className="font-semibold text-gray-800 mb-1">Mission</h1>
          Harum quisquam amet debitis pariatur quas? Nemo excepturi duis minim
          nostrud officiis dolorem fugit itaque.
        </div>

        <div className="flex-1 text-sm text-gray-500 leading-relaxed">
          Odio velit, odit, est, euismod aliquid luctus pharetra vero,
          condimentum, nostrum mi venenatis.
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 mb-12">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
  <CardContent className="flex items-start gap-4 p-4">
    
    {/* ICON */}
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
        i === 1 ? "bg-gray-900" : "bg-red-500"
      }`}
    >
      <Icon className="h-6 w-6 text-white" />
    </div>

    {/* TEXT */}
    <div className="flex flex-col justify-center">
      <h3 className="font-bold text-gray-900 leading-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-snug mt-1">
        {desc}
      </p>
    </div>

  </CardContent>
</Card>
        ))}
      </div>

      {/* Image + Video Section */}
      <section className="w-full py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-6 items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

          {/* Video */}
          <div className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
              className="w-full h-64 object-cover brightness-75"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white">
                <Play className="h-6 w-6 fill-white" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs font-semibold uppercase text-gray-500">
              Our Team
            </span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            <span className="text-red-500">Team</span> Members
          </h2>

          <p className="text-sm text-gray-500 max-w-md mx-auto mb-10">
            Sint nascetur facere, delectus conubia consequuntur.
          </p>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img src={member.img} className="w-full h-56 object-cover" />

                  {/* Overlay */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-500 px-4 py-2 rounded text-center w-[80%]">
                    <p className="text-white font-bold text-sm">
                      {member.name}
                    </p>
                    <p className="text-xs text-red-100">{member.role}</p>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 py-3">
                  {[Facebook, Twitter, Youtube, Instagram].map((Icon, j) => (
                    <a
                      key={j}
                      href="#"
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
