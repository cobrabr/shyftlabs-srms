<script lang="ts">
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { toast } from "@zerodevx/svelte-toast";

  import TextField from "$lib/components/TextField.svelte";
  import EmailField from "$lib/components/EmailField.svelte";
  import DateField from "$lib/components/DateField.svelte";

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
  const pageTitle = "Add New Student";
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
    <TextField {form} field="firstName" label="First name" />
    <TextField {form} field="familyName" label="Family name" />
    <DateField {form} field="dateOfBirth" label="Date of birth" />
    <EmailField {form} field="email" label="Email" />

    <button type="submit" disabled={creating} aria-busy={creating}>
      {creating ? "" : "Submit"}
    </button>
  </form>
</section>
