-- CreateTable
CREATE TABLE "Thought" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "tag" TEXT,

    CONSTRAINT "Thought_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Daily" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "occurredAt" TIMESTAMP(3),
    "tag" TEXT,

    CONSTRAINT "Daily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Thought_deletedAt_idx" ON "Thought"("deletedAt");

-- CreateIndex
CREATE INDEX "Daily_occurredAt_idx" ON "Daily"("occurredAt");

-- CreateIndex
CREATE INDEX "Daily_deletedAt_idx" ON "Daily"("deletedAt");
