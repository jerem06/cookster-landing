"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useNewsletterSubscription } from "@/services/api/useNewsletter";
import ReCAPTCHA from "react-google-recaptcha";

export function Footer() {
  const [email, setEmail] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { mutate: subscribeToNewsletter } = useNewsletterSubscription({
    onSuccess: () => {
      setEmail("");
      setShowCaptcha(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowCaptcha(true);
  };

  const handleCaptchaChange = async (token: string | null) => {
    if (token) {
      subscribeToNewsletter({ email, recaptchaToken: token });
    }
  };

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🚀</span>
              <span className="font-semibold">Cookster</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Simplifiez la cuisine, améliorez votre quotidien.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explorer</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  A propos
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Recettes
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Applications</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Apple Store
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Google Play
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Application Web
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recevez les dernières nouvelles</h3>
            <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Entrez votre email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="sm">
                S&apos;abonner
              </Button>
            </form>
            {showCaptcha && (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleCaptchaChange}
              />
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t mt-12 pt-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cookster. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Conditions d&apos;utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
