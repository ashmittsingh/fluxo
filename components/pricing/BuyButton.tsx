"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import type { Plan } from "@/config/pricing";

interface BuyButtonProps {
    plan: string;
    billingPlan?: Plan;
    cta: string;
    popular?: boolean;
}

interface RazorpayPaymentSuccessResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface RazorpayPaymentFailureResponse {
    error: {
        code: string;
        description: string;
        source?: string;
        step?: string;
        reason?: string;
        metadata?: {
            order_id?: string;
            payment_id?: string;
        };
    };
}

interface RazorpayCheckoutOptions {
    key: string;
    amount: number;
    currency: string;
    order_id: string;
    name: string;
    description: string;
    prefill: {
        name: string;
        email: string;
    };
    theme: {
        color: string;
    };
    modal: {
        ondismiss: () => void;
    };
    handler: (response: RazorpayPaymentSuccessResponse) => Promise<void>;
}

interface RazorpayInstance {
    on(
        eventName: "payment.failed",
        callback: (response: RazorpayPaymentFailureResponse) => void
    ): void;
    open(): void;
}

interface RazorpayConstructor {
    new (options: RazorpayCheckoutOptions): RazorpayInstance;
}

declare global {
    interface Window {
        Razorpay: RazorpayConstructor;
    }
}

export default function BuyButton({
    plan,
    billingPlan,
    cta,
    popular = false,
}: BuyButtonProps) {
    const router = useRouter();
    const trpc = useTRPC();

    const [loading, setLoading] = useState(false);

    const createOrder = useMutation(
        trpc.payment.createOrder.mutationOptions()
    );

    const verifyPayment = useMutation(
        trpc.payment.verifyPayment.mutationOptions()
    );

    const handlePurchase = async () => {
        try {
            setLoading(true);

            if (plan === "Free") {
                router.push("/workflows");
                return;
            }

            if (plan === "Enterprise") {
                router.push("/contact");
                return;
            }

            if (!billingPlan) {
                throw new Error("Missing billing plan.");
            }

            const order = await createOrder.mutateAsync({
                plan: billingPlan,
            });

            const key = order.key ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            if (!key) {
                throw new Error("Missing Razorpay public key.");
            }

            const amount = Number(order.amount);

            if (Number.isNaN(amount)) {
                throw new Error("Invalid Razorpay order amount.");
            }

            const options: RazorpayCheckoutOptions = {
                key,
                amount,
                currency: order.currency,
                order_id: order.orderId,

                name: "Fluxo",
                description: `${plan} Subscription`,

                prefill: {
                    name: "",
                    email: "",
                },

                theme: {
                    color: "#000000",
                },

                modal: {
                    ondismiss: () => {
                        toast.error("Payment cancelled.");
                        setLoading(false);
                    },
                },

                handler: async (response: RazorpayPaymentSuccessResponse) => {
                    try {
                        await verifyPayment.mutateAsync({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        toast.success("Payment Successful 🎉");

                        router.refresh();

                        router.push("/workflows");
                    } catch (error) {
                        console.error(error);

                        toast.error("Payment verification failed.");
                    }
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.on("payment.failed", (response: RazorpayPaymentFailureResponse) => {
                console.error(response);

                toast.error("Payment Failed");
            });

            razorpay.open();
        } catch (error) {
            console.error(error);

            toast.error("Unable to create payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="button"
            onClick={handlePurchase}
            disabled={loading}
            className={`h-11 w-full rounded-none text-[0.85rem] font-medium tracking-[0.02em] shadow-none transition-colors duration-300 ${popular
                    ? "border border-white bg-white text-black hover:bg-transparent hover:text-white"
                    : "border border-black bg-black text-white hover:bg-white hover:text-black"
                }`}
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
            ) : (
                cta
            )}
        </Button>
    );
}