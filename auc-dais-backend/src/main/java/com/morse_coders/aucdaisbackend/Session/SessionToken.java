package com.morse_coders.aucdaisbackend.Session;

import com.morse_coders.aucdaisbackend.Users.Users;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class SessionToken {
    @SequenceGenerator(name = "session_token_seq", sequenceName = "session_token_seq", allocationSize = 1)
    @GeneratedValue(generator = "session_token_seq")
    @Id
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private Users user;


    public SessionToken() {
    }

    public SessionToken(String token, LocalDateTime createdAt, LocalDateTime expiresAt, Users user) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
