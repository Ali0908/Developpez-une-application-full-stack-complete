package com.openclassrooms.mddapi.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank(message = "Title post is required")
    private String title;
    @NotBlank(message = "Content post is required")
    private String content;
    @NotNull(message = "Date post is required")
    private Date date;
    @NotNull(message = "Topic is  is required")
    private Integer topicId;
    @NotNull(message = "Author id post is required")
    private Integer authorId;
}
