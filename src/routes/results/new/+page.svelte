<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { toast } from "@zerodevx/svelte-toast";
  import DropdownField, { type DropdownFieldOption } from "$lib/components/DropdownField.svelte";

  export let data: PageData;

  let creating: boolean = false;

  const form = superForm(data.form, {
    resetForm: true,
    onSubmit() {
      creating = true;
    },
    onResult() {
      creating = false;
    },
    onUpdate({ form }) {
      if (form.message) {
        const theme: { [key: string]: string } = {};
        if (!form.valid) {
          theme["--toastBackground"] = "var(--form-element-invalid-border-color)";
        }

        toast.push(form.message, { theme });
      }
    },
  });

  const courses: DropdownFieldOption[] = data.courses.map(course => ({
    value: course.id.toString(),
    text: course.name,
  }));

  const students: DropdownFieldOption[] = data.students.map(student => ({
    value: student.id.toString(),
    text: `${student.firstName} ${student.familyName}`,
  }));

  const { enhance } = form;
  const pageTitle = "Add New Result";
</script>

<svelte:head>
  <title>SRMS | {pageTitle}</title>
</svelte:head>

<section>
  <hgroup>
    <h1>{pageTitle}</h1>
    <h2>All fields are required</h2>
  </hgroup>

  <form method="POST" use:enhance>
    <DropdownField
      {form}
      field="courseId"
      label="Course"
      placeholder="Select a Course..."
      items={courses}
    />

    <DropdownField
      {form}
      field="studentId"
      label="Student"
      placeholder="Select a Student..."
      items={students}
    />

    <DropdownField
      {form}
      field="score"
      label="Score"
      placeholder="Set a Score..."
      items={Array.from("ABCDEF").map(c => ({ value: c, text: c }))}
    />

    <button type="submit" disabled={creating} aria-busy={creating}>
      {creating ? "" : "Submit"}
    </button>
  </form>
</section>
