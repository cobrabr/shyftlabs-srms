import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";

import { Prisma } from "@prisma/client";
import { fail } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import { resultSchema } from "$lib/schemas";

export const load: PageServerLoad = async () => {
  const form = await superValidate(resultSchema);

  const courses = await prisma.course.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const students = await prisma.student.findMany({
    select: {
      id: true,
      firstName: true,
      familyName: true,
    },
    orderBy: [
      {
        firstName: "asc",
      },
      {
        familyName: "asc",
      },
    ],
  });

  return { form, courses, students };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, resultSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { courseId, studentId, score } = form.data;

    try {
      await prisma.result.create({
        data: {
          courseId,
          studentId,
          score,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          // "Unique constraint failed on the {constraint}"
          // https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
          return message(form, "A Result already exists for this Course and Student.", {
            status: 400,
          });
        }
      }

      throw e;
    }

    return message(form, "Result added!");
  },
};
