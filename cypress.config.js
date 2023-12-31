const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'hukpn9',
  viewportHeight: 1080,
  viewportWidth: 1920,

  e2e: {
    baseUrl: 'https://automationteststore.com',
    specPattern: 'cypress/e2e/**/*.{js,ts,jsx,feature}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*']
  },
});
