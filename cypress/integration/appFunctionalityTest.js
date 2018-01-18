describe("Test the Index Page loads correctly", function() {
  it("Title has complete information with Intern Connect", function() {
    cy.visit("https://intern-connect.firebaseapp.com/index.html");
    cy.get(".title").should("has.text", "Intern Connect");
  });
  it("Load both the student and company button forms", function() {
    cy.get(".buttons div").should("have.length", 2);
    cy.get(".buttons div").eq(0).should("has.class", "student");
    cy.get(".buttons div").eq(1).should("has.class", "company")
  });
  it("Ensure student form loads correctly", function() {
    cy.get(".student").click();
    cy.url().should("contain","studentForm.html");
    cy.get(".form").find("label").should("have.length", 12);
    cy.get(".logo").click();
    cy.url().should("contain", "index.html");
  });
  it("Ensure company form loads correctly", function() {
    cy.get(".company").click();
    cy.url().should("contain","companyForm.html");
    cy.get(".form").find("label").should("have.length", 14);
    cy.get(".logo").click();
    cy.url().should("contain", "index.html");
  });
  it("Loads past matches button and goes to correct page", function() {
    cy.get(".pastCompanies").contains("See Our Past Matched Companies").click();
    cy.url().should("contain","posts.html");
    cy.get(".logo").click();
    cy.url().should("contain", "index.html");
  });
  it("Loads meetup button and goes to correct page", function() {
    cy.get(".meetupLink").contains("Find a Startup Event");
  });
  it("Makes sure about us page loads", function() {
    cy.get(".social").find(".socialLogo").eq(0).click();
    cy.url().should("contain", "about.html");
    cy.get(".logo").click();
    cy.url().should("contain", "index.html");
  });
});
