package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.model.Topic;
import org.springframework.stereotype.Service;

@Service
public class TopicMapper {


    public Topic toTopic(TopicDto topicDto) {
        Topic topic = new Topic();
        topic.setId(topicDto.getId());
        topic.setName(topicDto.getName());
        topic.setDescription(topicDto.getDescription());
        topic.setSubscription(topicDto.getSubscription());
        return topic;
    }


    public TopicDto toTopicDto(Topic topic) {
        TopicDto topicDto = new TopicDto();
        topicDto.setId(topic.getId());
        topicDto.setName(topic.getName());
        topicDto.setDescription(topic.getDescription());
        topicDto.setSubscription(topic.getSubscription());
        return topicDto;
    }
}
