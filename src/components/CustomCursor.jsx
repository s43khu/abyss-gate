"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const requestRef = useRef(null);

  const dotSize = 8;
  const outlineSize = 32;

  useEffect(() => {
    mouse.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    pos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const dot = dotRef.current;
    const outline = outlineRef.current;

    if (!dot || !outline) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      gsap.to(dot, {
        duration: 0.15,
        x: mouse.current.x,
        y: mouse.current.y,
        ease: "power3.out",
      });
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      gsap.set(outline, {
        x: pos.current.x - outlineSize / 2,
        y: pos.current.y - outlineSize / 2,
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: "white",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      <div
        ref={outlineRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: outlineSize,
          height: outlineSize,
          borderRadius: "50%",
          border: "2px solid white",
          pointerEvents: "none",
          transform: "translate(0, 0)",
          zIndex: 9998,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
    </>
  );
}
