(function($){

  var methods = {
  	init:    function(options) {
  		var settings = $.extend({
  			data:   [],
  			height: 40
  		}, options);

  		var $this = this, data = $this.data('autocomplete');
  		//если не проинициализирован для данного элемента
  		if (!data) {
  	      var storage = $('<div>');
          $this.data('autocomplete', {
            target:  $this,
            storage: storage
          })
  		  return $this.each(function() {
            $this.bind('click.autocomplete', createStorage)
          })
  		}
  		//создание дива с подсказками
  		function createStorage() {
  		  var position = { left : $this.offset().left , top : $this.offset().top + $this.height() }
  		  storage.width($this.width());
  		  storage.css('position', 'absolute').css('top', position.top).css('left', position.left);
  		  for (var i = 0; i < settings.data.length; i++) {
  		  	var record = $('<div>').html(settings.data[i]);
  		  	storage.append(record);
  		  }
  		  $('body').append(storage)
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