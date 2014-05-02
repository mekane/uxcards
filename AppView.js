var app = app || {};

(function(){
    'use strict'


    app.addCard = function addCard( data ){
        var model = new app.Card(data);
        app.cards.push( new app.CardView({model:model}) ); 
    }


    app.AppView = Backbone.View.extend({

        el : 'body',

        events : {
            'click #flipAll' : 'flipAllCards',
            'click #frontAll': 'flipAllCardsToFront',
            'click #backAll' : 'flipAllCardsToBack',
            'change #cardControl' : 'toggleCardControls'
        },

        initialize : function initialize(){
            app.cards = [];

            _.each( _.shuffle(app.cardText), app.addCard ); 
           
            $('#default, section').sortable({ connectWith: 'section', helper:'clone' });

            $('#default').on('sortupdate', function(e){
                if ( $(this).is(':empty') ){
                    $('body > header').text('Flip cards to see solutions!');
                    $('#control').fadeIn('fast');
                    $('#flipAll').addClass('highlight');
                }
            });

        },


        flipAllCards : function flipAllCards(){
            _.invoke( app.cards, 'flipCard' );
            $(this).removeClass('highlight');
        },


        flipAllCardsToFront : function flipAllCardsToFront(){
            _.invoke( app.cards, 'flipCardToFront' );
        },

        flipAllCardsToBack : function flipAllCardsToBack(){
            _.invoke( app.cards, 'flipCardToBack' );
        },

        toggleCardControls : function toggleCardControls(e){
            this.$el.toggleClass( 'cardControlOn', $(e.target).is(':checked') );
        }

    });
}());
