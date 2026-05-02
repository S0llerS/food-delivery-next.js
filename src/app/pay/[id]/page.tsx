"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { use, useEffect, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type Props = {
  params: Promise<{ id: string }>;
};

const PayPage = ({ params }: Props) => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = use(params);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${id}`,
          {
            method: "POST",
          },
        );
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PayPage;
