JsUnitTest.Unit.Options = function(testLog, title, append, resultsURL)
{
    /// <summary>
    ///
    /// </summary>
    /// <param name="testLog" domElement="true"></param>
    /// <param name="title" type="String"></param>
    /// <param name="append" type="Boolean"></param>
    /// <param name="resultsURL" type="String"></param>
    /// <field name="testLog" domElement="true"></field>
    /// <field name="title" type="String"></field>
    /// <field name="append" type="Boolean"></field>
    /// <field name="resultsURL" type="String"></field>
    /// <returns type="JsUnitTest.Unit.Options"></returns>
    /// <remarks>Sky added constructor for results</remarks>
    this.testLog = testLog;
    this.resultsURL = resultsURL;
    this.title = title;
    this.append = append;
}