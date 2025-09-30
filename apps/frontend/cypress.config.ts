import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Next.js dev server
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
  },
});