/* Line-by-line notes for the first test. */
// Each row is [code line, note shown when the line is clicked]. An empty line is a blank row.
const XL = {
    first: [
        ["package tests;", "The folder name of this class. Keep tests in their own package."],
        ["", ""],
        ["import org.testng.annotations.Test;", "Brings in the TestNG <b>@Test</b> annotation, which marks a method as a test."],
        ["import static io.restassured.RestAssured.*;", "Static import: lets you write <b>given()</b>, <b>get()</b> and so on with no prefix."],
        ["import static org.hamcrest.Matchers.*;", "Static import for matchers like <b>equalTo</b>, <b>hasItem</b>, <b>lessThan</b>."],
        ["", ""],
        ["public class FirstTest {", "A normal Java class. TestNG finds the tests inside it."],
        ["  @Test", "Tells TestNG: <b>run the next method as a test</b>."],
        ["  public void getPostReturns200() {", "A good test name says what you expect. Say it like a sentence."],
        ["    given()", "<b>GIVEN</b>: start describing the request."],
        ["      .baseUri(\"https://jsonplaceholder.typicode.com\")", "The server address. Only the part that never changes."],
        ["    .when()", "<b>WHEN</b>: now do something."],
        ["      .get(\"/posts/1\")", "Send a <b>GET</b> to <code>/posts/1</code>: read post number 1."],
        ["    .then()", "<b>THEN</b>: check what came back."],
        ["      .statusCode(200)", "The status must be <b>200</b> (OK). If not, the test fails."],
        ["      .body(\"id\", equalTo(1));", "The JSON field <b>id</b> must equal 1. The <b>;</b> ends the whole statement."],
        ["  }", ""],
        ["}", ""]
    ]
};
