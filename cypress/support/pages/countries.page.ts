export const elements = {
    countriesMenuBtn: () => cy.get('a[title="Countries"]'),
    countriesTable: () => cy.get('table[name="Countries"]'),
    checkVisited: () => cy.get('label[data-test="input-visited"]'),
    checkWanted: () => cy.get('input[name="wanted"]'),
    inputCountry: () => cy.get('input[data-test="input-country"]'),
    filterByCountryName: () => cy.get('input[placeholder="Filter by country name"]'),
    actionBtn: () => cy.get('[data-test="actions"]'),
    setAsVisited: () => cy.get('button:contains("Set as visited")'),
    setAsWantToVisit: () => cy.get('button:contains("Set as want to visit")'),
    goBackToCountries: () => cy.get('a[href="Countries"]'),
    goBackToCountry: () => cy.get('.fSuKMa')

}
export const actions = {
    clickCountriesMenu() {
        elements.countriesMenuBtn().click();
        return actions;
    },

    clickGoBackToCountriesBtn() {
        elements.goBackToCountry().click();
        return actions;
    },

    inputFilterCountriesandSetToWantedToVisit() {
        this.clickCountriesMenu();
        elements.filterByCountryName().click().type(Countries.DENMARK);
        this.inputCountryAsWantedToVisit(Countries.DENMARK)
        elements.filterByCountryName().clear();
        //this.clickCountriesMenu();
        return actions;
    },

    setCountryAsVisited(country) {
        this.clickCountriesMenu();
        elements.countriesTable().get('tbody>tr').contains(country).click();
        elements.setAsVisited().click();
        this.clickGoBackToCountriesBtn();
        cy.log(`${country} has been set as VISITED Successfully!`)
        return actions;
    },

    setCountriesToVisit(country) {
        this.clickCountriesMenu();
        elements.countriesTable().get('tbody>tr').contains(country).click();
        elements.setAsWantToVisit().click();
        this.clickGoBackToCountriesBtn();
        cy.log(`${country} has been set as WANT TO VISIT Successfully!`)
        return actions;
    },

    inputCountryAsVisited(country) {
        elements.countriesTable().get('tbody>tr').get(`[name^='${country}'][name$='selector']`).check();
        elements.actionBtn().select('visited', { force: true });
        return actions;
    },
    inputCountryAsWantedToVisit(country) {
        elements.countriesTable().get('tbody>tr').get(`[name^='${country}'][name$='selector']`).check();
        elements.actionBtn().select('want-to-go', { force: true });
        return actions;
    },

    checkMarkAsDropDown(country) {
        this.clickCountriesMenu();
        elements.countriesTable().get('tbody>tr').get(`[name^='${country}'][name$='selector']`).check();
        elements.actionBtn().should('be.visible');
        cy.contains('Mark as').should('have.length.lt')
        cy.log('Mark As dropdown is visible')
        elements.countriesTable().get('tbody>tr').get(`[name^='${country}'][name$='selector']`).uncheck();
      // Mark As option disappeared
        cy.log('Mark As dropdown is Not Visible!')
        return actions;
    },

    clickCheckVisited(country) {
        this.clickCountriesMenu();
        elements.countriesTable().get('tbody>tr').contains(country).siblings().children().find('input[name="visited"]').parent().parent().click();
        return actions;
    },

    clickCheckWanted() {
        elements.checkWanted().click();
        return actions;
    }
}

export enum Countries {
    UNITEDKINGDOM = "United Kingdom",
    UNITEDSTATES = "United States",
    DENMARK = "Denmark",
    THAILAND = "Thailand"

}