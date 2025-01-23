"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    description: "Pour découvrir Cookster",
    features: [
      "Ajouter jusqu'à 10 recettes",
      "Accès à la toutes les recettes",
      "Générateur de recettes aléatoires",
    ],
    buttonText: "Commencer gratuitement",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "0.99€",
    period: "/mois",
    description: "Pour les passionnés de cuisine",
    features: [
      "Ajout de recettes illimitées",
      "Accès à la toutes les recettes",
      "Générateur de recettes aléatoires",
    ],
    buttonText: "Commencer l'expérience Pro",
    highlighted: true,
  },
];

const PricingPage: React.FC = () => {
  return (
    <section id="pricing" className="pb-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Des prix adaptés à vos besoins
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Choisissez le plan qui vous convient
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto px-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 ${
              plan.highlighted
                ? "border-2 border-primary bg-primary/5 dark:bg-primary/10"
                : "border border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {plan.name}
              </h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {plan.period}
                  </span>
                )}
              </div>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full ${
                plan.highlighted ? "bg-primary" : "bg-zinc-900 dark:bg-zinc-100"
              }`}
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
