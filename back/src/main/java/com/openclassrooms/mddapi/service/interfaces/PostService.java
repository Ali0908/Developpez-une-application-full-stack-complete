package com.openclassrooms.mddapi.service.interfaces;
import com.openclassrooms.mddapi.dto.request.PostDto;
import com.openclassrooms.mddapi.dto.response.PostDtoResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {

    /**
     * Get all posts by user id
     *
     * @return {@link List<PostDtoResponse>}
     */
    List<PostDtoResponse> getAllPostsByUserId(Integer userId);

    /**
     * Create a post
     *
     * @param postDto {@link PostDtoResponse}
     * @return {@link ResponseEntity<String>}
     */
    ResponseEntity<String> create(PostDto postDto);
}
