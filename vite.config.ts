import type { UserConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
};

export default config;
