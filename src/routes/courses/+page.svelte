<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;

  let deleting: number[] = [];

  $: courseList = [...data.courses.filter(course => !deleting.includes(course.id))];

  const pageTitle = "Courses List";
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
        <th>Course Name</th>
        <th class="centered">Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each courseList as course (course.id)}
        <tr>
          <td>{course.name}</td>
          <td class="centered">
            <form
              method="POST"
              use:enhance={() => {
                deleting = [...deleting, course.id];

                return async ({ update }) => {
                  await update();
                  deleting = deleting.filter(id => id !== course.id);
                };
              }}
            >
              <input type="hidden" name="id" value={course.id} />
              <button class="delete-btn" type="submit" />
            </form>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="3">No Results found.</td>
        </tr>
      {/each}
    </tbody>
  </table>
</figure>
