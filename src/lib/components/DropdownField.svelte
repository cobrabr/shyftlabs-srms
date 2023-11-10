<script lang="ts" context="module">
  import type { AnyZodObject } from "zod";

  export interface DropdownFieldOption {
    value: string;
    text: string;
  }

  type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
  import type { z } from "zod";
  import type { ZodValidation, FormPathLeaves } from "sveltekit-superforms";
  import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";

  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;
  export let label: string | undefined = undefined;
  export let placeholder: string;
  export let items: DropdownFieldOption[];

  const { value, errors, constraints } = formFieldProxy(form, field);
</script>

{#if label}
  <label for={field}>{label}</label>
{/if}
<select
  name={field}
  aria-invalid={$errors ? "true" : undefined}
  bind:value={$value}
  {...$constraints}
  {...$$restProps}
>
  <option disabled selected value="">{placeholder}</option>
  {#each items as item}
    <option value={item.value}>{item.text}</option>
  {/each}
</select>
{#if $errors}
  <small>{$errors}</small>
{/if}
