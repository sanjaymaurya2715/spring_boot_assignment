package com.example.test.controller;
import com.example.test.entity.TestSeries;
import com.example.test.repository.TestSeriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-series")
public class TestSeriesController {

    @Autowired
    private TestSeriesRepository testSeriesRepository;

    @PostMapping
    public TestSeries createTestSeries(@RequestBody TestSeries testSeries) {
        System.out.println(testSeries.getTitle());
        return testSeriesRepository.save(testSeries);
    }

    @GetMapping
    public List<TestSeries> getAllTestSeries() {
        return testSeriesRepository.findAll();
    }

    @GetMapping("/{id}")
    public TestSeries getTestSeries(@PathVariable Long id) {
        return testSeriesRepository.findById(id).orElse(null);
    }
}
