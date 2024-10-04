package com.openclassrooms.mddapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Integer id;
    private String title;
    private String content;
    private Date date;
    private Integer topicId;
    private Integer authorId;
}
