import React from "react";

export const metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité de Cookster",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 px-4 mt-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Politique de Confidentialité
          </h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Collecte des données
            </h2>
            <p className="text-muted-foreground">
              Nous collectons les informations que vous nous fournissez
              directement, notamment lors de la création de votre compte,
              l&apos;utilisation de nos services, ou lorsque vous nous
              contactez.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Utilisation des données
            </h2>
            <p className="text-muted-foreground">
              Nous utilisons vos données pour fournir, maintenir et améliorer
              nos services, communiquer avec vous, et assurer votre sécurité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Protection des données
            </h2>
            <p className="text-muted-foreground">
              Nous mettons en œuvre des mesures de sécurité appropriées pour
              protéger vos données personnelles contre tout accès non autorisé
              ou toute modification.
            </p>
          </section>

          {/* Add more sections as needed */}
        </div>
      </div>
    </main>
  );
}
