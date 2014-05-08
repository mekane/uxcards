var app = app || {};

(function(){

    app.DeckView = Backbone.View.extend({

        events : {
           //TODO: try listening for jQuery UI sort events 
        },

        initialize : function initialize( options ){
            this.cardViews = [];

            if ( this.collection ){
                this.listenTo( this.collection, 'add', this.addCardView );

                //CardViews automatically remove themselves when removed from a Collection 
                //this.listenTo( this.collection, 'remove', this.removeCardView );

                this.collection.forEach( function( card ){
                    this.addCardView( card, this );
                }, this);
            }
        },

        addCardView : function addCardView( model, collection, options ){
            this.cardViews.push( new app.CardView({ model:model }) );
        },

        render : function render(){
            return this;
        }
    });
}());
