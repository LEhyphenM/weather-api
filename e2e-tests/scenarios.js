'use strict';

describe('weather-app', function() {


  it('should automatically redirect to /weather when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/weather");
  });


  describe('weather', function() {

    beforeEach(function() {
      browser.get('index.html#!/weather');
    });


    it('should render weather when user navigates to /weather', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for weather/);
    });

  });
});
