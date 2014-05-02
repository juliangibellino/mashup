requirejs.config({    
    baseUrl: './',    
    paths: {
    	jquery: '../libs/jquery-1.11.0.min',
    	underscore: '../libs/underscore-min',
    	backbone: '../libs/backbone-min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }

});