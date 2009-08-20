var JsUnitTest = {
  Unit: {},
  inspect: function(object)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="object" type="Object"></param>
      /// <returns type="String"></returns>
      
    try {
      if (typeof object == "undefined") {return 'undefined';}
      if (object === null) {return 'null';}
      if (typeof object == "string") {
        var useDoubleQuotes = arguments[1];
        var escapedString = this.gsub(object, /[\x00-\x1f\\]/, function(match) {
          var character = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '\\': '\\\\'
          }[match[0]];
          return character ? character : '\\u00' + JsUnitTest.toHexString(match[0].charCodeAt());
        });
        if (useDoubleQuotes) {return '"' + escapedString.replace(/"/g, '\\"') + '"';}
        return "'" + escapedString.replace(/'/g, '\\\'') + "'";
      }
			if (JsUnitTest.getClass(object) === 'Object') {
        var keys_values = new Array(), prefix = 'Object: { ';
        for (property in object) {
          keys_values.push(property + ': ' + object[property]);
        }
        return (prefix + keys_values.join(', ') + ' }');
      }
      return String(object);
    } catch (e) {
      if (e instanceof RangeError) {return '...';}
      throw e;
    }
  },

  getClass: function(object)
  {
      /// <summary>
      ///
      /// </summary>

      /// <param name="object" type="Object"></param>
      /// <returns type="String"></returns>

    return Object.prototype.toString.call(object)
     .match(/^\[object\s(.*)\]$/)[1]; 
  },

  $: function(element)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="element" type="String">Id(d) of dom elements</param>
      /// <returns domElement="true"></returns>
      
    if (arguments.length > 1) {
      for (var i = 0, elements = [], length = arguments.length; i < length; i++) {
        elements.push(this.$(arguments[i]));
      }
      return elements;
    }
    if (typeof element == "string") {
      element = document.getElementById(element);
    }
    return element;
  },

  gsub: function(source, pattern, replacement)
  {
      /// <summary>
      ///
      /// </summary>

      /// <param name="source" type=""></param>
      /// <param name="pattern" type=""></param>
      /// <param name="replacement" type=""></param>

      /// <returns type=""></returns>

    var result = '', match;
    replacement = arguments.callee.prepareReplacement(replacement);

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += JsUnitTest.String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  },
  scan: function(source, pattern, iterator)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="source" type=""></param>
      /// <param name="pattern" type=""></param>
      /// <param name="iterator" type=""></param>

      /// <returns type=""></returns>

    this.gsub(source, pattern, iterator);
    return String(source);
  },
  escapeHTML: function(data)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="data" type=""></param>
      /// <returns type=""></returns>
    return data.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },
  toHexString: function(n)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="n" type="Number"></param>
      /// <returns type="String"></returns>
      
    var string = n.toString(16);
    return '00'.substring(string.length) + string;
  },
  arrayfromargs: function(args)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="args" type="arguments"></param>
      /// <returns type=""></returns>
  	var myarray = new Array();
  	var i;

  	for (i=0;i<args.length;i++) {
  	  myarray[i] = args[i];
  	}

  	return myarray;
  },
  
  // from now we recursively zip & compare nested arrays
  areArraysEqual: function(expected, actual)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="" type=""></param>
      /// <returns type=""></returns>
      
    var expected_array = JsUnitTest.flattenArray(expected);
    var actual_array   = JsUnitTest.flattenArray(actual);
    if (expected_array.length == actual_array.length) {
      for (var i=0; i < expected_array.length; i++) {
        if (expected_array[i] != actual_array[i]) {return false;}
      }
      return true;
    }
    return false;
  },

  areArraysNotEqual: function(expected, actual)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="" type=""></param>
      /// <returns type=""></returns>
      
    return !this.areArraysEqual(expected, actual);
  },

  areHashesEqual: function(expected, actual)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="" type=""></param>
      /// <returns type=""></returns>
      
    var expected_array = JsUnitTest.hashToSortedArray(expected);
    var actual_array   = JsUnitTest.hashToSortedArray(actual);
    return this.areArraysEqual(expected_array, actual_array);
  },

  areHashesNotEqual: function(expected, actual)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="" type=""></param>
      /// <returns type=""></returns>
      
    return !this.areHashesEqual(expected, actual);
  },

  hashToSortedArray: function(hash)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="hash" type="Object"></param>
      /// <returns type=""></returns>

    var results = [];
    for (key in hash) {
      results.push([key, hash[key]]);
    }
    return results.sort();
  },
  flattenArray: function(array)
  {
      /// <summary>
      /// 
      /// </summary>
      /// <param name="array" type="Array"></param>
      /// <returns type="Array"></returns>

    var results = arguments[1] || [];
    for (var i=0; i < array.length; i++) {
      var object = array[i];
      if (object != null && typeof object == "object" &&
        'splice' in object && 'join' in object) {
          this.flattenArray(object, results);
      } else {
        results.push(object);
      }
    }
    return results;
  },
  selectorMatch: function(expression, element)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="expression" type=""></param>
      /// <param name="element" domElement="true"></param>
      /// <returns type=""></returns>

    var tokens = [];
    var patterns = {
      // combinators must be listed first
      // (and descendant needs to be last combinator)
      laterSibling: /^\s*~\s*/,
      child:        /^\s*>\s*/,
      adjacent:     /^\s*\+\s*/,
      descendant:   /^\s/,

      // selectors follow
      tagName:      /^\s*(\*|[\w\-]+)(\b|$)?/,
      id:           /^#([\w\-\*]+)(\b|$)/,
      className:    /^\.([\w\-\*]+)(\b|$)/,
      pseudo:
  /^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/,
      attrPresence: /^\[((?:[\w]+:)?[\w]+)\]/,
      attr:         /\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/
    };

    var assertions = {
    tagName: function(element, matches)
    {
        /// <summary>
        ///
        /// </summary>
        /// <param name="" type=""></param>
        /// <returns type=""></returns>

        return matches[1].toUpperCase() == element.tagName.toUpperCase();
      },

      className: function(element, matches)
      {
          /// <summary>
          ///
          /// </summary>
          /// <param name="" type=""></param>
          /// <returns type=""></returns>
        return Element.hasClassName(element, matches[1]);
      },

      id: function(element, matches)
      {
          /// <summary>
          ///
          /// </summary>
          /// <param name="" type=""></param>
          /// <returns type=""></returns>
        return element.id === matches[1];
      },

      attrPresence: function(element, matches)
      {
          /// <summary>
          ///
          /// </summary>
          /// <param name="" type=""></param>
          /// <returns type=""></returns>
        return Element.hasAttribute(element, matches[1]);
      },

      attr: function(element, matches)
      {
          /// <summary>
          ///
          /// </summary>
          /// <param name="" type=""></param>
          /// <returns type=""></returns>
        var nodeValue = Element.readAttribute(element, matches[1]);
        return nodeValue && operators[matches[2]](nodeValue, matches[5] || matches[6]);
      }
    };
    var e = this.expression, ps = patterns, as = assertions;
    var le, p, m;

    while (e && le !== e && (/\S/).test(e)) {
      le = e;
      for (var i in ps) {
        p = ps[i];
        if (m = e.match(p)) {
          // use the Selector.assertions methods unless the selector
          // is too complex.
          if (as[i]) {
            tokens.push([i, Object.clone(m)]);
            e = e.replace(m[0], '');
          }
        }
      }
    }

    var match = true, name, matches;
    for (var i = 0, token; token = tokens[i]; i++) {
      name = token[0]; matches = token[1];
      if (!assertions[name](element, matches)) {
        match = false; break;
      }
    }

    return match;
  },

  toQueryParams: function(query, separator)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="query_in" type="String"></param>
      /// <param name="separator" type="String"></param>
      /// <returns type=""></returns>

    var query = query || window.location.search;
    var match = query.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/);
    if (!match) {return { };}

    var hash = {};
    var parts = match[1].split(separator || '&');
    for (var i=0; i < parts.length; i++) {
      var pair = parts[i].split('=');
      if (pair[0]) {
        var key = decodeURIComponent(pair.shift());
        var value = pair.length > 1 ? pair.join('=') : pair[0];
        if (value != undefined) {value = decodeURIComponent(value);}

        if (key in hash) {
          var object = hash[key];
          var isArray = object != null && typeof object == "object" &&
            'splice' in object && 'join' in object;
          if (!isArray) {hash[key] = [hash[key]];}
          hash[key].push(value);
        }
        else {
          hash[key] = value;
        }
      }
    }
    return hash;
  },

  String: {

  interpret: function(value)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="value" type="Object"></param>
      /// <returns type="String"></returns>

      return value == null ? '' : String(value);
    }
  }
};

JsUnitTest.gsub.prepareReplacement = function(replacement)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="replacement" type="Object"></param>
    /// <returns type="Function"></returns>

  if (typeof replacement == "function") {return replacement;}
  var template = new Template(replacement);
  return function(match) { return template.evaluate(match); };
};
