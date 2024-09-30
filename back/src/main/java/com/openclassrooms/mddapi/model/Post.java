package com.openclassrooms.mddapi.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import jakarta.persistence.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Post {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    @JsonBackReference
    public Topic topic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    @JsonBackReference
    public User user;
}
