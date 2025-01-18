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
    title: "Votre livre de recettes digital.",
    description:
      "Stockez toutes vos recettes au même endroit, personnalisez-les, et retrouvez-les facilement grâce à un système de recherche intuitif.",
    image: "https://via.placeholder.com/430x880",
  },
  {
    title: "Des recettes adaptées à vos envies",
    description:
      "Découvrez des recettes équilibrées, gluten-free, vegan ou personnalisées à votre régime alimentaire, tout en gardant le plaisir de cuisiner.",
    image: "https://picsum.photos/430/880",
  },
  {
    title: "Gagnez du temps avec votre liste de courses (Bientôt disponible)",
    description:
      "Convertissez vos recettes en liste de courses instantanée et évitez les oublis grâce à une organisation optimisée.",
    image: "https://via.placeholder.com/430x880",
  },
];

const FeaturesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
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
        <div className="container flex h-full mx-auto px-4">
          <div className="flex flex-1 justify-center pt-10 items-center h-full">
            <div className="flex bg justify-end w-full pr-24">
              <Iphone15Pro
                className="size-7/12"
                src={features[currentImageIndex].image}
              />
            </div>
          </div>
          <div className="flex flex-1"></div>
        </div>
      </div>

      {/* Scrollable content sections */}
      <div className="relative" style={{ marginTop: "-100vh" }}>
        {features.map((feature, index) => (
          <div key={index} className={twMerge("flex items-center h-screen")}>
            <div className="container flex mx-auto px-4">
              <div className="flex-1"></div>
              <div className="flex flex-1 flex-col gap-4 ml-auto">
                <h2 className="text-4xl font-bold max-w-md">{feature.title}</h2>
                <p className="text-gray-600 text-2xl max-w-md">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesPage;
