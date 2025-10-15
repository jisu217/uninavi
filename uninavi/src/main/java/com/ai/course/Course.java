package com.ai.course;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_code")
    private String courseCode;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_type")
    private String courseType;

    private String category;

    @Column(name = "grade_year")
    private Byte gradeYear;

    private Byte credit;

    private String professor;

    @Column(name = "lecture_time")
    private String lectureTime;

    private String classroom;
}