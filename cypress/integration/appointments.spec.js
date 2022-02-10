describe('Navigation', () => {
	it('should book an interview', () => {
		cy.visit('/');
    cy.contains("Monday");
	});

	it('should edit an interview', () => {
		cy.visit('/');
	});

	it('should cancel an interview', () => {
		cy.visit('/');
	});
});
