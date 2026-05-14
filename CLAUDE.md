# CLAUDE.md — Lê Tần Thịnh · Portfolio CV

## Quy tắc xưng hô
- AI (Claude) tự xưng là: **Odin**
- Gọi người dùng là: **Thịnh**

## Hướng dẫn mở lại cuộc trò chuyện
Mỗi khi Thịnh mở project này, Odin hãy:
1. Đọc file này (CLAUDE.md) để nắm context dự án
2. Đọc `memory/MEMORY.md` để nhớ preferences và lịch sử
3. Chào Thịnh và tóm tắt ngắn trạng thái project hiện tại (xem mục **Trạng thái hiện tại** bên dưới)
4. Hỏi Thịnh muốn tiếp tục việc gì

## Trạng thái hiện tại (cập nhật: 14/05/2026)

### ✅ Đã hoàn thành
- Frontend hoàn chỉnh: index.html, style.css, script.js
- Backend API: api/contact.js, api/download.js, api/analytics.js
- Vercel deploy config: vercel.json, package.json
- CV PDF: letanthinh-cv.pdf (VI), letanthinh-cv-vi.pdf, letanthinh-cv-en.pdf
- CV HTML thiết kế mới: cv-vi.html, cv-en.html (dark sidebar + gold, Syne font)
- Calendly: `letanthinh` đã điền vào 3 chỗ, bỏ todo-link
- Language picker popup: hiện mỗi lần vào trang, blur backdrop, highlight ngôn ngữ cũ
- Download CV: tự động serve đúng bản VI/EN theo ngôn ngữ đang xem
- Tooltip hover trên nút VI/EN
- Job analysis document: `Odin_PhanTich_CV_ThinhLT.docx`

### ⏳ Còn TODO (Thịnh tự điền)
- LinkedIn URL (3 chỗ trong index.html có class `todo-link`)
- TikTok URL (2 chỗ)
- Zalo số thật (thay `0000000000`)
- GitHub link (optional)
- YouTube link (optional)
- Chứng chỉ quốc tế: Google Analytics, Meta Blueprint (khuyến nghị của Odin)

### 🔧 Tech stack
- Frontend: Vanilla HTML/CSS/JS — deploy GitHub Pages
- Backend: Vercel Serverless Functions + Supabase + Resend (chưa cấu hình env vars)
- Env vars cần set trên Vercel Dashboard: SUPABASE_URL, SUPABASE_SERVICE_KEY, RESEND_API_KEY, NOTIFY_EMAIL

## Dự án là gì

CV/Portfolio cá nhân của **Lê Tần Thịnh** — Marketing & Brand Strategist.
Static site (HTML/CSS/JS) deploy trên GitHub Pages, sắp nâng cấp thêm backend Serverless + Supabase.

**Live URL (GitHub Pages):** `https://thinh262626.github.io/Le_Tan_Thinh/`
**Local dev:** mở `index.html` trực tiếp trên browser, hoặc `npx serve .`

---

## Stack hiện tại (Frontend)

| Thành phần | Công nghệ |
|---|---|
| Markup | HTML5 thuần |
| Style | CSS thuần (1 file `style.css`, minified inline) |
| Script | Vanilla JS (`script.js`) |
| Font | Google Fonts — Poppins + Syne |
| 3D sphere | TagCloud.js (CDN) |
| Card tilt | VanillaTilt.js (CDN) |
| Deploy | GitHub Pages (repo `thinh262626/Le_Tan_Thinh`) |

**Không dùng framework** (React, Vue, Next.js) — giữ static để deploy GitHub Pages đơn giản.

---

## Stack sắp thêm (Backend)

| Thành phần | Công nghệ | Mục đích |
|---|---|---|
| Serverless Functions | Vercel Edge Functions (Node.js) | Xử lý form, ghi DB |
| Database | Supabase (PostgreSQL) | Lưu leads, analytics |
| Email notify | Resend API | Gửi email cho Thịnh khi có lead mới |
| Deploy backend | Vercel | Cùng domain, miễn phí |

### Tại sao chọn kiến trúc này
- **Supabase** = PostgreSQL có dashboard trực quan, free tier 500MB, có REST API built-in
- **Vercel Functions** = serverless, không cần server riêng, deploy từ GitHub tự động
- **Resend** = email API đơn giản, 100 email/ngày free, không cần cấu hình SMTP
- Không dùng Formspree (trả phí sau 50 submissions/tháng)

---

## Cấu trúc file

```
thinh-cv/
├── index.html          # Toàn bộ markup CV
├── style.css           # Toàn bộ styles (minified single-line per rule)
├── script.js           # Toàn bộ frontend JS
├── avatar.jpg          # Ảnh profile Thịnh
├── letanthinh-cv.pdf   # CV PDF (Thịnh cần upload)
│
├── api/                # Vercel Serverless Functions (sẽ tạo)
│   ├── contact.js      # POST /api/contact — lưu form liên hệ vào Supabase
│   ├── download.js     # POST /api/download — track lượt tải CV
│   └── analytics.js    # POST /api/analytics — track page events
│
├── vercel.json         # Vercel config (routes, env) (sẽ tạo)
├── package.json        # Dependencies cho API functions (sẽ tạo)
├── .env.local          # Secrets local (KHÔNG commit — đã có trong .gitignore)
│
├── CLAUDE.md           # File này
├── Checklist_Chuan_Bi_CV.docx
└── .gitignore
```

