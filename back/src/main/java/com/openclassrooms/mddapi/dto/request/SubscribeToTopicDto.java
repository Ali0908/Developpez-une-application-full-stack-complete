package com.openclassrooms.mddapi.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubscribeToTopicDto {
    @NotNull(message = "Topic ID is required")
    private Integer topicId;
    @NotNull(message = "Token is required")
    private Integer userId;
}
