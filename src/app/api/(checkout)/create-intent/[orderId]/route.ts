import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Props = {
  params: Promise<{ orderId: string }>;
};

export const POST = async (req: NextRequest, { params }: Props) => {
  const { orderId } = await params;
  console.log("123123123123 ORDER ID: ", orderId);

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100 * 100,
      currency: "eur",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });
    console.log("CONFIRM INTENT ID: ", paymentIntent);

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
      },
    );
  } else {
    return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
      status: 404,
    });
  }
};
