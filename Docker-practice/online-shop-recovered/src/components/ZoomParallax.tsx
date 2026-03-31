'use client';
import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import Picture1 from '@/assets/images/1.jpg';
import Picture2 from '@/assets/images/2.jpg';
import Picture3 from '@/assets/images/3.jpg';
import Picture4 from '@/assets/images/4.jpg';
import Picture5 from '@/assets/images/5.jpg';
import Picture6 from '@/assets/images/6.jpg';
import Picture7 from '@/assets/images/7.jpg';

export default function ZoomParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const picturesData = [
    {
      src: Picture1,
      scale: scale4,
      imageContainerClass: 'relative w-[25vw] h-[25vh]'
    },
    {
      src: Picture2,
      scale: scale5,
      imageContainerClass: 'relative top-[-30vh] left-[5vw] w-[35vw] h-[30vh]'
    },
    {
      src: Picture3,
      scale: scale6,
      imageContainerClass: 'relative top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]'
    },
    {
      src: Picture4,
      scale: scale5,
      imageContainerClass: 'relative left-[27.5vw] w-[25vw] h-[25vh]'
    },
    {
      src: Picture5,
      scale: scale6,
      imageContainerClass: 'relative top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]'
    },
    {
      src: Picture6,
      scale: scale8,
      imageContainerClass: 'relative top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]'
    },
    {
      src: Picture7,
      scale: scale9,
      imageContainerClass: 'relative top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]'
    }
  ];

  useEffect(() => {
    const lenis = new Lenis();
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={container} className="h-[300vh] relative">
      <motion.h1
        className="absolute top-[5vh] left-[5vw] md:left-[10vw] text-[8vw] md:text-[5vw] uppercase text-darkGray z-10 "
      >
        Recent Projects 
      </motion.h1>
      <div className="sticky top-0 h-screen overflow-hidden">
        {picturesData.map(({ src, scale, imageContainerClass }, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className="w-full h-full absolute top-0 flex items-center justify-center"
          >
            <div className={imageContainerClass}>
              <Image
                src={src}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="image"
                placeholder="blur"
                className="object-cover rounded-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}