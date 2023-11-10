<script lang="ts" context="module">
  import type { AnyZodObject } from "zod";
  type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
  import type { z } from "zod";
  import type { ZodValidation, FormPathLeaves } from "sveltekit-superforms";
  import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";

  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;
  export let label: string | undefined = undefined;

  const { value, errors, constraints } = formFieldProxy(form, field);
</script>

{#if label}
  <label for={field}>{label}</label>
{/if}
<input
  type="email"
  name={field}
  placeholder={label ? label : undefined}
  aria-invalid={$errors ? "true" : undefined}
  bind:value={$value}
  {...$constraints}
  {...$$restProps}
/>
{#if $errors}
  <small>{$errors}</small>
{/if}
