//Main App
define(['jquery', 'modules/location-finder'], 
	function($, LocationFinder){
	var App = {
		init: function(){
			var locationLocator = new LocationFinder({'locationId': 'location-finder'});
		}
	}
	return App;
});