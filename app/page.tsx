"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Scene3D from "@/components/Scene3D";
import SceneCircuit from "@/components/SceneCircuit";
import SceneComet from "@/components/SceneComet";
import FxSwitcher, { isEffect, type Effect } from "@/components/FxSwitcher";
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

const SceneUniverse = dynamic(() => import("@/components/SceneUniverse"), { ssr: false });

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [effect, setEffect] = useState<Effect>("cube");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("fx");
    if (isEffect(q)) setEffect(q);
  }, []);

  function chooseEffect(e: Effect) {
    setEffect(e);
    const url = new URL(window.location.href);
    url.searchParams.set("fx", e);
    window.history.replaceState(null, "", url);
  }

  return (
    <>
      <SmoothScroll />
      {effect === "cube" && <Scene3D />}
      {effect === "circuit" && <SceneCircuit />}
      {effect === "comet" && <SceneComet />}
      {effect === "universe" && <SceneUniverse />}
      <FxSwitcher value={effect} onChange={chooseEffect} />
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
