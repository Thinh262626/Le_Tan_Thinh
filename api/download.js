import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lang = 'vi' } = req.body;

  try {
    await supabase.from('events').insert({
      event_type: 'cv_download',
      payload: { lang },
      referrer: req.headers['referer'] || null,
      user_agent: req.headers['user-agent'] || null,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[download] error:', err);
    // Không block user — trả 200 dù lỗi tracking
    return res.status(200).json({ success: true });
  }
}
