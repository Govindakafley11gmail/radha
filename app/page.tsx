"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TopNavbar from "@/component/navbar";
import Navbar from "@/component/website/navbar";
import NavContent from "@/component/website/NavContent";

export default function HomeHero() {
  return (
  <div>
    <Navbar />
    <NavContent />
  </div>
  );
}
