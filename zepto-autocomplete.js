(function($){
  var methods = {
  	init:    function(options) {
  		var settings = $.extend({
  			data:   [],
  			height: 20,
        maxOptions: 100,
        scrollable: true
  		}, options);

  		var $this = this;
      //Для контроля инициализации
      var data = $this[0].externalData;
      var current = null;
  		//если не проинициализирован для данного элемента
  		if (!data) {
        console.log('init')
        createStorage();
  		  return $this.each(function() {
          $this.bind('focus.autocomplete', computeStorage).bind('keyup.autocomplete', keyHandler).bind('blur.autocomplete', closeStorage)
        })
  		}

      function createStorage() {
        var storage = $('<div>');
        $('body').append(storage);
        var position = { left : $this.offset().left , top : $this.offset().top + $this.height() }
        storage.width($this.width() - 2);
        storage.css('zIndex', 1000);
        storage.css('position', 'absolute').css('top', position.top).css('left', position.left).css('border', '1px solid black').css('background', 'white');
        $this.attr('data-autocomplete', 'true');
        storage.on('mousedown.autocomplete', 'div', chooseRecord);
        if (settings.scrollable) {
          storage.css('overflow', 'auto');
        }
        else {
          storage.css('overflow', 'hidden')
        }
        if (settings.maxOptions > settings.data.length) {
          storage.css('max-height', settings.data.length * settings.height + 'px');
        } else {
          storage.css('max-height', settings.maxOptions * settings.height + 'px');
        }

        $this[0].externalData = {
          storage:  storage,
          settings: settings
        };
        storage.hide();
      }
      function closeStorage() {
        var storage = $this[0].externalData.storage;
        storage[0].scrollTop = 0;
        storage.hide();
      }
      function chooseRecord(e) {
        $this.val(e.target.innerHTML)
      }

      function computeStorage() {
        var storage  = $this[0].externalData.storage;
        var settings = $this[0].externalData.settings;
        storage.empty();
        storage.hide();
        var value = $this.val();
        settings.data.sort();
        for (var i = 0; i < settings.data.length; i++) {
          var string = settings.data[i];
          if (string.indexOf(value) != -1 && value) {
            var record = $('<div>').html(settings.data[i]).css('height', settings.height + 'px');
            storage.append(record);
          }
        }
        if (storage.find('div').length)  {
          current = storage.find('div:first-child');
          current.css('background', 'grey');
          storage.show();
        }
      }

      function moveUp(scroll) {
        var storage  = $this[0].externalData.storage;
        if (current.prev().length) {
          if (scroll) {
            storage[0].scrollTop -= settings.height;
          }
          current.css('background', 'white');
          current = current.prev();
          current.css('background', 'grey');
        }
      }

      function moveDown(scroll) {
        var storage  = $this[0].externalData.storage;
        if (current.next().length) {
          if (scroll) {
            storage[0].scrollTop += settings.height;
          }
          current.css('background', 'white');
          current = current.next();
          current.css('background', 'grey');
        }
      }

  		//создание дива с подсказками
  		function keyHandler(e) {
        var storage  = $this[0].externalData.storage;
        var settings = $this[0].externalData.settings;
        switch (e.keyCode) {
          case 37:
            break;
          case 39:
            break;
          case 38:
            var prev = current.index() - 1;
            if (!settings.scrollable) {
              moveUp();
            } else {
              var scroll = false;
              if (prev < storage[0].scrollTop / settings.height) {scroll = true;}
              moveUp(scroll);
            }
            break;
          case 40:
            var next = current.index() + 1;
            if (!settings.scrollable) {
              if (next < settings.maxOptions) {
                moveDown();
              }
            } else {
              var scroll = false;
              if (next >= settings.maxOptions) {scroll = true;}
              moveDown(scroll);
            }
            break;
          case 13:
            if (storage.width()) {
              $this.val(current.html());
              storage.empty();
              storage.hide();
            }
            break;
          default:
            computeStorage();
            break;
        }
  		}
  	},
  	destroy: function() {
      return this.each(function() {
        $this = $(this);
        $this.unbind('.autocomplete');
        var storage = this.externalData.storage;
        $(storage).remove();
        delete this.externalData;
      })
  	},
    add: function(field) {
      function unique(arr) {
        var obj = {};
        for(var i=0; i<arr.length; i++) {
          var str = arr[i];
          obj[str] = true;
        }
        return Object.keys(obj);
      }
      //если не массив
      if (Object.prototype.toString.call(field) != '[object Array]') {
        //попробуем превратить в массив
        field = [field];
      }
      $this = this;
      var newArr = $this[0].externalData.settings.data.concat(field);
      newArr     = unique(newArr);
      $this[0].externalData.settings.data = newArr.sort();
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