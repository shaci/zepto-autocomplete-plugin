(function($){

  var methods = {
  	init:    function(options) {
  		var settings = $.extend({
  			data:   [],
  			height: 40
  		}, options);


  		var $this = $(this), data = $this.data('autocomplete'), storage = $('div');

  		if (!data) {

          $this.data('autocomplete', {
            target:  $this,
            storage: storage
          })

  		  return this.each(function() {
            $(this).val('tatata1');

          })
  		}
  	},
  	destroy: function() {
  		console.log('destroy');
  	}
  }

  $.fn.autoComplete = function(method) {

  	if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для Zepto.autocomplete' );
    }

  }

})(Zepto)