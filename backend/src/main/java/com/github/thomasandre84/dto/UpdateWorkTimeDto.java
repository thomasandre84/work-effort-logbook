package com.github.thomasandre84.dto;

import java.time.Instant;

public record UpdateWorkTimeDto(Instant startTime, Instant endTime) {
}
