JsUnitTest.Unit.Assertions = {
buildMessage: function(message, template)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="message" type="String"></param>
    /// <param name="template" type="">TODO</param>

    var args = JsUnitTest.arrayfromargs(arguments).slice(2);
    return (message ? message + '\n' : '') + 
      new JsUnitTest.Unit.MessageTemplate(template).evaluate(args);
  },

  flunk: function(message)
  {
      /// <summary>
      /// fails test with message.
      /// </summary>
      /// <param name="message" type="String"></param>

    this.assertBlock(message || 'Flunked', function() { return false; });
  },

  assertBlock: function(message, block)
  {
      /// <summary>
      /// calls block(this)
      /// </summary>
      /// <param name="message" type="String"></param>
      /// <param name="block" type="Function"></param>
    try {
      block.call(this) ? this.pass() : this.fail(message);
    } catch(e) { this.error(e); }
  },

  assert: function(expression, message)
  {
      /// <summary>
      /// 
      /// </summary>
      /// <param name="message" type="String"></param>
      /// <param name="expression" type="Boolean"></param>
      
    message = this.buildMessage(message || 'assert', 'got <?>', expression);
    this.assertBlock(message, function() { return expression; });
  },

  assertEqual: function(expected, actual, message)
  {
      /// <summary>
      /// applies '==' operator to operands.
      /// </summary>
      /// <param name="expected" type="Object"></param>
      /// <param name="actual" type="Object"></param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertEqual', 'expected <?>, actual: <?>', expected, actual);
    this.assertBlock(message, function() { return expected == actual; });
  },

  assertNotEqual: function(expected, actual, message)
  {
      /// <summary>
      /// applies '!=' operator to operands.
      /// </summary>
      /// <param name="expected" type="Object"></param>
      /// <param name="actual" type="Object"></param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertNotEqual', 'expected <?>, actual: <?>', expected, actual);
    this.assertBlock(message, function() { return expected != actual; });
  },

  assertEnumEqual: function(expected, actual, message)
  {
      /// <summary>
      /// Applies '==' to a pair of Numbers or a pair of Array of Numbers
      /// </summary>
      /// <param name="expected" type="Number">A Number or Array of Numbers</param>
      /// <param name="actual" type="Number">A Number or Array of Numbers</param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertEnumEqual', 'expected <?>, actual: <?>', expected, actual);
    this.assertBlock(message, function() { return JsUnitTest.areArraysEqual(expected, actual); });
  },

  assertEnumNotEqual: function(expected, actual, message)
  {
      /// <summary>
      /// Applies '!=' to a pair of Numbers or a pair of Array of Numbers
      /// </summary>
      /// <param name="expected" type="Number">A Number or Array of Numbers</param>
      /// <param name="actual" type="Number">A Number or Array of Numbers</param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertEnumNotEqual', '<?> was the same as <?>', expected, actual);
    this.assertBlock(message, function() { return JsUnitTest.areArraysNotEqual(expected, actual); });
  },

  assertHashEqual: function(expected, actual, message)
  {
      /// <summary>
      /// applies '==' to properties of operands
      /// </summary>
      /// <param name="expected" type="Object"></param>
      /// <param name="actual" type="Object"></param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertHashEqual', 'expected <?>, actual: <?>', JsUnitTest.inspect(expected), JsUnitTest.inspect(actual));
    this.assertBlock(message, function() { return JsUnitTest.areHashesEqual(expected, actual); });
  },

  assertHashNotEqual: function(expected, actual, message)
  {
      /// <summary>
      /// applies '!=' to properties of operands
      /// </summary>
      /// <param name="expected" type="Object"></param>
      /// <param name="actual" type="Object"></param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertHashNotEqual', '<?> was the same as <?>', JsUnitTest.inspect(expected), JsUnitTest.inspect(actual));
    this.assertBlock(message, function() { return JsUnitTest.areHashesNotEqual(expected, actual); });
  },

  assertIdentical: function(expected, actual, message)
  {
      /// <summary>
      /// applies '===' to operands
      /// </summary>
      /// <param name="expected" type="Object"></param>
      /// <param name="actual" type="Object"></param>
      /// <param name="message" type="String"></param>


    message = this.buildMessage(message || 'assertIdentical', 'expected <?>, actual: <?>', expected, actual);
    this.assertBlock(message, function() { return expected === actual; });
  },

  assertNotIdentical: function(expected, actual, message)
  {
      /// <summary>
      /// applies '!==' to operands
      /// </summary>
      /// <param name="expected" type="Object"></param>
      /// <param name="actual" type="Object"></param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertNotIdentical', 'expected <?>, actual: <?>', expected, actual);
    this.assertBlock(message, function() { return expected !== actual; });
  },

  assertNull: function(obj, message)
  {
      /// <summary>
      /// applies '=== null' to obj
      /// </summary>
      /// <param name="obj" type="Object"></param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertNull', 'got <?>', obj);
    this.assertBlock(message, function() { return obj === null; });
  },

  assertNotNull: function(obj, message)
  {
      /// <summary>
      /// applies '!== null' to obj
      /// </summary>
      /// <param name="obj" type="Object"></param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertNotNull', 'got <?>', obj);
    this.assertBlock(message, function() { return obj !== null; });
  },

  assertUndefined: function(obj, message)
  {
      /// <summary>
      /// applies 'typeof obj == "undefined"' to obj
      /// </summary>
      /// <param name="obj" type="Object"></param>
      /// <param name="message" type="String"></param>

    message = this.buildMessage(message || 'assertUndefined', 'got <?>', obj);
    this.assertBlock(message, function() { return typeof obj == "undefined"; });
  },

  assertNotUndefined: function(obj, message)
  {
      /// <summary>
      /// applies 'typeof obj != "undefined"' to obj
      /// </summary>
      /// <param name="obj" type="Object"></param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertNotUndefined', 'got <?>', obj);
    this.assertBlock(message, function() { return typeof obj != "undefined"; });
  },

  assertNullOrUndefined: function(obj, message)
  {
      /// <summary>
      /// applies '(typeof obj == "undefined") || obj == null' to obj
      /// </summary>
      /// <param name="obj" type="Object"></param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertNullOrUndefined', 'got <?>', obj);
    this.assertBlock(message, function() { return obj == null; });
  },

  assertNotNullOrUndefined: function(obj, message)
  {
      /// <summary>
      /// applies '(typeof obj != "undefined")  && obj != null' to obj
      /// </summary>
      /// <param name="obj" type="Object"></param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertNotNullOrUndefined', 'got <?>', obj);
    this.assertBlock(message, function() { return obj != null; });
  },

  assertMatch: function(expected, actual, message)
  {
      /// <summary>
      /// Executes expected regex against actual string
      /// </summary>
      /// <param name="expected" type="String">Regular expression (or RegExp?)</param>
      /// <param name="actual" type="String">String to match</param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertMatch', 'regex <?> did not match <?>', expected, actual);
    this.assertBlock(message, function() { return new RegExp(expected).exec(actual); });
  },

  assertNoMatch: function(expected, actual, message)
  {
      /// <summary>
      /// Executes expected regex against actual string
      /// </summary>
      /// <param name="expected" type="String">Regular expression (or RegExp?)</param>
      /// <param name="actual" type="String">String to match</param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertNoMatch', 'regex <?> matched <?>', expected, actual);
    this.assertBlock(message, function() { return !(new RegExp(expected).exec(actual)); });
  },

  assertHasClass: function(element, klass, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="element" domElement="true"></param>
      /// <param name="klass" type="String"></param>
      /// <param name="message" type="String"></param>    

    element = JsUnitTest.$(element);
    message = this.buildMessage(message || 'assertHasClass', '? doesn\'t have class <?>.', element, klass);
    this.assertBlock(message, function() {
      var elementClassName = element.className;
      return (elementClassName.length > 0 && (elementClassName == klass ||
        new RegExp("(^|\\s)" + klass + "(\\s|$)").test(elementClassName)));
      // return !!element.className.match(new RegExp(klass))
    });
  },

  assertNotHasClass: function(element, klass, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="element" domElement="true"></param>
      /// <param name="klass" type="String"></param>
      /// <param name="message" type="String"></param>    

    element = JsUnitTest.$(element);
    message = this.buildMessage(message || 'assertNotHasClass', '? does have class <?>.', element, klass);
    this.assertBlock(message, function() {
      var elementClassName = element.className;
      return !(elementClassName.length > 0 && (elementClassName == klass ||
        new RegExp("(^|\\s)" + klass + "(\\s|$)").test(elementClassName)));
    });
  },

  assertHidden: function(element, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="element" domElement="true"></param>
      /// <param name="message" type="String"></param>    

    element = JsUnitTest.$(element);
    message = this.buildMessage(message || 'assertHidden', '? isn\'t hidden.', element);
    this.assertBlock(message, function() { return !element.style.display || element.style.display == 'none'; });
  },

  assertInstanceOf: function(expected, actual, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="expected" type="Object"></param>
      /// <param name="actual" type="Object"></param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertInstanceOf', '<?> was not an instance of the expected type', actual);
    this.assertBlock(message, function() { return actual instanceof expected; });
  },

  assertNotInstanceOf: function(expected, actual, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="expected" type="Object"></param>
      /// <param name="actual" type="Object"></param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertNotInstanceOf', '<?> was an instance of the expected type', actual);
    this.assertBlock(message, function() { return !(actual instanceof expected); });
  },

  assertRespondsTo: function(method, obj, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="method" type="String">the name of expected function</param>
      /// <param name="obj" type="Object"></param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertRespondsTo', 'object doesn\'t respond to <?>', method);
    this.assertBlock(message, function() { return (method in obj && typeof obj[method] == 'function'); });
  },

  assertRaise: function(exceptionName, method, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="exceptionName" type="String"></param>
      /// <param name="method" type="Function">the function to call.</param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message || 'assertRaise', '<?> exception expected but none was raised', exceptionName);
    var block = function() {
      try { 
        method();
        return false;
      } catch(e) {
        if (e.name == exceptionName) {return true;}
        else {throw e;}
      }
    };
    this.assertBlock(message, block);
  },

  assertNothingRaised: function(method, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="method" type="Function">the function to call</param>
      /// <param name="message" type="String"></param>            

    try { 
      method();
      this.assert(true, "Expected nothing to be thrown");
    } catch(e) {
      message = this.buildMessage(message || 'assertNothingRaised', '<?> was thrown when nothing was expected.', e);
      this.flunk(message);
    }
  },

  _isVisible: function(element)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="element" domElement="true"></param>

    element = JsUnitTest.$(element);
    if(!element.parentNode) {return true;}
    this.assertNotNull(element);
    if(element.style && (element.style.display == 'none')) {
      return false;
    }
    
    return arguments.callee.call(this, element.parentNode);
  },

  assertVisible: function(element, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="element" domElement="true"></param>
      /// <param name="message" type="String"></param>            

    message = this.buildMessage(message, '? was not visible.', element);
    this.assertBlock(message, function() { return this._isVisible(element); });
  },

  assertNotVisible: function(element, message)
  {
      /// <summary>
      ///
      /// </summary>
      /// <param name="element" domElement="true"></param>
      /// <param name="message" type="String"></param>    

    message = this.buildMessage(message, '? was not hidden and didn\'t have a hidden parent either.', element);
    this.assertBlock(message, function() { return !this._isVisible(element); });
  },

  assertElementsMatch: function()
  {
      /// <summary>
      /// Compares elements pass as parameter array
      /// </summary>

    var pass = true, expressions = JsUnitTest.arrayfromargs(arguments);
    var elements = expressions.shift();
    if (elements.length != expressions.length) {
      message = this.buildMessage('assertElementsMatch', 'size mismatch: ? elements, ? expressions (?).', elements.length, expressions.length, expressions);
      this.flunk(message);
      pass = false;
    }
    for (var i=0; i < expressions.length; i++) {
      var expression = expressions[i];
      var element    = JsUnitTest.$(elements[i]);
      if (JsUnitTest.selectorMatch(expression, element)) {
        pass = true;
        break;
      }
      message = this.buildMessage('assertElementsMatch', 'In index <?>: expected <?> but got ?', index, expression, element);
      this.flunk(message);
      pass = false;
    }
    this.assert(pass, "Expected all elements to match.");
  },

  assertElementMatches: function(element, expression, message)
  {
      /// <summary>
      /// TODO: not sure how this works yet
      /// </summary>
      /// <param name="element" domElement="true"></param>
      /// <param name="expression" type=""></param>
      /// <param name="message" type="String"></param>    
      
    this.assertElementsMatch([element], expression);
  }
};
