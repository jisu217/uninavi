package com.ai.course;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    // 생성자 주입 (OK)
    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> getAll() {
        return courseRepository.findAll();
    }

    @GetMapping("/count")
    public long count() {
        return courseRepository.count();
    }

    @GetMapping("/search")
    public List<Course> search(@RequestParam String q) {
        return courseRepository.findByCourseNameContaining(q);
    }
}