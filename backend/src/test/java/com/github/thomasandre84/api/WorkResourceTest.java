package com.github.thomasandre84.api;

import com.github.thomasandre84.domain.WorkStatus;
import com.github.thomasandre84.dto.WorkDto;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.h2.H2DatabaseTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.*;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

@QuarkusTest
@QuarkusTestResource(H2DatabaseTestResource.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class WorkResourceTest {

    private static UUID workId;

    @Test
    @Order(0)
    void getWorks() {
        given()
                .when().get(WorkResource.BASE_URL)
                .then()
                .statusCode(200)
                .body("size()", org.hamcrest.Matchers.equalTo(0));
    }

    @Test
    @Order(1)
    void createWork() {
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
    @Order(2)
    void getWorkById() {
        WorkDto response = given()
                .when().get(WorkResource.BASE_URL + "/" + workId)
                .then()
                .statusCode(200)
                .body("status", org.hamcrest.Matchers.equalTo(WorkStatus.IN_PROGRESS.name()))
                .extract().as(WorkDto.class);

        assertEquals(workId, response.id());
    }

    @Test
    @Order(3)
    void updateWork() {
        given().request().body("{\"name\":\"test\", \"status\":\"PAUSED\"}")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .when().put(WorkResource.BASE_URL + "/" + workId)
                .then()
                .statusCode(200)
                .body("status", org.hamcrest.Matchers.equalTo(WorkStatus.PAUSED.name()));
    }

    @Test
    @Order(4)
    void deleteWork() {
        given()
                .when().delete(WorkResource.BASE_URL + "/" + workId)
                .then()
                .statusCode(204);
    }

    @Test
    @Order(5)
    void getWorksAfterCleanup() {
        given()
                .when().get(WorkResource.BASE_URL)
                .then()
                .statusCode(200)
                .body("size()", org.hamcrest.Matchers.equalTo(0));
    }

    @Test
    @Order(50)
    void getStatus() {
        given()
                .when().get(WorkResource.BASE_URL+"/status")
                .then()
                .statusCode(200)
                .body("size()", org.hamcrest.Matchers.equalTo(WorkStatus.values().length));
    }


}