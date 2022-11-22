describe('тестиурем модальные окна ингредиентов', function() {

    before('приложение доступно по адресу localhost:3000', function() {
        cy.visit('http://localhost:3000');
    });

    it('по умолчанию должна быть открыта страница конструктора бургеров', function() {
        cy.contains('Соберите бургер');
    });

    it('нажимаем по ингредиенту', function() {
        cy.get('div').contains('Флюоресцентная булка R2-D3').click();
    });

    it('должна открыться карточка ингредиента', function() {
        cy.contains('Детали ингредиента');
    });

    it('закрываем окно', function() {
        cy.get('button.close-modal').click();
    });

    it('открываем каточку в компоненте', function() {
        cy.visit('http://localhost:3000/ingredients/60d3b41abdacab0026a733cd');
    });

});
