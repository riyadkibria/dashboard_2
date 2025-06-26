import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function getProducts() {
  const entries = await client.getEntries({ content_type: 'product' }); // Use your content type ID here
  return entries.items;
}
