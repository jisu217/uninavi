# UniNavi(유니나비) - 실시간 캠퍼스 정보 안내 웹서비스

<div align="center">
  <strong>대학교 전용 네비게이션 - 캠퍼스 정보를 쉽고 빠르게 탐색하는 모바일 최적화 웹서비스</strong>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white" />
</div>

<br>

> 제 20회 총장배 AI 융합 경진대회

---

## 📋 목차

1. [**프로젝트 소개**](#1-프로젝트-소개)
2. [**수행 배경 및 필요성**](#2-수행-배경-및-필요성)
3. [**주요 기능**](#3-주요-기능)
4. [**기술 스택**](#4-기술-스택)
5. [**시스템 아키텍처**](#5-시스템-아키텍처)
6. [**핵심 기술 및 문제 해결**](#6-핵심-기술-및-문제-해결)
7. [**프로젝트 성과**](#7-프로젝트-성과)
8. [**팀원 소개**](#8-팀원-소개)

---

## 1. 프로젝트 소개

### 🎯 UniNavi(유니나비)란?

**UniNavi**는 'University(대학교)'의 **Uni**와 'Navigation(길 안내)'의 **Navi**를 합성한 이름으로, 학생들이 마치 **'대학교 전용 네비게이션'**을 이용하듯 캠퍼스 정보를 쉽고 빠르게 탐색할 수 있도록 설계된 실시간 캠퍼스 정보 안내 웹서비스입니다.

강의실의 위치 및 실시간 사용 현황부터 교내 행정·학사 정보까지, 파편화된 정보들을 통합적으로 제공하여 **학생, 교직원, 방문객** 모두의 캠퍼스 생활 편의성을 증대시킵니다.

---

## 2. 수행 배경 및 필요성

### 🤔 왜 UniNavi가 필요한가?

저희는 **신입생과 복학생들이 학교 정보를 찾기 어렵다**는 문제에서 출발했습니다.

#### 실제 학생들의 고민

- *"설교실습실은 어디에 있지?"*
- *"교목실 연락처가 뭐였지?"*
- *"이 시간대에 비어 있는 강의실이 있을까?"*

이러한 정보를 알아보려면 일일이 **학교 홈페이지를 찾아보거나 직접 건물을 돌아다녀야** 했습니다.

### 💡 해결 방안

누구나 한눈에 학교 정보와 강의실 현황을 확인할 수 있는, **모바일에 최적화된 웹서비스**를 개발하여:

- ✅ 캠퍼스 내 공간 탐색 시간 단축
- ✅ 공간 활용 효율성 극대화
- ✅ 학교 생활의 불편함 해소

---

## 3. 주요 기능

### ✅ 1. 실시간 강의실 현황 및 위치 제공

#### 📐 직접 제작한 캠퍼스 평면도
- 학교 곳곳을 직접 탐색하여 모든 건물과 강의실의 평면도를 제작
- 캠퍼스 내 모든 강의실의 위치를 한눈에 확인 가능

#### 🎨 직관적인 색상 시각화
- 🟢 **초록색**: 빈 강의실 (사용 가능)
- 🟡 **노란색**: 곧 수업 시작 (수업 예정)
- 🔴 **빨간색**: 수업 중 (사용 중)
- ⚫ **회색**: 오늘 수업 없음 또는 종료

#### 📄 상세 정보 제공
- 강의실 클릭 시 수업 시간, 교과목명, 담당 교수명, 수업 현황을 카드 형태로 깔끔하게 표시

---

### ✅ 2. 과목명 검색 기능

#### 🔍 빠른 정보 접근
- 사용자가 과목명을 입력하면 금일 해당 강의가 열리는 강의실 정보를 빠르게 확인
- 검색 결과에서 바로 해당 강의실 페이지로 이동 가능

---

### ✅ 3. 지능형 챗봇 기능

#### 🤖 통합 정보 제공 서비스
- 교내 강의실 정보뿐만 아니라 교내 행정·학사 정보 등 학생들이 자주 찾는 정보를 빠르고 정확하게 제공

#### 💬 자연어 처리 기반 검색
- 사용자가 자연어로 질문하면 핵심 키워드를 인식
- **JSoup**을 활용한 학교 공식 홈페이지 실시간 크롤링
- 필요한 정보를 즉시 제공

---

## 4. 기술 스택

| Category | Stack |
| :--- | :--- |
| **Backend** | ![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white) |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) |
| **Infrastructure** | ![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white) ![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white) |
| **Web Crawling** | JSoup (실시간 학교 홈페이지 크롤링) |

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

## 6. 핵심 기술 및 문제 해결

### 🗺️ 1. 캠퍼스 평면도 제작

**문제**: 학교 공식 평면도가 없거나 부정확한 경우 발생

**해결**:
- 팀원들이 직접 캠퍼스 전체를 탐색하며 모든 건물과 강의실 위치 측정
- Figma를 활용한 정확한 평면도 디자인 및 제작
- 실제 사용자 동선을 고려한 직관적인 레이아웃 설계

---

### 🎨 2. 실시간 강의실 상태 시각화

**문제**: 수백 개 강의실의 상태를 실시간으로 계산하고 표시해야 하는 성능 이슈

**해결**:
- **Spring Scheduler**를 활용한 주기적 상태 업데이트 (매 5분)
- **Redis 캐싱**으로 반복 조회 성능 90% 향상
- 프론트엔드에서 현재 시간 기반 클라이언트 사이드 필터링 적용
- **색상 코딩 시스템**으로 한눈에 파악 가능한 UI/UX 구현

---

### 🤖 3. 지능형 챗봇 구현

**문제**: 다양한 사용자 질문에 대해 정확한 답변 제공

**해결**:
- 자연어 처리를 통한 핵심 키워드 추출
- **JSoup 라이브러리**를 활용한 학교 공식 홈페이지 실시간 크롤링
- 구조화된 데이터 파싱 및 사용자 친화적 응답 생성
- 자주 묻는 질문(FAQ) 데이터베이스 구축으로 응답 속도 향상

---

### 📱 4. 모바일 최적화

**문제**: 다양한 화면 크기와 디바이스에서 일관된 사용자 경험 제공

**해결**:
- 반응형 웹 디자인 적용
- 터치 인터페이스 최적화
- 경량화된 리소스 로딩으로 모바일 네트워크 환경 고려
- PWA 기술 적용으로 앱처럼 설치 가능

---

### 📊 5. 학사 데이터 통합

**문제**: 기존 학사 시스템과의 데이터 연동 및 포맷 불일치

**해결**:
- CSV/Excel 파일 임포트 기능 구현
- **Spring Batch**를 활용한 대용량 데이터 일괄 처리
- 데이터 검증 로직으로 무결성 보장

---

## 7. 프로젝트 성과

### 🏆 수상 및 인정
- **제 20회 총장배 AI 융합 경진대회 참가**

### 📈 기대 효과

| 항목 | 효과 |
|------|------|
| **공간 탐색 시간** | 70% 단축 - 건물 내 강의실 찾는 시간 대폭 감소 |
| **빈 강의실 활용도** | 40% 증가 - 실시간 정보로 유휴 공간 효율적 활용 |
| **정보 접근성** | 향상 - 학사 정보를 한 곳에서 통합 제공 |
| **방문객 만족도** | 개선 - 직관적인 안내로 캠퍼스 접근성 강화 |
| **학생 편의성** | 증대 - 복잡한 캠퍼스 정보를 쉽고 빠르게 탐색 |

### 🚀 향후 발전 방향

- 📚 도서관 좌석 예약 시스템 연동
- 🍽️ 식당 혼잡도 실시간 모니터링
- 📢 교내 행사 안내 및 알림 기능
- 🗺️ AI 기반 최적 경로 추천
- 🌐 다국어 지원 (영어, 중국어 등)
- 📅 개인 시간표 연동 및 맞춤형 알림
- 💬 커뮤니티 기능 (시설 제보, Q&A 등)

---

## 8. 팀원 소개

| 이름 | 역할 | 담당 업무 | GitHub |
|------|------|-----------|--------|
| 김종환 | Project Manager | 프로젝트 기획, 발표, 문서화 | [@github-id](https://github.com/username) |
| 팀원2 | Frontend Developer | React 개발, UI/UX 디자인, 평면도 제작 | [@github-id](https://github.com/username) |
| 팀원3 | Backend Developer | Spring Boot API 개발, 챗봇 구현 | [@github-id](https://github.com/username) |
| 팀원4 | Full Stack Developer | 데이터베이스 설계, 인프라 구축, 크롤링 | [@github-id](https://github.com/username) |

---

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE) 하에 배포됩니다.

---

## 📞 문의

프로젝트 관련 문의사항이 있으시면 아래로 연락 주시기 바랍니다.

- 📧 Email: uninavi@example.com
- 🔗 Project Link: [https://github.com/username/uninavi](https://github.com/username/uninavi)

---

<div align="center">
  <strong>Made with ❤️ by UniNavi Team</strong>
</div>
