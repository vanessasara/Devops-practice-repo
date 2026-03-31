'use client';
import { useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image1 from '@/assets/images/1.jpg';
import Image2 from '@/assets/images/2.jpg';
import Image3 from '@/assets/images/3.jpg';
import Image4 from '@/assets/images/4.jpg';

const projects = [
  {
    title: 'Modern Loft',
    src: Image1,
  },
  {
    title: 'Minimalist Studio',
    src: Image2,
  },
  {
    title: 'Luxury Villa',
    src: Image3,
  },
  {
    title: 'Cozy Apartment',
    src: Image4,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (container.current && imageContainer.current) {
      const containerHeight = container.current.offsetHeight;
      ScrollTrigger.create({
        trigger: imageContainer.current,
        pin: true,
        start: 'top top+=100px',
        end: () => `+=${containerHeight - window.innerHeight}`,
        pinSpacing: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={container} className="relative text-black mt-[10vh] px-[5%] md:px-[10%]">
      <div className="flex flex-col md:flex-row min-h-[60vh] md:h-[80vh] justify-between gap-[5%]">
        <div ref={imageContainer} className="relative h-[50vh] md:h-[80vh] w-full md:w-[40%] z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative h-full w-full"
            >
              <Image
                src={projects[selectedProject].src}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                alt={projects[selectedProject].title}
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-[5vh] md:mt-0 flex flex-col md:flex-row gap-[5%] w-full md:w-[55%]">
          <div className="w-full md:w-[50%] text-[4vw] md:text-[1.6vw] leading-relaxed">
            <p>Our designs feature premium materials like polished wood, sleek metals, and soft textiles, creating spaces that blend elegance with comfort.</p>
          </div>
          <div className="w-full md:w-[50%] text-[4vw] md:text-[1.6vw] leading-relaxed flex items-end">
            <p>From space planning and 3D visualization to bespoke furniture and full project management, we deliver tailored solutions for residential and commercial spaces.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col relative mt-[10vh] md:mt-[15vh]">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseOver={() => setSelectedProject(index)}
            className="w-full text-darkGray uppercase text-[6vw] md:text-[3vw] border-b border-primary flex justify-end hover:bg-gray-100 transition-colors duration-300"
          >
            <h2 className="m-0 my-[20px] md:my-[40px] cursor-pointer">{project.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}