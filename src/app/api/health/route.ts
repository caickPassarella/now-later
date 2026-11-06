import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Health check passed");
    return Response.json({ status: "ok", database: "connected" });
  } catch (error) {
    logger.error(`Health check failed: ${error}`);
    return Response.json({ status: "error" }, { status: 503 });
  }
}
