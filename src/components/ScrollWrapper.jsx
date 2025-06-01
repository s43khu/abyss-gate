"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollWrapper({
  children,
  direction = "vertical",
  start = "top top",
  end, 
}) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (direction === "horizontal") {
        const scrollWidth = scrollRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const horizontalScrollLength = scrollWidth - viewportWidth;

        const tween = gsap.to(scrollRef.current, {
          x: -horizontalScrollLength,
          ease: "none",
          paused: true,
        });

        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start: start,
          end: `+=${horizontalScrollLength}`, 
          pin: true,
          scrub: true,
          anticipatePin: 1,
          animation: tween,
          invalidateOnRefresh: true, 
        });
      } else {
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start,
          end: end || "bottom bottom",
          scrub: 1,
          snap: 1 / (containerRef.current.children.length - 1),
          invalidateOnRefresh: true,
        });
      }
    }, containerRef);

    return () => {
      scrollTriggerRef.current?.kill();
      ctx.revert();
    };
  }, [direction, start, end]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden"
    >
      <div
        ref={scrollRef}
        className={`flex ${
          direction === "horizontal" ? "flex-row" : "flex-col"
        } h-full w-full`}
        style={{
          width: direction === "horizontal" ? "max-content" : "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
