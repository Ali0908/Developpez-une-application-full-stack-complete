package com.openclassrooms.mddapi.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Post {
    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String content;
    private Date date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "topic_id")
    @JsonBackReference
    public Topic topic;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id")
    @JsonBackReference
    public User user;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;
}
