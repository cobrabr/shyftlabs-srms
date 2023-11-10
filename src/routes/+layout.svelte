<script lang="ts">
  import "../app.scss";

  import { page } from "$app/stores";
  import { routes } from "$lib/nav";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  $: currentPath = $page.url.pathname;

  const options = {
    duration: 3000,
    reversed: true,
    dismissable: false,
    intro: { y: 100 },
  };
</script>

<main class="container">
  <aside>
    <nav>
      <ul>
        {#each routes as route}
          <li>
            <a class={currentPath === route.path ? "primary" : "secondary"} href={route.path}>
              {route.name}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </aside>
  <div role="document">
    <slot />
  </div>
</main>

<SvelteToast {options} />

<style lang="scss">
  :root {
    --toastBarHeight: 0;
    --toastBackground: var(--form-element-valid-border-color);
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 2rem;
    --toastContainerLeft: calc(50vw - 8rem);
  }

  :global(ul._toastContainer > li) {
    list-style-type: none !important;
  }

  :global(._toastMsg) {
    text-align: center;
  }

  main {
    display: grid;
    grid-template-columns: 200px auto;
    grid-column-gap: calc(var(--block-spacing-horizontal) * 6);
  }
</style>
