import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/recipes/'],
            disallow: [],
        },
        sitemap: 'https://cookster.fr/sitemap.xml',
    }
}