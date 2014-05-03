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
		}
	});
	return Weather;
});