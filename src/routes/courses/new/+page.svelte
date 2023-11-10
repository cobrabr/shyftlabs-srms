<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { toast } from "@zerodevx/svelte-toast";

  import TextField from "$lib/components/TextField.svelte";

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
      if (form.valid) {
        toast.push(form.message);
      }
    },
  });

  const { enhance } = form;
  const pageTitle = "Add New Course";
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
    <TextField {form} field="name" label="Course name" />

    <button type="submit" disabled={creating} aria-busy={creating}>
      {creating ? "" : "Submit"}
    </button>
  </form>
</section>
