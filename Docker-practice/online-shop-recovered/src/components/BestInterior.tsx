'use client';
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import Lenis from '@studio-freight/lenis';
import Picture1 from '@/assets/images/4.jpg';
import Picture2 from '@/assets/images/5.jpg';
import Picture3 from '@/assets/images/6.jpg';

const word = "Best Interior";

export default function BestInterior() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });
  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const images = [
    {
      src: Picture1,
      y: 0
    },
    {
      src: Picture2,
      y: lg
    },
    {
      src: Picture3,
      y: md
    }
  ];

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div ref={container} className="mt-[20vh] min-h-[80vh] md:min-h-screen">
      <div className="ml-[5vw] md:ml-[10vw]">
        <motion.h1
          style={{ y: sm }}
          className="m-0 mt-[10px] text-[8vw] leading-[8vw] uppercase md:text-[5vw] md:leading-[5vw]"
        >
          Best Interior
        </motion.h1>
        <h1 className="m-0 mt-[10px] text-[8vw] leading-[8vw] uppercase md:text-[5vw] md:leading-[5vw]">
          Home Decor
        </h1>
        <div className="mt-[10px]">
          <p className="text-primary m-0 text-[5vw] uppercase md:text-[3vw]">
            {word.split("").map((letter, i) => {
              const y = useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -50) - 20]);
              return (
                <motion.span
                  style={{ top: y }}
                  key={`l_${i}`}
                  className="relative inline-block"
                >
                  {letter}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center relative mt-[5vh] md:mt-[10vh]">
        {images.map(({ src, y }, i) => (
          <motion.div
            style={{ y }}
            key={`i_${i}`}
            className={`absolute 
              ${i === 0 ? 'h-[40vh] w-[60vw] z-[1] md:h-[60vh] md:w-[50vh]' :
                i === 1 ? 'left-[10vw] top-[20vh] h-[30vh] w-[40vw] z-[2] md:left-[55vw] md:top-[15vh] md:h-[40vh] md:w-[30vh]' :
                  'left-[20vw] top-[45vh] h-[20vh] w-[30vw] z-[3] md:left-[27.5vw] md:top-[40vh] md:h-[25vh] md:w-[20vh]'}`}
          >
            <Image
              src={src}
              placeholder="blur"
              alt="image"
              fill
              sizes="(max-width: 768px) 60vw, 50vh"
              className="object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}