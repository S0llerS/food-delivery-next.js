import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  const { id } = await params;

  try {
    const body = await req.json();

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: body },
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
