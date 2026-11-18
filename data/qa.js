/* Interview questions and answers. */
// l = level (b basic, m medium, a advanced), q = question, a = answer as HTML.
const QA = [
    {
        l: "b",
        q: "What is REST Assured and why do you use it?",
        a: "<p>It is a Java library for testing REST APIs. I use it because the code is short and easy to read, it is just Java so I can reuse code, and it runs in Maven and CI pipelines without a screen.</p>"
    },
    {
        l: "b",
        q: "What is the given-when-then style?",
        a: "<p><code>given()</code> sets up the request (headers, params, body). <code>when()</code> sends it (method and path). <code>then()</code> checks the response. It comes from BDD and reads like a story.</p>"
    },
    {
        l: "b",
        q: "Name the HTTP methods and what each is for.",
        a: "<p>GET reads, POST creates, PUT replaces fully, PATCH changes part, DELETE removes. HEAD returns headers only, OPTIONS tells what is allowed.</p>"
    },
    {
        l: "b",
        q: "What is the difference between PUT and POST?",
        a: "<p>POST creates a new resource and the server picks the id. It is not idempotent. PUT replaces a resource at a known URL, and calling it again gives the same result, so it is idempotent.</p>"
    },
    {
        l: "b",
        q: "What is the difference between PUT and PATCH?",
        a: "<p>PUT sends the whole object and replaces the old one. PATCH sends only the fields to change.</p>"
    },
    {
        l: "b",
        q: "What do the status code groups mean?",
        a: "<p>2xx success, 3xx redirect, 4xx client mistake, 5xx server problem. Common: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.</p>"
    },
    {
        l: "b",
        q: "What is the difference between 401 and 403?",
        a: "<p>401: the server does not know who you are (no or bad login). 403: it knows you, but you do not have permission.</p>"
    },
    {
        l: "b",
        q: "What is the difference between query params and path params?",
        a: "<p>Path params are part of the path and pick one resource: <code>/books/2</code>. Query params come after <code>?</code> and filter or sort: <code>/books?author=Bloch</code>. In REST Assured: <code>pathParam()</code> and <code>queryParam()</code>.</p>"
    },
    {
        l: "b",
        q: "What does idempotent mean?",
        a: "<p>Calling the same request many times gives the same final state as calling it once. GET, PUT and DELETE are idempotent. POST is not.</p>"
    },
    {
        l: "b",
        q: "Which dependencies do you add for REST Assured?",
        a: "<p><code>io.rest-assured:rest-assured</code>, a test runner (TestNG or JUnit), and Jackson or Gson for objects. Add <code>json-schema-validator</code> for schema checks.</p>"
    },
    {
        l: "b",
        q: "Why do we use static imports?",
        a: "<p>So we can write <code>given()</code> and <code>equalTo()</code> instead of <code>RestAssured.given()</code> and <code>Matchers.equalTo()</code>. It makes the test shorter.</p>"
    },
    {
        l: "b",
        q: "What is Hamcrest?",
        a: "<p>A library of matchers such as <code>equalTo</code>, <code>hasItem</code>, <code>greaterThan</code>. REST Assured uses them to describe what we expect in <code>body()</code>.</p>"
    },
    {
        l: "b",
        q: "How do you send a JSON body?",
        a: "<p>Set <code>contentType(ContentType.JSON)</code> and pass the body as a String, a Map or a POJO: <code>given().contentType(JSON).body(obj).when().post(...)</code>.</p>"
    },
    {
        l: "b",
        q: "How do you send headers?",
        a: "<p><code>header(\"name\",\"value\")</code> for one, <code>headers(map)</code> for many. Shortcuts: <code>contentType()</code> and <code>accept()</code>.</p>"
    },
    {
        l: "b",
        q: "How do you get a value from the response?",
        a: "<p>With <code>extract().path(\"field\")</code>, or keep the <code>Response</code> and call <code>response.jsonPath().getString(\"field\")</code>.</p>"
    },
    {
        l: "b",
        q: "What is the Response object?",
        a: "<p>It holds everything from the server: status code, headers, body and time. You can call <code>getStatusCode()</code>, <code>asString()</code>, <code>jsonPath()</code>, <code>getHeader()</code>, <code>getTime()</code>.</p>"
    },
    {
        l: "m",
        q: "What is the difference between param(), queryParam() and formParam()?",
        a: "<p><code>queryParam</code> always goes in the URL. <code>formParam</code> goes in the body as a form. <code>param</code> guesses: query for GET, form for POST. So prefer the exact ones.</p>"
    },
    {
        l: "m",
        q: "How do you handle authentication?",
        a: "<p>Basic: <code>auth().basic()</code> or <code>auth().preemptive().basic()</code>. Token: log in, extract the token, send <code>Authorization: Bearer &lt;token&gt;</code> or <code>auth().oauth2(token)</code>. API key: a header or query param.</p>"
    },
    {
        l: "m",
        q: "What is preemptive basic authentication?",
        a: "<p>Normal <code>basic()</code> first sends the call without credentials, waits for a 401, then sends again. <code>preemptive()</code> sends the credentials in the very first call, saving a round trip and working with servers that do not send a 401 challenge.</p>"
    },
    {
        l: "m",
        q: "How do you pass data from one API call to another?",
        a: "<p>Extract it: <code>String token = given()...post(\"/login\").then().extract().path(\"token\");</code>. Then use it in the next call. I keep shared values in fields set in <code>@BeforeClass</code>, and I make each test independent where possible.</p>"
    },
    {
        l: "m",
        q: "What are RequestSpecification and ResponseSpecification?",
        a: "<p>Reusable sets of settings. A request spec holds base URI, headers, auth and logging. A response spec holds common checks such as status 200 and content type. I use <code>given().spec(req)</code> and <code>then().spec(res)</code> to avoid repeating code.</p>"
    },
    {
        l: "m",
        q: "What are serialization and deserialization?",
        a: "<p>Serialization turns a Java object into JSON when sending. Deserialization turns JSON into a Java object when reading. REST Assured does it with Jackson or Gson. Use <code>.body(obj)</code> and <code>.as(Class.class)</code>.</p>"
    },
    {
        l: "m",
        q: "How do you read a list of objects from a response?",
        a: "<p><code>List&lt;Book&gt; books = response.jsonPath().getList(\"books\", Book.class);</code> or <code>.as(Book[].class)</code> when the JSON is a list at the top.</p>"
    },
    {
        l: "m",
        q: "How do you validate the JSON structure of a response?",
        a: "<p>With JSON schema validation: add <code>json-schema-validator</code>, keep a schema file in <code>src/test/resources</code> and use <code>.body(matchesJsonSchemaInClasspath(\"book-schema.json\"))</code>. It checks fields and types, not values.</p>"
    },
    {
        l: "m",
        q: "How do you log requests and responses?",
        a: "<p><code>log().all()</code> prints everything. I prefer <code>log().ifValidationFails()</code> so logs only show when a test fails. Filters like <code>RequestLoggingFilter</code> or Allure can do it for every call.</p>"
    },
    {
        l: "m",
        q: "How do you check response time?",
        a: "<p><code>.time(lessThan(2000L))</code> in milliseconds, or <code>response.getTime()</code> and assert on it.</p>"
    },
    {
        l: "m",
        q: "How do you do data-driven testing?",
        a: "<p>With TestNG <code>@DataProvider</code> (or JUnit 5 <code>@ParameterizedTest</code>), reading data from arrays, CSV, Excel or JSON files. The same test then runs for every row.</p>"
    },
    {
        l: "m",
        q: "How do you check a number like 32.5?",
        a: "<p>REST Assured reads decimals as float, so I write <code>equalTo(32.5f)</code>. A double would fail. For exact numbers I can set <code>numberReturnType(BIG_DECIMAL)</code>.</p>"
    },
    {
        l: "m",
        q: "What is the difference between hasItems and contains?",
        a: "<p><code>hasItems(a,b)</code> passes if the list includes a and b, in any order, with extra items allowed. <code>contains(a,b)</code> needs exactly those items in exactly that order. <code>containsInAnyOrder</code> needs exactly those items in any order.</p>"
    },
    {
        l: "m",
        q: "How do you filter a list inside a JSON path?",
        a: "<p>With GPath: <code>books.findAll { it.price &gt; 30 }.title</code> returns matching titles. <code>find</code> returns the first match. <code>size()</code>, <code>sum()</code>, <code>max()</code> also work.</p>"
    },
    {
        l: "m",
        q: "How do you upload a file?",
        a: "<p><code>given().multiPart(\"file\", new File(\"path\"), \"image/png\").when().post(\"/upload\")</code>.</p>"
    },
    {
        l: "m",
        q: "How do you work with cookies?",
        a: "<p>Send with <code>cookie(\"name\",\"value\")</code>. Read from a response with <code>response.getCookie(\"name\")</code> or <code>getCookies()</code>.</p>"
    },
    {
        l: "m",
        q: "What is the difference between assertions in then() and TestNG asserts?",
        a: "<p>Checks in <code>then()</code> use Hamcrest and REST Assured reports all failures together. TestNG asserts work on values you have already extracted. I use <code>then()</code> for the response and TestNG asserts (or SoftAssert) for extracted values and logic.</p>"
    },
    {
        l: "m",
        q: "How do you check that a field is missing or null?",
        a: "<p><code>body(\"password\", nullValue())</code> for null or missing, or <code>body(\"user\", not(hasKey(\"password\")))</code> to say the key must not exist.</p>"
    },
    {
        l: "m",
        q: "How do you check the size of a top-level JSON array?",
        a: "<p><code>.body(\"size()\", equalTo(10))</code> or <code>.body(\"\", hasSize(10))</code>.</p>"
    },
    {
        l: "a",
        q: "How would you design an API test framework?",
        a: "<p>Layers: tests, a service layer with the API calls, specs and config, then REST Assured. Add POJOs, endpoint constants, a data factory, config per environment, TestNG, reports (Allure), logging and a CI pipeline. Keep tests independent and clean up their data.</p>"
    },
    {
        l: "a",
        q: "How do you handle different environments (QA, Staging)?",
        a: "<p>Keep a properties file for each environment and choose with <code>-Denv=qa</code> at run time (or Maven profiles). Never hard-code URLs or secrets in tests.</p>"
    },
    {
        l: "a",
        q: "What if the token expires during a long test run?",
        a: "<p>Fetch the token in a helper (a TokenManager) that remembers the expiry time and refreshes when needed. Or log in once per class or suite, and add a retry that refreshes on 401.</p>"
    },
    {
        l: "a",
        q: "How do you handle dynamic values like ids and timestamps?",
        a: "<p>Do not hard-code them. Extract ids from earlier responses. For timestamps and generated values, check the shape: <code>notNullValue()</code>, <code>matchesPattern(\"...\")</code>, or compare within a range.</p>"
    },
    {
        l: "a",
        q: "Can REST Assured tests run in parallel? Any problems?",
        a: "<p>Yes, with TestNG <code>parallel=\"classes\"</code> or <code>methods</code>. But <code>RestAssured.baseURI</code> and other static settings are shared by all threads. I pass specs per request, avoid shared state, and make tests independent.</p>"
    },
    {
        l: "a",
        q: "How do you handle a slow or flaky API?",
        a: "<p>Set connection and socket timeouts, use Awaitility to poll until a job is ready, and retry only the known-flaky step. Do not use long Thread.sleep. If a test is flaky I find the cause instead of hiding it.</p>"
    },
    {
        l: "a",
        q: "How do you deal with HTTPS certificate errors?",
        a: "<p>For test environments use <code>relaxedHTTPSValidation()</code>, or better, add the certificate to a truststore. I never use relaxed validation on production.</p>"
    },
    {
        l: "a",
        q: "How do you run your tests in CI/CD?",
        a: "<p>Tests run with <code>mvn test</code> (Surefire) using testng.xml. Jenkins or GitHub Actions triggers it on each push, passes the environment with <code>-Denv</code>, publishes the Allure report and fails the build if tests fail.</p>"
    },
    {
        l: "a",
        q: "What negative tests do you write for an API?",
        a: "<p>Missing or wrong token (401), no permission (403), unknown id (404), bad or missing fields (400/422), wrong content type (415), wrong method (405), very long text, special characters, duplicate create (409), and a check that error messages do not leak secrets.</p>"
    },
    {
        l: "a",
        q: "How do you keep sensitive data out of logs and reports?",
        a: "<p>Use <code>LogConfig.blacklistHeader(\"Authorization\")</code>, keep passwords in environment variables or a secret store, and mask tokens in reports.</p>"
    },
    {
        l: "a",
        q: "How do you test an API that returns a file?",
        a: "<p>Call it, read <code>asByteArray()</code>, check the status and headers (<code>Content-Type</code>, <code>Content-Disposition</code>), save it to <code>target/</code>, and check the file size or content.</p>"
    },
    {
        l: "a",
        q: "What is the difference between a filter and a spec?",
        a: "<p>A spec holds <i>settings</i> (base URI, headers, checks). A filter is <i>code</i> that runs around every call, so it can log, time or change the request and response.</p>"
    },
    {
        l: "a",
        q: "What is the difference between API testing and UI testing?",
        a: "<p>API tests call the back end directly. They are faster, more stable and can find bugs earlier. UI tests check what the user sees. A good plan uses many API tests and fewer UI tests.</p>"
    },
    {
        l: "a",
        q: "Have you tested an API that is not REST (SOAP or GraphQL)?",
        a: "<p>GraphQL is a POST with JSON <code>{\"query\": \"...\"}</code>, so REST Assured works well. SOAP is XML over POST, so it can work, but SoapUI is often a better fit. Say what you really did.</p>"
    }
];
