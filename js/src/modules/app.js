//Main App
define([
	'jquery', 
	'modules/events', 
	'models/location',
	'models/weather',
	'models/weather-photo',
	'views/location-view',
	'views/weather-view',
	'views/weather-photo-view'
], 
	function($, Events, LocationFinder, Weather, WeatherPhoto, LocationFinderView, WeatherView, WeatherPhotoView){
	var App = {
		init: function(){
			
			var locationFinder = new LocationFinder();
			var weather = new Weather();
			var weatherPhoto = new WeatherPhoto();

			var locationFinderView = new LocationFinderView({"el": '#location-finder', "model": locationFinder});
			var weatherView = new WeatherView({"el": "#weather", "model": weather});
			var weatherPhotoView = new WeatherPhotoView({"el": "#photo", "model": weatherPhoto});
		}
	}
	return App;
});