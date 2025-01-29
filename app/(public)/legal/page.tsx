import React from "react";

export const metadata = {
  title: "Mentions Légales et Conditions d'Utilisation",
  description: "Mentions légales et conditions d'utilisation de notre service",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen py-16 px-4 mt-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">Mentions Légales</h2>
            <div className="space-y-4">
              <p>Raison sociale : Jérémie BENCINI</p>
              <p>Siège social : 89 chemin de la tête de lion 06130 GRASSE</p>
              <p>SIRET : 84852548100018</p>
              <p>Contact : contact@cookster.fr</p>
              <p>
                Hébergeur : Vercel Inc.
                <br />
                Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA
                <br />
                Site web : vercel.com
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Propriété intellectuelle
            </h2>
            <div className="space-y-4">
              <p>
                Le contenu de ce site est protégé par les lois sur la propriété
                intellectuelle. Toute utilisation non autorisée est interdite.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Protection des données personnelles
            </h2>
            <div className="space-y-4">
              <p>
                Les données collectées sur ce site sont utilisées uniquement
                pour la gestion des recettes et des profils utilisateurs.
                Conformément au RGPD, vous avez un droit d&apos;accès, de
                modification ou de suppression en contactant
                contact@cookster.fr.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
