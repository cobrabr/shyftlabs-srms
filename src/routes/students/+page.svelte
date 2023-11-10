<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;

  let deleting: number[] = [];

  $: studentList = [...data.students.filter(student => !deleting.includes(student.id))];

  const pageTitle = "Students List";
</script>

<svelte:head>
  <title>SRMS | {pageTitle}</title>
</svelte:head>

<section>
  <h1>{pageTitle}</h1>
</section>

<figure>
  <table role="grid">
    <thead>
      <tr>
        <th>Name & Family Name</th>
        <th>DOB</th>
        <th>Email</th>
        <th class="centered">Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each studentList as student (student.id)}
        <tr>
          <td>{student.firstName}&nbsp;{student.familyName}</td>
          <td>{Intl.DateTimeFormat("short").format(student.dateOfBirth)}</td>
          <td>{student.email}</td>
          <td class="centered">
            <form
              method="POST"
              use:enhance={() => {
                deleting = [...deleting, student.id];

                return async ({ update }) => {
                  await update();
                  deleting = deleting.filter(id => id !== student.id);
                };
              }}
            >
              <input type="hidden" name="id" value={student.id} />
              <button class="delete-btn" type="submit" />
            </form>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="4">No Results found.</td>
        </tr>
      {/each}
    </tbody>
  </table>
</figure>
