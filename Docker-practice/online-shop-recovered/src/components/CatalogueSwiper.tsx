'use client';
import React, { useRef, useEffect } from 'react';
import img1 from '@/assets/images/img_1.jpg';
import img2 from '@/assets/images/img_2.jpg';
import img3 from '@/assets/images/img_3.jpg';
import img4 from '@/assets/images/img_4.jpg';
import img5 from '@/assets/images/img_5.jpg';
import img6 from '@/assets/images/img_6.jpg';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

// Define the type for each item
interface CarouselItem {
  id: number;
  from: string;
  name: string;
  type: string;
  image: { src: string }; // Type for Next.js image imports
}

// Define the items array
const items: CarouselItem[] = [
  { id: 1, from: 'Dak Lak', name: 'Núi đá voi DakLak', type: 'Leo núi', image: img1 },
  { id: 2, from: 'Dak Lak', name: 'Núi đá voi DakLak', type: 'Leo núi', image: img2 },
  { id: 3, from: 'Dak Lak', name: 'Núi đá voi DakLak', type: 'Leo núi', image: img3 },
  { id: 4, from: 'Dak Lak', name: 'Núi đá voi DakLak', type: 'Leo núi', image: img4 },
  { id: 5, from: 'Dak Lak', name: 'Núi đá voi DakLak', type: 'Leo núi', image: img5 },
  { id: 6, from: 'Dak Lak', name: 'Núi đá voi DakLak', type: 'Leo núi', image: img6 },
];

const CatalogueSwiper: React.FC = () => {
  const slideRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (slideRef.current) {
      const lists = slideRef.current.querySelectorAll('.item');
      slideRef.current.appendChild(lists[0]);
    }
  };

  const handlePrev = () => {
    if (slideRef.current) {
      const lists = slideRef.current.querySelectorAll('.item');
      slideRef.current.prepend(lists[lists.length - 1]);
    }
  };

  // Apply initial styles to match :nth-child selectors
  useEffect(() => {
    const updateStyles = () => {
      if (slideRef.current) {
        const lists = slideRef.current.querySelectorAll('.item');
        lists.forEach((item, index) => {
          // Reset classes to avoid accumulation
          item.classList.remove(
            'item-1',
            'item-2',
            'item-3',
            'item-4',
            'item-5-plus'
          );

          // Apply classes based on DOM position
          if (index === 0) {
            item.classList.add('item-1');
          } else if (index === 1) {
            item.classList.add('item-2');
          } else if (index === 2) {
            item.classList.add('item-3');
          } else if (index === 3) {
            item.classList.add('item-4');
          } else {
            item.classList.add('item-5-plus');
          }
        });
      }
    };

    // Initial style application
    updateStyles();

    // Update styles after DOM changes
    const slideElement = slideRef.current;
    slideElement?.addEventListener('DOMNodeInserted', updateStyles);
    slideElement?.addEventListener('DOMNodeRemoved', updateStyles);

    return () => {
      slideElement?.removeEventListener('DOMNodeInserted', updateStyles);
      slideElement?.removeEventListener('DOMNodeRemoved', updateStyles);
    };
  }, []);

  return (
    <div className=" relative w-[1000px] h-[600px]  p-12 mx-auto mt-20 overflow-hidden">
      <h1 className='text-center text-2xl font-bold mb-6'>
        ABC interior
      </h1>
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
      >
        <BiLeftArrow size={24} />
      </button>
      <div ref={slideRef} >
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            style={{ backgroundImage: `url(${item.image.src})` }}
          >
            <div className="content">
              <div className="from">{item.from}</div>
              <div className="name">{item.name}</div>
              <div className="type">{item.type}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-200"
      >
        <BiRightArrow size={24} />
      </button>
    </div>



  );
};

export default CatalogueSwiper;