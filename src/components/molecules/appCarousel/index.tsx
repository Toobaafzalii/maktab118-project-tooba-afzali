"use client";

import AppImage from "@/components/organisms/appImage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const carouselImages: Array<string> = [
  "./png/carousel-1.png",
  "./png/carousel-2.png",
  "./png/carousel-3.png",
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const AppCarousel: React.FC = () => {
  return (
    <div className="relative w-full">
      <Carousel
        rtl
        infinite
        autoPlay
        showDots
        transitionDuration={400}
        autoPlaySpeed={3000}
        className="w-full"
        responsive={responsive}
      >
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className="w-full relative h-[calc(100vw*0.58)] md:h-[calc(100vw*0.55)] lg:h-[calc(100vw*0.525)]"
          >
            <AppImage src={image} className="w-full  h-full object-cover" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AppCarousel;
