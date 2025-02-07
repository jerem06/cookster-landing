import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserProvider } from "./components/user-provider";
import Script from "next/script";
import { headers } from "next/headers";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const headerList = await headers();
  const pathname = await headerList.get("x-current-path");

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect(`/auth?next=${pathname}`);
  }

  return (
    <SidebarProvider>
      <UserProvider user={data.user}>
        <AppSidebar />
        <Script
          src="https://app.lemonsqueezy.com/js/lemon.js"
          strategy="afterInteractive"
        />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </UserProvider>
    </SidebarProvider>
  );
}
