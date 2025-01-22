import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, recaptchaToken } = await request.json();

        // Verify recaptcha
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: recaptchaToken }),
        });

        if (!recaptchaResponse.ok) {
            return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
        }

        const supabase = await createClient();
        const { error } = await supabase
            .from("newsletter")
            .insert({ email });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Subscription failed', errorMessage: error }, { status: 500 });
    }
}