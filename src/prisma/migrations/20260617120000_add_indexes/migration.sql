-- CreateIndex
CREATE INDEX IF NOT EXISTS "Thought_deletedAt_idx" ON "Thought"("deletedAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Daily_occurredAt_idx" ON "Daily"("occurredAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Daily_deletedAt_idx" ON "Daily"("deletedAt");
