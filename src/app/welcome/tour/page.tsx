"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { whiteLight } from "@uiw/codemirror-theme-white";
import { abyss } from "@uiw/codemirror-theme-abyss";
import { steps } from "../../../../constants";
import Ajv from "ajv";
import { useTheme } from "next-themes";

const ajv = new Ajv();

const Page: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [value, setValue] = useState("Type your code here to validate");

  const handleNextStep = () => {
    if (step < steps.totalSteps) {
      setStep(step + 1);
      setIsValid(false);
      setValue("Type your code here to validate");
    }
    // Redirect to the first step if the step number is invalid
    if (isNaN(step) || step < 1 || step > steps.totalSteps) {
      setStep(1);
    }
  };
  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setIsValid(false);
      setValue("Type your code here to validate");
    }
    // Redirect to the first step if the step number is invalid
    if (isNaN(step) || step < 1 || step > steps.totalSteps) {
      setStep(1);
    }
  };

  const onChange = (val: any, viewUpdate: any) => {
    setValue(val);
    // Reset validation status and error message when code is edited
    setIsValid(false);
    setValidationError(null);
  };

  const validateJSON = () => {
    try {
      const jsonValue = JSON.parse(value);
      const isValid = ajv.validateSchema(jsonValue);
      if (!isValid) {
        setValidationError(ajv.errorsText());
      } else {
        setValidationError(null);
      }
      setIsValid(isValid);
    } catch (error) {
      setValidationError("Invalid JSON format");
      setIsValid(false);
    }
  };

  const { theme } = useTheme();

  return (
    <section className="flex justify-center mt-20 w-full">
      <main className="flex lg:flex-row flex-col-reverse gap-3 p-10 w-full max-w-[1920px] h-auto lg:h-[650px]">
        <div className="relative bg-secondary p-3 rounded-md lg:w-1/2 h-auto min-h-[250px]">
          {steps.tasks.map(
            (s) =>
              s.id === step && (
                <React.Fragment key={s.id}>
                  <h2 className="mb-3 font-bold text-2xl">
                    {s.title}/{steps.totalSteps}
                  </h2>
                  <p>{s.description}</p>
                </React.Fragment>
              )
          )}
          {step < steps.totalSteps ? (
            <Button
              onClick={() => handleNextStep()}
              className="right-3 bottom-3 absolute flex gap-2"
            >
              Next <MdNavigateNext size={24} />
            </Button>
          ) : (
            <Button disabled className="right-3 bottom-3 absolute flex gap-2">
              Next <MdNavigateNext size={24} />
            </Button>
          )}
          {step > 1 ? (
            <Button
              onClick={() => handleBackStep()}
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
            <p className="text-green-600">JSON is valid</p>
          ) : validationError ? (
            <p className="text-red-600">{validationError}</p>
          ) : null}
        </div>
      </main>
    </section>
  );
};

export default Page;
