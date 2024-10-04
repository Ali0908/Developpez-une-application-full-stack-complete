package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.request.PostDto;
import com.openclassrooms.mddapi.dto.response.PostDtoResponse;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.interfaces.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostSrvImpl implements PostService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PostMapper postMapper;

    @Autowired
    public PostSrvImpl(PostMapper postMapper, PostRepository postRepository, UserRepository userRepository) {
        this.postMapper = postMapper;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    @Override
    public List<PostDtoResponse> getAllPostsByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Sorting posts by createdAt in descending order (newest to oldest)
        return user.getPosts()
                .stream()
                .sorted((post1, post2) -> post2.getDate().compareTo(post1.getDate()))
                .map(postMapper::toPostDtoResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<String> create(PostDto postDto) {
        Post post = postMapper.toPost(postDto);
        postRepository.save(post);
        return ResponseEntity.ok("Post created successfully");
    }
}
