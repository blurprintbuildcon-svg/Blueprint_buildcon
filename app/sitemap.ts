import { MetadataRoute } from 'next';
import { CITIES_DATA } from '@/data/cityData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueprintbuildcon.homes';
  const currentDate = new Date().toISOString();

  // Core public landing and informational pages
  const coreRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/packages', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/process', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/why-us', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/refer', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic location landing pages for all 18 major city hubs (Patna, Pune, etc.)
  const cityRoutes = Object.keys(CITIES_DATA).map((slug) => ({
    url: `${baseUrl}/location/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: slug === 'patna' || slug === 'pune' ? 0.9 : 0.8,
  }));

  return [...coreRoutes, ...cityRoutes];
}
