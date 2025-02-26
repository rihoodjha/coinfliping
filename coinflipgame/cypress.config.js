module.exports = {
  // ...rest of the Cypress project config
  projectId: "aorhja",

  e2e: {
    env: {
      devurl: "http://localhost:3000",
      produrl: "https://coinflipgame-50514.web.app/",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
