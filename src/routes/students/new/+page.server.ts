import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";

import { fail } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import { studentSchema } from "$lib/schemas";

export const load: PageServerLoad = async () => {
  const form = await superValidate(studentSchema);

  return { form };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, studentSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { firstName, familyName, dateOfBirth, email } = form.data;
    await prisma.student.create({
      data: {
        firstName,
        familyName,
        dateOfBirth,
        email,
      },
    });

    return message(form, "Student added!");
  },
};
