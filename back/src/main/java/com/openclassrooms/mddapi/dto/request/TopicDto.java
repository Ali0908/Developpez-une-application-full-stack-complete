package com.openclassrooms.mddapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TopicDto {
    private Integer id;
    private String name;
    private String description;
    private List users;
}
