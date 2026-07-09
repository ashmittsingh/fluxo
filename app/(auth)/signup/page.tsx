import React from 'react'
import Link from "next/link";
import { SignupForm } from '@/components/SignupForm';
import { requireUnauth } from '@/lib/auth-utils';

const SignUpPage = async () => {
   await requireUnauth();
  return (
    <div className="flex h-svh w-full justify-center overflow-hidden bg-white">
      <div className="flex w-full max-w-[1600px] flex-col md:flex-row">
        <aside className="relative hidden shrink-0 flex-col justify-between overflow-hidden bg-[#0B0B0C] px-10 py-10 text-white md:flex md:w-[38%] lg:w-[42%] xl:w-[45%] xl:px-16 xl:py-12">
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>

          <span
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 rotate-90 font-mono text-[10px] tracking-[0.4em] text-white/25 xl:block"
            aria-hidden="true"
          >
            WORKFLOW OS — FLUXO
          </span>

          <Link href="/" className="relative z-10 flex items-center gap-2 text-[13px] font-medium tracking-[0.2em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Fluxo
          </Link>

          <blockquote
            className="relative z-10 max-w-md text-[1.9rem] leading-tight text-white lg:text-[2.15rem]"
            style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
          >
            &ldquo;Every workflow, without friction.&rdquo;
            <footer className="mt-4 font-mono text-[11px] tracking-[0.2em] text-white/40 not-italic">
              — Built for teams who ship
            </footer>
          </blockquote>

          <p className="relative z-10 font-mono text-[11px] tracking-[0.15em] text-white/35">
            © {new Date().getFullYear()} Fluxo
          </p>
        </aside>

        <main className="flex flex-1 items-start justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-8 md:items-center md:px-12 md:py-10 lg:px-16 lg:py-12">
          <SignupForm />
        </main>
      </div>
    </div>
  )
}

export default SignUpPage;