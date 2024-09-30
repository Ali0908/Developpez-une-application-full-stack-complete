package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.SubscribeToTopicDto;
import com.openclassrooms.mddapi.dto.TopicDtoResponse;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.interfaces.TopicService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicSvrImpl implements TopicService {
    private final TopicMapper topicMapper;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;


    @Autowired
    public TopicSvrImpl(TopicMapper topicMapper, TopicRepository topicRepository, UserRepository userRepository) {
        this.topicMapper = topicMapper;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }

    public List<TopicDtoResponse> getAllTopics() {
        return topicRepository.findAll()
                .stream()
                .map(topicMapper::toTopicDto)
                .collect(Collectors.toList());
    }

    public void subscribeToTopic(SubscribeToTopicDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Topic topic = topicRepository.findById(dto.getTopicId())
                .orElseThrow(() -> new EntityNotFoundException("Topic not found"));

        if (!user.getTopics().contains(topic)) {
            user.getTopics().add(topic);
            userRepository.save(user);  // persist the new topic subscription
        } else {
            throw new IllegalStateException("User is already subscribed to this topic");
        }
    }


    public List<TopicDtoResponse> getAllTopicsSubscribedByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user.getTopics()
                .stream()
                .map(topicMapper::toTopicDto)
                .collect(Collectors.toList());
    }

}
