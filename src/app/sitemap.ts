import { MetadataRoute } from 'next'
import { locales } from '../config'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wificard.redreamality.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const scenes = ['', '?scene=restaurant', '?scene=hotel', '?scene=hospital', '?scene=office']

  const sitemapEntries = locales.flatMap((locale) =>
    scenes.map((scene) => ({
      url: `${baseUrl}/${locale}${scene}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: scene === '' ? 1 : 0.8,
    }))
  )

  return [...sitemapEntries]
} 