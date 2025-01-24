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
              <p>Raison sociale : Cookster</p>
              <p>Siège social : [Adresse]</p>
              <p>SIRET : [Numéro SIRET]</p>
              <p>Directeur de la publication : [Nom du directeur]</p>
              <p>Contact : contact@cookster.fr</p>
              <p>
                Hébergeur : Vercel Inc., 440 N Barranca Ave #4133 Covina, CA
                91723
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
