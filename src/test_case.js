JsUnitTest.Unit.Testcase = function(name, test, setup, teardown)
{
    /// <summary>
    /// Testcase constructor. hacked overload-->
    /// Invoked as a function with a function as the first arg (name) 
    /// behaves as a Visual Studio Intellisense casting helper wrapper 
    /// and forces VS to apply TestCase context to the test function.
    /// e.g.
    /// var that = Test.Unit.Testcase(this);
    /// </summary>
    /// <param name="name" type="String">The name of the test.</param>
    /// <param name="test" type="">function()</param>
    /// <param name="setup" type="">function()</param>
    /// <param name="teardown" type="Function">function()</param>

    /// <field name="name" type="String"></field>
    /// <field name="test" type="">function()</field>
    /// <field name="setup" type="">function()</field>
    /// <field name="teardown" type="Function">function()</field>
    /// <field name="messages" type="Array"></field>
    /// <field name="actions" type="Object"></field>
    /// <returns type="JsUnitTest.Unit.Testcase"></returns>

    if (name && (typeof (name) != 'string'))
    {
        // vs intellisense helper;
        return name;
    };
    
    this.name = name;
    this.test = test || function() { };
    this.setup = setup || function() { };
    this.teardown = teardown || function() { };
    this.messages = [];
    this.actions = {};
};
// import JsUnitTest.Unit.Assertions

for (method in JsUnitTest.Unit.Assertions)
{
    JsUnitTest.Unit.Testcase.prototype[method] = JsUnitTest.Unit.Assertions[method];
}

JsUnitTest.Unit.Testcase.prototype.isWaiting = false;
JsUnitTest.Unit.Testcase.prototype.timeToWait = 1000;
JsUnitTest.Unit.Testcase.prototype.assertions = 0;
JsUnitTest.Unit.Testcase.prototype.failures = 0;
JsUnitTest.Unit.Testcase.prototype.errors = 0;
JsUnitTest.Unit.Testcase.prototype.warnings = 0;
JsUnitTest.Unit.Testcase.prototype.isRunningFromRake = window.location.port;

// JsUnitTest.Unit.Testcase.prototype.isRunningFromRake = window.location.port == 4711;

JsUnitTest.Unit.Testcase.prototype.wait = function(time, nextPart)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="time" type="Number" integer="true">ms</param>
    /// <param name="nextPart" type="Function"></param>

    this.isWaiting = true;
    this.test = nextPart;
    this.timeToWait = time;
};

JsUnitTest.Unit.Testcase.prototype.run = function(rethrow)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="rethrow" type="Boolean"></param>

    try
    {
        try
        {
            if (!this.isWaiting) { this.setup(); }
            this.isWaiting = false;
            this.test();
        } finally
        {
            if (!this.isWaiting)
            {
                this.teardown();
            }
        }
    }
    catch (e)
    {
        if (rethrow) { throw e; }
        this.error(e, this);
    }
};

JsUnitTest.Unit.Testcase.prototype.summary = function()
{
    /// <summary>
    ///
    /// </summary>

    var msg = '#{assertions} assertions, #{failures} failures, #{errors} errors, #{warnings} warnings\n';
    return new JsUnitTest.Template(msg).evaluate(this) +
    this.messages.join("\n");
};

JsUnitTest.Unit.Testcase.prototype.pass = function()
{
    /// <summary>
    ///
    /// </summary>

    this.assertions++;
};

JsUnitTest.Unit.Testcase.prototype.fail = function(message)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="message" type="String"></param>

    this.failures++;
    var line = "";
    try
    {
        throw new Error("stack");
    } catch (e)
    {
        line = (/\.html:(\d+)/.exec(e.stack || '') || ['', ''])[1];
    }
    this.messages.push("Failure: " + message + (line ? " Line #" + line : ""));
};

JsUnitTest.Unit.Testcase.prototype.warning = function(message)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="message" type="String"></param>

    this.warnings++;
    var line = "";
    try
    {
        throw new Error("stack");
    } catch (e)
    {
        line = (/\.html:(\d+)/.exec(e.stack || '') || ['', ''])[1];
    }
    this.messages.push("Warning: " + message + (line ? " Line #" + line : ""));
};
JsUnitTest.Unit.Testcase.prototype.warn = JsUnitTest.Unit.Testcase.prototype.warning;

JsUnitTest.Unit.Testcase.prototype.info = function(message)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="message" type="String"></param>

    this.messages.push("Info: " + message);
};

JsUnitTest.Unit.Testcase.prototype.error = function(error, test)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="error" type="Error"></param>
    /// <param name="test" type="JsUnitTest.Unit.Testcase"></param>

    this.errors++;
    this.actions['retry with throw'] = function() { test.run(true); };
    this.messages.push(error.name + ": " + error.message + "(" + JsUnitTest.inspect(error) + ")");
    if (typeof console != "undefined" && console.error)
    {
        console.error("Test '" + test.name + "' died, exception and test follows");
        console.error(error);
        console.error(test.test.toString());
    }
};

JsUnitTest.Unit.Testcase.prototype.status = function()
{
    /// <summary>
    ///
    /// </summary>
    /// <returns type="String"></returns>

    if (this.failures > 0) { return 'failed'; }
    if (this.errors > 0) { return 'error'; }
    if (this.warnings > 0) { return 'warning'; }
    return 'passed';
};

JsUnitTest.Unit.Testcase.prototype.benchmark = function(operation, iterations)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="operation" type="Function"></param>
    /// <param name="iterations" type="Number" integer="true"></param>

    /// <field name="" type=""></field>
    /// <returns type="Date">TestCase duration</returns>

    var startAt = new Date();
    (iterations || 1).times(operation);
    var timeTaken = ((new Date()) - startAt);
    this.info((arguments[2] || 'Operation') + ' finished ' +
     iterations + ' iterations in ' + (timeTaken / 1000) + 's');
    return timeTaken;
};
