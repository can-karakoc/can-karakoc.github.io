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
        {/* Header Section */}
        <ScrollReveal>
          <div className="text-center mb-12">
            {/* Reach Out Badge */}
            <div className="flex justify-center mb-6">
              <span
                className="px-6 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124, 185, 232, 0.3)',
                  color: 'var(--color-ink)',
                }}
              >
                Reach Out
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="font-extrabold leading-tight mb-4"
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                letterSpacing: '-0.04em',
                color: 'var(--color-ink)',
              }}
            >
              Let's connect!
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{
                color: 'var(--color-ink-muted)',
              }}
            >
              I would love to connect and build something together.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto">
            {/* White Form Card - CENTERED */}
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
                  className="w-full px-6 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: '#2D3340',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  Send a message
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
