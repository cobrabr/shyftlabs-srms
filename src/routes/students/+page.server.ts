import type { Actions, PageServerLoad } from "./$types";

import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {
  const students = await prisma.student.findMany({
    orderBy: [
      {
        firstName: "asc",
      },
      {
        familyName: "asc",
      },
    ],
  });

  return { students };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));

    await prisma.student.delete({
      where: { id },
    });
  },
};
