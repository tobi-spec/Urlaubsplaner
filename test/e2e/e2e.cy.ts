describe("e2e tests", () => {
  it("Test redirect from base url", () => {
    cy.visit("");
    cy.contains("Holiday Handler");
    cy.contains("Login");
    cy.contains("Username");
  });

  it("Test /index is protected", () => {
    cy.visit("/login");
    cy.contains("Holiday Handler");
    cy.contains("Login");
    cy.contains("Username");
  });

  it("E2E wrong username", () => {
    cy.visit("/login");
    cy.get("[data-test-id=testUsername]").click().type("WrongName");
    cy.get("[data-test-id=testPassword]").click().type("user123");
    cy.get("[data-test-id=testLoginButton]").contains("Login").click();
    cy.get("[data-test-id=testErrorMessage]").contains(
      "username or password is incorrect"
    );
  });

  it("E2E wrong password", () => {
    cy.visit("/login");
    cy.get("[data-test-id=testUsername]").click().type("Joachim");
    cy.get("[data-test-id=testPassword]").click().type("user");
    cy.get("[data-test-id=testLoginButton]").contains("Login").click();
    cy.get("[data-test-id=testErrorMessage]").contains(
      "username or password is incorrect"
    );
  });

  it("E2E Happy Path", () => {
    cy.visit("/login");
    cy.contains("Holiday Handler");
    cy.contains("Login");
    cy.contains("Username");
    cy.get("[data-test-id=testUsername]").click().type("Joachim");
    cy.contains("Password");
    cy.get("[data-test-id=testPassword]").click().type("user123");
    cy.get("[data-test-id=testLoginButton]").contains("Login").click();

    cy.wait(1000);

    cy.get("[data-test-id=testTitle]").contains("Holiday Handler");
    cy.get("[data-test-id=testCalendarCanvas]");
    cy.get("[data-test-id=testLogout]").click();
  });
});
