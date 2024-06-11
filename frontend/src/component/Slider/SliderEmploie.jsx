import React from 'react';
import CardEmploie from '../Card/CardEmploie';
import { useRef, useState, useEffect } from "react";

const SliderEmploie = (data) => {
  const containerRef = useRef(null);
  const [hideLeftButton, setHideLeftButton] = useState(true);
  const [hideRightButton, setHideRightButton] = useState(false);

  const scrollAmount = window.innerWidth * 0.5; 

  const smoothScroll = (element, to, duration) => {
    const start = element.scrollLeft;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  };

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const handleScrollLeft = () => {
    const container = containerRef.current;
    smoothScroll(container, container.scrollLeft - scrollAmount, 500);
  };

  const handleScrollRight = () => {
    const container = containerRef.current;
    smoothScroll(container, container.scrollLeft + scrollAmount, 500);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setHideLeftButton(scrollLeft === 0);
    setHideRightButton(scrollWidth <= clientWidth + scrollLeft);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative transition-transform ease-in-out duration-300">
      <div
        onClick={handleScrollLeft}
        className={`absolute top-1/2 z-50 flex h-full w-10 -translate-y-1/2 transform cursor-pointer items-center opacity bg-transparent ${hideLeftButton ? "hidden" : ""}`}
      >
        <img src="/arrowleft.svg" alt="" />
      </div>
      <ul
        ref={containerRef}
        className="bg-transparent rounded-box flex h-full snap-x gap-10 overflow-x-hidden overflow-y-hidden px-5 md:px-20"
      >
        {data.emploie.offres.map((emploie) => (
          <CardEmploie key={emploie.id} emploie={emploie} />
        ))}
      </ul>
      <div
        onClick={handleScrollRight}
        className={`absolute right-0 top-1/2 z-50 flex h-full w-10 -translate-y-1/2 transform cursor-pointer items-center ${hideRightButton ? "hidden" : ""}`}
      >
        <img src="/arrowright.svg" alt="" />
      </div>
    </div>
  );
};

export default SliderEmploie;