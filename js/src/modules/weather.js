//LocationFinder
define(['jquery', 'modules/events'], function($, Events){
	var Weather = function(options){
		
		this.initialize();
		this.events();
	};

	LocationFinder.prototype = {
		initialize: function(){
			var self = this;

			
		},
		subscribe: function(){
			Events.on("NewLocation", $.proxy(this.submitSearch, this));
		},
		events: function(){
			
		},
		submitSearch: function(){
			
		}
	}

	return Weather;
});