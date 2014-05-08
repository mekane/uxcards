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

            app.deck = new app.Deck();
            app.deck.reset( app.cardText );

            app.defaultDeckView = new app.DeckView({ collection: app.deck, el: '#default' });

            //Enable drag-and-drop on the initial group of cards and on the priority piles
            $('#default, section').sortable({ connectWith: 'section', helper:'clone' });

            //This was a little UI jazz to show the buttons after the cards were all sorted
            //But I've since made the controls visible by default so it's kind of pointless
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
