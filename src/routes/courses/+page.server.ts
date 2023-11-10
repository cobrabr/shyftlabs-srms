import type { Actions, PageServerLoad } from "./$types";

import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {
  const courses = await prisma.course.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  return { courses };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));

    await prisma.course.delete({
      where: { id },
    });
  },
};
