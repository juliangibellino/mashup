define(function(){

  this["templates"] = this["templates"] || {};

  this["templates"]["loader"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="loader"></div>';}return __p};

  this["templates"]["photo"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<img src="' +((__t = (image_url)) == null ? '' : __t) +'" />';}return __p};

  this["templates"]["weather"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="forecast">\n\t<p class="icon">' +((__t = (icon)) == null ? '' : __t) +'</p>\n\t<p class="temp">' +((__t = (temp)) == null ? '' : __t) +'&deg;</p>\n</div>';}return __p};

  return this["templates"];

});