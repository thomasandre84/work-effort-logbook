package com.github.thomasandre84.repository;

import com.github.thomasandre84.domain.Work;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.Dependent;

import java.util.UUID;

@Dependent
public class WorkRepository implements PanacheRepositoryBase<Work, UUID> {
}
