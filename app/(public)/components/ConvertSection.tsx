import React from "react";
import logo from "@/app/assets/images/logo.png";
import google from "@/app/assets/images/google-black.png";
import apple from "@/app/assets/icons/apple-black.svg";
import StoreNotificationDialog from "@/components/store-notification-dialog";
import Image from "next/image";
import { SparklesText } from "@/components/ui/sparkles-text";

const ConvertSection: React.FC = () => {
  return (
    <section
      id="convert"
      className="flex bg-white flex-col justify-center items-center py-10 lg:py-0 lg:h-screen text-center px-12 md:mx-0"
    >
      <h3 className="text-4xl font-semibold mb-4 ">
        L’app qui change <SparklesText className="lg:my-1" text="TOUT" /> en
        cuisine
      </h3>
      <p className="text-gray-600 mb-8 max-w-lg mx-auto">
        Planifiez vos repas, gérez vos courses et découvrez des recettes
        inédites. Votre nouvelle routine commence ici.
      </p>
      <Image
        src={logo}
        alt="Cookster"
        width={200}
        height={200}
        className="mb-10 mt-2"
      />
      <div className="flex justify-center gap-8 flex-col md:flex-row">
        <StoreNotificationDialog
          storeName="App Store"
          storeImage={apple}
          imageAlt="Télécharger sur l'App Store"
        />
        <StoreNotificationDialog
          storeName="Google Play"
          storeImage={google}
          imageAlt="Disponible sur Google Play"
        />
      </div>
    </section>
  );
};

export default ConvertSection;
