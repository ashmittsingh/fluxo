import { z } from "zod";
import { TRPCError } from "@trpc/server";

import prisma from "@/db/db";
import razorpay from "@/lib/razorpay";
import { PRICING } from "@/config/pricing";
import crypto from "crypto";

import { createTRPCRouter, protectedProcedure } from "../init";

export const paymentRouter = createTRPCRouter({
  createOrder: protectedProcedure
    .input(
      z.object({
        plan: z.enum(["STARTER", "PRO", "BUSINESS"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = ctx.user;

        const selectedPlan = PRICING[input.plan];

        if (!selectedPlan) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid Plan",
          });
        }

        const order = await razorpay.orders.create({
          amount: selectedPlan.amount,
          currency: "INR",
          receipt: `r_${user.id.slice(-8)}_${Date.now().toString(36)}`,
          notes: {
            userId: user.id,
            plan: input.plan,
          },
        });

        await prisma.payment.create({
          data: {
            userId: user.id,
            razorpayOrderId: order.id,
            amount: selectedPlan.amount,
            currency: "INR",
            plan: input.plan,    
            status: "CREATED",
          },
        });

        return {
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          plan: input.plan,
        };
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to create Razorpay Order",
        });
      }
    }),

  verifyPayment: protectedProcedure
    .input(
      z.object({
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_signature: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        input;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
      if (expectedSignature !== razorpay_signature) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid payment signature",
        });
      }

      await prisma.payment.update({
        where: {
          razorpayOrderId: razorpay_order_id,
        },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "PAID",
        },
      });

      const payment = await prisma.payment.findUnique({
        where: {
          razorpayOrderId: razorpay_order_id,
        },
      });

      if (!payment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Payment not found",
        });
      }

      const existingSubscription = await prisma.subscription.findFirst({
        where: {
          userId: payment.userId,
          status: "ACTIVE",
        },
      });

      const startsAt = new Date();

const expiresAt = new Date();

expiresAt.setMonth(expiresAt.getMonth() + 1);

if (existingSubscription) {
  await prisma.subscription.update({
    where: {
      id: existingSubscription.id,
    },
    data: {
      plan: payment.plan,
      status: "ACTIVE",
      startsAt,
      expiresAt,
    },
  });
} else {
  await prisma.subscription.create({
    data: {
      userId: payment.userId,
      plan: payment.plan,
      status: "ACTIVE",
      startsAt,
      expiresAt,
    },
  });
}
      return {
        success: true,
        message: "Payment verified successfully",
      };
    }),
});
