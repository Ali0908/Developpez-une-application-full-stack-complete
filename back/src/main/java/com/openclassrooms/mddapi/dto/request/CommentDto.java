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
public class CommentDto {
    private Integer id;
    @NotBlank(message = "Content is required")
    private String content;
    @NotNull(message = "Date is required")
    private Date date;
    @NotNull(message = "Post id is required")
    private Integer postId;
    @NotNull(message = "Author id is required")
    private Integer authorId;
}
