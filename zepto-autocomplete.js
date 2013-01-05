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
      var value   = '';
      var current = null;
  		//если не проинициализирован для данного элемента
  		if (!data) {
        console.log('init')
        createStorage();
  		  return $this.each(function() {
          $this.bind('focus.autocomplete', computeStorage).bind('keyup.autocomplete', computeStorage).bind('blur.autocomplete', closeStorage)
        })
  		}

      function createStorage() {
        storage = $('<div>');
        $('body').append(storage);
        var position = { left : $this.offset().left , top : $this.offset().top + $this.height() }
        storage.width($this.width() - 2);
        storage.css('position', 'absolute').css('top', position.top).css('left', position.left).css('border', '1px solid black').css('background', 'white');
        $this.attr('data-autocomplete', 'true');
        storage.on('mousedown.autocomplete', 'div', chooseRecord)
        storage.hide();
      }
      function closeStorage() {
        storage.hide();
      }
      function chooseRecord(e) {
        $this.val(e.target.innerHTML)
      }
  		//создание дива с подсказками
  		function computeStorage(e) {
        switch (e.keyCode) {
          case 37:
            break;
          case 39:
            break;
          case 38:
            if (current.prev().length) {
              current.css('background', 'white');
              current = current.prev();
              current.css('background', 'grey');
            }
            break;
          case 40:
            if (current.next().length) {
              current.css('background', 'white');
              current = current.next();
              current.css('background', 'grey');
            }
            break;
          case 13:
            $this.val(current.html());
            storage.empty();
            storage.hide();
            break;
          default:
            storage.empty();
            storage.hide();
            value = $this.val();
            for (var i = 0; i < settings.data.length; i++) {
              var string = settings.data[i];
              if (string.indexOf(value) != -1 && value) {
                var record = $('<div>').html(settings.data[i]);
                storage.append(record);
              }
            }
            if (storage.find('div').length)  {
              current = storage.find('div:first-child');
              current.css('background', 'grey');
              storage.show();
            }
            break;
        }
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