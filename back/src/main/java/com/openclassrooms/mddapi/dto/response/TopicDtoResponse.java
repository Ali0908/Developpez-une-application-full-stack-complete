package com.openclassrooms.mddapi.dto.response;

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
    private Integer id;
    private String name;
    private String description;
    private List<UserDtoResponse> users;
}
