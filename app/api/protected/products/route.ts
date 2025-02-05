import { createAnonClient } from "@/lib/supabase/serverAnon";
import { configureLemonSqueezy } from "@/services/lemonsqueezy/config";
import { getSubscription, listProducts, Variant } from "@lemonsqueezy/lemonsqueezy.js";
import { NextResponse } from "next/server";

export async function GET() {
    configureLemonSqueezy();

    const supabase = await createAnonClient();

    const { data } = await supabase.auth.getUser();



    const { data: userData } = await supabase.from('subscriptions').select('*').eq('user_id', data?.user?.id).single();

    try {
        const { data: products } = await listProducts({
            filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
            include: ['variants'],
        });




        if (!products) {
            return NextResponse.json({ products: [] });
        }

        const allVariants = products.included as Variant['data'][] | undefined;

        // Add a flag to indicate if user has mobile subscription
        // Check if product_id includes 'rc' or if there's no product_id with active status
        const hasMobileSubscription = userData?.status === 'active' &&
            (userData?.product_id?.includes('rc') || !userData?.product_id);

        // Filter variants to keep only published ones
        const publishedVariants = allVariants?.filter(variant =>
            variant.attributes.status === 'published'
        ).map(variant => ({
            ...variant,
            isCurrentPlan: userData?.product_id === variant.id && userData?.status === 'active',
            userIsActive: userData?.status === 'active',
            hasMobileSubscription
        }));


        const { data: subscription } = await getSubscription(userData?.subscription_id)



        return NextResponse.json({
            products: publishedVariants,
            hasMobileSubscription,
            subscriptionId: userData?.subscription_id,
            subscription
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch products", details: error },
            { status: 500 }
        );
    }
} 