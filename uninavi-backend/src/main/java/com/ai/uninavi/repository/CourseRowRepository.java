// src/main/java/com/ai/uninavi/repository/CourseRowRepository.java
package com.ai.uninavi.repository;

import com.ai.uninavi.domain.CourseRow;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRowRepository extends JpaRepository<CourseRow, Long> {

    // ====== 기존 조회들 ======
    List<CourseRow> findByBuildingAndFloorAndLectureDayOrderByClassroomAscLectureStartAsc(
            String building, Byte floor, String lectureDay
    );

    List<CourseRow> findByBuildingAndFloorAndLectureDayAndClassroomOrderByLectureStartAsc(
            String building, Byte floor, String lectureDay, String classroom
    );

    @Query("""
      select distinct coalesce(cr.classroom, '미지정')
      from CourseRow cr
      where cr.building = :building and cr.floor = :floor
      order by coalesce(cr.classroom, '미지정') asc
    """)
    List<String> findDistinctClassroomsByBuildingAndFloor(
            @Param("building") String building,
            @Param("floor") byte floor
    );

    // ====== 검색용 추가 쿼리들 ======

    @Query("""
    select cr
    from CourseRow cr
    where lower(function('replace', coalesce(cr.classroom,''), ' ', ''))
          like concat('%', :norm, '%')
    order by cr.building, cr.floor, cr.classroom, cr.lectureStart
  """)
    List<CourseRow> searchRooms(@Param("norm") String norm, Pageable pageable);

    @Query("""
    select cr
    from CourseRow cr
    where lower(function('replace', coalesce(cr.courseName,''), ' ', ''))
          like concat('%', :norm, '%')
    order by cr.building, cr.floor, cr.classroom, cr.lectureStart
  """)
    List<CourseRow> searchCourses(@Param("norm") String norm, Pageable pageable);
}