import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    console.log("🚀 ~ createClient ~ process.env.SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Create a supabase client on the browser with project's credentials
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
}