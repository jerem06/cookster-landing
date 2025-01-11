import React from "react";
import HomePage from "./components/HomePage";
import FeaturesPage from "./components/FeaturesPage";
import TestimonialsPage from "./components/TestimonialsPage";
import FAQ from "./components/FAQ";

const MainPage: React.FC = () => {
  return (
    <div>
      <HomePage />
      <FeaturesPage />
      <TestimonialsPage />
      <FAQ />
    </div>
  );
};

export default MainPage;
