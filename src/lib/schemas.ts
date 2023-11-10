import { z } from "zod";
import { zfd } from "zod-form-data";

const today = new Date();

export const studentSchema = z.object({
  firstName: zfd.text(z.string({ required_error: "Field is required." })),
  familyName: zfd.text(z.string({ required_error: "Field is required." })),
  dateOfBirth: z
    .date({
      required_error: "Field is required.",
      invalid_type_error: "Invalid date.",
    })
    .max(new Date(today.getFullYear() - 10, today.getMonth(), today.getDate()), {
      message: "Student must be at least 10 years old.",
    }),
  email: zfd.text(
    z.string({ required_error: "Field is required." }).email({ message: "Invalid email." }),
  ),
});

export const courseSchema = z.object({
  name: zfd.text(z.string({ required_error: "Field is required." })),
});

export const resultSchema = z.object({
  courseId: zfd.numeric(
    z.number({ required_error: "Field is required." }).default("" as unknown as number),
  ),
  studentId: zfd.numeric(
    z.number({ required_error: "Field is required." }).default("" as unknown as number),
  ),
  score: zfd.text(
    z
      .string({ required_error: "Field is required." })
      .toUpperCase()
      .regex(/^[A-F]$/, { message: "Score must be a single letter from A to F." }),
  ),
});
