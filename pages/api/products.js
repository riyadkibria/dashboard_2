import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  try {
    const entries = await client.getEntries({ content_type: 'product' });
    res.status(200).json({ products: entries.items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
