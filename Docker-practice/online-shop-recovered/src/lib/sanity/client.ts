import { createClient } from 'next-sanity';

// Public client for read-only operations
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-02', // Use today's date in YYYY-MM-DD format
  useCdn: true, // Set to false for real-time updates, true for better performance
  perspective: 'published',
});

// Authenticated client for write operations (if needed)
export const clientWithToken = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-02',
  useCdn: false, // Don't use CDN for write operations
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
});
