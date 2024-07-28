"use client";

import { api } from "@/trpc/react";
import { Button, TextInput, Textarea, Divider } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { z } from "zod";
import { useState, Fragment } from "react";
import classes from "./../../styles/FloatingLabelInput.module.css";

const schema = z.object({
  className: z.string().nonempty("Class name is required"),
  gradeLevelId: z.string().nonempty("Grade Level ID is required"),
  units: z.array(z.object({
    name: z.string().nonempty("Unit name is required"),
  })).nonempty("At least one unit is required"),
});

interface NewClass {
  id: string;
  gradeLevelId: string;
  name: string;
}

interface NewUnit {
  name: string;
  classId: string;
}

export default function ClassForm() {
  const form = useForm({
    initialValues: {
      className: "",
      gradeLevelId: "",
      classDescription: "",
      units: [{ name: "" }],
    },
    validate: zodResolver(schema),
  });

  const [buttonLoading, setButtonLoading] = useState(false);
  const [focused, setFocused] = useState({
    className: false,
    gradeLevelId: false,
    classDescription: false,
  });
  const [value, setValue] = useState({
    className: "",
    gradeLevelId: "",
    classDescription: "",
  });

  const createClass = api.classes.create.useMutation<NewClass>();
  const createUnit = api.units.create.useMutation<NewUnit>();

  return (
    <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <form onSubmit={form.onSubmit(async (values) => {
          setButtonLoading(true);
          try {
            const newClass = await createClass.mutateAsync({
              name: values.className,
              gradeLevelId: values.gradeLevelId,
            });

            await Promise.all(
              values.units.map((unit) =>
                createUnit.mutateAsync({
                  name: unit.name,
                  classId: newClass.id,
                })
              )
            );

            notifications.show({
              title: "Class and Units Created",
              message: `Class ID: ${newClass.id}\nGrade Level ID: ${newClass.gradeLevelId}\nClass and units have been created successfully`,
              color: "teal",
            });
          } catch (error) {
            console.error("Error creating class and units:", error);
            notifications.show({
              title: "Error",
              message: "An error occurred while creating the class and units",
              color: "red",
            });
          } finally {
            setButtonLoading(false);
          }
        })} className="flex flex-col">
          <h2 className="pb-6 font-bold text-4xl text-neutral-600 text-center">
            Create Class
          </h2>
          <TextInput
            label="Your Class Name"
            placeholder="Your Class Name"
            required
            className="w-full mb-6"
            classNames={classes}
            {...form.getInputProps("className")}
            onFocus={() => setFocused((prev) => ({ ...prev, className: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, className: false }))}
            data-floating={value.className.trim().length !== 0 || focused.className}
            labelProps={{ "data-floating": value.className.trim().length !== 0 || focused.className }}
          />
          <TextInput
            label="Grade Level ID"
            placeholder="Grade Level ID"
            required
            className="w-full mb-6"
            classNames={classes}
            {...form.getInputProps("gradeLevelId")}
            onFocus={() => setFocused((prev) => ({ ...prev, gradeLevelId: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, gradeLevelId: false }))}
            data-floating={value.gradeLevelId.trim().length !== 0 || focused.gradeLevelId}
            labelProps={{ "data-floating": value.gradeLevelId.trim().length !== 0 || focused.gradeLevelId }}
          />
          <Textarea
            label="Class Description"
            placeholder="Class Description"
            required
            className="w-full mb-6"
            classNames={classes}
            {...form.getInputProps("classDescription")}
            onFocus={() => setFocused((prev) => ({ ...prev, classDescription: true }))}
            onBlur={() => setFocused((prev) => ({ ...prev, classDescription: false }))}
            data-floating={value.classDescription.trim().length !== 0 || focused.classDescription}
            labelProps={{
              "data-floating": value.classDescription.trim().length !== 0 || focused.classDescription,
              className: "text-lg",
            }}
          />

          <Divider my="sm" label="Units" labelPosition="center" />

          {form.values.units.map((unit, index) => (
            <Fragment key={index}>
              <TextInput
                label={`Unit Name`}
                placeholder={`Unit Name`}
                required
                className="w-full mb-4"
                {...form.getInputProps(`units.${index}.name`)}
              />
              {form.values.units.length > 1 && (
                <Button
                  color="red"
                  onClick={() => form.removeListItem("units", index)}
                  className="mb-4"
                  size="compact-xs"
                >
                  Delete Unit
                </Button>
              )}
            </Fragment>
          ))}

          <Button
            onClick={() => form.insertListItem("units", { name: "" })}
            className="w-full mt-4"
            variant="light"
          >
            Add Unit
          </Button>

          <div className="flex justify-end py-4">
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