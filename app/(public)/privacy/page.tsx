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
          <p className="text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              Nous accordons une grande importance à la protection de vos
              données personnelles. Cette politique de confidentialité explique
              comment nous collectons, utilisons, partageons et protégeons vos
              informations personnelles lorsque vous utilisez notre service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Collecte des données
            </h2>
            <p className="text-muted-foreground">
              Nous collectons les types d&apos;informations suivants :
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-2">
              <li>Informations de profil (nom, adresse email, photo)</li>
              <li>Données d&apos;utilisation (recettes consultées, favoris)</li>
              <li>Informations techniques (adresse IP, type de navigateur)</li>
              <li>Cookies et technologies similaires</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Utilisation des données
            </h2>
            <p className="text-muted-foreground">
              Vos données sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-2">
              <li>Fournir et améliorer nos services</li>
              <li>Personnaliser votre expérience</li>
              <li>Communiquer avec vous concernant votre compte</li>
              <li>Assurer la sécurité de notre plateforme</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Partage des données
            </h2>
            <p className="text-muted-foreground">
              Nous ne vendons pas vos données personnelles. Nous pouvons
              partager vos informations avec :
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-2">
              <li>Nos prestataires de services</li>
              <li>Les autorités légales si requis par la loi</li>
              <li>
                D&apos;autres utilisateurs (uniquement les informations que vous
                choisissez de rendre publiques)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Protection des données
            </h2>
            <p className="text-muted-foreground">
              Nous mettons en œuvre des mesures de sécurité techniques et
              organisationnelles appropriées pour protéger vos données
              personnelles. Cela inclut le chiffrement des données, des
              contrôles d&apos;accès stricts et des audits réguliers de
              sécurité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Vos droits</h2>
            <p className="text-muted-foreground">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-2">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>
                Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)
              </li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d&apos;opposition</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant cette politique de confidentialité
              ou pour exercer vos droits, vous pouvez nous contacter à
              l&apos;adresse : contact@cookster.fr
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
