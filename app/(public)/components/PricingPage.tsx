"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const plans = [
  {
    name: "Gratuit",
    monthlyPrice: "0€",
    annualPrice: "0€",
    description: "Pour découvrir Cookster",
    features: [
      { name: "Ajout de recettes illimité", included: false },
      { name: "Accès à la toutes les recettes", included: true },
      { name: "Générateur de recettes aléatoires", included: true },
    ],
    buttonText: "Commencer gratuitement",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: "0.99€",
    annualPrice: "9.99€",
    description: "Pour les passionnés de cuisine",
    features: [
      { name: "Ajout de recettes illimité", included: true },
      { name: "Accès à la toutes les recettes", included: true },
      { name: "Générateur de recettes aléatoires", included: true },
    ],
    buttonText: "Commencer l'expérience Pro",
    highlighted: true,
  },
];

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = React.useState(true);

  const scrollToConvert = () => {
    const convertSection = document.getElementById("convert");
    if (convertSection) {
      convertSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="pb-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Des prix adaptés à vos besoins
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Choisissez le plan qui vous convient
        </p>

        <div className="flex items-center justify-center gap-4">
          <span
            className={`text-sm ${
              !isAnnual ? "text-primary" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Mensuel
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm ${
              isAnnual ? "text-primary" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Annuel
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto px-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 ${
              plan.highlighted
                ? "border-2 border-primary bg-primary/5 dark:bg-primary/10 scale-105 transform"
                : "border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {plan.name}
                </h3>
                {isAnnual && plan.monthlyPrice !== "0€" && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-2 py-1 rounded">
                    -15%
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {isAnnual ? "/an" : "/mois"}
                </span>
              </div>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature.name} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check className="h-5 w-5 text-primary" />
                  ) : (
                    <X className="h-5 w-5 text-zinc-400" />
                  )}
                  <span
                    className={`text-zinc-700 dark:text-zinc-300 ${
                      !feature.included && "text-zinc-400"
                    }`}
                  >
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full ${
                plan.highlighted ? "bg-primary" : "bg-zinc-900 dark:bg-zinc-100"
              }`}
              onClick={scrollToConvert}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPage;
