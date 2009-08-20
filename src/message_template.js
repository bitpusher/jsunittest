JsUnitTest.Unit.MessageTemplate = function(string)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="string" type="String"></param>
    /// <returns type="Array"></returns>

  var parts = [];
  var str = JsUnitTest.scan((string || ''), /(?=[^\\])\?|(?:\\\?|[^\?])+/, function(part) {
    parts.push(part[0]);
  });
  this.parts = parts;
};

JsUnitTest.Unit.MessageTemplate.prototype.evaluate = function(params)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="params" type="Array"></param>
    /// <returns type="String"></returns>

  var results = [];
  for (var i=0; i < this.parts.length; i++) {
    var part = this.parts[i];
    var result = (part == '?') ? JsUnitTest.inspect(params.shift()) : part.replace(/\\\?/, '?');
    results.push(result);
  }
  return results.join('');
};
