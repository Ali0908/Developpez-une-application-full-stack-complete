package com.openclassrooms.mddapi.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import jakarta.persistence.*;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    public User user;
}
