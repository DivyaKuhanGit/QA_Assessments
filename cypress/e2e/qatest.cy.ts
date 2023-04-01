import { actions as countriesActions } from "../support/pages/countries.page"
import { actions as homeActions } from "../support/pages/home.page"
import { elements as countriesElements } from "../support/pages/countries.page"


describe('Visit Countries Dashboard', () => {
    beforeEach(() => {
        cy.countriesDashBoardLogin();
    })
    it('Validate Selecting VISITED Countries in different ways and Dashboard Count', () => {
        const Country1 = 'Thailand'
        const Country2 = 'Afghanistan'
        const Country3 = 'Albania'
        countriesActions.setCountryAsVisited(Country1);     // inupt visited country by Set As Visited method
        countriesActions.inputCountryAsVisited(Country2);   // input visited country by Mark As options Method
        countriesActions.clickCheckVisited(Country3);       // input visited country by direct Click

        //Check Countries Visited count updated in Home Dashboard.
        homeActions.checkCountriesVisitedCount(3);
        homeActions.checkCountriesVisitedIsReset();         // verifies Countries Visited Count is Reseted.
    });

    it('Validate Selelcting Countries Wanted TO VISIT in different ways and Dashboard Count', () => {
        const Country1 = 'United Kingdom'
        const Country2 = 'United States'

        countriesActions.inputFilterCountriesandSetToWantedToVisit();    // Country "Denmark" is set to 'wanted-to-go' via enum
        countriesActions.setCountriesToVisit(Country1);                  // input data by Set As Wanted to Visit Method
        countriesActions.inputCountryAsWantedToVisit(Country2)           // input data by Mark As options Method

        //Check Countries Wanted to Visit Count updated in  Home Dashboard.
        homeActions.checkCountriesWantToVisitCount(3);
        homeActions.checkCountriesWantToVisitIsReset()                  // verifies Countries Want to Visited Count is Reseted.
    });

    it('Validate Dashboard Count Reduction when Unselected', () => {
        const Country1 = 'Australia'
        const Country2 = 'Argentina'


        countriesActions.clickCheckVisited(Country1);
        homeActions.checkCountriesVisitedCount(1);                      // Count Added
        countriesActions.clickCheckVisited(Country1);
        homeActions.checkCountriesVisitedCount(0);                      // Count Reduced

    })
    
});