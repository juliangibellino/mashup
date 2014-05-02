define(['backbone'], function(Backbone){
	//SearchQuery Model to store query
	var WeatherPhoto = Backbone.Model.extend({
		keywords: null,
		url: '/js/data/weather-images.json'
	});
	return WeatherPhoto;
});