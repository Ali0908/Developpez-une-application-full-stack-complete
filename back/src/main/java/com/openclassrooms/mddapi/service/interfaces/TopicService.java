package com.openclassrooms.mddapi.service.interfaces;

import com.openclassrooms.mddapi.dto.SubscribeToTopicDto;
import com.openclassrooms.mddapi.dto.TopicDtoResponse;

import java.util.List;

public interface TopicService {

    /**
     * Get all topics
     * @return a list of topics
     */
    List<TopicDtoResponse> getAllTopics();

    /**
     * Subscribe to a topic
     * @param dto the topic to subscribe to
     */
    void subscribeToTopic(SubscribeToTopicDto dto);

    /**
     * Get all topics subscribed by a user
     * @param userId the user id
     * @return a list of topics
     */
    List<TopicDtoResponse> getAllTopicsSubscribedByUserId(Integer userId);
}
