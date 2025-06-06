import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./About";
import AnimatedTitle from "./AnimatedTitle";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Your Barrberbudy SVG component
const BarrberbudySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 1500 300"
  >
    <defs>
      <style>
        {`
        .st0 {
          fill: #fff; /* White fill for the text */
          font-family: 'Inter', sans-serif;
          font-size: 220px;
          font-weight: bold;
        }
        `}
      </style>
    </defs>
    <g id="Barrberbudy_Text">
      {/* Text positioned to be horizontally centered and clearly visible vertically */}
      <text x="750" y="220" textAnchor="middle" className="st0">
        Hello!!
      </text>
    </g>
  </svg>
);

const Exp = () => {
  const mainAnimationContainerRef = useRef(null); // This div will be pinned
  const svgWrapperRef = useRef(null); // Wrapper for the SVG, to animate its scale/opacity

  useEffect(() => {
    // Ensure refs are available
    if (!mainAnimationContainerRef.current || !svgWrapperRef.current) {
      console.warn("Refs not ready for GSAP animation.");
      return;
    }

    // --- Initial States ---
    // Ensure the SVG starts fully visible and at its base scale
    gsap.set(svgWrapperRef.current, { scale: 1, autoAlpha: 1 });

    // --- GSAP Timeline with ScrollTrigger ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainAnimationContainerRef.current, // The element that controls the scroll animation
        start: "top top", // Animation starts when the top of this div hits the top of the viewport
        end: "bottom top", // Animation ends when the bottom of this div hits the top of the viewport
        scrub: true, // Links animation progress to scroll position
        pin: true, // Pins the mainAnimationContainerRef during the animation
        pinSpacing: false, // Prevents extra space after pinning
        // markers: true, // Uncomment for debugging scroll trigger points in the browser
      },
    });

    // --- Animations ---
    // 1. Animate the SVG's scale: it expands throughout the scroll
    tl.to(
      svgWrapperRef.current,
      {
        scale: 20, // Expands significantly
        ease: "power2.inOut",
      },
      0
    ); // Scale animation starts at 0 and implicitly finishes at the end of the timeline (1.0)

    // 2. Animate the SVG's autoAlpha: fade it out completely and very quickly
    tl.to(
      svgWrapperRef.current,
      {
        autoAlpha: 0, // Ensures complete visual disappearance (sets visibility: hidden at opacity 0)
        ease: "power2.inOut",
      },
      0.05
    ); // <--- IMPORTANT CHANGE: autoAlpha animation now completes at 5% of scroll progress
    // This makes it fade out extremely fast, ensuring it's gone early.
    // Removed onComplete to allow smooth reversal.

    // Clean up ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    // Main container for the entire scroll experience.
    // Its min-height determines how much scroll distance is needed for the animation.
    <>
      <div
        ref={mainAnimationContainerRef}
        className="relative min-h-[200vh] font-sans bg-black text-white "
      >
        {/* Barrberbudy SVG - fixed, initially prominent, then zooms and fades */}
        {/* z-index 20 ensures it's above any potential future content */}
        <div
          ref={svgWrapperRef}
          className="fixed bottom-150 inset-0 flex items-center justify-center z-20"
        >
          <BarrberbudySVG />
        </div>

        <div className="min-h-96 bg-blue-500"></div>

        {/* No other content in this step */}
      </div>
      <AnimatedTitle
        title="Hello Everyone <br />I am Rahul"
        containerClass="mt-5 !text-black text-center"
      />
      <section className="min-h-96 bg-blue-500" />
    </>
  );
};

export default Exp;
