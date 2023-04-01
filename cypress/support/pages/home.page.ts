export const elements = {
    HomeMenuBtn: () => cy.get('a[title="Home"]'),
    countriesAvailable: () => cy.get('[id="countries-available"]'),
    countriesVisited: () => cy.get('[id="countries-visited"]'),
    countriesToVisit: () => cy.get('[id="countries-wanted"]'),
    resetBtn: () => cy.get('button:contains("Reset")')
}
export const actions = {
    clickHomeMenuBtn() {
        elements.HomeMenuBtn().click();
        return actions;
    },
    checkCountriesVisitedCount(count) {
        this.clickHomeMenuBtn();
        elements.countriesVisited().contains(count);
        cy.log(`${count} Countries Visited!`)
        return actions;
    },
    checkCountriesWantToVisitCount(count) {
        this.clickHomeMenuBtn();
        elements.countriesToVisit().contains(count);
        cy.log(`${count} Countries Wanted to Visit!`)
        return actions;
    },
    checkCountriesVisitedIsReset() {
        elements.resetBtn().click();
        elements.countriesVisited().contains(CountriesCount.DEFAULTCOUNT)
        return actions;
    },
    checkCountriesWantToVisitIsReset() {
        elements.resetBtn().click();
        elements.countriesToVisit().contains(CountriesCount.DEFAULTCOUNT)
        return actions;
    }
}

export enum CountriesCount {
    DEFAULTCOUNT = "0"
}