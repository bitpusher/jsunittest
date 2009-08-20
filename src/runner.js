JsUnitTest.Unit.Runner = function(testcases, options)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="testcases" type="Object"></param>
    /// <param name="options" type="JsUnitTest.Unit.Options" optional="true">Optional. options. see redundant.</param>
    /// <returns type="JsUnitTest.Unit.Runner"></returns>

    /// <field name="options" type="JsUnitTest.Unit.Options"></field>
    /// <field name="currentTest" type="Number" integer="true"></field>
    /// <field name="logger" type="JsUnitTest.Unit.Logger"></field>
    /// <field name="tests" type="Object"></field>
    /// <remarks>Sky added and options constructor and a few fields to options </remarks>

    var argumentOptions = arguments[1] || {};
    var options = this.options = {};
    options.testLog = ('testLog' in argumentOptions) ? argumentOptions.testLog : 'testlog';
    options.resultsURL = this.queryParams.resultsURL;
    options.testLog = JsUnitTest.$(options.testLog);

    this.tests = this.getTests(testcases);
    this.currentTest = 0;

    //SKY
    this.logger = new JsUnitTest.Unit.Logger(options.testLog, options.title, options.append);

    var self = this;
    JsUnitTest.Event.addEvent(window, "load", function()
    {
        setTimeout(function()
        {
            self.runTests();
        }, 0.1);
    });
};

JsUnitTest.Unit.Runner.prototype.queryParams = JsUnitTest.toQueryParams();

JsUnitTest.Unit.Runner.prototype.portNumber = function()
{
    /// <summary>
    ///
    /// </summary>
    /// <returns type="Number" integer="true">Port number, if any, of the current request</returns>

    if (window.location.search.length > 0)
    {
        var matches = window.location.search.match(/\:(\d{3,5})\//);
        if (matches)
        {
            return parseInt(matches[1], 10);
        }
    }
    return null;
};

JsUnitTest.Unit.Runner.prototype.getTests = function(testcases)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="testcases" type="Object">
    /// Associative array of functions passed to the constructor of JsUnitTest.Unit.Runner.
    /// </param>
    /// <returns type="Array"></returns>

    var tests = [], options = this.options;
    if (this.queryParams.tests) { tests = this.queryParams.tests.split(','); }
    else if (options.tests) { tests = options.tests; }
    else if (options.test) { tests = [option.test]; }
    else
    {
        for (testname in testcases)
        {
            if (testname.match(/^test/)) { tests.push(testname); }
        }
    }
    var results = [];
    for (var i = 0; i < tests.length; i++)
    {
        var test = tests[i];
        if (testcases[test])
        {
            results.push(
        new JsUnitTest.Unit.Testcase(test, testcases[test], testcases.setup, testcases.teardown)
      );
        }
    }
    return results;
};

JsUnitTest.Unit.Runner.prototype.getResult = function()
{
    /// <summary>
    ///
    /// </summary>
    /// <returns type="JsUnitTest.Unit.Results"></returns>
    /// <remarks>Sky added results constructor</remarks>

    var results = new JsUnitTest.Unit.Results(this.tests.length);

    for (var i = 0; i < this.tests.length; i++)
    {
        var test = this.tests[i];
        results.assertions += test.assertions;
        results.failures += test.failures;
        results.errors += test.errors;
        results.warnings += test.warnings;
    };
    return results;
};

JsUnitTest.Unit.Runner.prototype.postResults = function()
{
    /// <summary>
    ///
    /// </summary>

    if (this.options.resultsURL)
    {
        // new Ajax.Request(this.options.resultsURL, 
        //   { method: 'get', parameters: this.getResult(), asynchronous: false });
        var results = this.getResult();
        var url = this.options.resultsURL + "?";
        url += "tests=" + this.tests.length + "&";
        url += "assertions=" + results.assertions + "&";
        url += "warnings=" + results.warnings + "&";
        url += "failures=" + results.failures + "&";
        url += "errors=" + results.errors;
        JsUnitTest.ajax({
            url: url,
            type: 'GET'
        });
    }
};

JsUnitTest.Unit.Runner.prototype.runTests = function()
{
    /// <summary>
    ///
    /// </summary>

    var test = this.tests[this.currentTest], actions;

    if (!test) { return this.finish(); }
    if (!test.isWaiting) { this.logger.start(test.name); }
    test.run();
    var self = this;
    if (test.isWaiting)
    {
        this.logger.message("Waiting for " + test.timeToWait + "ms");
        // setTimeout(this.runTests.bind(this), test.timeToWait || 1000);
        setTimeout(function()
        {
            self.runTests();
        }, test.timeToWait || 1000);
        return;
    }

    this.logger.finish(test.status(), test.summary());
    if (actions = test.actions) { this.logger.appendActionButtons(actions); }
    this.currentTest++;
    // tail recursive, hopefully the browser will skip the stackframe
    this.runTests();
};

JsUnitTest.Unit.Runner.prototype.finish = function()
{
    /// <summary>
    ///
    /// </summary>

    this.postResults();
    this.logger.summary(this.summary());
};

JsUnitTest.Unit.Runner.prototype.summary = function()
{
    /// <summary>
    ///
    /// </summary>
    /// <returns type="JsUnitTest.Template"></returns>

    return new JsUnitTest.Template('#{tests} tests, #{assertions} assertions, #{failures} failures, #{errors} errors, #{warnings} warnings').evaluate(this.getResult());
};


JsUnitTest.Unit.Results = function(tests)
{
    /// <summary>
    ///
    /// </summary>
    /// <field name="tests" type="Number" integer="true"></field>
    /// <field name="assertions" type="Number" integer="true"></field>
    /// <field name="failures" type="Number" integer="true"></field>
    /// <field name="errors" type="Number" integer="true"></field>
    /// <field name="warnings" type="Number" integer="true"></field>
    /// <returns type="JsUnitTest.Unit.Results"></returns>
    this.tests = tests || 0;
    this.assertions = 0;
    this.failures = 0;
    this.errors = 0;
    this.warnings = 0;
}

