import { beforeEach } from "mocha";

 describe('Mi primera chamba', () => {
    it('mi primera chamba',()=>{
        cy.visit('http://localhost:8100/login')
        cy.contains('login')
        cy.wait(1000)
        cy.get('input[name="nombre"]').should('be.visible')
        cy.wait(1000)
        cy.get('input[name="nombre"]').type('julio')
        cy.wait(1000)
        cy.get('input[name="password"]').type('tapia')
        cy.wait(1000)
        cy.contains('iniciar_session').click()
        cy.wait(3000)
        cy.url().should('include','/home')
    });
    it('Mi segunda chamba',()=>{
        cy.visit('http://localhost:8100/login')
        cy.contains('login')
        cy.get('input[name="nombre"]').should('be.visible')
        cy.wait(1000)
        cy.get('input[name="nombre"]').type('armando')
        cy.wait(1000)
        cy.get('input[name="password"]').type('barreda')
        cy.wait(1000)
        cy.contains('iniciar_session').click()
        cy.wait(3000)
        cy.url().should('include','/listado-profe')
    })
    it('mi tercera chamba', () => {
        cy.visit('http://localhost:8100/login');
        cy.wait(1000)
        cy.contains('login');
        cy.wait(1000)
        cy.contains('Se le olvidó la contraseña, ¿desea restablecerla?').click();
        cy.wait(3000)
        cy.url().should('include', '/restablecer');
    });
   
    it('mi cuarta chamba ', () => {
        cy.visit('http://localhost:8100/login');
        cy.wait(1000)
        cy.get('input[name="nombre"]').type('armando');
        cy.wait(1000)
        cy.get('input[name="password"]').type('barreda');
        cy.wait(1000)
        cy.contains('iniciar_session').click();
        cy.wait(1000)
        cy.url().should('include', '/listado-profe');
        cy.wait(1000)
        cy.get('ion-menu-button').should('be.visible').click();
        cy.wait(1000)
        cy.get('ion-menu').should('have.class', 'show-menu');
        cy.wait(1000)
        cy.contains('ion-button', 'Lista de Curso').click();
        cy.wait(3000)
        cy.url().should('include', '/lista-curso-profesor');
        cy.get('ion-searchbar').find('input').type('002D'); 
    });

    it('mi quinta chamba ', () => {
        cy.visit('http://localhost:8100/login');
        cy.wait(1000)
        cy.get('input[name="nombre"]').type('armando');
        cy.wait(1000)
        cy.get('input[name="password"]').type('barreda');
        cy.wait(1000)
        cy.contains('iniciar_session').click();
        cy.wait(1000)
        cy.url().should('include', '/listado-profe');
        cy.wait(1000)
        cy.get('ion-menu-button').should('be.visible').click();
        cy.wait(1000)
        cy.get('ion-menu').should('have.class', 'show-menu');
        cy.wait(1000)
        cy.contains('ion-button', 'Generar QR').click();
        cy.wait(3000)
        cy.url().should('include', '/codigo-profesor-qr');
        });

  }) 