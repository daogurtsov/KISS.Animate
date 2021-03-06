/**
 *
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 4/12/13
 * Time: 2:04 AM
 * To change this template use File | Settings | File Templates.
 */
if ( typeof Object.create !== 'function' ){
    Object.create = function( obj ){
        function F(){};
        F.prototype = obj;
        return new F();
    }
}
(function($, window, document, undefined ){
    var Anime = {
        init:function( options, elem){
            var self = this;
            self.elem = elem;
            self.timer = 0;
            self.index = 0;
            self.$elem = $( elem );
            if ( options ) {
                self.speed = ( typeof options === 'string' )
                    ? options
                    : options.speed;
            }
            self.options =  $.extend( {}, $.fn.kissAnimate.options, options );
            self.elements = self.$elem.children();
            self.slides = ( self.options.limit > 1 ) ? 
                              self.prepareMarkup() : self.elements;
            self.prepareCSS( self.slides );
            if( self.options.pause ){
               self.pause( self.$elem );
            }
            self.timer = setTimeout( self.refresh, self.speed, self );
        },

        refresh: function( sliderInstance ){
                var self =  sliderInstance;
                self.display( self.slides.eq( self.index++ ));
                if ( typeof  self.options.onComplete === 'function' ){
                    self.options.onComplete.apply( self.elem, arguments);
                }
                self.index = ( self.index === self.slides.length ) ? 0 : self.index;
                self.timer = setTimeout( self.refresh, self.speed, self );
            },

        prepareMarkup: function(){
            var self = this;
            var splitter = self.options.splitter;
               $.map( self.elements, function( obj, i){
                      if( i % self.options.limit === 0){
                          $( obj ).addClass( splitter );
                      }
               });
            return self.elements.filter( '.' + splitter )
                .each(function() {
                    $( this ).add( $(this)
                            .nextUntil( '.' + splitter ))
                        .wrapAll( self.options.wrapSlideWith );
                }).parent();
        },

        prepareCSS:function(){
            var self = this;
            if ( self.options.css ){
                $( self.slides).css({ 'display' : 'none', 'position' : 'absolute'});
            }
        },

        display: function( current ){
            var self = this;
            var animeSpeed = self.options.animeSpeed;
            var delay = self.options.delay;
            current[ self.options.transition ]( animeSpeed, function(){
               $( this ).delay( delay )
                  [ self.options.transition ]( animeSpeed );
            });
        },

        pause: function( slidesWrapper ){
            var self = this;
            var animeSpeed = self.options.animeSpeed;
            var slideIndex = 1;
            var current = $();
            var handlerIn = function(){
              window.clearTimeout(self.timer);
              slideIndex =  self.index - 1;
              current = slidesWrapper.children().eq( slideIndex );
              current.stop( true, false ).css( 'opacity', 1);
            };
            var handlerOut = function(){
               current.stop( true, true ).animate({'opacity' : 0}, animeSpeed );
               self.timer = setTimeout( self.refresh, self.speed, self );
            };
              slidesWrapper.hover( 
                    handlerIn,
                    handlerOut
                 ); 
       }
    };
    $.fn.kissAnimate = function( options ){
        return this.each(function(){
            var anime = Object.create( Anime );
            options = ( options ) ? options
                                  : $.fn.kissAnimate.options;
            anime.init( options ,this);
            $.data( this, 'kissAnimate', anime);
        });
    };
    $.fn.kissAnimate.options = {
        limit: '1',
        speed: 5000,
        animeSpeed: 2000,
        delay: 1000,
        wrapSlideWith:'<div class="animate-wrapper"></div>',
        transition: 'fadeToggle',
        splitter: 'split',
        css: true,
        onComplete: null,
        pause: true
    };
})(jQuery,window, document);


