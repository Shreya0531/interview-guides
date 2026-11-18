/* Common errors, causes and fixes. */
// m = error message, why = cause, fix = how to fix (HTML).
const ERRS = [
    {
        m: "Cannot resolve method 'given()'",
        why: "The static import is missing.",
        fix: "Add <code>import static io.restassured.RestAssured.*;</code>"
    },
    {
        m: "cannot find symbol: equalTo",
        why: "Hamcrest matchers are not imported.",
        fix: "Add <code>import static org.hamcrest.Matchers.*;</code>"
    },
    {
        m: "1 expectation failed. Expected status code &lt;200&gt; doesn't match actual status code &lt;401&gt;.",
        why: "The call worked, but the server did not accept your login.",
        fix: "Check the token or credentials. Maybe it expired. Print the response with <code>log().ifValidationFails()</code>."
    },
    {
        m: "JSON path books.title doesn't match. Expected: Clean Code, Actual: [Clean Code, Effective Java]",
        why: "The path returns a list but you compared it to one value.",
        fix: "Use <code>hasItem(\"Clean Code\")</code>, or pick one item: <code>books[0].title</code>."
    },
    {
        m: "Expected: &lt;32.5&gt; but: was &lt;32.5f&gt;",
        why: "The number is a float but you wrote a double.",
        fix: "Write <code>equalTo(32.5f)</code>."
    },
    {
        m: "IllegalStateException: Expected response body to be verified as JSON, HTML or XML but no content-type was defined in the response.",
        why: "The server did not send a Content-Type, or sent an error page.",
        fix: "Read the body with <code>log().body()</code>. If it is really JSON, add <code>RestAssured.defaultParser = Parser.JSON;</code>."
    },
    {
        m: "IllegalStateException: Cannot serialize object because no JSON serializer found in classpath",
        why: "You passed an object as the body, but Jackson or Gson is not in the pom.",
        fix: "Add <code>jackson-databind</code> and set <code>contentType(ContentType.JSON)</code>."
    },
    {
        m: "Invalid number of path parameters. Expected 1, was 0. Undefined path parameters are: id",
        why: "The path has <code>{id}</code> but you gave no value.",
        fix: "Add <code>pathParam(\"id\", 2)</code> or pass it: <code>get(\"/books/{id}\", 2)</code>."
    },
    {
        m: "415 Unsupported Media Type",
        why: "The server does not understand the body format. Usually the content type is missing.",
        fix: "Add <code>contentType(ContentType.JSON)</code>."
    },
    {
        m: "javax.net.ssl.SSLHandshakeException: PKIX path building failed",
        why: "The server certificate is not trusted (self-signed or company certificate).",
        fix: "For test servers: <code>relaxedHTTPSValidation()</code>. Better: add the certificate to the truststore."
    },
    {
        m: "java.net.UnknownHostException / Connection refused",
        why: "Wrong address, no internet or VPN, or the server is down.",
        fix: "Check <code>baseUri</code>, try it in a browser, check your VPN and the port."
    },
    {
        m: "ClassCastException: java.lang.Integer cannot be cast to java.lang.Long",
        why: "A JSON number came back as Integer, but your variable is long.",
        fix: "Use <code>jsonPath().getLong(\"id\")</code> or read as <code>Number</code>."
    },
    {
        m: "UnrecognizedPropertyException: Unrecognized field \"xyz\"",
        why: "The JSON has a field your Java class does not have.",
        fix: "Add the field, or put <code>@JsonIgnoreProperties(ignoreUnknown = true)</code> on the class."
    },
    {
        m: "NoSuchMethodError / Groovy version conflict",
        why: "Two different library versions are in the project (often Groovy or Hamcrest).",
        fix: "Run <code>mvn dependency:tree</code>, find the duplicate and exclude or align the version."
    },
    {
        m: "Test passes on my computer but fails in CI",
        why: "Different environment, data, timing or test order.",
        fix: "Check config and URLs per environment, make tests create their own data, remove order dependence, and read the CI log."
    }
];
