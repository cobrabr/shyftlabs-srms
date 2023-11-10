import type { Actions, PageServerLoad } from "./$types";

import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {
  const results = await prisma.result.findMany({
    include: {
      course: {
        select: {
          name: true,
        },
      },
      student: {
        select: {
          firstName: true,
          familyName: true,
        },
      },
    },
    orderBy: [
      {
        course: {
          name: "asc",
        },
      },
      {
        student: {
          firstName: "asc",
        },
      },
      {
        student: {
          familyName: "asc",
        },
      },
    ],
  });
  return { results };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const courseId = Number(data.get("courseId"));
    const studentId = Number(data.get("studentId"));

    await prisma.result.delete({
      where: { courseId_studentId: { courseId, studentId } },
    });
  },
};
