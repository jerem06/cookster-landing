import { createAnonClient } from "@/lib/supabase/serverAnon";
import { configureLemonSqueezy } from "@/services/lemonsqueezy/config";
import { updateSubscription } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(request: Request) {
    configureLemonSqueezy();
    const supabase = await createAnonClient();

    try {
        const user = await supabase.auth.getUser();

        if (!user?.data?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { variantId, subscriptionId } = await request.json();



        if (!variantId) {
            return Response.json({ error: 'Invalid product variant' }, { status: 400 });
        }


        if (!subscriptionId) {
            return Response.json({ error: 'No active subscription found' }, { status: 400 });
        }

        // Update the subscription with new variant
        const updatedSubscription = await updateSubscription(
            subscriptionId,
            {
                variantId: variantId
            }
        );

        return Response.json({
            success: true,
            subscription: updatedSubscription.data
        });

    } catch (error) {
        console.error('Change plan error:', error);
        return Response.json({ error: 'Failed to update subscription' }, { status: 500 });
    }
}
