import React from "react";

import google from "@/app/assets/images/google-black.png";
import apple from "@/app/assets/icons/apple-black.svg";
import StoreNotificationDialog from "@/components/store-notification-dialog";

const ConvertSection: React.FC = () => {
  return (
    <section
      id="convert"
      className="flex flex-col justify-center items-center my-32 text-center"
    >
      <h3 className="text-2xl font-semibold mb-4">
        L’app qui change tout en cuisine
      </h3>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Planifiez vos repas, gérez vos courses et découvrez des recettes
        inédites. Votre nouvelle routine commence ici.
      </p>
      <div className="flex justify-center gap-8">
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
