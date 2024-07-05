package com.github.thomasandre84.service;

import com.github.thomasandre84.domain.Work;
import com.github.thomasandre84.domain.WorkTime;
import com.github.thomasandre84.dto.UpdateWorkDto;
import com.github.thomasandre84.dto.UpdateWorkTimeDto;
import com.github.thomasandre84.dto.WorkDto;
import com.github.thomasandre84.dto.WorkTimeDto;
import com.github.thomasandre84.repository.WorkRepository;

import com.github.thomasandre84.repository.WorkTimeRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class WorkService {
    private final WorkRepository workRepository;
    private final WorkTimeRepository workTimeRepository;

    @Inject
    public WorkService(WorkRepository workRepository,
                       WorkTimeRepository workTimeRepository) {
        this.workRepository = workRepository;
        this.workTimeRepository = workTimeRepository;
    }

    public List<WorkDto> getWorks() {
        List<Work> works = workRepository.listAll();
        return works.stream()
                .map(work -> new WorkDto(work.getId(), work.getName(), work.getStatus()))
                .toList();
    }

    public WorkDto getWorkById(UUID id) {
        Work work = workRepository.findById(id);
        return new WorkDto(work.getId(), work.getName(), work.getStatus());
    }

    @Transactional
    public WorkDto createWork(UpdateWorkDto updateWorkDto) {
        Work work = new Work();
        work.setName(updateWorkDto.name());
        if (updateWorkDto.status() != null) {
            work.setStatus(updateWorkDto.status());
        }
        workRepository.persist(work);
        return new WorkDto(work.getId(), work.getName(), work.getStatus());
    }

    @Transactional
    public void deleteWork(UUID uuid) {
        workRepository.deleteById(uuid);
    }

    @Transactional
    public WorkDto updateWork(UUID uuid, UpdateWorkDto updateWorkDto) {
        Work work = workRepository.findById(uuid);
        work.setName(updateWorkDto.name());
        workRepository.persist(work);
        return new WorkDto(work.getId(), work.getName(), updateWorkDto.status());
    }

    public List<WorkTimeDto> getWorkTimes(UUID id) {
        Work work = workRepository.findById(id);
        List<WorkTime> workTimes = workTimeRepository.findByWork(work);
        return workTimes.stream()
                .map(WorkService::mapWorkTime)
                .toList();
    }

    private static WorkTimeDto mapWorkTime(WorkTime workTime) {
        return new WorkTimeDto(workTime.getId(), workTime.getStartTime(), workTime.getEndTime(), calcWorkingMinutes(workTime));
    }

    private static Long calcWorkingMinutes(WorkTime workTime) {
        long seconds = workTime.getWorkTime();
        return seconds / 60L;
    }

    @Transactional
    public WorkTimeDto createWorkTime(UUID id) {
        Work work = workRepository.findById(id);
        WorkTime workTime = new WorkTime();
        workTime.setWork(work);
        workTimeRepository.persist(workTime);
        return new WorkTimeDto(workTime.getId(), workTime.getStartTime(), workTime.getEndTime(), calcWorkingMinutes(workTime));
    }

    @Transactional
    public WorkTimeDto updateWorkTime(UUID id, UpdateWorkTimeDto updateWorkTimeDto) {
        WorkTime workTime = workTimeRepository.findById(id);
        workTime.setStartTime(updateWorkTimeDto.startTime());
        workTime.setEndTime(updateWorkTimeDto.endTime());
        workTimeRepository.persist(workTime);
        return mapWorkTime(workTime);
    }

    @Transactional
    public void deleteWorkTime(UUID id) {
        workTimeRepository.deleteById(id);
    }

    public Long getWorkTimeSummary(UUID id) {
        Work work = workRepository.findById(id);
        List<WorkTime> workTimes = workTimeRepository.findByWork(work);
        Long totalSeconds = workTimes.stream()
                .mapToLong(WorkTime::getWorkTime)
                .sum();
        return totalSeconds / 60L;
    }
}
