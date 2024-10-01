package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.CommentDtoResponse;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.service.interfaces.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentSrvImpl implements CommentService {
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;

    @Autowired
    public CommentSrvImpl(CommentMapper commentMapper, CommentRepository commentRepository, PostRepository postRepository) {
        this.commentMapper = commentMapper;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @Override
    public ResponseEntity<String> create(CommentDto commentDto) {
        Comment comment = commentMapper.toComment(commentDto);
        commentRepository.save(comment);
        return ResponseEntity.ok("Post created successfully");
    }

    @Override
    public List<CommentDtoResponse> getCommentsByArticleId(Integer articleId) {
        Optional<Post> post = postRepository.findById(articleId);
        return  post.map(value -> value.getComments()
                .stream()
                .map(commentMapper::toCommentDto)
                .collect(Collectors.toList())).orElse(null);
    }
}
