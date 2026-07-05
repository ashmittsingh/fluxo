"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const loginSchema = z.object({
    email: z.email("Please Enter A Valid Email Address"),
    password: z.string().min(1, "Password Is Required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function GoogleMark() {
    return (
        <span
            aria-hidden="true"
            className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none"
            style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
        >
            G
        </span>
    );
}

export function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/"
        }, {
            onSuccess: () => {
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            },
        });
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="mx-auto w-full max-w-sm animate-[fade-in-up_0.6s_ease-out_both] px-1 sm:px-0">
            {/* Mobile-only wordmark — the brand panel is hidden below md,
                so identity still needs to appear above the form. */}
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.2em] uppercase md:hidden"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-[#0B0B0C]" />
                Fluxo
            </Link>
 
            <p className="font-mono text-[11px] tracking-[0.3em] text-[#6E6E6E] uppercase">
                Sign in
            </p>
            <h1
                className="mt-2 text-[1.9rem] leading-[1.06] text-[#0B0B0C] sm:mt-3 sm:text-[2.35rem]"
                style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
            >
                Welcome back
            </h1>
            <p className="mt-2 text-[0.9rem] leading-6 text-[#6E6E6E] sm:mt-3 sm:text-[0.93rem]">
                Continue building with Fluxo.
            </p>
 
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5 sm:mt-8 sm:gap-6" noValidate>
                {/* Email */}
                <Controller
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <div className="group relative">
                            <label
                                htmlFor="email"
                                className="block text-[11px] font-medium tracking-[0.15em] text-[#6E6E6E] uppercase"
                            >
                                Email
                            </label>
                            <input
                                {...field}
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@company.com"
                                aria-invalid={!!form.formState.errors.email}
                                aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                                className="peer mt-2 w-full border-0 border-b border-[#E2E2E0] bg-transparent pb-2 text-[0.95rem] text-[#0B0B0C] outline-none placeholder:text-[#B9B9B6] focus:border-[#E2E2E0]"
                            />
                            {/* Ink underline that draws in on focus — the page's signature micro-interaction */}
                            <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#0B0B0C] transition-transform duration-300 ease-out peer-focus:scale-x-100" />
                            {form.formState.errors.email && (
                                <p id="email-error" className="mt-2 text-[12px] text-[#0B0B0C] underline decoration-[#0B0B0C]/40 underline-offset-2">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>
                    )}
                />
 
                {/* Password */}
                <Controller
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <div className="group relative">
                            <div className="flex items-baseline justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-[11px] font-medium tracking-[0.15em] text-[#6E6E6E] uppercase"
                                >
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-[12px] text-[#6E6E6E] underline decoration-[#E2E2E0] underline-offset-4 transition-colors hover:text-[#0B0B0C] hover:decoration-[#0B0B0C]"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    {...field}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    aria-invalid={!!form.formState.errors.password}
                                    aria-describedby={form.formState.errors.password ? "password-error" : undefined}
                                    className="peer mt-2 w-full border-0 border-b border-[#E2E2E0] bg-transparent pb-2 pr-8 text-[0.95rem] text-[#0B0B0C] outline-none placeholder:text-[#B9B9B6] focus:border-[#E2E2E0]"
                                />
                                <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#0B0B0C] transition-transform duration-300 ease-out peer-focus:scale-x-100" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    className="absolute bottom-1.5 right-0 text-[#6E6E6E] transition-colors hover:text-[#0B0B0C]"
                                >
                                    {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                                </button>
                            </div>
                            {form.formState.errors.password && (
                                <p id="password-error" className="mt-2 text-[12px] text-[#0B0B0C] underline decoration-[#0B0B0C]/40 underline-offset-2">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>
                    )}
                />
 
                {/* Remember me — custom checkbox, no default browser styling */}
                <div className="flex items-center gap-2.5">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="peer sr-only"
                    />
                    <label
                        htmlFor="remember"
                        className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center border border-[#0B0B0C] transition-colors peer-checked:bg-[#0B0B0C] peer-focus-visible:ring-1 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[#0B0B0C]"
                    >
                        <svg
                            viewBox="0 0 12 10"
                            className={`h-2.5 w-2.5 fill-none stroke-white transition-opacity duration-150 ${remember ? "opacity-100" : "opacity-0"}`}
                            strokeWidth="1.6"
                        >
                            <path d="M1 5.2 4.2 8.4 11 1" />
                        </svg>
                    </label>
                    <label htmlFor="remember" className="cursor-pointer text-[13px] text-[#6E6E6E]">
                        Remember me
                    </label>
                </div>
 
                {/* Primary CTA — solid ink button, inverts on hover, spinner while pending */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="group relative mt-1 flex h-12 w-full items-center justify-center overflow-hidden border border-[#0B0B0C] bg-[#0B0B0C] text-[0.9rem] font-medium tracking-[0.02em] text-white transition-all duration-300 hover:bg-white hover:text-[#0B0B0C] disabled:cursor-not-allowed disabled:opacity-60 sm:hover:scale-[1.01] sm:disabled:hover:scale-100"
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
                            Signing in
                        </span>
                    ) : (
                        "Continue"
                    )}
                </button>
 
                {/* Divider */}
                <div className="flex items-center gap-4 py-0.5">
                    <span className="h-px flex-1 bg-[#E2E2E0]" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#B9B9B6] uppercase">
                        or continue with
                    </span>
                    <span className="h-px flex-1 bg-[#E2E2E0]" />
                </div>
 
                {/* Social sign-in */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        disabled={isPending}
                        className="flex h-11 items-center justify-center gap-2 border border-[#E2E2E0] text-[0.85rem] text-[#0B0B0C] transition-colors hover:border-[#0B0B0C]"
                    >
                        <GoogleMark />
                        Google
                    </button>
                    <button
                        type="button"
                        disabled={isPending}
                        className="flex h-11 items-center justify-center gap-2 border border-[#E2E2E0] text-[0.85rem] text-[#0B0B0C] transition-colors hover:border-[#0B0B0C]"
                    >
                        {/* <Github size={15} strokeWidth={1.5} /> */}
                        GitHub
                    </button>
                </div>
            </form>
 
            <p className="mt-6 text-center text-[13px] leading-6 text-[#6E6E6E] sm:mt-8">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#0B0B0C] underline decoration-[#0B0B0C]/30 underline-offset-4 hover:decoration-[#0B0B0C]">
                    Sign up
                </Link>
            </p>
 
            {/* Local keyframes — scoped, no tailwind.config changes required */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
}