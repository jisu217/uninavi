package com.ai.uninavi.chatbot.phone;

public record PhoneContact(
        String dept,      // 부서/보직(표의 '부서명' 또는 '보직/직책')
        String position,  // 직책/직급
        String person,    // 성명
        String tel,       // 연락처(전화번호만 정규화)
        String section,   // 섹션명(표의 caption 또는 인접 제목)
        String sourceUrl  // 출처 URL
) {}