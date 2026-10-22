"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import SceneComet from "@/components/SceneComet";
import ScrollAnimations from "@/components/ScrollAnimations";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Products from "@/components/Products";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <SmoothScroll />
      <SceneComet />
      <ScrollAnimations />

      <Header onOpenContact={() => setDialogOpen(true)} />

      <main>
        <Hero onOpenContact={() => setDialogOpen(true)} />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Products />
        <CTA />
        <Contact />
      </main>

      <Footer />

      <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />

      {/* Scroll progress bar */}
      <div data-progress className="scroll-bar" />
    </>
  );
}
