"use client";

import { useGetProducts } from "@/services/api/protected/useGetProducts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const BillingPage = () => {
  const { data, isFetching, refetch } = useGetProducts();

  const products = data?.products || [];
  const hasMobileSubscription = data?.hasMobileSubscription;
  const subscriptionId = data?.subscriptionId;
  const subscription = data?.subscription;

  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showCancelSuccessDialog, setShowCancelSuccessDialog] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (typeof window.createLemonSqueezy === "function") {
      window.createLemonSqueezy();
    }
  }, []);

  const handleCheckout = async (variantId: string) => {
    try {
      setLoading(variantId);
      const response = await fetch("/api/protected/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variantId }),
      });

      const { checkoutUrl, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (checkoutUrl) {
        window.LemonSqueezy.Url.Open(checkoutUrl);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscriptionId) return;
    try {
      setCancelLoading(true);
      const response = await fetch(`/api/protected/cancel-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      });

      const { error } = await response.json();
      if (error) throw new Error(error);

      await refetch();
      setShowCancelSuccessDialog(true);
    } catch (error) {
      console.error("Error canceling subscription:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  const handleUpdatePayment = async () => {
    if (!subscriptionId) return;
    try {
      setPaymentLoading(true);
      const response = await fetch(`/api/protected/change-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) router.push(url);
    } catch (error) {
      console.error("Error updating payment method:", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCancelSuccessConfirm = () => {
    setShowCancelSuccessDialog(false);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const handleReactivateSubscription = async () => {
    if (!subscriptionId) return;
    try {
      const response = await fetch(`/api/protected/reactivate-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      });
      const { subscription } = await response.json();

      if (subscription) {
        await refetch();
      }
    } catch (error) {
      console.error("Error reactivating subscription:", error);
    }
  };

  const CancelSuccessDialog = () => (
    <AlertDialog
      open={showCancelSuccessDialog}
      onOpenChange={setShowCancelSuccessDialog}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Abonnement annulé avec succès</AlertDialogTitle>
          <AlertDialogDescription>
            Votre abonnement a été annulé avec succès. Il restera actif
            jusqu&apos;à la fin de la période en cours.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleCancelSuccessConfirm}>
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (isFetching || cancelLoading) {
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

  return (
    <div className="max-w-7xl mx-auto p-8">
      {products.some((product) => product.isCurrentPlan) ? (
        <>
          <CancelSuccessDialog />
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Mon abonnement</h1>
            <Button
              variant="outline"
              onClick={() => router.push("/billing/change-plans")}
              disabled={subscription?.data.attributes.status === "cancelled"}
            >
              Changer de plan
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {products
              .filter((product) => product.isCurrentPlan)
              .map((product) => (
                <Card key={product.id} className="relative p-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold text-primary">
                            {product.attributes.name}
                          </h2>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              subscription?.data.attributes.status ===
                              "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {subscription?.data.attributes.status ===
                            "cancelled"
                              ? "Annulé"
                              : "Actif"}
                          </span>
                        </div>
                        {subscription?.data.attributes.status ===
                          "cancelled" && (
                          <p className="text-sm text-gray-600 mt-2">
                            Votre abonnement prendra fin le{" "}
                            {new Date(
                              subscription?.data.attributes.ends_at ??
                                new Date()
                            ).toLocaleDateString()}
                          </p>
                        )}
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
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={handleUpdatePayment}
                          disabled={paymentLoading}
                        >
                          Gérer le paiement
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {subscription?.data.attributes.status !==
                        "cancelled" ? (
                          <DropdownMenuItem
                            onClick={handleCancelSubscription}
                            disabled={cancelLoading}
                            className="text-destructive"
                          >
                            Annuler l&apos;abonnement
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={handleReactivateSubscription}
                            disabled={cancelLoading}
                            className="text-primary"
                          >
                            Réactiver l&apos;abonnement
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">
            Choisissez votre abonnement
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="p-6">
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
                    onClick={() => handleCheckout(product.id)}
                    disabled={loading === product.id}
                  >
                    {loading === product.id
                      ? "Chargement..."
                      : "Choisir ce plan"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BillingPage;
