package com.github.thomasandre84.domain;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
public class WorkTime {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "work_id")
    private Work work;

    @Column(nullable = false)
    private Instant startTime;
    private Instant endTime;

    public UUID getId() {
        return id;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    @PrePersist
    public void prePersist() {
        if (startTime == null) {
            startTime = Instant.now();
        }
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public long getWorkTime() {
        if (endTime != null && startTime != null) {
            return endTime.getEpochSecond() - startTime.getEpochSecond();
        } else if (startTime != null) {
            return Instant.now().getEpochSecond() - startTime.getEpochSecond();
        }
        return 0L;
    }

    public Work getWork() {
        return work;
    }

    public void setWork(Work work) {
        this.work = work;
    }
}
