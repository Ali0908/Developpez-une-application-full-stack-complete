package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.CommentDtoResponse;
import com.openclassrooms.mddapi.service.interfaces.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> create(@RequestBody CommentDto commentDto) {
        return commentService.create(commentDto);
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<List<CommentDtoResponse>> getCommentsByArticleId(@PathVariable("articleId") Integer articleId) {
        List<CommentDtoResponse> comments = (List<CommentDtoResponse>) commentService.getCommentsByArticleId(articleId);
        return ResponseEntity.ok(comments);
    }
}
