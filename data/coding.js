/* Coding round tasks and solutions. */
// t = title, d = task, c = Java solution.
const CODING = [
    {
        t: "1. Get a post and check the status and title",
        d: "Call GET /posts/1. Check the status is 200 and the id is 1.",
        c: `given()
    .baseUri("https://jsonplaceholder.typicode.com")
.when()
    .get("/posts/{id}", 1)
.then()
    .statusCode(200)
    .contentType(ContentType.JSON)
    .body("id", equalTo(1))
    .body("title", not(emptyOrNullString()));`
    },
    {
        t: "2. Create a post with a Map and read the new id",
        d: "POST to /posts with a title, body and userId. Check 201 and get the id.",
        c: `Map<String, Object> post = new HashMap<>();
post.put("title", "My first post");
post.put("body", "Hello");
post.put("userId", 1);

int id = given()
        .baseUri("https://jsonplaceholder.typicode.com")
        .contentType(ContentType.JSON)
        .body(post)
    .when().post("/posts")
    .then().statusCode(201)
        .body("title", equalTo("My first post"))
    .extract().path("id");

System.out.println("Created id: " + id);`
    },
    {
        t: "3. Filter with a query parameter", d: "Get posts of user 1. Check there are 10 and each has userId 1.", c: `given()
    .baseUri("https://jsonplaceholder.typicode.com")
    .queryParam("userId", 1)
.when().get("/posts")
.then().statusCode(200)
    .body("size()", equalTo(10))
    .body("userId", everyItem(equalTo(1)));`
    },
    {
        t: "4. Print every title that is longer than 30 characters",
        d: "Extract the list and use Java to filter it.",
        c: `List<String> titles = given()
        .baseUri("https://jsonplaceholder.typicode.com")
    .when().get("/posts")
    .then().extract().jsonPath().getList("title");

titles.stream()
      .filter(t -> t.length() > 30)
      .forEach(System.out::println);

// Or with GPath only:
// .getList("findAll { it.title.length() > 30 }.title")`
    },
    {
        t: "5. Read a nested value", d: "GET /users/1. Check address.city and company.name exist.", c: `given().baseUri("https://jsonplaceholder.typicode.com")
.when().get("/users/1")
.then().statusCode(200)
    .body("name", equalTo("Leanne Graham"))
    .body("address.city", equalTo("Gwenborough"))
    .body("company.name", notNullValue());`
    },
    {
        t: "6. Use a POJO", d: "Read GET /posts/1 into a Post object and check it with TestNG.", c: `@JsonIgnoreProperties(ignoreUnknown = true)
public class Post {
    public int userId; public int id; public String title; public String body;
}

Post post = given().baseUri("https://jsonplaceholder.typicode.com")
    .when().get("/posts/1")
    .then().statusCode(200)
    .extract().as(Post.class);

Assert.assertEquals(post.id, 1);
Assert.assertEquals(post.userId, 1);
Assert.assertFalse(post.title.isEmpty());`
    },
    {
        t: "7. Data-driven: check three users", d: "Use a DataProvider with ids and expected user names.", c: `@DataProvider(name = "users")
public Object[][] users() {
    return new Object[][] { {1, "Leanne Graham"}, {2, "Ervin Howell"}, {3, "Clementine Bauch"} };
}

@Test(dataProvider = "users")
public void userNameIsCorrect(int id, String name) {
    given().baseUri("https://jsonplaceholder.typicode.com")
    .when().get("/users/{id}", id)
    .then().statusCode(200).body("name", equalTo(name));
}`
    },
    {
        t: "8. Reuse with specs", d: "Create one request spec and one response spec, and use them in two tests.", c: `RequestSpecification req = new RequestSpecBuilder()
    .setBaseUri("https://jsonplaceholder.typicode.com")
    .setContentType(ContentType.JSON)
    .log(LogDetail.URI)
    .build();

ResponseSpecification ok = new ResponseSpecBuilder()
    .expectStatusCode(200)
    .expectContentType(ContentType.JSON)
    .build();

given().spec(req).when().get("/posts/1").then().spec(ok);
given().spec(req).when().get("/users/1").then().spec(ok).body("id", equalTo(1));`
    },
    {
        t: "9. Check headers and response time",
        d: "Check Content-Type contains json and the call takes under 3 seconds.",
        c: `given().baseUri("https://jsonplaceholder.typicode.com")
.when().get("/posts/1")
.then().statusCode(200)
    .header("Content-Type", containsString("application/json"))
    .time(lessThan(3000L));`
    },
    {
        t: "10. A full flow: create, read, delete (chain)",
        d: "Create a post, read it back, delete it. (The fake API does not really save, so only the status codes are meaningful.)",
        c: `RequestSpecification req = new RequestSpecBuilder()
    .setBaseUri("https://jsonplaceholder.typicode.com")
    .setContentType(ContentType.JSON).build();

// 1. create
int id = given().spec(req).body("{\\"title\\":\\"t\\",\\"body\\":\\"b\\",\\"userId\\":1}")
    .when().post("/posts")
    .then().statusCode(201).extract().path("id");

// 2. read an existing one (the fake API does not store new posts)
given().spec(req).when().get("/posts/{id}", 1).then().statusCode(200);

// 3. delete
given().spec(req).when().delete("/posts/{id}", 1).then().statusCode(200);`
    }
];
