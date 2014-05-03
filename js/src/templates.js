define(function(){

  this["templates"] = this["templates"] || {};

  this["templates"]["photo"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div><img src="' +((__t = (image_url)) == null ? '' : __t) +'" width="200" /></div>\n';}return __p};

  this["templates"]["weather"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div>' +((__t = (current_observation.temp_f)) == null ? '' : __t) +'&deg;</div>\n<div>icon: ' +((__t = (current_observation.icon)) == null ? '' : __t) +'</div>\n';}return __p};

  return this["templates"];

});