import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "../../../constants";

const page = () => {
  const tourLength = steps.totalSteps;
  return (
    <section className="flex justify-center mt-20 w-full">
      <main className="p-10 w-full max-w-[1920px]">
        <h1 className="font-bold text-4xl">JSON Schema Welcome Tour</h1>
        <p className="mb-3 text-lg">
          This is a tour of the JSON Schema. It will walk you through the basics
          of using the editor.
        </p>
        {tourLength ? (
          <Link href="/welcome/tour">
            <Button>Start Now</Button>
          </Link>
        ) : (
          <Button disabled>Start Now</Button>
        )}
      </main>
    </section>
  );
};

export default page;
