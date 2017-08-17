'use strict';

angular.module('weatherApp.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'weather/weather.html',
    controller: 'WeatherCtrl'
  });
}])

.controller('WeatherCtrl', ['$scope', '$http', function($scope, $http) {
  
  // Set the API Key for OpenWeatherMap
  const apiKey = 'dc5fcd401da48ff99506f885c0bc0c14';

  // Set the forecast API URL
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?cnt=6&appid=${apiKey}&units=imperial`;

  // Get date & time 
  $scope.date = new Date();
  
  // Scope data
  $scope.data = {
    loading: false,
    error: false,
    weather: {},
    zipcode: null,
    coordinates: {
      lat: null,
      lng: null
    }
  }

  // Asks user for browser location
  const getUserLocation = () => {
    $scope.data.loading = true;
    navigator
      .geolocation
      .getCurrentPosition(setUserCoordinates, setDefaultZipcode);
  }

  // Set the browser-granted geolocation coordinates
  const setUserCoordinates = (result) => {
    $scope.data.coordinates.lat = result.coords.latitude;
    $scope.data.coordinates.lng = result.coords.longitude;

    getWeatherByCoordinates();
  }

  // Get weather by coordinates
  const getWeatherByCoordinates = () => {
    let lat = $scope.data.coordinates.lat;
    let lng = $scope.data.coordinates.lng;
    let url = `&lat=${lat}&lon=${lng}`;

    getWeather(url);
  }

  //  Get the weather by default zipcode
  const getWeatherByZipcode = () => {
    let zip = $scope.data.zipcode;
    let url = `&zip=${zip},us`;

    getWeather(url);
  }

  // Use the default zip code
  const setDefaultZipcode = () => {
    $scope.data.zipcode = 60661;

    getWeatherByZipcode();
  }

  // Get the weather by URL
  const getWeather = (url) => {
    $scope.data.loading = true;
    $http
      .get(`${forecastUrl}${url}`)

    .then(result => {
      $scope.data.error = false;
      $scope.data.weather = result.data;
      $scope.data.loading = false;
    })
    .catch(handleWeatherFailure);
  }

  //  Set the weather data on the scope
  const setWeatherData = (result) => {
    $scope.data.weather = result.data;
  }

  // Handle the API failure
  const handleWeatherFailure = (error) => {
    $scope.data.error = true;
    $scope.data.loading = false;
  }

  // Scope function declarations
  $scope.getUserLocation = getUserLocation;
  $scope.getWeatherByZipcode = getWeatherByZipcode;

}]);
