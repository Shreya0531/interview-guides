/* Cheat sheet cards. */
// t = card title, c = code or text.
const CHEAT = [
    {
        t: "Imports", c: `import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import io.restassured.http.ContentType;
import io.restassured.response.Response;`
    },
    {
        t: "Basic test", c: `given().baseUri(URL).queryParam("a", 1)
.when().get("/path")
.then().statusCode(200)
       .body("x.y", equalTo("v"));`
    },
    {
        t: "Send JSON", c: `given().contentType(ContentType.JSON)
       .body(obj)           // String, Map or POJO
.when().post("/path")
.then().statusCode(201);`
    },
    {
        t: "Auth", c: `.auth().preemptive().basic("u", "p")
.auth().oauth2(token)
.header("Authorization", "Bearer " + token)
.header("x-api-key", key)`
    },
    {
        t: "Extract", c: `String t = ...extract().path("token");
Response r = ...extract().response();
r.getStatusCode(); r.asString();
r.jsonPath().getList("a.b");
r.as(Book.class);`
    },
    {
        t: "GPath", c: `a.b            inside
list[0]        first item
list[-1]       last item
list.name      field of every item
list.size()    count
list.findAll { it.x > 5 }.name
list.find { it.id == 2 }.name
list.price.sum()   .max()   .min()`
    },
    {
        t: "Matchers", c: `equalTo  not  containsString  startsWith
greaterThan  lessThan  hasSize  empty
hasItem  hasItems  contains  containsInAnyOrder
everyItem  notNullValue  nullValue
Decimals: use 32.5f   Big numbers: 5L`
    },
    {
        t: "Specs", c: `RequestSpecBuilder().setBaseUri(..)
    .addHeader(..).setContentType(JSON).build();
ResponseSpecBuilder().expectStatusCode(200).build();
given().spec(req) ... then().spec(res);
RestAssured.reset();`
    },
    {
        t: "Logging", c: `.log().all()
.log().ifValidationFails()
.log().body()
.filter(new RequestLoggingFilter())`
    },
    {
        t: "Schema", c: `.body(matchesJsonSchemaInClasspath("a.json"));
// needs json-schema-validator`
    },
    {
        t: "Settings", c: `.relaxedHTTPSValidation()
.redirects().follow(false)
.proxy("host", 8080)
.urlEncodingEnabled(false)`
    },
    {
        t: "Status codes", c: `200 OK        201 Created    204 No Content
400 Bad Req   401 No login   403 No permission
404 Not found 405 Bad method 409 Conflict
415 Bad media 422 Bad data   429 Too many
500 Server    502/503/504 Gateway or down`
    }
];
