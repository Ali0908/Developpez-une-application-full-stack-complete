package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.dto.TopicDtoResponse;
import com.openclassrooms.mddapi.dto.UserDtoResponse;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicMapper {


    public Topic toTopic(TopicDto topicDto) {
        Topic topic = new Topic();
        topic.setId(topicDto.getId());
        topic.setName(topicDto.getName());
        topic.setDescription(topicDto.getDescription());
        topic.setSubscription(topicDto.getSubscription());
        User user = new User();
        user.setTopics((List<Topic>) topicDto.getUsers());
        topic.setUser((List<User>) user);
        return topic;
    }

    public TopicDtoResponse toTopicDto(Topic topic) {
        List<UserDtoResponse> userResponses = topic.getUser().stream()
                .map(user -> new UserDtoResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail()
                )).collect(Collectors.toList());

        return new TopicDtoResponse(
                topic.getId(),
                topic.getName(),
                topic.getDescription(),
                topic.getSubscription(),
                userResponses  // Adding the list of user responses to the DTO response
        );
    }

}
