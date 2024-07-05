package com.github.thomasandre84.dto;

import com.github.thomasandre84.domain.WorkStatus;

public record UpdateWorkDto(String name, WorkStatus status) {
}
