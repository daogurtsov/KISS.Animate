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
            self.$elem = $( elem );
            self.speed = ( typeof options === 'string' )
                ? options
                : options.speed;

            self.options =  $.extend( {}, $.fn.kissAnimate.options, options );
            self.elements = self.$elem.children();
            self.slides = self.prepareMarkup();
            self.prepareCSS( self.slides );
            self.refresh();
        },

        refresh: function( index ){
            var self = this;
            index = index || 0;
            setTimeout(function(){
                    self.display( self.slides.eq( index++ ));
                    if ( typeof  self.options.onComplete === 'function' ){
                        self.options.onComplete.apply( self.elem, arguments);
                    }
                    if ( self.options.speed ) {
                        index = ( index === self.slides.length ) ? 0 : index;
                        self.refresh( index );
                    }
            }, self.speed );

        },

        prepareMarkup: function(){
            var self = this;
            var splitter = self.options.splitter;
            $.map( self.elements, function( obj, i){
                if( i % self.options.limit === 0 ){
                    $( obj ).addClass( splitter );
                }
            });

            return self.elements .filter( '.' + splitter )
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
            if ( !delay ){
                 delay = self.speed - ( 2 * animeSpeed );
                 delay = ( delay > 0) ? delay : 0;
            }
            if ( self.options.transition === 'none' || !self.options.transition ){
                current.show( animeSpeed, function(){
                    $( this).delay( delay );
                    $(this).hide( animeSpeed );
                });
            }else{
                current[ self.options.transition ]( animeSpeed, function(){
                    $( this).delay( delay );
                    $( this )[ self.options.transition ]( animeSpeed );
                });
            }
        }
    };
    $.fn.kissAnimate = function( options ){
        return this.each(function(){
            var anime = Object.create( Anime );
            anime.init( options ,this);
            $.data( this, 'kissAnimate', anime);
        });
    };
    $.fn.kissAnimate.options = {
        wrapSlideWith: '<div class="animate-wrapper"></div>',
        limit: '3',
        onComplete: null,
        speed: null,
        animeSpeed:null,
        delay:null,
        transition: 'fadeToggle',
        splitter: 'split',
        css: false
    };
})(jQuery,window, document);
