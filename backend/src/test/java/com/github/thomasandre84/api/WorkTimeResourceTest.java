package com.github.thomasandre84.api;

import com.github.thomasandre84.dto.WorkDto;
import com.github.thomasandre84.dto.WorkTimeDto;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.h2.H2DatabaseTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.*;

import java.util.UUID;

import static io.restassured.RestAssured.given;

@QuarkusTest
@QuarkusTestResource(H2DatabaseTestResource.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class WorkTimeResourceTest {

    private static UUID workId;
    private static UUID workTimeId;


    @Test
    @Order(0)
    void createWork() {
        // Create a work
        WorkDto response = given().request().body("{\"name\":\"test\", \"status\":\"IN_PROGRESS\"}")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .when().post(WorkResource.BASE_URL)
                .then()
                .statusCode(200)
                .body("id", org.hamcrest.Matchers.notNullValue())
                .extract().as(WorkDto.class);

        workId = response.id();
    }

    @Test
    @Order(1)
    void getWorkTimes() {
        given()
                .when().get(WorkTimeResource.BASE_URL + "/work/" + workId)
                .then()
                .statusCode(200)
                .body("size()", org.hamcrest.Matchers.equalTo(0));
    }

    @Test
    @Order(2)
    void createWorkTime() {
        WorkTimeDto response = given().request().body("{\"startTime\":\"2021-09-01T00:00:00Z\"}")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .when().post(WorkTimeResource.BASE_URL + "/work/" + workId)
                .then()
                .statusCode(200)
                .extract().as(WorkTimeDto.class);
        workTimeId = response.id();
    }

    @Test
    @Order(3)
    void updateWorkTime() {
        given().request().body("{\"startTime\":\"2021-09-01T00:00:00Z\", \"endTime\":\"2021-09-01T01:00:00Z\"}")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .when().put(WorkTimeResource.BASE_URL + "/" + workTimeId)
                .then()
                .statusCode(200);
    }

    @Test
    @Order(4)
    void getWorkTimeSummary() {
        given()
                .when().get(WorkTimeResource.BASE_URL + "/work/" + workId + "/summary")
                .then()
                .statusCode(200);
                //.body(is(60));
    }



    @Test
    @Order(5)
    void deleteWorkTime() {
        given()
                .when().delete(WorkTimeResource.BASE_URL + "/" + workTimeId)
                .then()
                .statusCode(202);
    }
}