define(['backbone'], function(Backbone){
	//SearchQuery Model to store query
	var WeatherPhoto = Backbone.Model.extend({
		tags: null,
		//url: '/js/data/weather-images.json',
		url: function(){
			var uri = 'https://api.500px.com/v1/photos/search?',
				options = {
					category: "Landscape",
					consumer_key: "ciAqwxZNrq2bA4BootekUJxU6xEHiPIIjazPvLWj",
					rpp: 50,
					image_size: 4,
					tag: this.tags !== null ? concatTags(this.tags) : ""
				};

			var endpoint = uri + getParameters();

			function getParameters(){
				var params = [];
				for(key in options){
					var value = options[key];
					if(value !== "" && value !== null ){
						params.push(key + "=" + value);
					}
				}
				
				return params.join("&");
			}

			function concatTags(data){
				var data = data,
					tags = [];

				data.forEach(function(tag){
					tags.push(encodeURIComponent(tag));
				});

				return tags.join(",");
			}

			return endpoint;
		},
		setProp: function(prop, val){
			this[prop] = val;
		}
	});
	return WeatherPhoto;
});