import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/tests/**/*.test.ts"],
    setupFiles: ["src/tests/helpers/setup.ts"],
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: {
    alias: {
      auth: "/src/auth",
      quotes: "/src/quotes",
      lib: "/src/lib",
    },
  },
});
