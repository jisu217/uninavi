// src/main/java/com/ai/uninavi/chatbot/CourseLookupRepository.java
package com.ai.uninavi.chatbot;

import com.ai.uninavi.domain.CourseRow;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CourseLookupRepository extends Repository<CourseRow, Long> {

    interface CourseRow {
        String getCourse_name(); // 별칭 그대로 사용 (스네이크 케이스 매핑)
        String getBuilding();
        Integer getFloor();
        String getClassroom();
    }

    @Query(value = """
    SELECT course_name, building, floor, classroom
    FROM course_db.courses
    WHERE REGEXP_REPLACE(LOWER(course_name), '[^0-9a-z가-힣]', '') = :norm
    LIMIT 1
    """, nativeQuery = true)
    Optional<CourseRow> findOneByNorm(@Param("norm") String norm);
}