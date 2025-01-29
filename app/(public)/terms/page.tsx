import React from "react";

export const metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation de Cookster",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen py-16 px-4 mt-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Conditions Générales d&apos;Utilisation
          </h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptation des conditions
            </h2>
            <p className="text-muted-foreground">
              En accédant et en utilisant le service Cookster, vous acceptez
              d&apos;être lié par ces conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Description du service
            </h2>
            <p className="text-muted-foreground">
              Cookster est une plateforme de recettes de cuisine qui permet aux
              utilisateurs de découvrir, sauvegarder et partager des recettes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Compte utilisateur
            </h2>
            <p className="text-muted-foreground">
              Pour utiliser certaines fonctionnalités du service, vous devez
              créer un compte. Vous êtes responsable du maintien de la
              confidentialité de votre compte.
            </p>
          </section>

          {/* Add more sections as needed */}
        </div>
      </div>
    </main>
  );
}
