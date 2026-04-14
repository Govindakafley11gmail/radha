"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, ArrowUpRight, Menu } from "lucide-react";

const topStories = [
  {
    id: 1,
    title: "Mountains and Boat: A Perfect Harmony",
    category: "Nature",
    image: "/1ParoDzong.jpg",
    readTime: "4 min",
  },
  {
    id: 2,
    title: "Unveiling the Timeless Charm of Old Street Buildings",
    category: "Architecture",
    image: "/1ParoDzong.jpg",
    readTime: "6 min",
  },
  {
    id: 3,
    title: "Whispering Trees and the Enchanting Moon",
    category: "Travel",
    image: "/1ParoDzong.jpg",
    readTime: "5 min",
  },
];

const featuredCards = [
  {
    id: 1,
    image: "/1ParoDzong.jpg",
    author: "Candice Wu",
    date: "15 Jan 2022",
    category: "Urban",
    title: "The Pulse of the City Unfolds on the Fast Lanes",
    excerpt:
      "Embark on an exhilarating ride through the bustling urban highways and city lights.",
    readTime: "5 min read",
  },
  {
    id: 2,
    image: "/1ParoDzong.jpg",
    author: "Alec Whitten",
    date: "17 Jan 2022",
    category: "Science",
    title: "A Cosmic Adventure Underneath the Starlit Canopy",
    excerpt:
      "Explore the mysteries of the cosmos and the beauty of the night sky.",
    readTime: "7 min read",
  },
];


export default function BlogPage() {
  return (
    <div className="min-h-screen pt-10 font-sans text-[#1A1A18]">

      {/* ── HERO ── */}
      <section className="flex justify-center pt-20" >

        {/* Featured article */}
        <article className="">
          <div className="overflow-hidden  mb-6 group">
            <Image
              src="/1ParoDzong.jpg"
              alt="Featured story"
              width={500}
              height={80}
              className=" object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Badge className="rounded-full bg-orange-500 text-white hover:bg-orange-500 text-[10px] font-semibold tracking-widest uppercase px-3 border-0">
              Construction
            </Badge>
            <span className="text-xs text-black font-light">12 April 2024</span>
            <span className="text-xs text-black">·</span>
            <span className="text-xs text-black font-light">8 min read</span>
          </div>

        <div className="w-150">
            <h1 className="font-mono text-bold text-2xl md:text-[2.4rem] font-bold leading-[1.2] tracking-tight text-[#1A1A18] mb-4 max-w-2xl">
            Common Nails – The Quiet Backbone of Modern Construction
          </h1>

          <p className="text-bold text-black  leading-[1.8] mb-6 max-w-xl">
            Metal nails are slender, pointed fasteners made primarily from steel
            or other strong metals. Designed to join pieces of wood and other
            materials, their elegant simplicity makes them one of the most
            widely used construction tools across the world.
          </p>
        </div>

         
        </article>

        {/* Top Stories sidebar */}
        <aside className="hidden lg:flex flex-col pl-10 pt-2">
          <p className="font-extrabold font-mono text-2xl  text-bold  mb-4 pb-3">
            Top Stories
          </p>

          <div className="flex flex-col flex-1">
            {topStories.map((story, index) => (
              <div
                key={story.id}
                className="flex items-start gap-3 py-4 border-b border-[#E2DDD5] last:border-none cursor-pointer group/story"
              >
                <span className="font-serif flex text-white justify-center pt-0.5  h-6 bg-orange-500 rounded-4xl leading-none mt-0.5 w-6 ">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className=" w-70  text-[#1A1A18] text-base font-sans font-bold text-wrap transition-colors  mb-1.5">
                    {story.title}
                  </p>
                  <span className="text-[10px] text-orange-500 ">
                    {story.readTime} read
                  </span>
                </div>
                <div className="shrink-0 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    width={100}
                    height={64}
                    className="w-20 h-20 object-cover transition-transform duration-500 group-hover/story:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* ── SECTION DIVIDER ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9A9590] whitespace-nowrap">
            Latest Articles
          </span>
          <Separator className="flex-1 bg-[#E2DDD5]" />
        </div>
      </div>

      {/* ── CARD GRID ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-16 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {featuredCards.map((card) => {
          const initials = card.author
            .split(" ")
            .map((n) => n[0])
            .join("");
          return (
            <Card
              key={card.id}
              className="p-0 m-0 group overflow-hidden border border-[#E2DDD5] bg-white  shadow-none hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#1A1A18]/[0.07] transition-all duration-300 cursor-pointer"
            >
              <div className="overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={700}
                  height={240}
                  className="w-full h-[210px] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <CardContent className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Badge className="rounded-full bg-orange-500 text-white hover:bg-[#EDE8DF] text-[10px] font-semibold tracking-widest uppercase px-3 border-0">
                    {card.category}
                  </Badge>
                  <span className="text-[11px] text-[#9A9590] font-light">
                    {card.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold leading-snug text-[#1A1A18] group-hover:text-white transition-colors line-clamp-2">
                  {card.title}
                </h2>

                <p className="text-sm text-black font-light leading-relaxed line-clamp-2">
                  {card.excerpt}
                </p>

                <Separator className="bg-[#F0ECE6]" />

                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-[10px] font-medium text-[#5C5A55] bg-[#D4CBBC]">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium text-[#3D3C38] leading-none">
                        {card.author}
                      </p>
                      <p className="text-[10px] text-[#9A9590] mt-0.5">{card.date}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#D4CBBC] flex items-center justify-center text-white transition-all duration-200 group-hover:bg-[#1A1A18] group-hover:border-[#1A1A18] group-hover:text-[#F7F5F0]">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

    </div>
  );
}