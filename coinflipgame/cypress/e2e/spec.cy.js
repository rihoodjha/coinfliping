describe("Coin Flip Game", () => {
  const envrionment = "https://coinflipgame-50514.web.app/";
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    //Cypress.env("produrl");
    // eslint-disable-next-line no-undef
    cy.visit(envrionment);
  });

  it("Is Given_A_Game_Player_When_The_Player_Is_Connected_Then_There_Should_Be_A_Coin_To_Flip", () => {
    // eslint-disable-next-line no-undef
    cy.get('img[name="flipcoinimage1"]')
      .should("have.attr", "src") // yields the "href" attribute
      .and("equal", "heads.jpg");
  });

  it("Is Given_A_Game_Player_When_The_Player_Is_Connected_Then_There_Should_Be_A_LoginScreen_With_A_Name_field", () => {
    // eslint-disable-next-line no-undef

    // eslint-disable-next-line no-undef
    cy.get('input[name="player1name"]').type("test name 1");

    // eslint-disable-next-line no-undef
    cy.get('input[name="player1name"]').should("have.value", "test name 1");
  });

  it("Is Given_A_Game_Player_When_The_Player_Is_Connected_Then_There_Should_Be_A_LoginScreen_With_A_Name_field after submit", () => {
    // eslint-disable-next-line no-undef

    // eslint-disable-next-line no-undef
    cy.get('input[name="player1name"]').type("test name 1");
    // eslint-disable-next-line no-undef
    cy.get('button[name="player1submit"]').click();
    // eslint-disable-next-line no-undef
    cy.get('input[name="player1name"]').should("have.value", "test name 1");
  });

  it("Given_A_Game_Player_When_The_Player_Is_Connected_Then_There_Should_Be_A_Coin_To_Flip", () => {
    // eslint-disable-next-line no-undef
    cy.get('input[name="player1name"]').type("test name 1");
    // eslint-disable-next-line no-undef
    cy.get('button[name="player1submit"]').should("be.enabled").click();
    // eslint-disable-next-line no-undef
    cy.get('img[name="flipcoinimage1"]')
      .should("have.attr", "src")
      .should("include", "heads.jpg");
  });

  it("Given_A_Player_Switches_To_Five_Coins", () => {
    // eslint-disable-next-line no-undef
    cy.get('button[name="the5gameselector"').click();
  });
});
