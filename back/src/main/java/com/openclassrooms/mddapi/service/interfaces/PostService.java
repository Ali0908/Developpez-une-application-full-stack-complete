package com.openclassrooms.mddapi.service.interfaces;

import com.openclassrooms.mddapi.dto.PostDtoResponse;

import java.util.List;

public interface PostService {

    /**
     * Get all posts by user id
     *
     * @return {@link List<PostDtoResponse>}
     */
    List<PostDtoResponse> getAllPostsByUserId(Integer userId);
}
