# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SAY HI web — a marketing/portfolio site for "SAY HI INCORPORATED". Plain JavaScript React 19 + Vite app (no TypeScript) with react-router-dom v7, deployed on Vercel.

## Commands

- `npm run dev` — start dev server with HMR (default http://localhost:5173)
- `npm run build` — production build
- `npm run preview` — serve the production build locally
- `npm run lint` — lint with oxlint (config in `.oxlintrc.json`; plugins: react, oxc)

There are no tests and no test runner.

## Architecture

Routing lives entirely in `src/App.jsx`: `BrowserRouter` with a flat `<Routes>` list — one route per page component in `src/pages/<Page>/index.jsx`. Current routes: `/` (Home), `/team` (Team), `/contact` (Contact). To add a page, create the folder, then register the route in `App.jsx`. Navigation must use `Link` from react-router-dom for internal routes (not `<a href>`).

Each page is a self-contained folder in `src/pages/<Page>/` pairing `index.jsx` with a page-level CSS file (`src/pages/Home/home.css`, `src/pages/Team/Team.css`, `src/pages/Contact/Contact.css`). `src/index.css` holds global styles.

## Coding rules (ที่โปรเจกต์นี้ใช้จริง)

- **Plain CSS แยกต่อหน้า — ไม่ใช้ Tailwind, ไม่เพิ่ม dependency ใหม่** ถ้าต้องแชร์สี/ฟอนต์ ให้อ่านจาก CSS variables ที่ `home.css` (`:root` + `[data-theme="dark"]`): `--bg-primary`, `--bg-secondary`, `--ink`, `--gray-text`, `--blue-nav`, `--grad-text`, `--grad-btn`, `--radius-pill` ฯลฯ
- **Dark mode** = attribute `data-theme` บน `<html>` + `localStorage` key `"theme"` — ทุกหน้า init ธีมใน `useEffect` ตัวแรก (โครง `initTheme`/`applyTheme`/`switchTheme` ต้องเหมือนกันทุกหน้า) ข้อยกเว้น: หน้า Team ใช้ `body.dark-mode` แบบเก่าคู่ขนานอยู่ด้วย — อย่ายุบรวมเองหากไม่ได้รับมอบหมาย
- **ข้อมูลแบบ array เดียว:** ข้อมูลที่ทำซ้ำ (สมาชิกทีม, ลิงก์โซเชียล) ให้เก็บเป็น array ที่ตำแหน่งเดียวแล้ว `.map()` แสดง — เช่น `teamMembers` ใน `src/pages/Home/index.jsx`, `SOCIAL_LINKS` ใน `src/pages/Contact/index.jsx`, `teamMembers` ใน `src/pages/Team/index.jsx` แก้ข้อมูลที่ array จุดเดียวจบ
- **รูปภาพ:** ใช้ `<img>` พร้อม `alt`, `loading="lazy"`, `object-fit: cover` และต้องมี fallback placeholder ทุกกรณีที่รูปหาย (`onError` สลับ state เป็น placeholder ไม่ให้การ์ดโล่ง) — ไฟล์รูปวางใน `public/` แล้วอ้างเป็น absolute path เช่น `"/team/team-pob.JPG"` (ตรงกับชื่อไฟล์จริงทั้งตัวพิมพ์และนามสกุล)
- **`useEffect` แบบ imperative DOM:** หน้าต่างๆ ใช้ `useEffect` array ว่างผูก DOM ตรงๆ ผ่าน `document.querySelector` (hamburger menu, IntersectionObserver, marquee touch-pause ฯลฯ) — ทุก listener ที่เพิ่มต้องมี cleanup ใน return ของ effect เสมอ, `setInterval`/`setTimeout` ต้อง clear ตอน unmount (ดูตัวอย่าง `src/pages/Contact/useLocalTime.js`)
- **Accessibility:** อนิเมชัน/transition ต้องถูกปิดเมื่อ `prefers-reduced-motion: reduce`, ลิงก์ครบ `aria-label` ตามสมควร, ปุ่ม/ลิงก์ต้องมี `:focus-visible` ที่มองเห็นชัด, ลิงก์ภายนอกใช้ `target="_blank" rel="noopener noreferrer"`
- **ขอบเขตการแก้:** แก้เฉพาะไฟล์/หน้าที่ได้รับมอบหมาย — ห้ามแก้หน้าอื่น หรือ CSS ส่วนกลางของหน้าอื่นโดยไม่ได้ขออนุญาต (หากต้องเพิ่ม class ใหม่ ให้เพิ่ม block ท้ายไฟล์ของ section ตัวเอง ไม่แก้กฎเดิม)

## Gotchas

- Pages use a single `useEffect` with an empty dependency array that wires up imperative DOM behavior — keep listener cleanup in the effect's return function consistent. Team's dark mode toggles `body.dark-mode` while Home/Contact toggle `documentElement[data-theme]` — the two implementations are not currently unified.
- Home's "OUR TEAM" section is a CSS-marquee (`--marquee-duration` controls speed): two duplicated `team-track-group`s + `translateX(-50%)` keyframes for a seamless loop; the second copy is `aria-hidden` and must not contain focusable elements.
- The `/work` route referenced by nav/footer links does not exist yet.
- `vercel.json` rewrites all paths to `/index.html` for SPA client-side routing. The project root also contains a stray duplicate `Team.css` and an `index.jsx` that is a stale copy of the Team page — `src/main.jsx` (referenced by `index.html`) is the real entry point; don't edit the root copies.

สถานะงานล่าสุดและสิ่งที่ยังค้าง: ดูที่ `HANDOFF.md`
