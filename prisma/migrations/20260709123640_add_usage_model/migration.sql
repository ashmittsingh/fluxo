-- CreateTable
CREATE TABLE "Usage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workflowsCreated" INTEGER NOT NULL DEFAULT 0,
    "workflowExecutions" INTEGER NOT NULL DEFAULT 0,
    "integrationsConnected" INTEGER NOT NULL DEFAULT 0,
    "teamMembers" INTEGER NOT NULL DEFAULT 1,
    "currentMonth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Usage_userId_idx" ON "Usage"("userId");

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
