package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.request.SubscribeToTopicDto;
import com.openclassrooms.mddapi.dto.response.TopicDtoResponse;
import com.openclassrooms.mddapi.service.interfaces.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> subscribeToTopic(@RequestBody SubscribeToTopicDto dto) {
        topicService.subscribeToTopic(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Abonnement réussi");
    }


    @DeleteMapping("/unsubscribe")
    public ResponseEntity<Void> unsubscribeToTopic(@RequestBody SubscribeToTopicDto dto) {
        topicService.unsubscribeToTopic(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subscribe/{userId}")
    public ResponseEntity<List<TopicDtoResponse>> getAllTopicsSubscribedByUserId(@PathVariable Integer userId) {
        List<TopicDtoResponse> topics = topicService.getAllTopicsSubscribedByUserId(userId);
        return ResponseEntity.ok(topics);
    }

}
