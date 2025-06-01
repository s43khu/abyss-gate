"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/sections/Hero";
import StoryBlock from "@/sections/StoryBlock";
import CustomCursor from "@/components/CustomCursor";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import VantaBirdsBackground from "@/animations/VantaBirdsBackground";
import ClickSpark from "@/animations/ClickSpark";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [panels, setPanels] = useState(0);
  const component = useRef(null);
  const horizontalSlider = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".horizontal");
      setPanels(panels);
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSlider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () =>
            "+=" + (horizontalSlider.current.scrollWidth - window.innerWidth),
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
    });

    return () => ScrollSmoother.get()?.kill();
  }, []);

  return (
    <>
      <CustomCursor />
      <VantaBirdsBackground />
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={25}
        sparkCount={8}
        duration={400}
      >
        <div id="smooth-wrapper" className="overflow-hidden">
          <div ref={component} className="relative z-10 " id="smooth-content">
            <section className="text-white">
              <Hero />
            </section>

            <div
              ref={horizontalSlider}
              className="flex h-screen"
              style={{ width: `${panels * 100}vw` }}
            >
              <section className="horizontal w-screen h-full text-white flex-shrink-0">
                <StoryBlock
                  title="Discovery in the Desert"
                  image={`https://picsum.photos/seed/picsum1/800/600`}
                  content="In the vast stretches of the desert, visionaries uncovered what would change the world forever."
                />
              </section>
              <section className="horizontal w-screen h-full text-white flex-shrink-0">
                <StoryBlock
                  title="The First Strike"
                  image={`https://picsum.photos/seed/picsum2/800/600`}
                  content="It wasn’t luck. It was years of determination and belief in possibility."
                  flip
                />
              </section>
              <section className="horizontal w-screen h-full text-white flex-shrink-0">
                <StoryBlock
                  title="Modern Impact"
                  image={`https://picsum.photos/seed/picsum3/800/600`}
                  content="From energy to innovation, the legacy continues to shape our future."
                />
              </section>
            </div>

            <section className="w-screen h-screen text-white flex items-center justify-center">
              <p className="text-3xl px-10 text-center">legacy continues...</p>
            </section>
          </div>
        </div>
      </ClickSpark>
    </>
  );
}
