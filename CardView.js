var app = app || {};

(function(){

    app.CardView = Backbone.View.extend({

        tagName: 'div',
        className: 'card',

        events : {
            'click' : 'flipCard',
            'click .high': 'prioritizeHigh',
            'click .med' : 'prioritizeMedium',
            'click .low' : 'prioritizeLow'
        },

        template : {
            front: Handlebars.compile( $('#cardFrontTemplate').html()), 
             back: Handlebars.compile( $('#cardBackTemplate').html() )
        },

        initialize : function initialize(){

            this.flipped = false;

            //this.templateFront = Handlebars.compile( $('#cardFrontTemplate').html() );
            //this.templateBack  = Handlebars.compile( $('#cardBackTemplate').html() );

            this.model.on('change', this.render, this);
            this.model.on('remove', this.remove, this);

            this.render();

            $('#default').append( this.$el );
        },


        flipCard : function flipCard( e ){
            this.flipped = !this.flipped;
            this.render();
        },


        flipCardToFront : function flipCardToFront(){
            this.flipped = false;
            this.render();
        },

        flipCardToBack : function flipCardToBack(){
            this.flipped = true; 
            this.render();
        },

        prioritizeHigh : function prioritizeHigh(e){
            $('#highest').append( this.$el );
            e.stopPropagation();
        },

        prioritizeMedium : function prioritizeMedium(e){
            $('#medium').append( this.$el );
            e.stopPropagation();
        },

        prioritizeLow : function prioritizeLow(e){
            $('#lowest').append( this.$el );
            e.stopPropagation();
        },

        render : function render(){
            var json = this.model.toJSON();

            if ( this.flipped ){
                this.$el.html( this.template.back(json) ).attr('title', this.model.get('resource'));
            }
            else {
                this.$el.html( this.template.front(json)).attr('title', 'Click to flip card');
            }
            return this;
        }
    });
}());
