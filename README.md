# UniNavi_NFC/QR 기반 실시간 캠퍼스 정보 안내 웹 서비스

<div align="center">
  <strong>한 번의 태그로 캠퍼스를 탐색하다.</strong>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white" />
</div>

<br>

> 제 20회 총장배 AI 융합 경진대회_장려상

---

## 목차

1. [**프로젝트 소개**](#1-프로젝트-소개)
2. [**수행 배경 및 필요성**](#2-수행-배경-및-필요성)
3. [**주요 기능**](#3-주요-기능)
4. [**기술 스택**](#4-기술-스택)
5. [**시스템 아키텍처**](#5-시스템-아키텍처)
6. [**프로젝트 성과**](#6-프로젝트-성과)
7. [**팀원 소개**](#7-팀원-소개)

---

## 1. 프로젝트 소개

### UniNavi(유니나비)란?

**UniNavi**는 'University(대학교)'의 **Un**i와 'Navigation(길 안내)'의 **Navi**를 합성한 이름으로  
학생들이 캠퍼스 정보를 쉽고 빠르게 탐색할 수 있도록 설계된 실시간 캠퍼스 정보 안내 웹 서비스입니다.

강의실 위치 및 실시간 사용 현황, 교내 행정·학사 정보 등의  
모든 정보를 한 곳에 통합하여 학생, 교직원, 방문객 모두의 캠퍼스 생활 편의를 높입니다.

---

## 2. 수행 배경 및 필요성

### 왜 UniNavi가 필요한가?

**신입생과 복학생들이 학교 정보를 찾기 어렵다**는 문제에서 출발

"설교실습실은 어디에 있지?"  
"교목실 연락처가 뭐였지?"  
"이 시간대에 비어 있는 강의실이 있을까?"

-> 일일이 **학교 홈페이지를 찾아보거나 직접 건물을 돌아다녀야** 한다는 불편함

---

## 3. 주요 기능

### (1) 실시간 강의실 현황 및 위치 제공

-  **직접 제작한 캠퍼스 평면도**  
   학교 곳곳을 **직접 탐색**하여 **모든 건물과 강의실의 평면도** 제작

-  **직관적인 색상 시각화**  
  🟢 초록색: " 빈 강의실 "  
  🟡 노란색: " 곧 수업 시작 "   
  🔴 빨간색: " 수업 중 "  

-  **상세 정보 제공**  
  강의실 클릭 시 **수업 시간, 교과목명, 담당 교수명, 수업 현황**을 카드 형태로 표시

### (2) 과목명 검색 기능  

-  **빠른 정보 접근**  
   사용자가 과목명을 입력하면 금일 해당 강의가 열리는 강의실 정보를 빠르게 확인  

### (3) 지능형 챗봇 기능

- **통합 정보 제공 서비스**  
  교내 강의실 정보뿐만 아니라 교내 행정·학사 정보 등 학생들이 자주 찾는 정보를 빠르고 정확하게 제공

- **자연어 처리 기반 검색**  
  `JSoup`을 활용한 학교 공식 홈페이지 실시간 크롤링   
  사용자가 자연어로 질문하면 핵심 키워드를 인식
  
---

## 4. 기술 스택

| Category | Stack |
| :--- | :--- |
| Backend | ![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white) |
| Frontend | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) |
| Database | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) |
| Infrastructure | ![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white) ![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white) |
| Web Crawling | JSoup (실시간 학교 홈페이지 크롤링) |

---

## 5. 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │   Mobile    │  │   Tablet    │  │     Desktop      │   │
│  │   Browser   │  │   Browser   │  │     Browser      │   │
│  └─────────────┘  └─────────────┘  └──────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Load Balancer (NGINX)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer (AWS)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Spring Boot Application Server             │  │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │  │
│  │  │   REST API │  │  Scheduler │  │   Security   │  │  │
│  │  └────────────┘  └────────────┘  └──────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬───────────────────────────────┬────────────────┘
             │                               │
             ▼                               ▼
┌──────────────────────┐        ┌──────────────────────────┐
│   Database Layer     │        │   External Services      │
│  ┌────────────────┐  │        │  ┌────────────────────┐ │
│  │     MySQL      │  │        │  │  University Portal │ │
│  │   (RDS/EC2)    │  │        │  │   (JSoup Crawl)    │ │
│  └────────────────┘  │        │  └────────────────────┘ │
└──────────────────────┘        └──────────────────────────┘
```

---


## 6. 프로젝트 성과

제 20회 총장배 AI 융합 경진대회_장려상

---

## 7. 팀원 소개

| 이름 | 역할 | 담당 업무 | GitHub |
|------|------|-----------|--------|
| 강지수 ||||
| 김종환 ||||
| 박지민 ||||
| 정아영 ||||

---
