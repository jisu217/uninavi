package com.ai.uninavi.domain;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "courses")
public class CourseRow {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="course_code", nullable=false) private String courseCode;
    @Column(name="course_name", nullable=false) private String courseName;

    @Column(name="course_type") private String courseType;
    @Column(name="category")    private String category;
    @Column(name="grade_year")  private Byte gradeYear;
    @Column(name="credit")      private Byte credit;

    @Column(name="professor")   private String professor;
    @Column(name="lecture_day") private String lectureDay;     // "월","화","수"...
    @Column(name="lecture_start") private LocalTime lectureStart; // TIME
    @Column(name="lecture_end")   private LocalTime lectureEnd;   // TIME

    @Column(name="classroom")   private String classroom;      // "AI융합실습실2", "갈멜관 301호" 등
    @Column(name="building")    private String building;       // "갈멜관"
    @Column(name="floor")       private Byte floor;            // 1, 2, ... B1은 -1 권장

    // getters (필요하면 setter/롬복)
    public Long getId() { return id; }
    public String getCourseCode() { return courseCode; }
    public String getCourseName() { return courseName; }
    public String getCourseType() { return courseType; }
    public String getCategory() { return category; }
    public Byte getGradeYear() { return gradeYear; }
    public Byte getCredit() { return credit; }
    public String getProfessor() { return professor; }
    public String getLectureDay() { return lectureDay; }
    public LocalTime getLectureStart() { return lectureStart; }
    public LocalTime getLectureEnd() { return lectureEnd; }
    public String getClassroom() { return classroom; }
    public String getBuilding() { return building; }
    public Byte getFloor() { return floor; }
}