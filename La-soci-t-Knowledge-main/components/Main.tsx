"use client";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
const Main = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".toShow",
      { opacity: 0, y: 100, scale: 1.1 },
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    );
  });

  return (
    <main className="relative overflow-hidden bg-[hsl(258,35%,10%)] text-white h-screen flex justify-center items-center">
      <div className="toShow text-center w-full lg:w-1/2 p-4 overflow-hidden flex justify-center items-center flex-col gap-4">
        <h1 className="lg:text-4xl text-2xl p-6 font-bold text-white leading-relaxed">
          Le confort de la lecture,{" "}
          <mark className="bg-primary text-white px-2 ">réinventé</mark>
        </h1>
        <Link
          className="btn btn-primary rounded-full lg:btn-sm btn-sm text-xl btn-wide text-white flex justify-center items-center h-4"
          href="/courses"
        >
          Nos Cours
        </Link>
      </div>
    </main>
  );
};

export default Main;
