require.config({

    // The root path to use for all module lookups
    baseUrl: 'scripts/',

    // Path mappings for module names not found directly under baseUrl
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/sass-bootstrap/js/modal',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition'
    },

    // Configure the dependencies, exports, and custom initialization for older,
    // traditional "browser globals" scripts that do not use define() to declare
    // the dependencies and set a module value
    shim: {
        bootstrapAffix: {       deps: ['jquery'] },
        bootstrapAlert: {       deps: ['jquery', 'bootstrapTransition'] },
        bootstrapButton: {      deps: ['jquery'] },
        bootstrapCarousel: {    deps: ['jquery', 'bootstrapTransition'] },
        bootstrapCollapse: {    deps: ['jquery', 'bootstrapTransition'] },
        bootstrapDropdown: {    deps: ['jquery'] },
        bootstrapModal: {       deps: ['jquery', 'bootstrapTransition'] },
        bootstrapPopover: {     deps: ['jquery', 'bootstrapTooltip'] },
        bootstrapScrollspy: {   deps: ['jquery'] },
        bootstrapTab: {         deps: ['jquery', 'bootstrapTransition'] },
        bootstrapTooltip: {     deps: ['jquery', 'bootstrapTransition'] },
        bootstrapTransition: {  deps: ['jquery'] },
        app: {                  deps: ['jquery'] }
    }
});

require([   'app',
            'jquery',
            'bootstrapCollapse',
            'bootstrapTransition',
            'jquery-plugin'
],

function (app, $) {

    'use strict';
    // use app here
//    console.log(app);

//    $(document).on('ready', function(event) {
    
    $('h1').jQueryPlugin();
//    }

    console.log('Running jQuery %s', $().jquery);
});
