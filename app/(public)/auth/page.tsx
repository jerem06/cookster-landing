"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { useUserStore } from "@/lib/store/user-store";
import { LoginForm } from "@/components/login-form";

export default function AuthPage() {
  const router = useRouter();

  const supabase = createClient();
  const { setUser } = useUserStore();

  const handleGoogleLogin = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const nextPath = params.get("next") || "/home";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${
            window.location.origin
          }/auth/callback?next=${encodeURIComponent(nextPath)}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("An error occurred during sign in. Please try again.");
    }
  };

  const handleAppleLogin = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const nextPath = params.get("next") || "/home";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: `${
            window.location.origin
          }/auth/callback?next=${encodeURIComponent(nextPath)}`,
        },
      });

      if (error) {
        console.error("Apple sign-in error:", error);
        alert(
          "Unable to sign in with Apple at this time. Please try again later."
        );
        return;
      }
    } catch (error) {
      console.error("Error during Apple sign-in:", error);
      alert("An error occurred during Apple sign-in. Please try again later.");
    }
  };

  useEffect(() => {
    // Check if user is already logged in and handle auth errors
    const checkUser = async () => {
      // Check for error in URL
      const params = new URLSearchParams(window.location.search);
      const error = params.get("error");
      const errorDescription = params.get("error_description");

      if (error) {
        console.error("Auth Error:", error, errorDescription);
        // Clear the URL parameters
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        if (
          error === "invalid_request" &&
          errorDescription?.includes("bad_oauth_state")
        ) {
          // Handle expired or invalid session
          alert("Your login session has expired. Please try again.");
          return;
        }

        // Handle other errors
        alert("An error occurred during sign in. Please try again.");
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        router.push("/home");
      }
    };
    checkUser();
  }, [router, supabase.auth, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <LoginForm
        handleAppleLogin={handleAppleLogin}
        handleGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
}
