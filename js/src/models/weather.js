define(['backbone'], function(Backbone){
	//SearchQuery Model to store query
	var Weather = Backbone.Model.extend({
		coordinates: null,
		url: function(){
			var uri = "http://api.wunderground.com/api/",
				keyId = "3fa77c5415098e67",
				query = '/conditions/q/',
				geo = this.coordinates.lat + "," + this.coordinates.lng,
				dataType = ".json?callback=?";

		 	var endpoint = uri + keyId + query + geo + dataType;

			return endpoint;
		},
		setProp: function(prop, val){
			this[prop] = val;
		},
		weatherIcon: {
			"chanceflurries": "U",
			"chancerain": "Q",
			"chancesleet": "X",
			"chancesnow": "W",
			"chancetstorms": "Z",
			"clear": "B",
			"cloudy": "N",
			"flurries": "U",
			"fog": "M",
			"hazy": "L",
			"mostlycloudy": "Y",
			"mostlysunny": "H",
			"partlycloudy": "H",
			"partlysunny": "H",
			"sleet": "X",
			"rain": "R",
			"snow": "W",
			"sunny": "B",
			"tstorms": "0",
			"unknown": "B"
		},
		getWeatherIcon: function(prop){
			return this.weatherIcon[prop];
		}
	});
	return Weather;
});