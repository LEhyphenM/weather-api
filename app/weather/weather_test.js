'use strict';

describe('weatherApp.index module', function() {

  // Global context variables
  let api;
  let scope;
  let $controller;
  let createController;
  let weatherRequestHandler;

  // Instantiate the module before each test
  beforeEach(module('weatherApp.index'));

  // Inject scope into the controller before each test
  beforeEach(inject(($injector) => {

    // Assign our injected services
    api = $injector.get('$httpBackend');
    scope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');

    // Intercept GET requests to the weather API
    weatherRequestHandler = api
      .when('GET', new RegExp("^http://api\\.openweathermap\\.org"))
      .respond({
        data: 'works'
      });

    // Method to create a fresh controller
    createController = () => {
      return $controller('WeatherCtrl', {
        '$scope': scope
      });
    }
  }));

  // Weather controller tests
  describe('weather controller', () => {

    it('makes sure the scope properties equal their initial values', () => {
      // Create a controller
      let ctrl = createController();

      // Inspect the initial coordinate values
      expect(scope.data.loading).toEqual(false);
      expect(scope.data.error).toEqual(false);
      expect(scope.data.weather).toEqual({});
      expect(scope.data.zipcode).toEqual(null);
      expect(scope.data.coordinates.lat).toEqual(null);
      expect(scope.data.coordinates.lon).toEqual(null);
    });

    it('gets the weather by zipcode', () => {
      // Create a controller
      let ctrl = createController();

      // Set a zipcode on scope.data
      scope.data.zipcode = 60661;

      // Call scope.getWeatherByZipcode()
      scope.getWeatherByZipcode();

      // Flush the mocked request.
      api.flush();

      // Check if the scope property changed.
      expect(scope.data.weather.data).toEqual('works');
    });
  });
});
