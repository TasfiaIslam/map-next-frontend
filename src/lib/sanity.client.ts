import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2025-10-14',
  useCdn: true,
  // token: process.env.SANITY_API_TOKEN, // needed for private data
});
