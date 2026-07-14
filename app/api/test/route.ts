// app/api/test/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Simple raw query to confirm the DB connection works
    const result = await prisma.$queryRaw`SELECT NOW()`;

    // Also try counting a real table to confirm schema access
    const userCount = await prisma.user.count();
    const shopCount = await prisma.shop.count();

    return NextResponse.json({
      status: "ok",
      dbTime: result,
      userCount,
      shopCount,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}