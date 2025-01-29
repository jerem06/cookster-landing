import React from "react";
import HomePage from "./components/HomePage";
import FeaturesPage from "./components/FeaturesPage";
import TestimonialsPage from "./components/TestimonialsPage";
import TeamPage from "./components/TeamPage";
import PricingPage from "./components/PricingPage";
import ConvertSection from "./components/ConvertSection";
import FAQ from "./components/FAQ";

const MainPage: React.FC = () => {
  return (
    <div className="space-y-20">
      <HomePage />
      <FeaturesPage />
      <TestimonialsPage />
      <TeamPage />
      <PricingPage />
      <ConvertSection />
      <FAQ />
    </div>
  );
};

export default MainPage;
