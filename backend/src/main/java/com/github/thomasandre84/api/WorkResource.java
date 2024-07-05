package com.github.thomasandre84.api;

import com.github.thomasandre84.domain.WorkStatus;
import com.github.thomasandre84.dto.UpdateWorkDto;
import com.github.thomasandre84.service.WorkService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.UUID;

import static com.github.thomasandre84.api.WorkResource.BASE_URL;

@Path(BASE_URL)
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class WorkResource {
    static final String BASE_URL = "/works";

    private final WorkService workService;

    @Inject
    public WorkResource(WorkService workService) {
        this.workService = workService;
    }

    @GET
    public Response getWorks() {
        return Response.ok(workService.getWorks()).build();
    }

    @GET
    @Path("/{id}")
    public Response getWorks(@PathParam("id") UUID id) {
        return Response.ok(workService.getWorkById(id)).build();
    }

    @POST
    public Response createWork(UpdateWorkDto updateWorkDto) {
        return Response.ok(workService.createWork(updateWorkDto)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteWork(@PathParam("id") UUID id) {
        workService.deleteWork(id);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{id}")
    public Response updateWork(@PathParam("id") UUID id, UpdateWorkDto updateWorkDto) {
        return Response.ok(workService.updateWork(id, updateWorkDto)).build();
    }

    @GET
    @Path("/status")
    public Response getStatus() {
        return Response.ok(WorkStatus.values()).build();
    }
}
