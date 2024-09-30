package com.openclassrooms.mddapi.controller;


import com.openclassrooms.mddapi.dto.PostDtoResponse;
import com.openclassrooms.mddapi.service.interfaces.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    @GetMapping("/{userId}")
    public ResponseEntity<List<PostDtoResponse>> getAllPostsByUserId(@PathVariable Integer userId) {
        List<PostDtoResponse> posts = postService.getAllPostsByUserId(userId);
        return ResponseEntity.ok(posts);
    }

//    @GetMapping("/subscribe/{userId}")
//    public ResponseEntity<List<TopicDtoResponse>> getAllTopicsSubscribedByUserId(@PathVariable Integer userId) {
//        List<TopicDtoResponse> topics = topicService.getAllTopicsSubscribedByUserId(userId);
//        return ResponseEntity.ok(topics);
//    }

}
