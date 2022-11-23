import {testURL} from "./sources";

describe('тестиурем конструктор бургеров', function() {

    before(`приложение доступно по адресу ${testURL}`, function() {
        cy.visit(testURL);
    });

    it('по умолчанию должна быть открыта страница конструктора бургеров', function() {
        cy.contains('Соберите бургер');
    });

    it('перетаскиваем ингредиент в конструктор', function() {
        cy.get('div').contains('Флюоресцентная булка R2-D3')
            .trigger("dragstart")
            .trigger("dragleave");
        cy.get(".drop-area-ingredient")
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        cy.get('div').contains('Соус с шипами Антарианского плоскоходца')
            .trigger("dragstart")
            .trigger("dragleave");
        cy.get(".drop-area-ingredient")
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        cy.get('div').contains('Филе Люминесцентного тетраодонтимформа')
            .trigger("dragstart")
            .trigger("dragleave");
        cy.get(".drop-area-ingredient")
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        cy.get('div').contains('Сыр с астероидной плесенью')
            .trigger("dragstart")
            .trigger("dragleave");
        cy.get(".drop-area-ingredient")
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");
    });

    it('нажимаем оформить заказ', function() {
        cy.get('button').contains('Оформить заказ').click();
    });

    it('должны попасть на страницу авторизации', function() {
        cy.contains('Вход');
    });

    it('вводим логин и пароль', function() {
        cy.get('input[type="email"]').type("sanekirk@gmail.com");
        cy.get('input[type="password"]').type("123456");
    });

    it('нажимаем войти', function() {
        cy.get('button').contains('Войти').click();
    });

    it('должны попасть на страницу конструктора', function() {
        cy.contains('Соберите бургер');
        cy.get('button').contains('Оформить заказ')
    });

    it('нажимаем оформить заказ', function() {
        cy.get('button').contains('Оформить заказ').click();
    });

    it('должно открыться окно с подтверждением заказа', function() {
        cy.contains('Ваш заказ начали готовить');
    });

    it('закрываем окно', function() {
        cy.get('button.close-modal').click();
    });

});
