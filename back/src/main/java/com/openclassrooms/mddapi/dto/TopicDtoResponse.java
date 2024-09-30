package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TopicDtoResponse {
    private Long id;
    private String name;
    private String description;
    private Boolean subscription;
    private List<UserDtoResponse> users;
}
