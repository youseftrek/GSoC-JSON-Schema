"use client";

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useTheme } from "next-themes";
import { whiteLight } from "@uiw/codemirror-theme-white";
import { abyss } from "@uiw/codemirror-theme-abyss";
import { steps } from "../../../constants";
import { Button } from "../ui/button";
import ZSchema from "z-schema";
import toast from "react-hot-toast";
import { AiOutlineClear } from "react-icons/ai";

interface Props {
  step: number;
}

const CodeEditor: React.FC<Props> = ({ step }) => {
  const { theme } = useTheme();
  const [value, setValue] = useState<string>("your code here");
  const [isValid, setIsValid] = useState<boolean>();
  const [errorMsgs, setErrorMsgs] = useState<any>([]);

  const onChange = React.useCallback((val: any, viewUpdate: any) => {
    setValue(val);
  }, []);

  const validateJSON = () => {
    const currentStepSchema = steps.tasks[step - 1].schema;
    const options = {};
    const validator = new ZSchema(options);
    try {
      const jsonVal = JSON.parse(value);
      console.log(currentStepSchema, jsonVal);
      const isValid = validator.validate(jsonVal, currentStepSchema);
      if (!isValid) {
        toast.error("Try again");
        setIsValid(false);
        // Get detailed validation errors
        const errors = validator.getLastErrors();

        const errorMessages = errors.map((error: any) => {
          switch (error.code) {
            case "OBJECT_MISSING_REQUIRED_PROPERTY":
              return `Missing required property: ${error.params[0]}`;
            case "OBJECT_ADDITIONAL_PROPERTIES":
              return `Unexpected property: ${error.params[0]}`;
            case "INVALID_TYPE":
              return `Invalid type for property "${
                error.params[0]
              }". Expected ${
                error.params[1] === "string" ? "a string" : "a number"
              }`;
            case "INVALID_FORMAT":
              return `Invalid format for property "${error.params[0]}". Expected format: ${error.params[1]}`;
            case "MINIMUM":
              return `Value of property "${error.params[0]}" is below the minimum allowed value of ${error.params[1]}`;
            case "MAXIMUM":
              return `Value of property "${error.params[0]}" exceeds the maximum allowed value of ${error.params[1]}`;
            case "MIN_LENGTH":
              return `Length of property "${error.params[0]}" is below the minimum allowed length of ${error.params[1]}`;
            case "MAX_LENGTH":
              return `Length of property "${error.params[0]}" exceeds the maximum allowed length of ${error.params[1]}`;
            case "ENUM_MISMATCH":
              return `Value of property "${error.params[0]}" does not match any of the allowed enum values`;
            case "PATTERN":
              return `Value of property "${error.params[0]}" does not match the specified pattern`;
            // Add more cases for other error codes as needed
            default:
              return error.message;
          }
        });
        setErrorMsgs(errorMessages);

        // Log error messages
        errorMessages.forEach((errorMessage: any) => {
          console.log(errorMessage);
        });
      } else {
        setIsValid(true);
        toast.success("Good work");
      }
    } catch (err) {
      setIsValid(false);
      toast.error("Not a valid JSON");
      setErrorMsgs(
        errorMsgs.length == 0 ? [...errorMsgs, `${err}`] : [...errorMsgs]
      );
    }
  };

  return (
    <section className="relative w-full">
      <CodeMirror
        theme={theme === "light" ? whiteLight : abyss}
        value={value}
        height="200px"
        extensions={[json()]}
        onChange={onChange}
      />
      <Button className="mt-3" onClick={validateJSON}>
        Validate
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="top-3 right-2 absolute"
        onClick={() => {
          setValue("");
        }}
      >
        <AiOutlineClear size={18} />
      </Button>
      <h2 className="mt-3 font-bold text-xl">Code Status</h2>
      {isValid ? (
        <p className="mb-1 text-green-500 text-xs">Correct Answer</p>
      ) : (
        errorMsgs.map((err: any, index: number) => (
          <p key={index} className="mb-1 text-red-500 text-xs">
            {err}
          </p>
        ))
      )}
    </section>
  );
};

export default CodeEditor;
