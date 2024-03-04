"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { whiteLight } from "@uiw/codemirror-theme-white";
import { abyss } from "@uiw/codemirror-theme-abyss";
import { steps } from "../../../../constants";
import { useTheme } from "next-themes";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const Ajv2020 = require("ajv/dist/2020");
const ajv = new Ajv2020();

const Page: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [value, setValue] = useState<string>("Type your code here to validate");

  const handleNextStep = () => {
    if (step < steps.totalSteps) {
      setValidationError(null);
      setStep(step + 1);
      setIsValid(false);
      setValue("Type your code here to validate");
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setValidationError(null);
      setStep(step - 1);
      setIsValid(false);
      setValue("Type your code here to validate");
    }
  };

  const handleEndTest = () => {
    toast.success("Well done,\nyou have finished the test👏", {
      duration: 4000,
    });
  };

  const onChange = (val: string, viewUpdate: any) => {
    setValue(val);
    setIsValid(false);
    setValidationError(null);
  };

  const validateJSON = () => {
    try {
      const jsonValue = JSON.parse(value);
      const currentStepSchema = steps.tasks[step - 1].schema;
      const validate = ajv.compile(currentStepSchema);
      const isValid = validate(jsonValue);
      if (!isValid) {
        setValidationError(
          ajv.errorsText() +
            " with the code but you should " +
            `${steps.tasks[step - 1].description}`
        );
        toast.error("This didn't work.");
      } else {
        setValidationError(null);
        toast.success("That's right.");
      }
      setIsValid(isValid);
    } catch (error) {
      setValidationError("Invalid JSON format");
      setIsValid(false);
      toast.error("This didn't work.");
    }
  };

  const { theme } = useTheme();

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
          <CodeMirror
            theme={theme === "light" ? whiteLight : abyss}
            value={value}
            height="300px"
            extensions={[json()]}
            onChange={onChange}
          />
          <Button onClick={validateJSON} className="top-3 right-3 absolute">
            Validate
          </Button>
          <h2 className="mt-3 font-bold text-xl">Code Status</h2>
          {isValid ? (
            <p className="text-green-600 text-sm">JSON is valid</p>
          ) : validationError ? (
            <p className="text-red-600 text-sm">{validationError}</p>
          ) : null}
        </div>
      </main>
    </section>
  );
};

export default Page;
