// src/main/java/com/ai/uninavi/repository/CourseRowRepository.java
package com.ai.uninavi.repository;

import com.ai.uninavi.domain.CourseRow;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRowRepository extends JpaRepository<CourseRow, Long> {

    // ====== 기존 조회(정확매칭) ======
    List<CourseRow> findByBuildingAndFloorAndLectureDayOrderByClassroomAscLectureStartAsc(
            String building, Byte floor, String lectureDay
    );

    List<CourseRow> findByBuildingAndFloorAndLectureDayAndClassroomOrderByLectureStartAsc(
            String building, Byte floor, String lectureDay, String classroom
    );

    // ====== 공백/대소문자 무시 버전 (일립관 a/b 같은 경우를 위해 권장) ======
    @Query("""
      select cr
      from CourseRow cr
      where lower(function('replace', coalesce(cr.building,''), ' ', '')) 
            = lower(function('replace', coalesce(:building,''), ' ', ''))
        and cr.floor = :floor
        and cr.lectureDay = :lectureDay
      order by coalesce(cr.classroom, '미지정') asc, cr.lectureStart asc
    """)
    List<CourseRow> findDayByBuildingFloorDowIgnoreCase(
            @Param("building") String building,
            @Param("floor") byte floor,
            @Param("lectureDay") String lectureDay
    );

    @Query("""
      select cr
      from CourseRow cr
      where lower(function('replace', coalesce(cr.building,''), ' ', '')) 
            = lower(function('replace', coalesce(:building,''), ' ', ''))
        and cr.floor = :floor
        and lower(function('replace', coalesce(cr.classroom,''), ' ', ''))
            = lower(function('replace', coalesce(:classroom,''), ' ', ''))
        and cr.lectureDay = :lectureDay
      order by cr.lectureStart asc
    """)
    List<CourseRow> findDayRoomByBuildingFloorDowIgnoreCase(
            @Param("building") String building,
            @Param("floor") byte floor,
            @Param("classroom") String classroom,
            @Param("lectureDay") String lectureDay
    );

    @Query("""
      select distinct coalesce(cr.classroom, '미지정')
      from CourseRow cr
      where lower(function('replace', coalesce(cr.building,''), ' ', '')) 
            = lower(function('replace', coalesce(:building,''), ' ', ''))
        and cr.floor = :floor
      order by coalesce(cr.classroom, '미지정') asc
    """)
    List<String> findDistinctClassroomsByBuildingAndFloor(
            @Param("building") String building,
            @Param("floor") byte floor
    );

    // ====== 검색 ======
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

    @Query("""
      select cr
      from CourseRow cr
      where lower(function('replace', coalesce(cr.courseName,''), ' ', ''))
            like concat('%', :norm, '%')
        and cr.lectureDay = case
             when :dow = 1 then '월'
             when :dow = 2 then '화'
             when :dow = 3 then '수'
             when :dow = 4 then '목'
             when :dow = 5 then '금'
             when :dow = 6 then '토'
             when :dow = 7 then '일'
             else cr.lectureDay end
      order by cr.building, cr.floor, cr.classroom, cr.lectureStart
    """)
    List<CourseRow> searchCoursesByNormAndDow(@Param("norm") String norm,
                                              @Param("dow") Integer dow,
                                              Pageable pageable);
}