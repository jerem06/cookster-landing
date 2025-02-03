"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProducts } from "@/services/api/protected/useGetProducts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ChangePlansPage = () => {
  const { data, isFetching, refetch } = useGetProducts();
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const router = useRouter();

  const products = data?.products || [];
  const hasMobileSubscription = data?.hasMobileSubscription;
  const subscriptionId = data?.subscriptionId;

  const handlePlanChange = async (
    variantId: string,
    subscriptionId: string
  ) => {
    try {
      setIsChangingPlan(true);
      const response = await fetch("/api/protected/change-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variantId, subscriptionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to change plan");
      }

      await refetch();
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error changing plan:", error);
      // Handle error (show toast notification, etc.)
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
    setIsChangingPlan(false);
    setTimeout(() => {
      router.replace("/billing");
    }, 1000);
  };

  const SuccessDialog = () => (
    <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Abonnement modifié avec succès</AlertDialogTitle>
          <AlertDialogDescription>
            Votre abonnement a été mis à jour avec succès.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleSuccessConfirm}>
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (isFetching) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Choisissez votre abonnement</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-8"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (hasMobileSubscription) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Card className="p-6 mb-8 bg-yellow-50 border-yellow-200">
          <div className="text-yellow-800">
            <h3 className="text-lg font-semibold mb-2">
              Abonnement Mobile Actif
            </h3>
            <p>
              Vous avez actuellement un abonnement actif via l&apos;application
              mobile. Pour gérer votre abonnement, veuillez utiliser
              l&apos;application mobile.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (!subscriptionId) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">
          Vous n&apos;avez pas d&apos;abonnement actif
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <SuccessDialog />
      <h1 className="text-3xl font-bold mb-8">Changer d&apos;abonnement</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className={` relative p-6 ${
              product.isCurrentPlan ? "border-primary" : ""
            }`}
          >
            {product.isCurrentPlan && (
              <div className="absolute left-1/2 -translate-x-1/2  -translate-y-1/2 top-0">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Plan actuel
                </span>
              </div>
            )}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  {product.attributes.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold">
                    {product.attributes.price / 100}€
                  </span>
                  <span className="text-gray-600">
                    / {product.attributes.interval}
                  </span>
                </div>
              </div>

              <div
                className="text-gray-600 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: product.attributes.description,
                }}
              />

              <Button
                className="w-full"
                onClick={() => handlePlanChange(product.id, subscriptionId)}
                disabled={product.isCurrentPlan || isChangingPlan}
              >
                {product.isCurrentPlan
                  ? "Plan actuel"
                  : isChangingPlan
                  ? "Changement en cours..."
                  : "Choisir ce plan"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChangePlansPage;
