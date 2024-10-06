package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.request.PostDto;
import com.openclassrooms.mddapi.dto.response.PostDtoResponse;
import com.openclassrooms.mddapi.service.interfaces.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> create(@RequestBody PostDto postDto) {
         postService.create(postDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Post créé");
    }

}
