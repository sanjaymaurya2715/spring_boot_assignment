package com.example.test.controller;
import com.example.test.entity.StudentEntity;
import com.example.test.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;


    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody StudentEntity student) {
        if(studentRepository.findByEmail(student.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        StudentEntity saved = studentRepository.save(student);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody StudentEntity loginRequest) {
        Optional<StudentEntity> studentOpt = studentRepository.findByEmail(loginRequest.getEmail());

        if(studentOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        StudentEntity student = studentOpt.get();

        if(!student.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        student.setPassword(null);
        return ResponseEntity.ok(student);
    }
}
