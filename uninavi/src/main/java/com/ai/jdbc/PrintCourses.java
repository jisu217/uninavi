package com.ai.jdbc;

import java.sql.*;

public class PrintCourses {
    public static void main(String[] args) throws Exception {
        String url  = "jdbc:mysql://localhost:3306/course_db?serverTimezone=Asia/Seoul&useSSL=false&characterEncoding=utf8";
        String user = "root";
        String pass = "007253kjh!";

        String sql = "SELECT id, course_code, course_name, professor, lecture_day, lecture_start, lecture_end, classroom " +
                "FROM courses ORDER BY id DESC LIMIT 10";

        try (Connection con = DriverManager.getConnection(url, user, pass);
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            System.out.println("=== courses (TOP 10) ===");
            while (rs.next()) {
                long id = rs.getLong("id");
                String code = rs.getString("course_code");
                String name = rs.getString("course_name");
                String prof = rs.getString("professor");
                String day = rs.getString("lecture_day");
                String start = rs.getString("lecture_start");
                String end = rs.getString("lecture_end");
                String room = rs.getString("classroom");
                System.out.printf("[%d] %s | %s | %s | %s | %s | %s | %s%n",
                        id, code, name, prof, day, start, end, room);
            }
            System.out.println("========================");
        }
    }
}