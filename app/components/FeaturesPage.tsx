"use client";

import Iphone15Pro from "@/components/ui/iphone-15-pro";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useScroll } from "framer-motion";

// Define the content type for better type safety
type FeatureContent = {
  title: string;
  description: string;
  image: string;
};

const features: FeatureContent[] = [
  {
    title: "Feature One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos...",
    image: "https://via.placeholder.com/430x880",
  },
  {
    title: "Feature Two",
    description: "Second feature description goes here...",
    image: "https://picsum.photos/430/880",
  },
  {
    title: "Feature Three",
    description: "Third feature description goes here...",
    image: "https://via.placeholder.com/430x880",
  },
];

const FeaturesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Calculate which section we're currently viewing
      const sectionIndex = Math.min(
        Math.floor(value * features.length),
        features.length - 1
      );
      setCurrentImageIndex(sectionIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section className="relative" ref={containerRef}>
      {/* Fixed phone container */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-start pl-24">
            <Iphone15Pro
              className="size-1/4"
              src={features[currentImageIndex].image}
            />
          </div>
        </div>
      </div>

      {/* Scrollable content sections - removed relative positioning */}
      <div className="relative">
        {features.map((feature, index) => (
          <div key={index} className={twMerge("flex items-center h-screen")}>
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-4 max-w-xl ml-auto">
                <h2 className="text-2xl font-bold">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesPage;
