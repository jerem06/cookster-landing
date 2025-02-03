import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

export const LEMONSQUEEZY_CONFIG = {
    API_KEY: process.env.LEMONSQUEEZY_API_KEY || '',
    STORE_ID: process.env.LEMONSQUEEZY_STORE_ID || '',
    BASE_URL: 'https://api.lemonsqueezy.com/v1',
};

// Type definitions for Lemon Squeezy configuration
export interface LemonSqueezyConfig {
    API_KEY: string;
    STORE_ID: string;
    BASE_URL: string;

}

/**
 * Ensures that required environment variables are set and sets up the Lemon
 * Squeezy JS SDK. Throws an error if any environment variables are missing or
 * if there's an error setting up the SDK.
 */
export function configureLemonSqueezy() {
    const requiredVars = [
        'LEMONSQUEEZY_API_KEY',
        'LEMONSQUEEZY_STORE_ID',
    ]

    const missingVars = requiredVars.filter((varName) => !process.env[varName])

    if (missingVars.length > 0) {
        throw new Error(
            `Missing required LEMONSQUEEZY env variables: ${missingVars.join(
                ', '
            )}. Please, set them in your .env file.`
        )
    }

    lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY })
}
