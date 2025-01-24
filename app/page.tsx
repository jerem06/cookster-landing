import React from "react";
import HomePage from "./components/HomePage";
import FeaturesPage from "./components/FeaturesPage";
import TestimonialsPage from "./components/TestimonialsPage";
import FAQ from "./components/FAQ";
import ConvertSection from "./components/ConvertSection";
import PricingPage from "./components/PricingPage";
import TeamPage from "./components/TeamPage";

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
