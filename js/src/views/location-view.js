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
		/**
		 * Keyboard keys
		 */
		keys: {
			arrowUp: 38,
			arrowDown: 40,
			enter: 13,
			esc: 27,
			tab: 9
		},
		/**
		 * Dom events
		 */
		events: function(){
			this.$input.on("focus", $.proxy(this.geolocate, this));
			this.$input.on("keyup", $.proxy(this.checkInputChange, this));
			$("#location-submit", this.$el).on("click", $.proxy(this.submitLocation, this));
		},
		/**
		 * Setup Google places autocomplete input
		 */
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
		/**
		 * Setup Google geolocate object
		 */
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
		/**
		 * Set users location in model based on input
		 */
		setLocation: function(data){
			var data = data,
				loc = data.geometry.location;

			//set model with coordinates
			this.model.set({"lat": loc.k, "lng": loc.A})
		},
		/**
		 * Check if the value of the input has changed when a user presses a keyboard key
		 * @param  {Object} e Dom event object
		 */
		checkInputChange: function(e){
			var self = this,
				keyVal = e.which,
		        inputVal = self.$input.val();
		        inputChanged = self.inputPrevVal != inputVal;
	      
	      //Set inputPrevVal to new value
	      self.inputPrevVal = inputVal;

	      
	      if(inputChanged && keyVal != self.keys.enter){
	      	//Check to see if the input value has changed and the enter key was not pressed
	      	this.model.clear({"silent": true});
	      } else if(this.validateLocation() && keyVal == self.keys.enter){
	      	//Check if the enter button was clicked and validate form for submit
	      	this.submitLocation();
	      }
		},
		/**
		 * Sumbit form
		 */
		submitLocation: function(){
			
			if(this.validateLocation()){
			//if form is valid
				var location = this.model.toJSON();
				//remove any error messages
				this.toggleError(false);
				//broadcast event that a new location is available and pass its data
				Events.trigger("NewLocation", location);
			} else { 
			//if form is invalid show error messages
				this.toggleError(true);
			}
		},
		/**
		 * Validate users location
		 */
		validateLocation: function(){
			var hasLocation = this.model.has("lat") && this.model.has("lng");
			return hasLocation;
		},
		/**
		 * Hide/Show error messages
		 * @param  {Boolean} isError Argument to determine to hide/show
		 */
		toggleError: function(isError){
			var isError = isError;
			if(isError){
				this.$el.addClass("error");
			} else {
				this.$el.removeClass("error");
			}
		}
		
	});

	return LocationFinderView;
});