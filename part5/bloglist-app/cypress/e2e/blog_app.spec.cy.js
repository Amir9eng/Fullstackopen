// describe('Blog app', function() {
//     beforeEach(function() {
//         cy.request('POST', 'http://localhost:3003/api/testing/reset')
//         const user = {
//             'username': 'amirzeal',
//             'name': 'Amir Mukhtar',
//             'password': 'amirzeal'
//         }
//         cy.request('POST', 'http://localhost:3003/api/users', user)
//         cy.visit('http://localhost:3000')
//     })
//     it('login form can be opened', function() {
//         cy.get('#username')
//         cy.get('#password')
//         cy.get('#login-button')
//     })
// })
// describe('Login', function() {
//     it('succeeds with correct credentials', function() {
//         cy.get('#username').type('amirzeal')
//         cy.get('#password').type('amirzeal')
//         cy.get('#login-button').click()
//         cy.contains('Amir Mukhtar logged in')
//         cy.get('#logout-button').click()
//     })
//     it('fails with wrong credentials', function() {
//         cy.get('#username').type('muzammil')
//         cy.get('#password').type('babaforus')
//         cy.get('#login-button').click()
//         cy.get('#error')
//             .should('contain', 'Wrong credentials')
//             .and('have.css', 'color', 'rgb(255, 0, 0)')
//         cy.get('html').should('not.contain', 'Ananias CARVALHO logged in')
//     })
// })


describe('when logged in', function() {
    beforeEach(function() {
        cy.login({ username: 'amirzeal', password: 'amirzeal' })
    })

    it('a new blog can be created', function() {
        cy.contains('Add new blog').click()
        cy.get('#title').type('End to End testing')
        cy.get('#author').type('Neil Armstrong')
        cy.get('#url').type('https://unwritten-record.blogs.archives.gov/tag/neil-armstrong/')
        cy.contains('Create').click()
        cy.contains('End to End testing - Neil Armstrong')
    })
})