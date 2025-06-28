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
                      image={`https://picsum.photos/seed/abyss1/1200/800`}
                      content="Deep within the digital realm, a team of visionary developers discovered the gateway to infinite possibilities. This wasn't just another project - it was the beginning of a new era in web development, where creativity meets cutting-edge technology."
                      year="2023"
                      category="Discovery"
                    />
                  </section>
                  <section className="horizontal w-screen h-full text-white flex-shrink-0">
                    <StoryBlock
                      title="The Breakthrough"
                      image={`https://picsum.photos/seed/abyss2/1200/800`}
                      content="Months of experimentation led to the breakthrough that would change everything. Advanced animations, seamless interactions, and immersive experiences became reality. The AbyssGate was no longer just a concept - it was a living, breathing digital experience."
                      flip
                      year="2024"
                      category="Innovation"
                    />
                  </section>
                  <section className="horizontal w-screen h-full text-white flex-shrink-0">
                    <StoryBlock
                      title="The Legacy"
                      image={`https://picsum.photos/seed/abyss3/1200/800`}
                      content="Today, AbyssGate stands as a testament to what's possible when passion meets technology. Every scroll, every animation, every interaction tells a story of innovation and dedication. The legacy continues to inspire the next generation of digital creators."
                      year="2024"
                      category="Legacy"
                    />
                  </section>
                </div>
              </section>

              {/* About Section */}
              <About />

              {/* Contact Section */}
              <Contact />

              {/* Footer */}
              <section className="w-screen min-h-screen text-white flex items-center justify-center">
                <div className="text-center space-y-8">
                  <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Legacy Continues...
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    The journey never ends. Every discovery leads to new
                    possibilities, every innovation opens new doors. The future
                    is waiting to be written.
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
              </section>
            </div>
          </div>
        </ClickSpark>
      </div>
    </SoundProvider>
  );
}
