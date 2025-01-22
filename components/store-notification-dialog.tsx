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
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useNewsletterSubscription } from "@/services/api/useNewsletter";

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
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [open, setOpen] = useState(false);
  const { mutate: subscribeToNewsletter } = useNewsletterSubscription({
    onSuccess: () => {
      setOpen(false);
      setEmail("");
      setShowCaptcha(false);
    },
  });
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;
    setEmail(emailValue);
    setShowCaptcha(true);
  };

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      subscribeToNewsletter({ email, recaptchaToken: token });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
        <form onSubmit={handleEmailSubmit} className="mt-4 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          {showCaptcha && (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              size="normal"
              onChange={handleCaptchaChange}
            />
          )}
          <div className="flex gap-3 items-center">
            <AlertDialogCancel
              className="flex-1"
              onClick={() => setShowCaptcha(false)}
            >
              Annuler
            </AlertDialogCancel>
            <button
              type="submit"
              className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Suivant
            </button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StoreNotificationDialog;
