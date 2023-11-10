import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";

import { courseSchema } from "$lib/schemas";
import { fail } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {
  const form = await superValidate(courseSchema);

  return { form };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, courseSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { name } = form.data;
    await prisma.course.create({
      data: {
        name,
      },
    });

    return message(form, "Course added!");
  },
};
