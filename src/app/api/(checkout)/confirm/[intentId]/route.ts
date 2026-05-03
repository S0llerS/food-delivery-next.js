import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ intentId: string }>;
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  const { intentId } = await params;
  console.log("CONFIRM2 INTENT ID: ", intentId);
  console.log(await params);

  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
