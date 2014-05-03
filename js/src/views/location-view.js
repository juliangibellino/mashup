define([
	'jquery', 
	'backbone', 
	'modules/events'
	],function($, Backbone, Events){
	
	var LocationFinderView = Backbone.View.extend({
		initialize: function(){
			var self = this;

			this.$input = $("input", this.$el);
			this.inputId = this.$input.attr("id");
			this.inputPrevVal = null;

			self.setupAutocomplete();
		},
		keys: {
			arrowUp: 38,
			arrowDown: 40,
			enter: 13,
			esc: 27,
			tab: 9
		},
		events: function(){
			this.$input.on("focus", $.proxy(this.geolocate, this));
			this.$input.on("keyup", $.proxy(this.checkInputChange, this));
			$("#location-submit", this.$el).on("click", $.proxy(this.submitLocation, this));
		},
		setupAutocomplete: function(){
			var self = this;

			// Create the autocomplete object, restricting the search
			// to geographical location types.
			self.autocomplete = new google.maps.places.Autocomplete(
				/** @type {HTMLInputElement} */(document.getElementById(self.inputId)),
				{ types: ['geocode'] }
			);

			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			google.maps.event.addListener(self.autocomplete, 'place_changed', function() {
				var placesObj = self.autocomplete.getPlace();
				//check if object has geometry to prevent error
				if(placesObj.hasOwnProperty("geometry")){
					self.setLocation(placesObj);
				}				
	  		});
		},
		geolocate: function() {
		  var self = this;

		  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      var geolocation = new google.maps.LatLng(
		          position.coords.latitude, position.coords.longitude);

		      self.autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
		          geolocation));
		    });
		  }
		},
		setLocation: function(data){
			var data = data,
				loc = data.geometry.location;

			console.log("data.geometry.location: ", data.geometry.location);

			this.model.set({"lat": loc.k, "lng": loc.A})
			
			console.log("model", this.model.toJSON());		
		},
		checkInputChange: function(e){
			var self = this,
				keyVal = e.which,
		        inputVal = self.$input.val();
		        inputChanged = self.inputPrevVal != inputVal;
	      
	      //Set inputPrevVal to new value
	      self.inputPrevVal = inputVal;

	      //Check to see if the input value has changed and the enter key was not pressed
	      if(inputChanged && keyVal != self.keys.enter){
	      	this.model.clear({"silent": true});
	      }

	      //Check if the enter button was clicked and validate form for submit
	      if(this.validateLocation() && keyVal == self.keys.enter){
	      	this.submitLocation();
	      }
			
		},
		submitLocation: function(){
			//check if lat/lng attr are available
			if(this.validateLocation()){
				var location = this.model.toJSON();

				console.log("submit location");

				Events.trigger("NewLocation", location);
			} else { 
				alert("please enter a valid location from the dropdown");
			}
		},
		validateLocation: function(){
			var hasLocation = this.model.has("lat") && this.model.has("lng");
			return hasLocation;
		}
		
	});

	return LocationFinderView;
});