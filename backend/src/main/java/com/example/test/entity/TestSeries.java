package com.example.test.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;
import  com.example.test.entity.Question;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TestSeries {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @OneToMany(mappedBy = "testSeries", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Question> questions;

    // Getters and Setters
}