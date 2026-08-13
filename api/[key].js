import { kv } from '@vercel/kv';

const DEFAULTS = {
  photos: null,
  likes: {},
  comments: {},
  messages: [],
  featured: null,
  password: null
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const key = req.query.key;
  if (!key || !(key in DEFAULTS)) {
    res.status(404).json({ error: 'not found' });
    return;
  }

  const fullKey = 'licky:' + key;

  if (req.method === 'GET') {
    const val = await kv.get(fullKey);
    if (val !== null && val !== undefined) {
      res.status(200).json(val);
      return;
    }
    res.status(200).json(DEFAULTS[key]);
    return;
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    await kv.set(fullKey, body);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'method not allowed' });
}
