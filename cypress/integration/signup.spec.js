import signupPage from '../support/pages/signup'

describe('cadastro', function () {



    context('quando o usuario e novato ', function () {

        const user = {
            name: 'Fernando Papito',
            email: 'pape47@samuraibs.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

        })

        it('deve cadastrar com sucesso', function () {



            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('Quando o email já existe', function () {
        const user1 = {
            name: 'joao paulo',
            email: 'joaopaulo@live.com',
            password: 'pwd1234',
            is_provider: true

        }

        before(function () {

            cy.task('removeUser', user1.email)
                .then(function (result) {
                    console.log(result)
                })
            cy.request(
                'POST',
                'http://localhost:3333/users',
                user1

            ).then(function (response) {
                expect(response.status).to.eq(200)

            })
        })



        it('Deve confirmar usuario cadastrado', function () {

            signupPage.go()
            signupPage.form(user1)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Email já cadastrado para outro usuário.')


        })
    })
})

context(' Quando o email é incorreto', function () {

    const user = {
        name: 'Elizabeth olsen',
        email: 'liza.yahoo.com',
        password: 'pwd3456'
    }

    it('deve exibir mensagem de alerta', function () {

        signupPage.go()
        signupPage.form(user)
        signupPage.submit()
        signupPage.alertHaveText('Informe um email válido')


    })

})




context('Quando a senha é muito curta', function () {

    const passwords = ['1', '1a', '1bc', '12g4', '12bc5']


    beforeEach(function () {
        signupPage.go()

    })




    passwords.forEach(function (p) {

        it('nao deve cadastrar com a senha: ' + p, function () {

            const user = {
                name: 'Jason Friday',
                email: 'Jason@yahoo.com',
                password: p
            }

            signupPage.form(user)
            signupPage.submit()

        })

    })

    afterEach(function () {

        signupPage.alertHaveText('Pelo menos 6 caracteres')


    })

})


context('Quando não preencho nenhum dos campos', function () {

    const alertMessages = [
        'Nome é obrigatório',
        'E-mail é obrigatório',
        'Senha é obrigatória'
    ]

    before(function () {
        signupPage.go()
        signupPage.submit()

    })

    alertMessages.forEach(function(alert){

    it ('deve exibir ' + alert.toLowerCase(), function(){
             
        signupPage.alertHaveText(alert)


    })

    })
})