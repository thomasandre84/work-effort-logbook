package com.github.thomasandre84.dto;

import com.github.thomasandre84.domain.WorkStatus;

import java.util.UUID;

public record WorkDto(UUID id, String name, WorkStatus status) {
}
