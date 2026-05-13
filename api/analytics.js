import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Các event hợp lệ để tránh spam
const VALID_EVENTS = new Set([
  'page_view',
  'section_view',
  'book_call_click',
  'social_click',
  'lang_toggle',
]);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event_type, payload } = req.body;

  if (!event_type || !VALID_EVENTS.has(event_type)) {
    return res.status(400).json({ error: 'Invalid event_type' });
  }

  try {
    await supabase.from('events').insert({
      event_type,
      payload: payload || null,
      referrer: req.headers['referer'] || null,
      user_agent: req.headers['user-agent'] || null,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[analytics] error:', err);
    return res.status(200).json({ success: true });
  }
}
