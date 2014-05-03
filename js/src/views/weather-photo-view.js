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

			that.subscribe();
		},
		subscribe: function() {
			var that = this;
			
			Events.on("NewForecast", this.getPhotos, this);
			that.listenTo(that.model, 'change', that.render);
		},
		render: function(){
            var that = this,
            	data = this.model.toJSON(),
            	photos = data.photos,
            	randomIndex = _.random(0, (photos.length - 1)),
            	photo = photos[randomIndex];
            
            //Trigger event that photos are ready
            Events.trigger("NewPhoto");

            console.log("render data", photo); 
            this.$el.html(this.template(photo));
           
        },
        getPhotos: function(data){
        	var forecast = data,
        		weatherConditions = this.getWeatherConditions(forecast.icon),
        		weatherTags = this.getWeatherTags(weatherConditions);

        	//set tag property
        	this.model.setProp("tags", weatherTags);

        	this.model.clear({"silent": true});
        	this.model.fetch();
        },
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