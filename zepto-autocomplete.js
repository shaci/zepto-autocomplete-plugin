(function($){

  var methods = {
  	init:    function(options) {
  		var settings = $.extend({
  			data:   [],
  			height: 40
  		}, options);

  		var $this = this;
      //Для контроля инициализации
      var data = $this.attr('data-autocomplete');
      var storage = null;
  		//если не проинициализирован для данного элемента
  		if (!data) {
        console.log('init')
        createStorage();
  		  return $this.each(function() {
          $this.bind('focus.autocomplete', computeStorage)
        })
  		}

      function createStorage() {
        storage = $('<div>');
        $('body').append(storage);
        var position = { left : $this.offset().left , top : $this.offset().top + $this.height() }
        storage.width($this.width() - 2);
        storage.css('position', 'absolute').css('top', position.top).css('left', position.left).css('border', '1px solid black').css('background', 'white');
        $this.attr('data-autocomplete', 'true')
        storage.hide();
      }
  		//создание дива с подсказками
  		function computeStorage() {
  		  for (var i = 0; i < settings.data.length; i++) {
  		  	var record = $('<div>').html(settings.data[i]);
  		  	storage.append(record);
  		  }
        storage.show();
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