package com.openclassrooms.mddapi.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubscribeToTopicDto {
    @NotBlank(message = "Topic is required")
    private Integer topicId;
    @NotBlank(message = "Token is required")
    private Integer userId;
}
