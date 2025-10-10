"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cypress_1 = require("cypress");
exports.default = (0, cypress_1.defineConfig)({
    e2e: {
        baseUrl: 'http://localhost:3000', // Next.js dev server
        supportFile: 'cypress/support/index.ts',
        specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    },
});
