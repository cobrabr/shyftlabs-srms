# ShyftLabs Development Technical Test

## Tech Stack

### Languages
- [TypeScript](https://www.typescriptlang.org)

### Front-end
- [Svelte](https://svelte.dev) + [SvelteKit](https://kit.svelte.dev)
- [Superforms](https://superforms.rocks)
- [Sass](https://sass-lang.com)
- [Pico.css](https://picocss.com)

> **Note:** The app is [configured](src/routes/+layout.ts) to run in full SPA mode, as per the test requirements.  
See <https://kit.svelte.dev/docs/single-page-apps> for more information.

### Back-end
- [SQLite](https://sqlite.org/)
- [Prisma ORM](https://prisma.io)

### Tooling
- [pnpm](https://pnpm.io)
- [Vite](https://vitejs.dev)

## Getting Started

1. Install dependencies:

    ```pwsh
    pnpm install
    ```

1. Create and seed the database:

    ```pwsh
    pnpm db:sync-schema
    ```

1. Start the app:

    ```pwsh
    pnpm dev
    ```

1. Navigate to <http://localhost:5173> in your browser to explore the UI.

## Available Scripts
- `pnpm dev`: Start the development server.
- `pnpm build`: Build the app for production.
- `pnpm preview`: Preview the production build.
- `pnpm check`: Synchronise SvelteKit-generated type definitions and get Svelte diagnostics.
- `pnpm check:watch`: Same as `pnpm check` but watch for changes.
- `pnpm db:sync-schema`: Run Prisma migrate dev to sync the database schema.
- `pnpm db:generate-assets`: Generate Prisma assets.
