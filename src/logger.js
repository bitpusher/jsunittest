JsUnitTest.Unit.Logger = function(element, title, append)
{

    /// <summary>
    ///
    /// </summary>
    /// <param name="element" type="String">Logger element ID (or element reference)</param>
    /// <param name="title" type="String">Title for Logger</param>
    /// <param name="append" type="Boolean">if true, create child div for Logger.</param>
    /// <field name="element" domElement="true"></field>
    /// <returns type="JsUnitTest.Unit.Logger"></returns>
    /// <remarks>Sky added title and append args - see _createLogTable</remarks>

    /// <todo>abstract this class to enable multiple logger plug-ins for reporting results</todo>


  this.element = JsUnitTest.$(element);
  if (this.element) this._createLogTable(title, append);
};

JsUnitTest.Unit.Logger.prototype.start = function(testName)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="testName" type="String"></param>

  if (!this.element) {return;}
  var tbody = this.element.getElementsByTagName('tbody')[0];
  
  var tr = document.createElement('tr');
  var td;
  
  //testname
  td = document.createElement('td');
  td.appendChild(document.createTextNode(testName));
  tr.appendChild(td);
  
  tr.appendChild(document.createElement('td'));//status
  tr.appendChild(document.createElement('td'));//message
  
  tbody.appendChild(tr);
};

JsUnitTest.Unit.Logger.prototype.setStatus = function(status)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="status" type="String"></param>

  var logline = this.getLastLogLine();
  logline.className = status;
  var statusCell = logline.getElementsByTagName('td')[1];
  statusCell.appendChild(document.createTextNode(status));
};

JsUnitTest.Unit.Logger.prototype.finish = function(status, summary)
{
    /// <summary>
    ///
    /// </summary>

    /// <param name="status" type="String"></param>
    /// <param name="summary" type="String"></param>
  if (!this.element) {return;}
  this.setStatus(status);
  this.message(summary);
};

JsUnitTest.Unit.Logger.prototype.message = function(message)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="message" type="String"></param>

  if (!this.element) {return;}
  var cell = this.getMessageCell();
  
  // cell.appendChild(document.createTextNode(this._toHTML(message)));
  cell.innerHTML = this._toHTML(message);
};

JsUnitTest.Unit.Logger.prototype.summary = function(summary)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="summary" type="String"></param>

  if (!this.element) {return;}
  var div = this.element.getElementsByTagName('div')[0];
  div.innerHTML = this._toHTML(summary);
};

JsUnitTest.Unit.Logger.prototype.getLastLogLine = function()
{
    /// <summary>
    ///
    /// </summary>
    /// <returns type="String"></returns>

  var tbody = this.element.getElementsByTagName('tbody')[0];
  var loglines = tbody.getElementsByTagName('tr');
  return loglines[loglines.length - 1];
};

JsUnitTest.Unit.Logger.prototype.getMessageCell = function()
{
    /// <summary>
    ///
    /// </summary>
    /// <returns domElement="true">table cell</returns>

  var logline = this.getLastLogLine();
  return logline.getElementsByTagName('td')[2];
};

JsUnitTest.Unit.Logger.prototype._createLogTable = function(title, append)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="title" type="String">Title for Logger</param>
    /// <param name="append" type="Boolean">if true, create child div for Logger.</param>
    /// <remarks>Sky added title and append args</remarks>
    /// <todo>change h3 to a classified div</todo>
    if (append)
    {
        this.element = this.element.appendChild(top.document.createElement("div"));
    }

    var html = (title ? '<h3>' + title + '</h3>' : '') +
        '<div class="logsummary">running...</div>' +
        '<table class="logtable">' +
        '<thead><tr><th>Status</th><th>Test</th><th>Message</th></tr></thead>' +
        '<tbody class="loglines"></tbody>' +
        '</table>';
    this.element.innerHTML = html;
};

JsUnitTest.Unit.Logger.prototype.appendActionButtons = function(actions)
{
    /// <summary>
    /// Appears to be NOOP
    /// </summary>
    /// <param name="actions" type="Object"></param>

  // actions = $H(actions);
  // if (!actions.any()) return;
  // var div = new Element("div", {className: 'action_buttons'});
  // actions.inject(div, function(container, action) {
  //   var button = new Element("input").setValue(action.key).observe("click", action.value);
  //   button.type = "button";
  //   return container.insert(button);
  // });
  // this.getMessageCell().insert(div);
};

JsUnitTest.Unit.Logger.prototype._toHTML = function(txt)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="txt" type="String"></param>
    /// <returns type="String">HTML encoded txt</returns>

  return JsUnitTest.escapeHTML(txt).replace(/\n/g,"<br/>");
};

