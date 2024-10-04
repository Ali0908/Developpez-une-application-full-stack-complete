package com.openclassrooms.mddapi.dto.response;


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

    private Integer id;
    private String title;
    private String content;
    private Date date;
    private Integer topicId;
    private String topicTitle;
    private Integer authorId;
    private String authorUsername;
}
