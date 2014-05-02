define([
	'jquery', 
	'backbone', 
	'modules/events',
	'templates'
	],function($, Backbone, Events, templates){
	
	var WeatherView = Backbone.View.extend({
		el: "#weather",
		template: templates['weather'],
		initialize: function(){
			var that = this;

			that.subscribe();
		},
		subscribe: function() {
			var that = this;
			
			Events.on("NewLocation", this.getWeather, this);
			Events.on("NewPhoto", this.render, this);

			that.listenTo(that.model, 'change', that.weatherUpdated);
		},
		render: function(){
            var that = this,
            	data = this.model.toJSON();

            this.$el.html(this.template(data));
            console.log("render data", data);
        },
        getWeather: function(data){
        	this.model.clear({"silent": true});

        	this.model.fetch();
        },
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