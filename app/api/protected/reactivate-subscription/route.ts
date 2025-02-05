import { createAnonClient } from "@/lib/supabase/serverAnon";
import { configureLemonSqueezy } from "@/services/lemonsqueezy/config";
import { updateSubscription } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(request: Request) {
    configureLemonSqueezy()
    const supabase = await createAnonClient();
    try {
        // Get authenticated session
        const user = await supabase.auth.getUser();

        if (!user?.data?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get subscription ID from request body
        const { subscriptionId } = await request.json();
        if (!subscriptionId) {
            return Response.json(
                { error: "Subscription ID is required" },
                { status: 400 }
            );
        }

        const subscription = await updateSubscription(subscriptionId, {
            cancelled: false,
        });

        return Response.json({ subscription });
    } catch (error) {
        console.error("Error reactivating subscription:", error);
        return Response.json(
            { error: "Failed to reactivate subscription" },
            { status: 500 }
        );
    }
} 