-- CreateTable
CREATE TABLE "course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "result" (
    "course_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "score" TEXT NOT NULL,

    PRIMARY KEY ("course_id", "student_id"),
    CONSTRAINT "result_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "result_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "date_of_birth" DATETIME NOT NULL,
    "email" TEXT NOT NULL
);

