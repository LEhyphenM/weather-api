'use strict';

describe('weatherApp.weather module', function() {

  beforeEach(module('weatherApp.weather'));

  describe('weatherApp controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var WeatherCtrl = $controller('WeatherCtrl');
      expect(WeatherCtrl).toBeDefined();
    }));

  });
});
