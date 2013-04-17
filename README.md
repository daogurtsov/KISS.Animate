KISS.Animate
============

KISS.Animate is plugin for sliding animations based on JQuery and the best code structure practices with simple api 
Prerequisites: jquery 1.6 or higher.
examples:
<a href="http://jsfiddle.net/daogurtsov/8cGsq/14/">1. with code</a>
<a href="http://jsfiddle.net/daogurtsov/8cGsq/14/embedded/result/">2.full screen</a>

API

$('ul.post_list.first').kissAnimate(); //runs with defaults
//defaults:
$.fn.kissAnimate.options = {
        limit: '1', // number of content entities on one slide
        speed: 5000, // one slide full presentation time
        animeSpeed: 2000, // animation affect time, if you use toggle Animations methods, this time will be half of full animation
        delay: 1000, // delay between animations
        wrapSlideWith:'<div class="animate-wrapper"></div>', // this wrapper splits content on slides
        transition: 'fadeToggle', // animation affect name ( jquery API animations method name )
        splitter: 'split', // adds class to first content entitty, present for wrapper
        css: true, // sets slides on position:absolute and display:none
        onComplete: null // action listener, fired on animation complere, can be any custom function
    };
/*
* In this case speed < animeSpeed x 2 + delay, in toggle methodes it will produce 
* semi - transparency between prev / next slide
* /

$('ul.post_list.second').kissAnimate({
   limit: '2',
   speed: 3000,
   animeSpeed: 2000,
   delay: 1000,
   wrapSlideWith:'<div class="animate-wrapper"></div>',
   transition: 'fadeToggle',
   splitter: 'split',
   css: true
});

$('ul.post_list.third').kissAnimate({
   limit: '3',
   speed: 5000,
   animeSpeed: 1000,
   delay: 3000,
   wrapSlideWith:'<div class="animate-wrapper"></div>',
   transition: 'slideToggle',
   splitter: 'split',
   css: true
});

