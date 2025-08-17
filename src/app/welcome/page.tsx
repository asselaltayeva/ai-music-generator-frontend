"use client";

// React and Next.js imports
import Link from "next/link";
import { useRef } from "react";

// Animation and motion libraries
import { motion, useScroll, useTransform } from "framer-motion";

// UI components

// Icons
import { FileText, Music, Palette, Sparkles } from "lucide-react";
import LightRays from "~/components/ui/Backgrounds/LightRays/LightRays";
import HorizontalFlagScroller from "~/components/ui/Components/InfiniteScroll/Flags";
import NavHeader from "~/components/ui/Components/NavHeader";
import SpotlightCard from "~/components/ui/Components/SpotlightCard/SpotlightCard";
import TextType from "~/components/ui/TextAnimations/TextType/TextType";
// import HeroAnimation from "~/components/ui/Components/HeroAnimation";

function LiquidGlassHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress into visual effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 md:pt-16"
      style={{ y, opacity }}
    >
      {/* Background Light Rays */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FFD1DD"
          raysSpeed={0.6}
          lightSpread={0.7}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.08}
          distortion={0.03}
          className="w-full h-full"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-black/20" />

      {/* Centered Main Content */}
      <div className="relative z-20 mx-auto max-w-3xl px-4 text-center">
        {/* Welcome Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-md"
        >
          Make Your Own Music
        </motion.div>

        {/* Main Headline */}
        <div className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-6xl">
          <div className="h-[4.5rem] sm:h-[5.5rem] md:h-[6.5rem] flex items-center justify-center">
            <TextType
              text={[
                "Make a smooth jazz track about cats",
                "Make a chill lofi beat about the ocean",
                "Make a motivating song about hard work",
                "Make a funky pop tune inspired by summer vibes",
              ]}
              typingSpeed={85}
              pauseDuration={1000}
              initialDelay={800}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          Choose your favorite genre and style. Let AI generate lyrics or use your own words to turn it into a complete song in minutes
        </motion.p>

        {/* Call-to-Action Input */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto flex w-full max-w-xl items-center rounded-full bg-white/5 px-2 py-2 shadow-lg backdrop-blur-md"
        >
          <input
            type="text"
            placeholder="Type any idea you have"
            className="flex-1 bg-transparent px-4 py-2 text-base text-white focus:outline-none rounded-full"
          />
          <Link href="/auth/sign-in">
            <button className="ml-2 rounded-full bg-white px-6 py-2 text-black font-semibold shadow-md transition hover:bg-gray-100">
              Create
            </button>
          </Link>
        </motion.div>

        <div className="mt-20 ">
          <HorizontalFlagScroller />
        </div>

      </div>
    </motion.div>
  );
}

function FloatingFeatureCards() {
  // Feature data with icons, descriptions, and gradient colors
  const features = [
    {
      title: "Genre-Adaptive Generation",
      description: "Create songs in any genre from pop to lo-fi to metal",
      icon: Music,
      gradient: "from-purple-500 to-blue-600",
    },
    {
      title: "Style Customization",
      description: "Mimic moods, vibes, or artist-inspired styles",
      icon: Palette,
      gradient: "from-blue-500 to-teal-600",
    },
    {
      title: "Lyric-to-Melody",
      description: "Transform your lyrics into full melodies and vocals in seconds",
      icon: FileText,
      gradient: "from-teal-500 to-green-600",
    },
    {
      title: "Prompt-Based Creativity",
      description: "Generate original songs from a simple text prompt",
      icon: Sparkles,
      gradient: "from-green-500 to-yellow-600",
    },
  ];

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="group"
        >
         <SpotlightCard 
         className="relative h-full overflow-hidden border border-white/10 rounded-xl 
         bg-gradient-to-br from-[#1a1b1f]/80 via-[#111214]/70 to-[#1a1b1f]/80 backdrop-blur-xl p-6 before:absolute before:-top-1/2 before:-left-1/2 before:w-[200%] before:h-[200%] 
         before:rotate-[25deg] before:bg-gradient-to-r before:from-transparent before:via-blue-400/10 before:to-transparent 
         before:blur-3xl before:animate-ray">

        {/* Feature Icon */}
        <div
          className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 
          flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
        >
          <feature.icon className="h-6 w-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold text-white">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="leading-relaxed text-white/70">
          {feature.description}
        </p>
      </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Navigation Header */}
      <NavHeader />

      {/* Hero Section with Liquid Glass Effects */}
      <LiquidGlassHero />

      {/* Features Section */}
      <section
        id="features"
        className="relative bg-gradient-to-b from-black to-gray-900 py-24"
      >
      
        <div className="mx-auto max-w-7xl px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Mindblowing Features
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-white/70">
              Everything you need to create professional music for free
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <FloatingFeatureCards />
        </div>
      </section>

      <section
        id="how-it-works"
        className="relative bg-gradient-to-b from-gray-900 to-black py-20"
      >
        {/* Section Header */}
        <div className="container mx-auto max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-white/70">
            From writing the prompt to generating songs in minutes
          </p>

        </motion.div>

        {/* <HeroAnimation/> */}
        </div>
        
      </section>


     
      {/* Call-to-Action Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-black py-16">
        {/* <CTASection /> */}
      </section>
    </main>
  );
}