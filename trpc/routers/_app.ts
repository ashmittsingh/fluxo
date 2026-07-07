import {createTRPCRouter } from "../init";
import { paymentRouter } from "./payment";
import { workflowsRouter } from "@/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  payment: paymentRouter,
  workflows: workflowsRouter,
  
});

export type AppRouter = typeof appRouter;
