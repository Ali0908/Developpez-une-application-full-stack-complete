package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.PostDtoResponse;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import org.springframework.stereotype.Service;

@Service

public class PostMapper {

    public Post toPost(PostDto postDto) {
        Post post = new Post();
        post.setId(postDto.getId());
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setDate(postDto.getDate());
        Topic topic = new Topic();
        topic.setId(postDto.getTopicId());
        User user = new User();
        user.setId(postDto.getAuthorId());
        return post;
    }

    public PostDtoResponse toPostDtoResponse(Post post) {
        return new PostDtoResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getDate(),
                post.getTopic().getId(),
                post.getTopic().getName(),
                post.getUser().getId());
    }
}
