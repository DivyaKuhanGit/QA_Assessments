import { actions as countriesActions } from "../support/pages/countries.page"
import { actions as homeActions } from "../support/pages/home.page"


describe('Visit Countries Dashboard', () => {
    beforeEach(() => {
        cy.countriesDashBoardLogin();
    })
    it('Validate Selecting VISITED Countries in different ways and Dashboard Count', () => {
        const country1 = 'Albania'
        const country2 = 'Afghanistan'
        const country3 = 'Thailand'
        countriesActions.setCountryAsVisited(country1);     // inupt visited country by Set As Visited method
        countriesActions.inputCountryAsVisited(country2);   // input visited country by Mark As options Method
        countriesActions.clickCheckVisited(country3);       // input visited country by direct Click

        //Check Countries Visited count updated in Home Dashboard.
        homeActions.checkCountriesVisitedCount(3);          // Verifies Countries visited and Count is updated in Dashboard
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

    it('validate action Button visible When countries flagged', () => {
        const Country1 = 'Australia'

        countriesActions.checkMarkAsDropDown(Country1)          //Verifies Mark As option appearance
    })

    it('Validate Dashboard Count Reduction when Unselected', () => {
        const Country1 = 'Australia'
        const Country2 = 'Argentina'

        countriesActions.clickCheckVisited(Country1);
        homeActions.checkCountriesVisitedCount(1);                      // verifies Count Added 
        countriesActions.clickCheckVisited(Country1);
        homeActions.checkCountriesVisitedCount(0);                      // Verifies Count Reduced

    });    
});