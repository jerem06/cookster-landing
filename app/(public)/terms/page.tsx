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
              d&apos;être lié par les présentes conditions générales
              d&apos;utilisation et de vente. Si vous n&apos;acceptez pas ces
              conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Description du service
            </h2>
            <p className="text-muted-foreground">
              Cookster est une plateforme de recettes de cuisine qui permet aux
              utilisateurs de découvrir, sauvegarder et partager des recettes.
              Notre service inclut notamment :<br />
              - L&apos;accès à une base de données de recettes
              <br />
              - La possibilité de créer et partager vos propres recettes
              <br />
              - La sauvegarde de recettes favorites
              <br />- L&apos;interaction avec d&apos;autres utilisateurs
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Compte utilisateur
            </h2>
            <p className="text-muted-foreground">
              Pour utiliser certaines fonctionnalités du service, vous devez
              créer un compte. Vous êtes responsable du maintien de la
              confidentialité de votre compte et de votre mot de passe. Vous
              vous engagez à nous informer immédiatement de toute utilisation
              non autorisée de votre compte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Propriété intellectuelle
            </h2>
            <p className="text-muted-foreground">
              Tout le contenu présent sur Cookster (textes, images, logos, code
              source) est protégé par le droit d&apos;auteur. Les recettes
              partagées par les utilisateurs restent leur propriété, mais ils
              accordent à Cookster une licence non exclusive d&apos;utilisation
              et de diffusion sur la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Protection des données personnelles
            </h2>
            <p className="text-muted-foreground">
              Nous collectons et traitons vos données personnelles conformément
              à notre politique de confidentialité et au RGPD. Les données
              collectées sont utilisées uniquement dans le cadre du service et
              ne sont pas vendues à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Conditions tarifaires
            </h2>
            <p className="text-muted-foreground">
              L&apos;inscription et l&apos;utilisation basique de Cookster sont
              gratuites. Des fonctionnalités premium peuvent être proposées
              moyennant un abonnement dont les tarifs sont clairement indiqués
              avant toute souscription. Les prix sont en euros TTC.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Responsabilité</h2>
            <p className="text-muted-foreground">
              Cookster ne peut être tenu responsable des contenus publiés par
              les utilisateurs. Nous nous réservons le droit de supprimer tout
              contenu inapproprié ou ne respectant pas nos conditions
              d&apos;utilisation. Les utilisateurs sont responsables de la
              véracité et de la légalité des contenus qu&apos;ils publient.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Modification et résiliation
            </h2>
            <p className="text-muted-foreground">
              Nous nous réservons le droit de modifier ces conditions à tout
              moment. Les utilisateurs seront informés des modifications
              importantes. Nous pouvons suspendre ou résilier votre compte en
              cas de non-respect des présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Droit applicable</h2>
            <p className="text-muted-foreground">
              Les présentes conditions sont régies par le droit français. Tout
              litige relatif à l&apos;utilisation de Cookster sera soumis aux
              tribunaux compétents français, après tentative de résolution
              amiable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant ces conditions ou le service
              Cookster, vous pouvez nous contacter à l&apos;adresse suivante :
              contact@cookster.fr
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
