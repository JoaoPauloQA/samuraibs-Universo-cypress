

describe('cadastro', function () {



    const user1 = {
        name: 'Fernando Papito',
        email: 'pape47@samuraibs.com',
        password: 'pwd123'
    }

    const user2 = {

        name: 'Joao Paulo',
        email: 'joaopau@samuraibs.com',
        password: 'pwd345'
    }



    it('validar mensagem nova', function () {



        cy.visit('/signup')
        cy.get('input[placeholder="Nome"]').type(user1.name);

        cy.get('input[placeholder="E-mail"]').type(user1.email);
        cy.get('input[placeholder="Senha"]').type(user1.password);

        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast')
            .should('include.text', 'Oops!Email já cadastrado para outro usuário')
            .and('be.visible');




    }
    )



    it('validar segunda mensagem nova', function () {


        cy.visit('/signup')
        cy.get('input[placeholder="Nome"]').type(user2.name)
        cy.get('input[placeholder="E-mail"]').type(user2.email)
        cy.get('input[placeholder="Senha"]').type(user2.password)

        cy.contains('button', 'Cadastrar').click()


        cy.get('.toast')
            .should('include.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
            .and('be.visible')




    })
})