var app = app || {};
app.defaultDeckUrl = 'localhost:3000/uxcards';


(function(){

    app.Deck = Backbone.Collection.extend({

        model: app.Card,

        url: app.defaultDeckUrl, 

        initialize: function initialize(){
        }

    });
}());
