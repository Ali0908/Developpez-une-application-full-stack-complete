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
    private Integer id;
    private String name;
    private String description;
    @ManyToMany(mappedBy = "topics", fetch = FetchType.EAGER)
    public List<User> user;

    @OneToMany(mappedBy = "topic")
    private List<Post> posts;
}
