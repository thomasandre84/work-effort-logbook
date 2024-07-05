package com.github.thomasandre84.repository;

import com.github.thomasandre84.domain.Work;
import com.github.thomasandre84.domain.WorkTime;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.Dependent;

import java.util.List;
import java.util.UUID;

@Dependent
public class WorkTimeRepository implements PanacheRepositoryBase<WorkTime, UUID> {
    public List<WorkTime> findByWork(Work work) {
        return list("work", work);
    }
}
