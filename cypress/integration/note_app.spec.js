/* eslint-disable no-undef */

describe("Note app", function () {
  beforeEach(function () {
    //clear the testing database by sending http post to next router
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    //create new user
    const user = {
      name: "Mokhtar Tarek",
      username: "Tarek",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

 

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2021"
    );
  });


  it("user can log in", function () {
    //search for the log in button by its text and click
    cy.contains("log in").click();
    // cy.get('input:first').type('Tarek')
    // cy.get('input:last').type('1234')
    cy.get("#username").type("Tarek");
    cy.get("#password").type("1234");
    cy.get("#login-button").click();
    cy.contains("Mokhtar Tarek logged-in");
  });

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    
    cy.get('.error')
    .should('contain','wrong credentials')
    .and('have.css','color', 'rgb(255, 0, 0)')
    .and('have.css','border-style', 'solid')

    cy.get('html')//access the whole visible content of the app
    .should('not.contain','Matti Luukkainen')

  })

  describe("when logged in", function () {

    beforeEach(function () {
       // log in using customs commands 
        cy.login({username:'Tarek',password:'1234'})
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it("one of those can be made important", function () {
        //find the right button and save it as theButton
        cy.contains("second note").parent().find('button').as('theButton')
        //use the button
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    });
    
  });
});
