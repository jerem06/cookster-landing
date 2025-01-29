"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import Image from "next/image";
import { useUserStore } from "@/lib/store/user-store";

export default function AuthPage() {
  const router = useRouter();

  const supabase = createClient();
  const { setUser } = useUserStore();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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
    console.log(
      "${window.location.origin}/auth/callback",
      window.location.origin
    );
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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
      <button
        onClick={handleGoogleLogin}
        className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <Image
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
          width={24}
          height={24}
        />
        <span>Login with Google</span>
      </button>

      <button
        onClick={handleAppleLogin}
        className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <span>Login with Apple</span>
      </button>
    </div>
  );
}
