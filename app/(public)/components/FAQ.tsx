import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Qu'est-ce que Cookster ?",
    answer:
      "Cookster est une application innovante qui vous permet de centraliser vos recettes, d'en découvrir de nouvelles, de planifier vos repas hebdomadaires, et de générer automatiquement votre liste de courses. Elle s'adresse à tous ceux qui veulent reprendre le contrôle de leur alimentation en toute simplicité.",
  },
  {
    question: "Cookster est-elle gratuite ?",
    answer:
      "L'application propose une version gratuite avec des fonctionnalités de base. Pour accéder à des options avancées, comme la planification des repas personnalisée, le suivi des macros ou les recommandations d'IA, un abonnement premium est disponible.",
  },
  {
    question: "Sur quels appareils puis-je utiliser Cookster ?",
    answer: "Cookster est disponible sur Android, iOS.",
  },
  {
    question:
      "Est-ce que Cookster propose des recettes végétariennes, sans gluten, ou veganes ?",
    answer:
      "Oui, Cookster propose une large variété de recettes adaptées à différents régimes alimentaires. Vous pouvez filtrer les recettes selon vos besoins (végétarien, sans gluten, vegan, sans lactose, etc.).",
  },
  {
    question:
      "Comment puis-je contacter le support client de Cookster en cas de problème ?",
    answer:
      "Vous pouvez contacter notre support client directement via l'application, dans l'onglet \"Assistance\". Une équipe dédiée est disponible pour répondre à vos questions et résoudre vos problèmes dans les plus brefs délais.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section
      id="faq"
      className="lg:h-screen max-w-lg lg:max-w-screen-md  mx-12 sm:mx-auto justify-center items-center flex"
    >
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-2xl font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
