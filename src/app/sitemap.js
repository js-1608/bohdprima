import { getPublishedBlogs } from '../lib/api';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bodhprima.com';

  // Static routes of the web application
  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/global',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic routes for published blogs
  let blogRoutes = [];
  try {
    const blogs = await getPublishedBlogs();
    if (Array.isArray(blogs)) {
      blogRoutes = blogs
        .filter((blog) => blog.status === 'published')
        .map((blog) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: new Date(blog.updatedAt || blog.createdAt),
          changeFrequency: 'weekly',
          priority: 0.6,
        }));
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap generation:', error);
  }

  return [...staticRoutes, ...blogRoutes];
}
