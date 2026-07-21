'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations';

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 py-20 min-h-[90vh] flex items-center"
      style={{
        background: 'var(--color-surface-white)',
      }}
    >
      <div className="max-w-[1160px] mx-auto w-full">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-center">
            {/* Form Card with Bubbly Grid */}
            <div
              className="relative overflow-hidden rounded-[32px] px-10 py-12"
              style={{
                background: 'linear-gradient(180deg, #ffffff, #eef5ff 60%, #e6f0fb)',
                boxShadow: '0 40px 80px -30px rgba(124, 185, 232, 0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              {/* Background layers - bubbly grid from hero */}
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-clip pointer-events-none"
              >
                {/* Animated moving hue blobs */}
                <div
                  className="absolute w-[500px] h-[500px] rounded-full opacity-20"
                  style={{
                    top: '10%',
                    left: '10%',
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(124, 185, 232, 0.4), transparent 70%)',
                    filter: 'blur(100px)',
                    animation: 'drift1 30s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute w-[450px] h-[450px] rounded-full opacity-15"
                  style={{
                    top: '30%',
                    right: '15%',
                    background:
                      'radial-gradient(circle at 50% 50%, rgba(157, 213, 220, 0.35), transparent 70%)',
                    filter: 'blur(90px)',
                    animation: 'drift2 35s ease-in-out infinite',
                  }}
                />

                {/* White glow - center */}
                <div
                  className="absolute opacity-70"
                  style={{
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '700px',
                    height: '500px',
                    background:
                      'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.4) 40%, transparent 65%)',
                  }}
                />

                {/* Aero grid overlay */}
                <div className="absolute inset-0 aero-grid" />

                {/* Animated Grain overlay */}
                <div
                  className="grain"
                  style={{
                    opacity: 0.25,
                    animation: 'grain 8s steps(10) infinite',
                    mixBlendMode: 'overlay',
                  }}
                />

                {/* Floating bubbles */}
                <div
                  className="absolute w-16 h-16 rounded-full opacity-0"
                  style={{
                    bottom: '80px',
                    left: '20%',
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(157, 213, 220, 0.4) 60%, transparent)',
                    filter: 'blur(10px)',
                    animation: 'rise 10s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute w-12 h-12 rounded-full opacity-0"
                  style={{
                    bottom: '60px',
                    right: '25%',
                    background:
                      'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75), rgba(124, 185, 232, 0.35))',
                    filter: 'blur(8px)',
                    animation: 'rise 8s ease-in-out infinite 1s',
                  }}
                />
              </div>

              {/* Form Content */}
              <div className="relative z-10">
                <h2
                  className="font-extrabold leading-tight mb-3"
                  style={{
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    letterSpacing: '-0.035em',
                    color: 'var(--color-ink)',
                  }}
                >
                  Get in Touch
                </h2>
                <p
                  className="text-lg mb-8"
                  style={{
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  Have a project or idea? Let's talk.
                </p>

                <form
                  action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xdkozkoj'}`}
                  method="POST"
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-2xl text-base"
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(124, 185, 232, 0.3)',
                        color: 'var(--color-ink)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-2xl text-base"
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(124, 185, 232, 0.3)',
                        color: 'var(--color-ink)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-2xl text-base resize-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(124, 185, 232, 0.3)',
                        color: 'var(--color-ink)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 rounded-full font-bold text-sm text-white mag"
                    style={{
                      background: 'linear-gradient(180deg, var(--color-cobalt), var(--color-cobalt-darker))',
                      boxShadow:
                        'inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 16px -6px rgba(124, 185, 232, 0.6)',
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Socials Sidebar */}
            <div className="flex flex-col gap-4">
              <h3
                className="font-extrabold mb-2"
                style={{
                  fontSize: '18px',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-ink)',
                }}
              >
                Connect
              </h3>

              {/* Email */}
              <a
                href="mailto:cankarakoc@berkeley.edu"
                className="p-5 rounded-3xl no-underline transition-all duration-300 hover:shadow-lg group"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(124, 185, 232, 0.2)',
                }}
              >
                <p
                  className="text-xs font-bold mb-1 uppercase tracking-wider"
                  style={{
                    fontFamily: 'var(--font-plex)',
                    color: 'var(--color-cobalt)',
                  }}
                >
                  Email
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-ink)' }}
                >
                  cankarakoc@<br/>berkeley.edu
                </p>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/can-karakoc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-3xl no-underline transition-all duration-300 hover:shadow-lg group"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(124, 185, 232, 0.2)',
                }}
              >
                <p
                  className="text-xs font-bold mb-1 uppercase tracking-wider"
                  style={{
                    fontFamily: 'var(--font-plex)',
                    color: 'var(--color-cobalt)',
                  }}
                >
                  LinkedIn
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-ink)' }}
                >
                  can-karakoc
                </p>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/can-karakoc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-3xl no-underline transition-all duration-300 hover:shadow-lg group"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(124, 185, 232, 0.2)',
                }}
              >
                <p
                  className="text-xs font-bold mb-1 uppercase tracking-wider"
                  style={{
                    fontFamily: 'var(--font-plex)',
                    color: 'var(--color-cobalt)',
                  }}
                >
                  GitHub
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-ink)' }}
                >
                  can-karakoc
                </p>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
