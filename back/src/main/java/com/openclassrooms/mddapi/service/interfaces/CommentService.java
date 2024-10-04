package com.openclassrooms.mddapi.service.interfaces;

import com.openclassrooms.mddapi.dto.request.CommentDto;
import com.openclassrooms.mddapi.dto.response.CommentDtoResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {

    /**
     * Create a comment
     *
     * @param postDto {@link CommentDto}
     * @return {@link ResponseEntity <String>}
     */
    ResponseEntity<String> create(CommentDto postDto);

    /**
     * Get all comments by article id
     *
     * @param articleId {@link Integer}
     * @return {@link List<CommentDtoResponse> }
     */
   List<CommentDtoResponse> getCommentsByArticleId(Integer articleId);
}
