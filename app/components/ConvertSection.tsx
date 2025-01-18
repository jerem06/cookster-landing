import React from "react";
import Image from "next/image";
import google from "@/app/assets/images/google-black.png";
import apple from "@/app/assets/icons/apple-black.svg";

const ConvertSection: React.FC = () => {
  return (
    <div className="mt-32 text-center">
      <h3 className="text-2xl font-semibold mb-4">
        L’app qui change tout en cuisine
      </h3>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Planifiez vos repas, gérez vos courses et découvrez des recettes
        inédites. Votre nouvelle routine commence ici.
      </p>
      <div className="flex justify-center gap-8">
        <button className="relative h-14 w-[180px]">
          <Image
            src={apple}
            alt="Télécharger sur l'App Store"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </button>
        <button className="relative h-14 w-[180px]">
          <Image
            src={google}
            alt="Disponible sur Google Play"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </button>
      </div>
    </div>
  );
};

export default ConvertSection;
