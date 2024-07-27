"use client";

import { api } from "@/trpc/react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import classes from "./../../styles/FloatingLabelInput.module.css";

export default function ClassForm() {
  const form = useForm({
    initialValues: {
      className: "",
      classDescription: "",
    },
  });

  const [buttonLoading, setButtonLoading] = useState(false);
  const [focused, setFocused] = useState({
    className: false,
    classDescription: false,
  });
  const [value, setValue] = useState({ className: "", classDescription: "" });

  const createClass = api.classes.create.useMutation();

  const handleFinalSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setButtonLoading(true);

    createClass.mutate({ name: form.values.className, gradeLevelId: "" });

    setTimeout(() => {
      setButtonLoading(false);
    }, 2000);
  };

  const handleFocus = (field: "className" | "classDescription") => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: "className" | "classDescription") => {
    setFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (
    field: "className" | "classDescription",
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.currentTarget.value || "";
    setValue((prev) => ({ ...prev, [field]: newValue }));
    form.setFieldValue(field, newValue);
  };

  const isFloating = (field: "className" | "classDescription") => {
    return value[field].trim().length !== 0 || focused[field];
  };

  return (
    <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <form onSubmit={handleFinalSubmit} className="flex flex-col">
          <h2 className="pb-6 font-bold text-4xl text-neutral-600 text-center">
            Create Class
          </h2>
          <TextInput
            label="Your Class Name"
            placeholder="Your Class Name"
            required
            className="w-full mb-6"
            classNames={classes}
            value={value.className}
            onChange={(event) => handleChange("className", event)}
            onFocus={() => handleFocus("className")}
            onBlur={() => handleBlur("className")}
            mt="md"
            autoComplete="nope"
            data-floating={isFloating("className")}
            labelProps={{ "data-floating": isFloating("className") }}
          />
          <Textarea
            label="Class Description"
            placeholder="Class Description"
            required
            className="w-full mb-6"
            classNames={classes}
            value={value.classDescription}
            onChange={(event) => handleChange("classDescription", event)}
            onFocus={() => handleFocus("classDescription")}
            onBlur={() => handleBlur("classDescription")}
            mt="md"
            autoComplete="nope"
            data-floating={isFloating("classDescription")}
            labelProps={{
              "data-floating": isFloating("classDescription"),
              className: "text-lg",
            }}
          />
          <div className="flex justify-end">
            <Button
              className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 bg-gradient-to-br from-purple-600 to-blue-500"
              type="submit"
              loading={buttonLoading}
            >
              {buttonLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
