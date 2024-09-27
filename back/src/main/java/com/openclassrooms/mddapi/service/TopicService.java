package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.TopicDto;

import java.util.List;

public interface TopicService {

    /**
     * Get all topics
     * @return a list of topics
     */
    List<TopicDto> getAllTopics();
}
