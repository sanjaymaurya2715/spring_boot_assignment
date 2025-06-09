package com.example.test.controller;

import com.example.test.entity.Result;
import com.example.test.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController {

    @Autowired
    private ResultRepository ResultRepository;

    // Save new Result
    @PostMapping("/submit")
    public Result saveResult(@RequestBody Result Result) {
        Result.setSubmittedAt(LocalDateTime.now());
        return ResultRepository.save(Result);
    }

    // Get Results by student
    @GetMapping("/student/{studentId}")
    public List<Result> getResultsByStudent(@PathVariable Long studentId) {
        return ResultRepository.findByStudentId(studentId);
    }


}
