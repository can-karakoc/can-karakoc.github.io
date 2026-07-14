# Can Karakoç — Portfolio

A personal portfolio website featuring a **Frutiger Aero** design system with glass morphism, aurora gradients, and playful micro-interactions.

Built with **Next.js 14+**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🎨 Design System

### Colors
- **Cobalt Blues**: Primary brand colors (#1D4ED8, #2249B8, #122E8C)
- **Aqua/Cyan**: Accent colors for aurora effects (#38BDF8, #0891B2)
- **Lime Spark**: Attention color (#C6F135)
- **Glass Surfaces**: Translucent white with backdrop blur

### Typography
- **Display/Body**: Plus Jakarta Sans (400/500/600/700/800)
- **Mono/Labels**: IBM Plex Mono (400/500)

### Key Features
- Animated headline with staggered word reveals
- Glass morphism navigation with orb logo splash effect
- Floating browser window mockups for projects
- Ambient aurora background with drift animations
- Scroll-reveal system with IntersectionObserver
- Springy hover interactions (.mag)
- Flowing gradient CTA button

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio-main/
├── app/
│   ├── about/          # About page
│   ├── globals.css     # Design tokens & keyframes
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Homepage
│   └── icon.tsx        # Generated favicon
├── components/
│   ├── ui/             # Atomic components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── GlassCard.tsx
│   │   ├── OrbLogo.tsx
│   │   ├── GradientText.tsx
│   │   └── SocialIcon.tsx
│   ├── sections/       # Page sections
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Resume.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── animations/     # Animation components
│       ├── AuroraBackground.tsx
│       └── ScrollReveal.tsx
├── public/
│   ├── images/         # Project screenshots
│   └── resume.pdf      # Resume file
└── next.config.ts      # Next.js configuration
```

## 🎯 Component Usage

### Atomic Components

```tsx
import { Button, Badge, GlassCard, OrbLogo, GradientText } from '@/components/ui';

// Button variants: 'glass', 'gradient', 'primary', 'cta'
<Button variant="gradient">Click me</Button>

// Badge with pulsing dot
<Badge withDot dotColor="var(--color-green)">Available</Badge>

// Glass card with opacity control
<GlassCard opacity="60">Content</GlassCard>

// Orb logo with splash animation
<OrbLogo size={34} />

// Gradient text
<GradientText>human-centered</GradientText>
```

### Animations

```tsx
import { ScrollReveal, AuroraBackground } from '@/components/animations';

// Scroll-triggered reveal
<ScrollReveal delay={0.1}>
  <div>Content appears on scroll</div>
</ScrollReveal>

// Ambient aurora background
<AuroraBackground />
```

## 🌐 Deployment

### Recommended: Vercel

This portfolio is optimized for **Vercel** deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Why Vercel?**
- ✅ Zero-config Next.js deployment
- ✅ Automatic image optimization
- ✅ Edge functions & ISR support
- ✅ Built-in analytics
- ✅ Custom domains & HTTPS

### Alternative: GitHub Pages

For static deployment to GitHub Pages:

1. Uncomment in `next.config.ts`:
   ```ts
   output: 'export',
   images: { unoptimized: true },
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Deploy the 'out' directory to GitHub Pages
   ```

**Trade-offs:**
- ❌ No server-side features
- ❌ No image optimization
- ❌ No ISR/SSR
- ✅ Free hosting on GitHub

## 📝 Customization

### Update Project Data

Edit `components/sections/Projects.tsx`:

```tsx
const projects: Project[] = [
  {
    id: 'your-project',
    title: 'Your Project Title',
    category: 'Full-stack',
    categoryColor: 'var(--color-cobalt)',
    description: 'Description here',
    link: 'https://your-project.com',
    gradientBg: 'linear-gradient(150deg, #4f7dff, #38bdf8)',
    screenshot: '/images/projects/your-screenshot.png', // Optional
  },
];
```

### Add Resume PDF

Replace `/public/resume.pdf` with your resume file.

### Update Personal Info

- Email, social links: `components/sections/Hero.tsx`, `Contact.tsx`
- Education: `components/sections/Resume.tsx`
- Meta tags: `app/layout.tsx`

### Design Tokens

All design tokens are in `app/globals.css` using Tailwind v4's `@theme inline` syntax.

## 🎨 Key Animations

- **drift1/2/3**: Aurora blob drift (22-28s loops)
- **splash**: Orb splash ring on hover
- **ctaflow**: CTA button flowing gradient
- **hword**: Headline word entrance
- **shimmer/rise/bob/glint**: Decorative effects

## 📦 Dependencies

- **next**: ^16.2.10
- **react**: ^19.0.0
- **framer-motion**: ^12.0.7
- **tailwindcss**: ^4.x

## 🔧 Development Notes

- This uses **Tailwind CSS v4** with inline `@theme` syntax
- Fonts are loaded via `next/font/google`
- All animations use CSS keyframes or Framer Motion
- Scroll reveals use IntersectionObserver for performance
- Glass effects require `backdrop-filter` support

## 📄 License

Personal portfolio — all rights reserved.

---

Built with ❤️ by Can Karakoç
