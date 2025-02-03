import { createAnonClient } from "@/lib/supabase/serverAnon";
import { configureLemonSqueezy } from "@/services/lemonsqueezy/config";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(request: Request) {
    configureLemonSqueezy()
    const supabase = await createAnonClient();
    try {
        const user = await supabase.auth.getUser();

        if (!user?.data?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }


        const { variantId } = await request.json();


        if (!variantId) {
            return Response.json({ error: 'Invalid product variant' }, { status: 400 });
        }




        const checkout = await createCheckout(
            process.env.LEMONSQUEEZY_STORE_ID!,
            variantId,
            {
                checkoutOptions: {
                    embed: true,
                    media: false,

                },
                checkoutData: {
                    email: user.data.user.email || '',
                    custom: {
                        user_id: user.data.user.id,
                    },
                },
                productOptions: {
                    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
                    receiptButtonText: 'Go to Dashboard',
                    receiptThankYouNote: 'Thank you for your purchase!',
                },
            }
        );


        return Response.json({ checkoutUrl: checkout.data?.data.attributes.url });
    } catch (error) {
        console.error('Checkout error:', error);
        return Response.json({ error: 'Failed to create checkout' }, { status: 500 });
    }
} 