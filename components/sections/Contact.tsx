'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations';

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 py-20 min-h-[90vh] flex items-center"
    >

      <div className="relative z-10 max-w-[1160px] mx-auto w-full">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Socials Sidebar - LEFT */}
            <div className="flex flex-col gap-3">
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

              {/* Email - Glass Button */}
              <a
                href="mailto:cankarakoc@berkeley.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full no-underline transition-all duration-300 mag text-center font-semibold text-sm"
                style={{
                  background: 'var(--color-glass-55)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--color-glass-border)',
                  color: 'var(--color-ink)',
                  boxShadow: 'var(--shadow-glass-drop)',
                }}
              >
                Email
              </a>

              {/* LinkedIn - Glass Button */}
              <a
                href="https://www.linkedin.com/in/can-karakoc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full no-underline transition-all duration-300 mag text-center font-semibold text-sm"
                style={{
                  background: 'var(--color-glass-55)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--color-glass-border)',
                  color: 'var(--color-ink)',
                  boxShadow: 'var(--shadow-glass-drop)',
                }}
              >
                LinkedIn
              </a>

              {/* GitHub - Glass Button */}
              <a
                href="https://github.com/can-karakoc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full no-underline transition-all duration-300 mag text-center font-semibold text-sm"
                style={{
                  background: 'var(--color-glass-55)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--color-glass-border)',
                  color: 'var(--color-ink)',
                  boxShadow: 'var(--shadow-glass-drop)',
                }}
              >
                GitHub
              </a>
            </div>

            {/* White Form Card - RIGHT */}
            <div
              className="rounded-[32px] px-10 py-12"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 40px 80px -30px rgba(124, 185, 232, 0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
              }}
            >
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
        </ScrollReveal>
      </div>
    </section>
  );
}
