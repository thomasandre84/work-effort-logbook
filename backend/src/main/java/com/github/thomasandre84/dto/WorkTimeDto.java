package com.github.thomasandre84.dto;

import java.time.Instant;
import java.util.UUID;

public record WorkTimeDto(UUID id, Instant startTime, Instant EndTime, Long workingMinutes) {
}
