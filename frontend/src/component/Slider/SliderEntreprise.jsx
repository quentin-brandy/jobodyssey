import React from 'react';
import CardEmploie from '../Card/CardEmploie';
import { useRef, useState, useEffect } from "react";
const SliderEntreprise = (offre) => {

    const containerRef = useRef(null);
    const [hideLeftButton, setHideLeftButton] = useState(true);
    const [hideRightButton, setHideRightButton] = useState(false);
  
    const handleScrollLeft = () => {
      const container = containerRef.current;
      container.scrollLeft -= 2000; // Changer la valeur pour ajuster la distance de défilement
    };
  
    const handleScrollRight = () => {
      const container = containerRef.current;
      container.scrollLeft += 2000; // Changer la valeur pour ajuster la distance de défilement
    };
  
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
  
      // Mettre à jour l'état pour masquer ou afficher les boutons de défilement en fonction de la position du défilement
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
      <div className="relative  transition: transform 0.3s ease-in-out">
        <div
          onClick={handleScrollLeft}
          className={`absolute top-1/2 z-50 flex h-full w-10 -translate-y-1/2 transform cursor-pointer items-center opacity bg-transparent ${hideLeftButton ? "hidden" : ""}`}
        >
          <img src="/arrowleft.svg" alt="" />
        </div>
        <ul
          ref={containerRef}
          className="bg-transparent rounded-box flex h-full snap-x gap-10 overflow-x-hidden overflow-y-hidden px-5 md:px-20 "
        >
          {offre.offre.map((emploie) => (
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

export default SliderEntreprise;