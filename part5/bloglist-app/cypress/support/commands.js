Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username,
        password
    }).then(({ body }) => {
        localStorage.setItem('loggedAppUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})


// it('a user can like a blog',  function() {
// cy.get('#title').type('End to End testing')
// cy.get('#author').type('Neil Armstrong')
// cy.get('#url').type('https://unwritten-record.blogs.archives.gov/tag/neil-armstrong/')
// cy.contains('Create').click()
// cy.contains('End to End testing - Neil Armstrong')
// cy.contains('view').click()
// cy.contains('0')
// cy.get('#like-button').click()
// cy.contains('1')
// })

// it('user who created a blog to delete it', function() {
// cy.get('#title').type('End to End testing')
// cy.get('#author').type('Neil Armstrong')
// cy.get('#url').type('https://unwritten-record.blogs.archives.gov/tag/neil-armstrong/')
// cy.contains('Create').click()
// cy.contains('Neil Armstrong - End to End testing')
// cy.contains('view').click()
// cy.get('#remove').click()
// cy.get('html').should('not-contain', 'End to End testing - Neil Armstrong')
// })


// })