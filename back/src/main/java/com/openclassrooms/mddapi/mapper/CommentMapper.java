package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.CommentDtoResponse;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentMapper {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment toComment(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setId(commentDto.getId());
        comment.setContent(commentDto.getContent());
        comment.setDate(commentDto.getDate());
        comment.setUser(userRepository.findById(commentDto.getAuthorId()).get());
        comment.setPost(postRepository.findById(commentDto.getPostId()).get());
        return comment;
    }

    public CommentDtoResponse toCommentDto(Comment comment) {
        return new CommentDtoResponse(
                comment.getContent(),
                comment.getDate(),
                comment.getUser().getId(),
                comment.getPost().getId());
    }
}
