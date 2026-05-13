import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, lang = 'vi' } = req.body;

  // Validate
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Tên không được để trống' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email không hợp lệ' });
  }

  try {
    // 1. Lưu vào Supabase
    const { error: dbError } = await supabase.from('contacts').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || null,
      message: message?.trim() || null,
      lang,
      source: 'contact_form',
    });

    if (dbError) throw dbError;

    // 2. Gửi email thông báo cho Thịnh
    await resend.emails.send({
      from: 'CV Portfolio <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      subject: `[CV] Lead mới từ ${name.trim()}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#C9A96E">📬 Có người liên hệ qua CV!</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;color:#888;width:100px">Tên</td><td style="padding:8px"><strong>${name.trim()}</strong></td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;color:#888">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;color:#888">Chủ đề</td><td style="padding:8px">${subject?.trim() || '—'}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;color:#888">Lời nhắn</td><td style="padding:8px">${message?.trim() || '—'}</td></tr>
            <tr><td style="padding:8px;color:#888">Ngôn ngữ</td><td style="padding:8px">${lang === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}</td></tr>
          </table>
          <p style="margin-top:24px;color:#888;font-size:13px">Gửi lúc ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} (GMT+7)</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact] error:', err);
    return res.status(500).json({ error: 'Gửi thất bại, vui lòng thử lại sau' });
  }
}
