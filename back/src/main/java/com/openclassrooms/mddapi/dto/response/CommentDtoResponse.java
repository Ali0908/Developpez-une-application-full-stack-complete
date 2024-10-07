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
public class CommentDtoResponse {
    private String content;
    private Date date;
    private Integer postId;
    private Integer authorId;
    private String authorUsername;
}
