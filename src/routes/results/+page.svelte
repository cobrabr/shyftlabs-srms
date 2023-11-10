<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;

  let deleting: { courseId: number; studentId: number }[] = [];

  $: resultList = [...data.results.filter(result => !deleting.includes({ ...result }))];

  const pageTitle = "Results List";
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
        <th>Course</th>
        <th>Student</th>
        <th>Score</th>
        <th class="centered">Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each resultList as result (`${result.courseId}-${result.studentId}`)}
        <tr>
          <td>{result.course.name}</td>
          <td>{result.student.firstName} {result.student.familyName}</td>
          <td>{result.score}</td>
          <td class="centered">
            <form
              method="POST"
              use:enhance={() => {
                deleting = [...deleting, { ...result }];

                return async ({ update }) => {
                  await update();
                  deleting = deleting.filter(
                    ({ courseId, studentId }) =>
                      courseId !== result.courseId && studentId !== result.studentId,
                  );
                };
              }}
            >
              <input type="hidden" name="courseId" value={result.courseId} />
              <input type="hidden" name="studentId" value={result.studentId} />
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
