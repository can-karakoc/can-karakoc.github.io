# Can Karakoc — Product Engineer Portfolio

A bright, playful, interactive one-page portfolio branding you as a **product
engineer** — someone who researches, designs, and builds end-to-end.

Stack: **Vite + React + TypeScript + Tailwind + Framer Motion + Lenis**.
The hero is an interactive DOM grid (no WebGL dependency).

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Requires Node 18+.

---

## Deploy to Vercel (recommended)

1. Push this folder to a GitHub repo.
2. Go to vercel.com → **New Project** → import the repo.
3. Vercel auto-detects Vite. Framework preset: **Vite**, build command
   `npm run build`, output dir `dist`. `vercel.json` is already set.
4. Deploy. Add a custom domain (e.g. `cankarakoc.com`) in project settings.

Every push gets a live preview URL — handy for iterating on design.

> Prefer GitHub Pages? It works too, but needs a build action since this is
> not plain static HTML. Vercel is less friction for an animated site.

---

## Where to edit things

| I want to change… | Open |
| --- | --- |
| The rotating verbs under my name | `src/components/Hero.tsx` → `VERBS` |
| Hero copy / role label | `src/components/Hero.tsx` |
| Projects (add / edit / reorder) | `src/data/projects.ts` |
| Capability bands + marquee items | `src/data/capabilities.ts` |
| About / manifesto text | `src/components/About.tsx` |
| Email + social links | `src/components/Contact.tsx` → `EMAIL`, `LINKS` |
| Colors, fonts, type scale | `tailwind.config.js` |
| Hero grid colors / density / motion | `src/components/HeroGrid.tsx` |

### Turning on your design case studies later

When you're ready to show Trip-Up / Marketwake / Playbook alongside the
technical work:

1. In `src/data/projects.ts`, add them as entries with `track: "design"`.
2. Set `SHOW_DESIGN_TRACK = true`.

The grid and an **All / Build / Design** filter appear automatically — no
other changes needed.

---

## Brand tokens

- **Ink** `#16151B` · **Paper** `#F5F4EF`
- **Cobalt** `#2B34FF` · **Lime** `#C6F135` (fluor pop) · **Periwinkle** `#94ADFF`
- **Lilac** `#C5B6F1` (soft support)
- Display + Body: **Plus Jakarta Sans** · Data/labels: **IBM Plex Mono**

## Accessibility built in

- Respects `prefers-reduced-motion` (disables Lenis, grid pointer glow, and verb rotation).
- Visible keyboard focus rings.
- Hero grid degrades to a static lit pattern under reduced motion.
- Responsive down to mobile.
