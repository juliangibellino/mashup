define([
	'jquery', 
	'backbone', 
	'modules/events',
	'templates'
	],function($, Backbone, Events, templates){
	
	var WeatherPhotoView = Backbone.View.extend({
		template: templates['photo'],
		initialize: function(){
			var that = this;

			//Subscribe to events
			that.subscribe();
		},
		/**
		 * Subscribe to broadcrasted events
		 */
		subscribe: function() {
			var that = this;
			
			Events.on("NewForecast", this.getPhotos, this);
			that.listenTo(that.model, 'change', that.render);
		},
		/**
		 * Render retrieve image to dom
		 */
		render: function(){
            var that = this,
            	data = this.model.toJSON(),
            	photos = data.photos,
            	randomIndex = _.random(0, (photos.length - 1)),
            	photo = photos[randomIndex];
            
            //broadcast event that photos have been retrieved
            Events.trigger("NewPhoto");
            //render compiled template to $el
            this.$el.html(this.template(photo)); 
        },
        /**
         * Get weather conditions and submit request to get related photos
         * @param  {Object} data Data object containing weather details
         */
        getPhotos: function(data){
        	var forecast = data,
        		weatherConditions = this.getWeatherConditions(forecast.icon),
        		weatherTags = this.getWeatherTags(weatherConditions);

        	//set tag property
        	this.model.setProp("tags", weatherTags);
        	//clear model
        	this.model.clear({"silent": true});
        	//make request for new data
        	this.model.fetch();
        },
        /**
         * Determine the type of weather conditions relate to the current request
         * @param  {Sting} forecast  Data that signifys the description of the weather conditions (ex. "sunny") 
         * @return {String}          Weather condition type 
         */
        getWeatherConditions: function(forecast){
        	var forecast = forecast,
        		weatherType = "default",
        		typesOfWeather = [
					{ "type": "sunny", "desc": ["sunny", "clear", "mostlysunny", "partlysunny", "unknown"] },
					{ "type": "cloudy", "desc":["cloudy", "clouds", "cloud", "partlycloudy"] },
					{ "type": "fog", "desc": ["fog", "hazy"] },
					{ "type": "rain", "desc": ["chancerain", "rain" ] },
					{ "type": "snow", "desc": ["chanceflurries", "chancesnow", "flurries", "snow"] },
					{ "type": "icy", "desc": ["chancesleet", "sleet"] },
					{ "type": "thunderstorms", "desc": ["chancetstorms", "tstorms"] }	
				];

			typesOfWeather.forEach(function(item, index){
				var item = item,
					index = index;

				if(_.contains(item.desc, forecast)){
					weatherType = item.type;
				} 
			});

			return weatherType;
        },
        /**
         * Get tags that relate to the type of weather
         * @param  {String} weatherConditions Identifier of the weather type
         * @return {Array}                    An array of tags
         */
        getWeatherTags: function(weatherConditions){
        	var weatherConditions = weatherConditions,
        		tags ={
        			"default": ["sun", "outdoors", "sky", "nature"],
        			"sunny": ["sunny", "sun", "sunshine", "summer"],
					"cloudy": ["cloudy", "clouds", "cloud"],
					"fog": ["foggy", "hazy", "fog", "haze"],
					"rain": ["rain", "rainy", "showers", "raindrops" ],
					"snow": ["snow", "blizzard", "snowflake"],
					"icy": ["ice", "icy"],
					"thunderstorms": ["lightning", "stormy", "thunderstorm", "thunderbolt"]
        		}

        	return tags[weatherConditions];
        }
	});

	return WeatherPhotoView;
});