define(['backbone'], function(Backbone){
	//SearchQuery Model to store query
	var Weather = Backbone.Model.extend({
		url: '/js/data/weather-forecast.json'
	});
	return Weather;
});