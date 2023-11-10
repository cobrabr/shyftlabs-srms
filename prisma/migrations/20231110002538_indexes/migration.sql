-- CreateIndex
CREATE INDEX "course_name_idx" ON "course"("name");

-- CreateIndex
CREATE INDEX "student_first_name_family_name_idx" ON "student"("first_name", "family_name");
