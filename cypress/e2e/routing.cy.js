describe('тестиурем роуты приложения', function() {

    before('приложение доступно по адресу localhost:3000', function() {
        cy.visit('http://localhost:3000');
    });

    it('по умолчанию должна быть открыта страница конструктора бургеров', function() {
        cy.contains('Соберите бургер');
    });

    it('открываем ленту заказов', function() {
        cy.get('a').contains('Лента заказов').click();
        cy.contains('Выполнено за всё время:');
    });

});
