'use client';
import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const phrases = [
  "Sony Interior Studio",
  "Crafting Timeless Spaces",
  "Bespoke Design Solutions",
  "Inspired By Elegance",
  "Transforming Your Vision"
];

export default function Description() {
  return (
    <div className="relative text-darkGray text-[3vw] uppercase mt-[-10vh] ml-[10vw]">
      {phrases.map((phrase, index) => (
        <AnimatedText key={index}>{phrase}</AnimatedText>
      ))}
    </div>
  );
}

function AnimatedText({ children }: { children: ReactNode }) {
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end end"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <motion.p ref={textRef} className="m-0 relative" style={{ opacity, x }}>
      {children}
    </motion.p>
  );
}