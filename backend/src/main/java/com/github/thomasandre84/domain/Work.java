package com.github.thomasandre84.domain;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    private WorkStatus status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "work")
    private List<WorkTime> worktimes;

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public WorkStatus getStatus() {
        return status;
    }

    public void setStatus(WorkStatus status) {
        this.status = status;
    }

}
