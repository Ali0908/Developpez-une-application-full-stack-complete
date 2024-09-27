package com.openclassrooms.mddapi.model;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
}