---

## Supabase Schema

### Bảng `contacts`
```sql
create table contacts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text,
  source      text default 'contact_form',  -- 'contact_form' | 'float_btn'
  lang        text default 'vi'             -- 'vi' | 'en'
);
```

### Bảng `events`
```sql
create table events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  event_type  text not null,   -- 'cv_download' | 'page_view' | 'section_view'
  payload     jsonb,           -- { section: 'tiktok', lang: 'en', ... }
  referrer    text,
  user_agent  text
);
```

---

## API Endpoints

### `POST /api/contact`
Body: `{ name, email, subject, message, lang }`
- Validate input (name + email required)
- Insert vào bảng `contacts` trong Supabase
- Gửi email thông báo cho Thịnh qua Resend
- Return `{ success: true }` hoặc `{ error: "..." }`

### `POST /api/download`
Body: `{ lang }`
- Insert vào bảng `events` với `event_type: 'cv_download'`
- Return `{ success: true }`

### `POST /api/analytics`
Body: `{ event_type, payload }`
- Insert vào bảng `events`
- Fire-and-forget (không block UI)

---

## Environment Variables

Khai báo trong Vercel Dashboard và file `.env.local` (local dev):

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJ...  # service_role key (không phải anon key)
RESEND_API_KEY=re_...
NOTIFY_EMAIL=lethinh.2608t@gmail.com
```

> **Quan trọng:** Dùng `service_role` key (không phải `anon`) để Functions có thể ghi DB mà không cần auth.

---

## Conventions quan trọng

### CSS
- Mỗi rule trên 1 dòng (minified inline), không xuống dòng trong selector
- Màu dùng CSS variables: `var(--gold)`, `var(--bg)`, `var(--muted)`, v.v. (định nghĩa ở đầu `:root`)
- Responsive: mobile-first, breakpoints `@media (max-width: 900px)` và `@media (max-width: 600px)`
- Không dùng `!important` trừ print styles

### JS
- Vanilla JS, không import modules
- Mỗi feature trong `// ===== SECTION NAME =====` block
- Không dùng `var`, chỉ `const`/`let`
- Các API call về backend dùng `fetch` với `try/catch` — lỗi không block UI

### HTML
- `data-en` = English text cho lang toggle
- `data-en-html` = English HTML (khi có bold/em bên trong)
- `data-en-placeholder` = placeholder tiếng Anh cho input
- Class `todo-link` = link chưa có URL thật (Calendly, LinkedIn, v.v.)
- Class `reveal` = scroll animation (IntersectionObserver trong script.js)

---

## Những thứ Thịnh cần tự điền (TODO)

Tìm comment `📌 Thịnh cần:` trong `index.html`:

| Mục | Vị trí | Cần làm |
|---|---|---|
| Calendly | 3 chỗ trong index.html | Đăng ký calendly.com → thay `YOUR_CALENDLY_USERNAME` |
| LinkedIn URL | contact section + footer | Thay `href="#"` bằng link thật |
| TikTok URL | contact section + footer | Thay `href="#"` bằng link profile |
| Zalo | contact section | Thay `0000000000` bằng số thật |
| Video links | 4 video slots | Thêm link TikTok/YouTube vào từng slot |
| CV PDF | root folder | Upload file `letanthinh-cv.pdf` |
| GitHub | contact section | Optional — link repo AI Bot |

---

## Deploy

### Frontend (GitHub Pages) — hiện tại
```bash
git add . && git commit -m "update" && git push
# GitHub Pages tự build từ branch main
```

### Backend (Vercel) — sắp làm
```bash
npm i -g vercel
vercel login
vercel --prod
# Set env vars trên Vercel Dashboard
```

---

## Git

- Branch chính: `main`
- Remote: `github.com/thinh262626/Le_Tan_Thinh`
- `.gitignore` cần bổ sung: `node_modules/`, `.env.local`, `.env`

---

## Lịch sử quyết định

| Ngày | Quyết định | Lý do |
|---|---|---|
| 2025-05 | Dùng Vanilla JS, không framework | Giữ static deploy GitHub Pages, không cần build step |
| 2025-05 | Decode effect dùng span riêng từng ký tự | `textContent` toàn h1 gây layout shift; span cố định width theo `getBoundingClientRect` |
| 2025-05 | Chọn Supabase thay Firebase | Dashboard PostgreSQL trực quan hơn, Thịnh không cần real-time |
| 2025-05 | Chọn Resend thay SendGrid | Đơn giản hơn, free 100/ngày đủ cho CV cá nhân |
