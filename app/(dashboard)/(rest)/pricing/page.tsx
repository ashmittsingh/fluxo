"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Gift, Rocket, Star, Building2, Landmark } from "lucide-react";
import BuyButton from "@/components/pricing/BuyButton";
import type { Plan as BillingPlan } from "@/config/pricing";

interface Plan {
    name: string;
    billingPlan?: BillingPlan;
    icon: React.ElementType;
    price: string;
    priceCaption: string;
    description: string;
    featuresIntro: string;
    features: string[];
    cta: string;
    popular?: boolean;
}

const plans: Plan[] = [
    {
        name: "Free",
        icon: Gift,
        price: "₹0",
        priceCaption: "/month",
        description: "Perfect for learning and testing automation.",
        featuresIntro: "Includes",
        cta: "Start Free",
        features: [
            "3 workflows",
            "500 workflow executions / month",
            "10 integrations",
            "AI Workflow Builder (limited)",
            "Webhooks",
            "Community support",
        ],
    },
    {
        name: "Starter",
        billingPlan: "STARTER",
        icon: Rocket,
        price: "₹199",
        priceCaption: "/month",
        description: "Perfect for individuals & beginners.",
        featuresIntro: "Includes",
        cta: "Get Starter",
        features: [
            "10 workflows",
            "5,000 workflow executions / month",
            "50+ integrations",
            "AI Workflow Builder",
            "Webhooks",
            "Schedule triggers",
            "Email notifications",
            "Email support",
        ],
    },
    {
        name: "Pro",
        billingPlan: "PRO",
        icon: Star,
        price: "₹499",
        priceCaption: "/month",
        description: "Perfect for freelancers & growing startups.",
        featuresIntro: "Everything in Starter, plus:",
        cta: "Get Pro",
        popular: true,
        features: [
            "Unlimited workflows",
            "25,000 workflow executions / month",
            "100+ integrations",
            "Custom variables",
            "Multi-step workflows",
            "API access",
            "Workflow templates",
            "Priority support",
            "Workflow analytics",
        ],
    },
    {
        name: "Business",
        billingPlan: "BUSINESS",
        icon: Building2,
        price: "₹999",
        priceCaption: "/month",
        description: "Perfect for teams & agencies.",
        featuresIntro: "Everything in Pro, plus:",
        cta: "Get Business",
        features: [
            "Unlimited workflows",
            "100,000 workflow executions / month",
            "Unlimited integrations",
            "Team workspace",
            "Unlimited team members",
            "Advanced analytics",
            "Secrets management",
            "Environment variables",
            "Workflow version history",
            "Audit logs",
            "Premium support",
        ],
    },
    {
        name: "Enterprise",
        icon: Landmark,
        price: "Contact Sales",
        priceCaption: "Custom pricing",
        description: "Perfect for large organizations.",
        featuresIntro: "Everything in Business, plus:",
        cta: "Contact Sales",
        features: [
            "Unlimited executions",
            "Dedicated infrastructure",
            "Single sign-on (SSO)",
            "SLA",
            "White label",
            "Dedicated success manager",
            "Custom integrations",
            "Custom limits",
            "Security review",
            "Priority engineering support",
        ],
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-svh w-full bg-white px-6 py-20 text-[#0B0B0C] sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1600px]">
                {/* ---------- Header ---------- */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-xl"
                >
                    <p className="font-mono text-[11px] tracking-[0.3em] text-[#6E6E6E] uppercase">Pricing</p>
                    <h1
                        className="mt-3 text-[2.5rem] leading-[1.1] sm:text-[3rem]"
                        style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
                    >
                        Fluxo Pricing
                    </h1>
                    <p className="mt-4 text-[0.95rem] text-[#6E6E6E]">
                        Choose the plan that fits how far you are on your automation journey —
                        upgrade anytime as your workflows grow.
                    </p>
                </motion.div>

                <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 xl:grid xl:grid-cols-5 xl:overflow-visible xl:pb-0">
                    {plans.map((plan, i) => {
                        const isPopular = plan.popular;
                        const Icon = plan.icon;
                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -3 }}
                                className={`relative flex w-[280px] shrink-0 snap-start flex-col gap-6 border p-7 xl:w-auto ${isPopular
                                        ? "border-[#0B0B0C] bg-[#0B0B0C] text-white"
                                        : "border-[#E2E2E0] bg-white text-[#0B0B0C]"
                                    }`}
                            >
                                {isPopular && (
                                    <span className="absolute right-6 top-6 border border-white/40 px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] text-white/70 uppercase">
                                        Most popular
                                    </span>
                                )}

                                <Icon size={20} strokeWidth={1.5} className={isPopular ? "text-white" : "text-[#0B0B0C]"} />

                                <div>
                                    <h2 className="text-[1.1rem] font-medium">{plan.name}</h2>
                                    <p className={`mt-2 text-[0.82rem] leading-relaxed ${isPopular ? "text-white/60" : "text-[#6E6E6E]"}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="flex items-baseline gap-1.5">
                                    <span
                                        className={plan.name === "Enterprise" ? "text-[1.6rem] leading-none" : "text-[2.25rem] leading-none"}
                                        style={{ fontFamily: "var(--font-display, Georgia, serif)" }}
                                    >
                                        {plan.price}
                                    </span>
                                    <span className={`text-[12px] ${isPopular ? "text-white/50" : "text-[#B9B9B6]"}`}>
                                        {plan.priceCaption}
                                    </span>
                                </div>

                                <BuyButton
                                    plan={plan.name}
                                    billingPlan={plan.billingPlan}
                                    cta={plan.cta}
                                    popular={isPopular}
                                />

                                <div className={`h-px w-full ${isPopular ? "bg-white/15" : "bg-[#E2E2E0]"}`} />

                                <div>
                                    <p className={`text-[11px] font-medium tracking-[0.05em] uppercase ${isPopular ? "text-white/60" : "text-[#6E6E6E]"}`}>
                                        {plan.featuresIntro}
                                    </p>
                                    <ul className="mt-4 flex flex-col gap-2.5">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2.5 text-[12.5px]">
                                                <Check
                                                    size={13}
                                                    strokeWidth={1.75}
                                                    className={`mt-0.5 shrink-0 ${isPopular ? "text-white/70" : "text-[#0B0B0C]"}`}
                                                />
                                                <span className={isPopular ? "text-white/85" : "text-[#0B0B0C]"}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ---------- Footer note ---------- */}
                <p className="mt-10 text-center text-[13px] text-[#6E6E6E]">
                    Prices exclude applicable taxes.{" "}
                    <Link href="/contact" className="text-[#0B0B0C] underline decoration-[#0B0B0C]/30 underline-offset-4 hover:decoration-[#0B0B0C]">
                        Talk to sales
                    </Link>{" "}
                    for custom limits or annual billing.
                </p>
            </div>
        </div>
    );
}