"use client";

import { useState } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { appId, locationId } from "@/utils/square";
import { submitPayment } from "@/actions/user.actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SquareProvider({ amount, product }: any) {
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const { data: session } = useSession();
  const router = useRouter();
  // @ts-ignore
  const userId: any = session?.user.id;
  const simplifiedProduct = product.map((item: any) => ({
    courseId: item.courseId,
    lessons: item.lessons.map((lesson: any) => lesson._id),
  }));

  return (
    <section className="relative">
      <div
        id="provider-container"
        className="mt-10 flex flex-col justify-center items-center gap-5 w-full"
      >
        <h4 className="text-2xl font-bold">Acheter les leçons</h4>
        <div className="min-h-48 w-full">
          <PaymentForm
            applicationId={appId}
            locationId={locationId}
            cardTokenizeResponseReceived={async (token: any): Promise<void> => {
              const result = await submitPayment(
                token.token,
                simplifiedProduct,
                userId,
                amount
              );
              setPaymentStatus(JSON.parse(result));
              if (paymentStatus == "COMPLETED") {
                router.push("/library");
              }
            }}
          >
            <CreditCard />
          </PaymentForm>
        </div>
      </div>
    </section>
  );
}
