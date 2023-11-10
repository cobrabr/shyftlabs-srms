import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const studentData: Prisma.StudentCreateInput[] = [
  {
    firstName: "Emma",
    familyName: "Smith",
    dateOfBirth: new Date("2007-07-12"),
    email: "emma.smith@email.com",
  },
  {
    firstName: "Alex",
    familyName: "Johnson",
    dateOfBirth: new Date("1988-03-24"),
    email: "alex.j@example.com",
  },
  {
    firstName: "Sophia",
    familyName: "Brown",
    dateOfBirth: new Date("2002-11-05"),
    email: "sophia.b@example.net",
  },
  {
    firstName: "Daniel",
    familyName: "Miller",
    dateOfBirth: new Date("1984-09-18"),
    email: "daniel.m@example.org",
  },
  {
    firstName: "Olivia",
    familyName: "Taylor",
    dateOfBirth: new Date("1998-01-09"),
    email: "olivia.t@email.net",
  },
  {
    firstName: "Lily",
    familyName: "Anderson",
    dateOfBirth: new Date("1993-06-30"),
    email: "lily.a@example.com",
  },
  {
    firstName: "Ethan",
    familyName: "Garcia",
    dateOfBirth: new Date("2010-12-15"),
    email: "ethan.g@email.net",
  },
  {
    firstName: "Aria",
    familyName: "Martinez",
    dateOfBirth: new Date("1997-04-03"),
    email: "aria.m@example.org",
  },
];

const courseData: Prisma.CourseCreateInput[] = [
  {
    name: "Web Application Scripting",
  },
  {
    name: "Database Management",
  },
  {
    name: "Mobile App Development",
  },
  {
    name: "Data Science Fundamentals",
  },
  {
    name: "Game Development with Unity",
  },
  {
    name: "Frontend Web Development",
  },
  {
    name: "Software Architecture and Design",
  },
  {
    name: "Cloud Computing Essentials",
  },
  {
    name: "Full Stack Web Development",
  },
  {
    name: "Machine Learning Basics",
  },
  {
    name: "Human-Computer Interaction",
  },
];

async function main() {
  for (const student of studentData) {
    await prisma.student.create({
      data: student,
    });
  }

  for (const course of courseData) {
    await prisma.course.create({
      data: course,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
