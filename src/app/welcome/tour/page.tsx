"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { steps } from "../../../../constants";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import CodeEditor from "@/components/shared/CodeEditor";

const Page: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    if (step < steps.totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <section className="flex justify-center mt-20 w-full">
      <main className="flex lg:flex-row flex-col-reverse gap-3 p-10 w-full max-w-[1920px] h-auto lg:h-[650px]">
        <div className="relative bg-secondary p-3 rounded-md lg:w-1/2 h-auto min-h-[250px]">
          {steps.tasks.map((s, index) => (
            <React.Fragment key={index}>
              {s.id === step && (
                <>
                  <h2 className="mb-3 font-bold text-2xl">
                    {s.title}/{steps.totalSteps}
                  </h2>
                  <p>{s.description}</p>
                </>
              )}
            </React.Fragment>
          ))}
          {step < steps.totalSteps ? (
            <Button
              onClick={handleNextStep}
              className="right-3 bottom-3 absolute flex gap-2"
            >
              Next <MdNavigateNext size={24} />
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="success"
                  className="right-3 bottom-3 absolute flex gap-2"
                >
                  End Test <MdNavigateNext size={24} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Congratulations! Test Completed</DialogTitle>
                  <DialogDescription>
                    <p className="mb-3">
                      You have successfully completed the test. Well done! You
                      will be notified of your performance shortly. Thank you
                      for participating.
                    </p>
                    <Link href="/">
                      <Button
                        variant="success"
                        onClick={() => {
                          toast.success("Well done👍");
                        }}
                      >
                        End Test
                      </Button>
                    </Link>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
          {step > 1 ? (
            <Button
              onClick={handleBackStep}
              className="bottom-3 left-3 absolute flex gap-2"
            >
              <MdNavigateBefore size={24} /> Back
            </Button>
          ) : (
            <Button disabled className="bottom-3 left-3 absolute flex gap-2">
              <MdNavigateBefore size={24} /> Back
            </Button>
          )}
        </div>
        <div className="relative bg-secondary p-3 rounded-md lg:w-1/2 h-fit">
          <h2 className="mb-3 font-bold text-2xl">Your answer</h2>
          <CodeEditor step={step} />
        </div>
      </main>
    </section>
  );
};

export default Page;
