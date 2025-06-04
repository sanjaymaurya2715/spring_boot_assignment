package com.example.test.controller;

import com.example.test.entity.Question;
import com.example.test.entity.TestSeries;
import com.example.test.repository.QuestionRepository;
import com.example.test.repository.TestSeriesRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Getter
@Setter
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TestSeriesRepository testSeriesRepository;

    @PostMapping("/{testSeriesId}")
    public Question addQuestionToTestSeries(@PathVariable Long testSeriesId, @RequestBody Question question) {
        TestSeries testSeries = testSeriesRepository.findById(testSeriesId).orElseThrow();
        question.setTestSeries(testSeries);
        return questionRepository.save(question);
    }

    @GetMapping("/test-series/{testSeriesId}")
    public List<Question> getQuestionsByTestSeries(@PathVariable Long testSeriesId) {
        return questionRepository.findByTestSeriesId(testSeriesId);
    }
}
