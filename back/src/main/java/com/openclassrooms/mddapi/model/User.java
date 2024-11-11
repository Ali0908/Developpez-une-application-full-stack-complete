package com.openclassrooms.mddapi.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Integer id;
    private String username;
    private String password;
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_topics",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id")
    )
    private List<Topic> topics;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Token> tokens;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Post> posts;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
}
