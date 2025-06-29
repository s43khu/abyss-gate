"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/sections/Hero";
import StoryBlock from "@/sections/StoryBlock";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { SoundProvider } from "@/components/SoundManager";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import AuroraBackground from "@/animations/VantaBirdsBackground";
import ClickSpark from "@/animations/ClickSpark";
import Blightvault from "@/components/Blightvault";
import Demonpipe from "@/components/Demonpipe";
import AbyssKeeper from "@/components/AbyssKeeper";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [panels, setPanels] = useState(0);
  const component = useRef(null);
  const horizontalSlider = useRef(null);

  console.log(
    "Home component render - isLoading:",
    isLoading,
    "isReady:",
    isReady
  );

  useLayoutEffect(() => {
    console.log("Home useLayoutEffect triggered");

    // Wait for the next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      let ctx = gsap.context(() => {
        const panels = gsap.utils.toArray(".horizontal");
        console.log("Found panels:", panels.length);
        setPanels(panels.length);

        if (panels.length > 0 && horizontalSlider.current) {
          const totalWidth = panels.length * 100;
          console.log("Setting total width to:", totalWidth);

          gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSlider.current,
              pin: true,
              scrub: 1,
              snap: 1 / (panels.length - 1),
              start: "top top",
              end: () => `+=${(panels.length - 1) * window.innerWidth}`,
              invalidateOnRefresh: true,
            },
          });
        }
      }, component);

      return () => ctx.revert();
    });
  }, []);

  useEffect(() => {
    console.log("Home useEffect for resize listener");
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Home useEffect for ScrollSmoother - isLoading:", isLoading);
    if (!isLoading) {
      // Initialize ScrollSmoother after loading is complete
      setTimeout(() => {
        console.log("Creating ScrollSmoother");
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          effects: true,
        });
        setIsReady(true);
      }, 100);
    }

    return () => {
      if (isReady) {
        console.log("Killing ScrollSmoother");
        ScrollSmoother.get()?.kill();
      }
    };
  }, [isLoading, isReady]);

  const handleLoadingComplete = () => {
    console.log("Loading complete callback triggered!");
    setIsLoading(false);
  };

  return (
    <SoundProvider>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <CustomCursor />
        <Navbar />
        <AuroraBackground />

        {/* Abyss Keeper (Overlay) - Outside ScrollSmoother */}
        <AbyssKeeper />

        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={25}
          sparkCount={8}
          duration={400}
        >
          <div id="smooth-wrapper" className="overflow-hidden">
            <div ref={component} className="relative z-10" id="smooth-content">
              {/* Hero Section */}
              <section className="text-white">
                <Hero />
              </section>

              {/* Story Section */}
              <section id="story" className="text-white">
                <div
                  ref={horizontalSlider}
                  className="flex h-screen"
                  style={{ width: `${panels * 100}vw` }}
                >
                  <section className="horizontal w-screen h-full text-white flex-shrink-0">
                    <StoryBlock
                      title="The Discovery"
                      image={`https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=800&fit=crop&crop=center`}
                      content="Deep within the digital realm, I discovered the forbidden gateway - the AbyssGate. This wasn't just another coding project - it was the beginning of my pact with the abyss, where cursed relics and bound souls would power the future of digital experiences."
                      year="2023"
                      category="Discovery"
                    />
                  </section>
                  <section className="horizontal w-screen h-full text-white flex-shrink-0">
                    <StoryBlock
                      title="The Breakthrough"
                      image={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&crop=center`}
                      content="Months of relentless coding and experimentation led to breakthroughs in the forbidden arts of web development. Advanced animations, seamless interactions, and immersive experiences became reality through my pact with the abyss."
                      flip
                      year="2024"
                      category="Innovation"
                    />
                  </section>
                  <section className="horizontal w-screen h-full text-white flex-shrink-0">
                    <StoryBlock
                      title="The Legacy"
                      image={`https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&crop=center`}
                      content="Today, AbyssGate stands as a testament to my growth as a developer and what's possible with modern web technologies. Every scroll, every animation, every interaction demonstrates my technical skills and creative vision while embracing the dark aesthetic of cursed relics and eternal pacts."
                      year="2024"
                      category="Legacy"
                    />
                  </section>
                </div>
              </section>

              {/* About Section */}
              <About />

              {/* Blightvault Section */}
              <section id="blightvault">
                <Blightvault />
              </section>

              {/* Demonpipe Section */}
              <section id="demonpipe">
                <Demonpipe />
              </section>

              {/* Contact Section */}
              <Contact />

              {/* Footer */}
              <section className="w-screen py-20 text-white flex items-center justify-center relative">
                <div className="text-center space-y-8">
                  <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Enter the Abyss, Exit Immortal
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    The journey through the forbidden realm never ends. Every
                    discovery leads to new possibilities, every innovation opens
                    new doors to cursed knowledge. The future awaits those brave
                    enough to cross the AbyssGate.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>

                {/* Signature */}
                <div className="absolute bottom-8 left-8 text-left">
                  <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <p className="text-sm text-gray-400 mb-1">
                      Made with cursed relics by
                    </p>
                    <p className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      Shekhu
                    </p>

                    <a
                      href="https://github.com/s43khu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    >
                      github.com/s43khu
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </ClickSpark>
      </div>
    </SoundProvider>
  );
}
