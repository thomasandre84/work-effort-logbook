package com.github.thomasandre84.dto;

import java.time.Instant;
import java.util.UUID;

public record UpdateWorkTimeDto(UUID workId, Instant startTime, Instant endTime) {
}
