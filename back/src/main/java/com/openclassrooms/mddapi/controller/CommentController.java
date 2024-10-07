package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.request.CommentDto;
import com.openclassrooms.mddapi.dto.response.CommentDtoResponse;
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
        commentService.create(commentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Commentaire créé");
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<List<CommentDtoResponse>> getCommentsByArticleId(@PathVariable("articleId") Integer articleId) {
        List<CommentDtoResponse> comments = commentService.getCommentsByArticleId(articleId);
        return ResponseEntity.ok(comments);
    }
}
