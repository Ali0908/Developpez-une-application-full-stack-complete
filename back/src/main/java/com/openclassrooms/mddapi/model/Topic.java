package com.openclassrooms.mddapi.model;


import lombok.*;

import jakarta.persistence.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Topic {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private Boolean subscription;

    @ManyToMany(mappedBy = "topics")
    public List<User> user;

    @OneToMany(mappedBy = "topic")
    private List<Post> posts;
}
