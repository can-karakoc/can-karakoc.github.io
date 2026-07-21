'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations';
import { EmailIcon, LinkedInIcon, GitHubIcon } from '@/components/ui/SocialIcon';

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 min-h-screen flex items-center justify-center"
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
                className="flex items-center gap-2 px-5 py-3 rounded-full no-underline transition-all duration-300 mag font-semibold text-sm"
                style={{
                  background: 'var(--color-glass-55)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--color-glass-border)',
                  color: 'var(--color-ink)',
                  boxShadow: 'var(--shadow-glass-drop)',
                }}
              >
                <EmailIcon />
                Email
              </a>

              {/* LinkedIn - Glass Button */}
              <a
                href="https://www.linkedin.com/in/can-karakoc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full no-underline transition-all duration-300 mag font-semibold text-sm"
                style={{
                  background: 'var(--color-glass-55)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--color-glass-border)',
                  color: 'var(--color-ink)',
                  boxShadow: 'var(--shadow-glass-drop)',
                }}
              >
                <LinkedInIcon />
                LinkedIn
              </a>

              {/* GitHub - Glass Button */}
              <a
                href="https://github.com/can-karakoc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full no-underline transition-all duration-300 mag font-semibold text-sm"
                style={{
                  background: 'var(--color-glass-55)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--color-glass-border)',
                  color: 'var(--color-ink)',
                  boxShadow: 'var(--shadow-glass-drop)',
                }}
              >
                <GitHubIcon />
                GitHub
              </a>
            </div>

            {/* White Form Card - RIGHT */}
            <div
              className="rounded-[32px] px-8 py-8"
              style={{
                background: 'rgba(255, 255, 255, 0.65)',
                boxShadow: '0 40px 80px -30px rgba(124, 185, 232, 0.4), inset 0 1px 0 rgba(255,255,255,0.9)',
                backdropFilter: 'blur(40px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(40px) saturate(1.5)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
              }}
            >
              <h2
                className="font-extrabold leading-tight mb-2"
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  letterSpacing: '-0.035em',
                  color: 'var(--color-ink)',
                }}
              >
                Get in Touch
              </h2>
              <p
                className="text-base mb-6"
                style={{
                  color: 'var(--color-ink-muted)',
                }}
              >
                Have a project or idea? Let's talk.
              </p>

              <form
                action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xdkozkoj'}`}
                method="POST"
                className="space-y-3"
              >
                {/* Name & Email Row */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full px-4 py-3 rounded-2xl text-base"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid rgba(124, 185, 232, 0.25)',
                      color: 'var(--color-ink)',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-2xl text-base"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid rgba(124, 185, 232, 0.25)',
                      color: 'var(--color-ink)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Message */}
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl text-base resize-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(124, 185, 232, 0.25)',
                    color: 'var(--color-ink)',
                    outline: 'none',
                  }}
                />

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
