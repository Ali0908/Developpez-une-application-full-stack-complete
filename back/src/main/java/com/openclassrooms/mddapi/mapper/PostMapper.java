package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.request.PostDto;
import com.openclassrooms.mddapi.dto.response.PostDtoResponse;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostMapper {
    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UserRepository userRepository;

    public Post toPost(PostDto postDto) {
        Post post = new Post();
        post.setId(postDto.getId());
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setDate(postDto.getDate());
        post.setTopic(topicRepository.findById(postDto.getTopicId()).get());
        post.setUser(userRepository.findById(postDto.getAuthorId()).get());
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
                post.getUser().getId(),
                post.getUser().getUsername()
        );
    }
}
