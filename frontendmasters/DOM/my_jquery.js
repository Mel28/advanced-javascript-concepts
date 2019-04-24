(function() {
  var lis = new $("li");
  lis[0] //-> <li>
  lis.length //-> 5
  lis.html() //-> "Hello world"
  //passes in a css selector
  $ = function(selector) {
// if `this` isn't "correct"
//call new $(selector);
if(!(this instanceof $) ) {
  return new $(selector);
}

var elements; 
//if selector is a string
if(typeof selector === 'string') {
elements = document.querySelectorAll(selector);
}
else {
  // otherwise assume an array
elements = selector;
}



//version1
Array.prototype.push.apply(this, elements);
//version2
for(var i = 0; i < elements.length; i++){
  this[i] = elements[i];
}
this.length = elements.length;
  };
 
  $.extend = function(target, object) {
    for(var prop in object){
      if( object.hasOwnProperty(prop)) {
        target[prop] = object[prop];
      }
    }
    return target;
  };
 
  // Static methods
  var isArrayLike = function(obj) {
    if(typeof obj.length === "number"){
      if(obj.length === 0) {
        return true;
      } else if(obj.length > 0) {
        return (obj.length -1) in obj;
      }
  }
  return false;
  };
 
  $.extend($, {
    isArray: function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
    },
    each: function(collection, cb) {
      if(isArrayLike(collection)) {
        for(var i = 0; i < collection.length; i++) {
            var value = collection[i];
            cb.call(value, i , value);
        }
      } else {
          for(var prop in collection) {
              if(collection.hasOwnProperty(prop)) {
                var value = collection[prop];
                cb.call(value, prop, value);
              }
          }
      }
      return collection;
    },
    makeArray: function(arr) {
      var array = [];
      $.each(arr, function(i, value){
        array.push(value);
      });
      return array;
    },
    proxy: function(fn, context) {
      return function(){
        return fn.apply(context, arguments)
      };
    
    }
  });
  
    var getText = function(el) {
      var txt = "";
      $.each(el.childNodes, function(i, childNode){
          if(childNode.nodeType === Node.TEXT_NODE) {
              txt = txt + childNode.nodeValue;
          } else if (childNode.nodeType === Node.ELEMENT_NODE) {
             txt = txt + getText(childNode);
          }
          
      });
      
      return txt;
    };
 
  $.extend($.prototype, {
    html: function(newHtml) {
        if(arguments.length) {
          //setting
          //go through each element in `this`
          //set innerHTML to newHtml
          $.each(this, function(i, el) {
            el.innerHTML = newHtml;
              
          });
        } else {
          //return this[0]'s innerHTML'
          return this[0].innerHTML;
        }
    },
    val: function(newVal) {
              if(arguments.length) {
          //setting
          //go through each element in `this`
          //set innerHTML to newHtml
          $.each(this, function(i, el) {
            el.value = newVal;
              
          });
        } else {
          //return this[0]'s value'
          return this[0].value;
        }
    },
    text: function(newText) {
        if(arguments.length) {
          //setter
          //loop and ...
          return $.each(this, function(i, el){
            //set innerHTML to ""
            // document.createTextNode() with newText
            var text = document.createTextNode(newText);
            //and append to the element.
            el.appendChild(text);
          });
        } else {
            return this[0] && getText(this[0]);
        }
    },
    find: function(selector) {
      //create accumulator
      var elements = [];
      //for each element in collection (like an array)
      $.each(this, function(i, el){
        //get elements that are within element that match selector
       var els = el.querySelectorAll(selector);
        //add them to accumulator
        [].push.apply(elements, els);
      });
      return $(elements);
        
        
    },
    next: function() {
      //need an accumulator []
      var elements = [];
      //for each element in our collection
      $.each(this, function(i, el) {
        var current = el.nextSibling;
        
        while(current && current.nodeType !== 1) {
          current = current.nextSibling;
        }
        
        if(current) {
          elements.push(current);
        }
      });
      //if element is not a text node, add to our accumulator
      //if element is a text node, recurse to next node
      //if no element is found, do nothing
      
      return $(elements);
    },
    prev: function() {
      //need an accumulator []
      var elements = [];
      //for each element in our collection
      $.each(this, function(i, el) {
        var current = el.previousSibling;
        
        while(current && current.nodeType !== 1) {
          current = current.previousSibling;
        }
        
        if(current) {
          elements.push(current);
        }
      });
      //if element is not a text node, add to our accumulator
      //if element is a text node, recurse to next node
      //if no element is found, do nothing
      
      return $(elements);
    },
    parent: function() {
      var elements = [];
      $.each(this, function(i, el) {
        elements.push(el.parentNode);
      });
    },
    children: function() {},
    attr: function(attrName, value) {
      if(arguments.length > 1) {
        $.each(this, function(i, el){
            el.setAttribute(attrName, value);
        });
      } else {
          return this[0] && this[0].getAttribute(attrName);
      }
    },
    //$('div').css('padding', '20px')
    css: function(cssPropName, value) {
        if(arguments.length > 1) {
            return $.each(this, function(i, el){
                el.style[cssPropName] = value;
            });
        } else {
            return this[0] &&
                document.defaultView.getComputedStyle( el )
                .getPropertyValue( cssPropName )
        }
    },
    width: function() {},
    offset: function() {
      var offset = this[0].getBoundingClientRect();
      return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset
      };
    },
    hide: function() {
      this.css("display", "none")
    },
    show: function() {
      this.css("display", "block");
    },
 
    // Events
    bind: function(eventName, handler) {
        return $.each(this, function(i, el){
            el.addEventListener(eventName, handler, false);
        });
    },
    unbind: function(eventName, handler) {
       return $.each(this, function(i, el){
            el.removeEventListener(eventName, handler, false);
        });
    },
    has: function(selector) {
      var elements = [];
     
      $.each(this, function(i, el) {
        if(el.matches(selector)) {
          elements.push(el);
        }
      });
     
      return $( elements );
    },
    on: function(eventType, selector, handler) {
      return this.bind(eventType, function(ev){
        var cur = ev.target;
        do {
          if ($([ cur ]).has(selector).length) {
            handler.call(cur, ev);
          }
          cur = cur.parentNode;
        } while (cur && cur !== ev.currentTarget);
      });
    },
    off: function(eventType, selector, handler) {},
    data: function(propName, data) {},
 
    // Extra
    addClass: function(className) {},
    removeClass: function(className) {},
    append: function(element) {},
    $.fn = $.prototype;
  });
 
  $.buildFragment = function(html) {};
})();