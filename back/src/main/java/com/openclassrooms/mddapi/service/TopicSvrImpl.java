package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.service.interfaces.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicSvrImpl implements TopicService {
    private final TopicMapper topicMapper;
    private final TopicRepository topicRepository;


    @Autowired
    public TopicSvrImpl(TopicMapper topicMapper, TopicRepository topicRepository) {
        this.topicMapper = topicMapper;
        this.topicRepository = topicRepository;
    }

    public List<TopicDto> getAllTopics() {
        return topicRepository.findAll()
                .stream()
                .map(topicMapper::toTopicDto)
                .collect(Collectors.toList());
    }
}
