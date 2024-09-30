package com.openclassrooms.mddapi.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDtoResponse {

    private Long id;
    private String title;
    private String content;
    private Date date;
    private Long topicId;
    private String topicTitle;
    private Long authorId;
}
