package com.github.thomasandre84.api;

import com.github.thomasandre84.dto.UpdateWorkTimeDto;
import com.github.thomasandre84.dto.WorkTimeDto;
import com.github.thomasandre84.service.WorkService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.UUID;

import static com.github.thomasandre84.api.WorkTimeResource.BASE_URL;

@Path(BASE_URL)
public class WorkTimeResource {
    static final String BASE_URL = "/worktimes";

    private final WorkService workService;

    @Inject
    public WorkTimeResource(WorkService workService) {
        this.workService = workService;
    }

    @GET
    @Path("/work/{id}")
    public Response getWorkTimes(@PathParam("id") UUID id) {
        return Response.ok(workService.getWorkTimes(id)).build();
    }

    @POST
    @Path("/work/{id}")
    public Response createWorkTime(@PathParam("id") UUID id) {
        return Response.ok(workService.createWorkTime(id)).build();
    }

    @GET
    @Path("/work/{id}/summary")
    public Response getWorkTimeSummary(@PathParam("id") UUID id) {
        return Response.ok(workService.getWorkTimeSummary(id)).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateWorkTime(@PathParam("id") UUID id, UpdateWorkTimeDto updateWorkTimeDto) {
        WorkTimeDto workTimeDto = workService.updateWorkTime(id, updateWorkTimeDto);
        return Response.ok(workTimeDto).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteWorkTime(@PathParam("id") UUID id) {
        workService.deleteWorkTime(id);
        return Response.accepted().build();
    }
}
