define([
	'jquery', 
	'backbone', 
	'modules/events',
	'templates'
	],function($, Backbone, Events, templates){
	
	var WeatherView = Backbone.View.extend({
		el: "#weather",
		templateLoader: templates['loader'],
		templateWeather: templates['weather'],
		initialize: function(){
			var that = this;

			that.subscribe();
		},
		/**
		 * Subscribe to broadcrasted events
		 */
		subscribe: function() {
			var that = this;
			
			Events.on("NewLocation", this.getWeather, this);
			Events.on("NewPhoto", this.renderWeather, this);
			that.listenTo(that.model, 'change', that.weatherUpdated);
		},
		/**
		 * Render weather details based on model data
		 */
		renderWeather: function(){
            var that = this,
            	data = this.model.toJSON(),
            	forecast = {
            		"icon": this.model.getWeatherIcon(data.current_observation.icon),
            		"temp": Math.round(data.current_observation.temp_f)
            	}
            //render compiled template to $el
            this.$el.html(this.templateWeather(forecast));
        },
        /**
         * Render loader
         */
        renderLoader: function(){
        	//render compiled template to $el
        	this.$el.html(this.templateLoader());
        },
        /**
         * Get weather from web service based on users coordinates
         * @param  {Object} data Object containing coordinates of user input
         */
        getWeather: function(data){
        	var data = data,
        		lat = data.lat,
        		lng = data.lng;

   			//set coordinates property in model for api use
        	this.model.setProp("coordinates", data);
        	//clear current model
        	this.model.clear({"silent": true});
        	//fetch new data
        	this.model.fetch();
        	//render loader to indicate that it is processing request
        	this.renderLoader();
        },
        /**
         * Broadcast event that the weather data has been retrieve and send data out
         */
        weatherUpdated: function(){
        	var data = this.model.toJSON(),
        		forecast = data.current_observation,
        		weather = forecast.weather,
        		icon = forecast.icon,
        		loc = forecast.display_location,
        		coor = {"lat": loc.latitude, "lng": loc.longitude},
				weatherDetails = {
	        		"weather": weather,
	        		"icon": icon,
	        		"location": loc
	        	};

        	Events.trigger("NewForecast", weatherDetails)
        }
	});

	return WeatherView;
});