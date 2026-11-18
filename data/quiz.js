/* Practice questions by section. */
// One list per section id. q = question, o = options, a = index of the right option (0 is the first), e = explanation.
const QUIZ = {
    http: [
        {
            q: "Which method do you use to create a new resource?",
            o: ["GET", "POST", "DELETE", "HEAD"],
            a: 1,
            e: "POST creates something new. GET only reads, DELETE removes."
        },
        {
            q: "What does idempotent mean?",
            o: ["The call is always fast", "Calling it many times leaves the same result as calling it once", "It needs no login", "It never fails"],
            a: 1,
            e: "Example: deleting book 7 ten times still leaves the server in the same state. PUT and DELETE are idempotent, POST is not."
        },
        {
            q: "A user is logged in but is not allowed to delete a book. Which status code is correct?",
            o: ["401", "403", "404", "500"],
            a: 1,
            e: "403 Forbidden = the server knows you but you have no permission. 401 means not logged in."
        },
        {
            q: "In https://shop.com/v1/users/5?active=true, what is active=true?",
            o: ["A path parameter", "A header", "A query parameter", "The host"],
            a: 2,
            e: "Everything after ? is a query parameter. The 5 in the path is a path parameter."
        },
        {
            q: "Which statement about REST is true?",
            o: ["The server remembers you between calls", "Every request carries what the server needs (stateless)", "It only works with XML", "URLs should be verbs like /getBook"],
            a: 1,
            e: "Stateless means each request is complete by itself, for example it carries a token."
        },
        {
            q: "You PUT a book with only the title. What may happen to the other fields?",
            o: ["They stay the same", "They may be erased, because PUT replaces everything", "The server returns 500", "They are copied from another book"],
            a: 1,
            e: "PUT replaces the full object. Use PATCH to change only some fields."
        }
    ],
    json: [
        {
            q: 'For {"address":{"city":"Pune"}} what is the path to Pune?',
            o: ["address[city]", "address.city", "city.address", "address/city"],
            a: 1,
            e: "Use a dot to go inside an object: address.city"
        },
        {
            q: "Which is valid JSON?",
            o: ["{'name':'Ann'}", "{name:'Ann'}", "{\"name\":\"Ann\"}", "{\"name\":\"Ann\",}"],
            a: 2,
            e: "JSON needs double quotes, and no comma after the last item."
        },
        {
            q: 'In {"tags":["a","b"]}, what is the value of tags?',
            o: ["An object with 2 keys", "A list (array) of 2 strings", "A string", "A number"],
            a: 1,
            e: "Square brackets [ ] make an array."
        },
        {
            q: 'How do you point to the second item of the list "books"?',
            o: ["books[2]", "books[1]", "books.2", "books(1)"],
            a: 1,
            e: "Counting starts at 0, so the second item is books[1]."
        }
    ],
    what: [
        {
            q: "What is REST Assured?",
            o: ["A browser testing tool", "A Java library for testing REST APIs", "A load-testing tool", "A database"],
            a: 1,
            e: "It is a Java library that sends requests and checks responses."
        },
        {
            q: "Which is NOT something REST Assured does by itself?",
            o: ["Send a GET request", "Check JSON values", "Test a web page button click", "Check response headers"],
            a: 2,
            e: "UI testing needs Selenium or similar. REST Assured is for APIs only."
        },
        {
            q: "Since version 3.0, the package name starts with:",
            o: ["com.jayway.restassured", "io.restassured", "org.restassured", "net.restassured"],
            a: 1,
            e: "It changed from com.jayway.restassured to io.restassured."
        },
        {
            q: "Which libraries does REST Assured use inside for paths and checks?",
            o: ["Groovy and Hamcrest", "Selenium and Maven", "Spring and Hibernate", "Python and Pandas"],
            a: 0,
            e: "Groovy powers GPath (JSON paths). Hamcrest gives matchers like equalTo."
        }
    ],
    setup: [
        {
            q: "given() shows a red error in your IDE. What is the most likely cause?",
            o: ["Java is too old", "Missing static import of io.restassured.RestAssured.*", "No internet", "Wrong Maven version"],
            a: 1,
            e: "Add: import static io.restassured.RestAssured.*;"
        },
        {
            q: "Which dependency do you add to use matchesJsonSchemaInClasspath?",
            o: ["rest-assured only", "json-schema-validator", "jackson-core only", "xml-path"],
            a: 1,
            e: "Schema checks live in the separate json-schema-validator library."
        },
        {
            q: "Why do we use static imports in REST Assured tests?",
            o: ["To make tests run faster", "To write given() instead of RestAssured.given()", "They are required by TestNG", "To avoid using Maven"],
            a: 1,
            e: "It only saves typing and makes tests read better."
        },
        {
            q: "What scope is normally used for test libraries in the pom?",
            o: ["compile", "runtime", "test", "provided"],
            a: 2,
            e: "Test libraries use <scope>test</scope> so they are not packaged with the app."
        }
    ],
    gwt: [
        {
            q: "Which part of the test chooses the method and path, like get(\"/books\")?",
            o: ["given()", "when()", "then()", "and()"],
            a: 1,
            e: "when() is the action. given() sets up, then() checks."
        },
        {
            q: "What does and() do?",
            o: ["Joins two tests", "Adds a required check", "Nothing, it only makes the line easier to read", "Repeats the request"],
            a: 2,
            e: "and() and with() are just for readability."
        },
        {
            q: "You put a status check and a body check after then(). One fails. What does REST Assured do?",
            o: ["Stops silently", "Reports all failed checks together", "Retries the request", "Ignores the failure"],
            a: 1,
            e: "It tests every condition and lists all failures, for example '2 expectations failed'."
        },
        {
            q: "Is given() always required?",
            o: ["Yes, the code will not compile without it", "No, you can start with when() or call get() directly", "Yes, but only for POST", "No, but then() is required first"],
            a: 1,
            e: "given() is optional when you need no special setup."
        }
    ],
    requests: [
        {
            q: "Which call builds /books/2 from the path /books/{id}?",
            o: ["queryParam(\"id\", 2)", "pathParam(\"id\", 2)", "formParam(\"id\", 2)", "header(\"id\", 2)"],
            a: 1,
            e: "pathParam fills the {id} placeholder."
        },
        {
            q: "On a POST, a value added with param() becomes a:",
            o: ["Query parameter", "Form parameter", "Header", "Cookie"],
            a: 1,
            e: "param() guesses: GET gives query, POST gives form. Prefer queryParam or formParam."
        },
        {
            q: "You POST JSON and get 415 Unsupported Media Type. What most likely is missing?",
            o: ["A path parameter", "contentType(ContentType.JSON)", "A cookie", "The port number"],
            a: 1,
            e: "Tell the server what you are sending with contentType."
        },
        {
            q: "What is the difference between contentType and accept?",
            o: ["No difference", "contentType = format of what you send, accept = format you want back", "accept = what you send", "contentType is for responses only"],
            a: 1,
            e: "Content-Type describes your body. Accept describes the answer you want."
        },
        {
            q: "Which sets a base URL for ALL requests?",
            o: ["RestAssured.baseURI = \"...\"", "given().body(...)", "then().baseUri(...)", "extract().baseUri(...)"],
            a: 0,
            e: "The static RestAssured.baseURI applies to every request until reset()."
        }
    ],
    checks: [
        {
            q: "The JSON price is 32.5. Which check passes?",
            o: ["body(\"price\", equalTo(32.5))", "body(\"price\", equalTo(32.5f))", "body(\"price\", equalTo(\"32.5\"))", "body(\"price\", equalTo(32))"],
            a: 1,
            e: "REST Assured reads decimals as float, so use 32.5f."
        },
        {
            q: "The list is [A, B, C]. Which matcher FAILS?",
            o: ["hasItems(\"A\",\"B\")", "hasItem(\"C\")", "contains(\"A\",\"B\")", "contains(\"A\",\"B\",\"C\")"],
            a: 2,
            e: "contains() needs the whole list in order. hasItems only needs those items to be present."
        },
        {
            q: "Which checks that response time is under 2 seconds?",
            o: ["time(lessThan(2000L))", "time(equalTo(2))", "responseTime(2)", "speed(2000)"],
            a: 0,
            e: "time() takes a matcher and the value is in milliseconds as a long."
        },
        {
            q: "What does everyItem(greaterThan(0f)) check?",
            o: ["The list has more than 0 items", "Every item in the list is greater than 0", "The first item is greater than 0", "The sum is above 0"],
            a: 1,
            e: "everyItem applies the matcher to each element."
        },
        {
            q: "Why is Hamcrest used with REST Assured?",
            o: ["To send requests", "To describe expected values in a readable way (matchers)", "To read XML", "To run tests in parallel"],
            a: 1,
            e: "Matchers like equalTo and hasItem make checks read like sentences."
        }
    ],
    gpath: [
        {
            q: "Which path gives the number of items in the list books?",
            o: ["books.length", "books.size()", "books.count", "size(books)"],
            a: 1,
            e: "Use books.size()."
        },
        {
            q: "What does books.findAll { it.price > 30 }.title return?",
            o: ["The first title", "A list of titles of books above 30", "The count", "A boolean"],
            a: 1,
            e: "findAll filters the list, then .title picks that field from each item."
        },
        {
            q: "How do you read a key named first-name?",
            o: ["data.first-name", "data.'first-name'", "data[first-name]", "data.first_name"],
            a: 1,
            e: "Wrap keys with dashes or spaces in single quotes."
        },
        {
            q: "The whole JSON is a list. How do you read the id of the first item?",
            o: ["[0].id", "0.id", "root.id", "$.0.id"],
            a: 0,
            e: "Start the path with [0]."
        },
        {
            q: "Inside a Java string, which is best for text in a filter?",
            o: ["\"... == \"Bloch\"\" (double quotes)", "\"... == 'Bloch'\" (single quotes)", "\"... == Bloch\" (no quotes)", "\"... == `Bloch`\" (backticks)"],
            a: 1,
            e: "Double quotes would end the Java string. Use single quotes inside."
        }
    ],
    extract: [
        {
            q: "extract() must come:",
            o: ["Before given()", "Last in the chain", "Before when()", "It can be anywhere"],
            a: 1,
            e: "After extract() you are no longer in the validation chain."
        },
        {
            q: "Which gets the whole response body as text?",
            o: ["response.asString()", "response.getText()", "response.body()", "response.string"],
            a: 0,
            e: "asString() returns the body as a String."
        },
        {
            q: "You write long id = ...path(\"id\") and get ClassCastException. Why?",
            o: ["The id is missing", "The JSON number came back as Integer, not Long", "The request failed", "The path is wrong"],
            a: 1,
            e: "Use jsonPath().getLong(\"id\") to be safe."
        },
        {
            q: "What is chaining?",
            o: ["Running tests in parallel", "Using a value from one response in the next request", "Adding many checks after then()", "Using a spec"],
            a: 1,
            e: "Example: log in, extract the token, send it in the next call."
        }
    ],
    auth: [
        {
            q: "What is the difference between basic() and preemptive().basic()?",
            o: ["No difference", "preemptive sends credentials in the first request, basic waits for a 401 first", "basic is more secure", "preemptive is only for GET"],
            a: 1,
            e: "Plain basic needs two calls. Preemptive needs one."
        },
        {
            q: "How do you send a bearer token?",
            o: ["header(\"Authorization\", \"Bearer \" + token)", "queryParam(\"Bearer\", token)", "body(token)", "cookie(\"Bearer\", token)"],
            a: 0,
            e: "Bearer tokens travel in the Authorization header. auth().oauth2(token) does the same."
        },
        {
            q: "The API replies 401 with a valid user. What do you check first?",
            o: ["The response time", "The token or credentials, maybe expired or missing", "The JSON schema", "The port"],
            a: 1,
            e: "401 means the server does not accept who you are."
        },
        {
            q: "Where should real passwords live?",
            o: ["In the test code", "In environment variables or a config file not stored in Git", "In the pom.xml", "In the log"],
            a: 1,
            e: "Keep secrets out of code and out of source control."
        }
    ],
    specs: [
        {
            q: "What is a RequestSpecification used for?",
            o: ["Checking the response", "Sharing request settings like base URI and headers", "Running tests in parallel", "Reading JSON"],
            a: 1,
            e: "Request specs hold the shared setup."
        },
        {
            q: "How do you use a spec in a test?",
            o: ["given().spec(reqSpec)", "given().use(reqSpec)", "when().spec(reqSpec)", "reqSpec.run()"],
            a: 0,
            e: "Use .spec() in given() for requests and in then() for response specs."
        },
        {
            q: "Which builder creates a ResponseSpecification?",
            o: ["RequestSpecBuilder", "ResponseSpecBuilder", "SpecFactory", "ResponseBuilder"],
            a: 1,
            e: "ResponseSpecBuilder, for example expectStatusCode(200)."
        },
        {
            q: "How do you clear global settings after tests?",
            o: ["RestAssured.clear()", "RestAssured.reset()", "RestAssured.stop()", "RestAssured.null()"],
            a: 1,
            e: "RestAssured.reset() returns everything to defaults."
        }
    ],
    pojo: [
        {
            q: "Turning a Java object into JSON is called:",
            o: ["Deserialization", "Serialization", "Extraction", "Validation"],
            a: 1,
            e: "Serialization: object to JSON. Deserialization: JSON to object."
        },
        {
            q: "You send a POJO with body(obj) but forget contentType(JSON). What happens?",
            o: ["It works", "REST Assured cannot choose how to serialize and fails", "It sends XML always", "The server fixes it"],
            a: 1,
            e: "Set the content type so the right serializer (Jackson) is used."
        },
        {
            q: "Which turns the response into a Book object?",
            o: ["extract().as(Book.class)", "extract().toBook()", "path(Book.class)", "body(Book.class)"],
            a: 0,
            e: "Use as(Book.class)."
        },
        {
            q: "You get UnrecognizedPropertyException. What fixes it?",
            o: ["@JsonIgnoreProperties(ignoreUnknown = true) on the class", "Remove Jackson", "Use GET", "Increase the timeout"],
            a: 0,
            e: "The JSON has a field your class does not have."
        }
    ],
    schema: [
        {
            q: "What does JSON schema validation check?",
            o: ["Exact values", "The shape: fields and types", "Response time", "Headers"],
            a: 1,
            e: "Schema checks structure and types. Use body() for values."
        },
        {
            q: "Which dependency is needed?",
            o: ["json-schema-validator", "xml-path", "jackson-annotations", "hamcrest-all"],
            a: 0,
            e: "io.rest-assured:json-schema-validator"
        },
        {
            q: "Where is the schema file usually placed?",
            o: ["src/main/java", "src/test/resources", "pom.xml", "target/classes only"],
            a: 1,
            e: "Put it in src/test/resources so the classpath finds it."
        },
        {
            q: "How do you make a schema fail on unexpected extra fields?",
            o: ["\"strict\": true", "\"additionalProperties\": false", "\"extra\": \"deny\"", "You cannot"],
            a: 1,
            e: "additionalProperties: false rejects fields not listed."
        }
    ],
    xml: [
        {
            q: "How do you read the attribute id of the second book?",
            o: ["library.book[1].@id", "library.book[1].id", "library.book.id[1]", "library.book[2].attr(id)"],
            a: 0,
            e: "Attributes use @ and counting starts at 0."
        },
        {
            q: "Which class parses XML responses?",
            o: ["JsonPath", "XmlPath", "HtmlPath", "TextPath"],
            a: 1,
            e: "XmlPath is the XML partner of JsonPath."
        },
        {
            q: "XML values come back as:",
            o: ["Numbers", "Text (strings)", "Booleans", "Objects"],
            a: 1,
            e: "Compare with \"2\" or convert the value first."
        }
    ],
    logging: [
        {
            q: "Which logs only when a check fails?",
            o: ["log().all()", "log().ifValidationFails()", "log().body()", "log().ifError()"],
            a: 1,
            e: "It keeps the console clean until something goes wrong."
        },
        {
            q: "What does a filter do?",
            o: ["Removes failing tests", "Sits between test and server to look at or change every call", "Filters JSON arrays", "Sorts the response"],
            a: 1,
            e: "Filters are used for logging, reports (Allure) and adding headers."
        },
        {
            q: "How do you hide the Authorization header in logs?",
            o: ["blacklistHeader(\"Authorization\") in LogConfig", "log().secret()", "header().hide()", "You cannot"],
            a: 0,
            e: "LogConfig.logConfig().blacklistHeader(...) hides chosen headers."
        }
    ],
    testng: [
        {
            q: "Which TestNG annotation runs once before all tests in a class?",
            o: ["@BeforeMethod", "@BeforeClass", "@BeforeTest only", "@Test"],
            a: 1,
            e: "@BeforeMethod runs before each test. @BeforeClass runs once."
        },
        {
            q: "In TestNG, what is the correct order?",
            o: ["assertEquals(expected, actual)", "assertEquals(actual, expected)", "assertEquals(message, actual)", "order does not exist"],
            a: 1,
            e: "TestNG: actual first. JUnit: expected first."
        },
        {
            q: "What does @DataProvider do?",
            o: ["Connects to a database", "Runs the same test with many sets of data", "Provides the base URL", "Creates reports"],
            a: 1,
            e: "It returns an Object[][] and each row is one test run."
        },
        {
            q: "You use SoftAssert and forget assertAll(). What happens?",
            o: ["Nothing is reported, failures are lost", "The test fails anyway", "It throws an error at compile time", "It runs twice"],
            a: 0,
            e: "assertAll() is what finally reports the collected failures."
        },
        {
            q: "Which JUnit 5 annotation matches TestNG's @BeforeClass?",
            o: ["@BeforeEach", "@BeforeAll", "@Before", "@Setup"],
            a: 1,
            e: "@BeforeAll (a static method) runs once before the tests."
        }
    ],
    framework: [
        {
            q: "What is the benefit of a service (API) layer?",
            o: ["Tests are shorter and API call details live in one place", "It makes tests slower", "It replaces TestNG", "It avoids using POJOs"],
            a: 0,
            e: "If an endpoint changes, you fix one class, not 100 tests."
        },
        {
            q: "How do you run the same tests on QA and Staging?",
            o: ["Copy all the tests", "Read the environment from a config or -Denv and load the matching URL", "Edit the code each time", "Use two Git repos"],
            a: 1,
            e: "Keep URLs in config files and pick one at run time."
        },
        {
            q: "Which is a good habit for API tests?",
            o: ["Tests depend on the order they run", "Each test creates and cleans up its own data", "Use real production data", "Hard-code tokens in code"],
            a: 1,
            e: "Independent tests are stable and can run in parallel."
        },
        {
            q: "Which tools give nice reports for REST Assured tests?",
            o: ["Allure and ExtentReports", "Photoshop", "Docker", "Selenium Grid"],
            a: 0,
            e: "Both can be wired in with a filter or listener."
        }
    ],
    config: [
        {
            q: "Test server has a self-signed certificate. What can you use (for testing only)?",
            o: ["relaxedHTTPSValidation()", "disableSecurity()", "trustAll()", "skipSSL()"],
            a: 0,
            e: "given().relaxedHTTPSValidation() skips certificate checks. Never use it against production."
        },
        {
            q: "How do you stop REST Assured from following a 302 redirect?",
            o: ["redirects().follow(false)", "noRedirect()", "followRedirects(false)", "status(302)"],
            a: 0,
            e: "given().redirects().follow(false)"
        },
        {
            q: "Tests run in parallel and change RestAssured.baseURI. What is the risk?",
            o: ["None", "Global settings are shared by all threads and tests can affect each other", "The tests run slower", "Maven fails"],
            a: 1,
            e: "Pass a spec to each request instead of changing global state."
        },
        {
            q: "A job finishes after some seconds. What helps?",
            o: ["Thread.sleep(60000) everywhere", "Awaitility polling until the status is DONE", "Run the test twice", "Delete the test"],
            a: 1,
            e: "Polling with a timeout is faster and more stable than fixed sleeps."
        }
    ],
    errors: [
        {
            q: "Your body check on \"books.title\" uses equalTo(\"Clean Code\") and fails. Why?",
            o: ["books.title is a list, so use hasItem", "The server is down", "Wrong status", "Hamcrest is old"],
            a: 0,
            e: "books.title returns a list of titles. Use hasItem or hasItems."
        },
        {
            q: "Error: 'Invalid number of path parameters. Undefined path parameters are: id'. Fix?",
            o: ["Add pathParam(\"id\", value) or pass the value in get(...)", "Add a header", "Change the port", "Use POST"],
            a: 0,
            e: "The {id} placeholder has no value."
        },
        {
            q: "'Expected response body to be verified as JSON, HTML or XML but no content-type was defined'. What does it tell you?",
            o: ["The server did not say what the body is", "The token expired", "The schema is wrong", "Java is old"],
            a: 0,
            e: "Check the server answer. If it is really JSON, set defaultParser = Parser.JSON."
        }
    ]
};
