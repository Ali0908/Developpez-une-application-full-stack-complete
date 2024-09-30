package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.SubscribeToTopicDto;
import com.openclassrooms.mddapi.dto.TopicDtoResponse;
import com.openclassrooms.mddapi.service.interfaces.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicController {
    private final TopicService topicService;

    @GetMapping
    public List<TopicDtoResponse> getAllTopics() {
        return topicService.getAllTopics();
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribeToTopic(@RequestBody SubscribeToTopicDto dto) {
        topicService.subscribeToTopic(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subscribe/{userId}")
    public ResponseEntity<List<TopicDtoResponse>> getAllTopicsSubscribedByUserId(@PathVariable Integer userId) {
        List<TopicDtoResponse> topics = topicService.getAllTopicsSubscribedByUserId(userId);
        return ResponseEntity.ok(topics);
    }

}
