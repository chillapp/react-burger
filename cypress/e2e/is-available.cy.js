import {testURL} from "./sources";

describe('service is available', function() {
    it(`should be available on ${testURL}`, function() {
        cy.visit(testURL);
    });
});
