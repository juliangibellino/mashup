//LocationFinder
define(['jquery', 'modules/events'], function($, Events){
	var LocationFinder = function(options){
		this.placeSearch;
		this.autocomplete;
		this.locationId = options.locationId;
		this.$location = $("#" + this.locationId);
		this.$input = $("input", this.$location);
		this.inputId = this.$input.attr("id");
		this.$inputPrevVal = null;

		this.initialize();
		this.events();
	};

	LocationFinder.prototype = {
		initialize: function(){
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
				//callback 
				self.addLocationAttr(self.autocomplete.getPlace());
	  		});
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
			$("#location-submit", this.$location).on("click", $.proxy(this.submitLocation, this));
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
		addLocationAttr: function(data){
			var data = data,
				location = data.geometry.location;

			this.$input.attr("data-lat", location.A);
			this.$input.attr("data-lng", location.k);			
		},
		checkInputChange: function(e){
			var self = this,
				keyVal = e.which,
		        inputVal = self.$input.val();
		        inputChanged = self.$inputPrevVal != inputVal;
	      
	      self.$inputPrevVal = inputVal;

	      //Prevent event from bubbling up
	      e.stopPropagation();

	      //Check to see if the input value has changed and the enter key was not pressed
	      if(inputChanged && keyVal != self.keys.enter){
	      	//clear lat/lng attributes
	      	this.$input.removeAttr("data-lat");
			this.$input.removeAttr("data-lng");
	      }
			
		},
		submitLocation: function(){
			//check if lat/lng attr are available
			
			//if true
			//trigger event with properties
			console.log("location submitted");
			//else show error message

		}
	}

	return LocationFinder;
});