"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Image, { StaticImageData } from "next/image";

interface StoreNotificationDialogProps {
  storeName: "App Store" | "Google Play";
  storeImage: StaticImageData;
  imageAlt: string;
}

const StoreNotificationDialog = ({
  storeName,
  storeImage,
  imageAlt,
}: StoreNotificationDialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Email submitted:", email);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="relative h-14 w-[180px]">
          <Image
            src={storeImage}
            alt={imageAlt}
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Application bientôt disponible</AlertDialogTitle>
          <AlertDialogDescription>
            Laissez-nous votre email pour être notifié dès que
            l&apos;application sera disponible sur {storeName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="flex gap-3">
            <AlertDialogCancel className="flex-1">Annuler</AlertDialogCancel>
            <button
              type="submit"
              className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              M&apos;avertir du lancement
            </button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StoreNotificationDialog;
