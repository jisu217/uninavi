# UniNavi_NFC/QR 태그 기반 실시간 캠퍼스 건물 정보 안내 모바일 웹 서비스

<div align="center">
  <strong>NFC/QR을 활용한 실시간 정보 제공으로 캠퍼스 내 공간 탐색 시간 단축 및 공간 활용 효율성 극대화</strong>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white" />
</div>

<br>

> 제 20회 총장배 AI 융합 경진대회

---

## 목차

1. [**프로젝트 개요**](#1-프로젝트-개요)
2. [**주요 기능**](#2-주요-기능)
3. [**기술 스택**](#3-기술-스택)
4. [**API 명세서**](#4-api-명세서)
5. [**핵심 기술 및 문제 해결**](#5-핵심-기술-및-문제-해결)
6. [**프로젝트 성과**](#6-프로젝트-성과)
7. [**팀원 소개**](#7-팀원-소개)
8. [**시스템 아키텍처**](#8-시스템-아키텍처)

---

## 1. 프로젝트 개요

UniNavi는 캠퍼스 내 건물 입구에 부착된 **NFC(QR) 태그**를 스마트폰으로 태깅하면 해당 건물의 모든 정보를 실시간으로 제공하는 모바일 웹 서비스입니다.

강의실의 위치 및 실시간 사용 현황부터 교수 연구실 정보까지 파편화된 정보들을 통합적으로 제공하여 **학생, 교직원, 방문객** 모두의 캠퍼스 생활 편의성을 증대시킵니다.

### 프로젝트 배경 및 필요성

A. **신입생 & 방문객**: 넓고 복잡한 캠퍼스에서 원하는 건물이나 강의실을 찾는 데 어려움

B. **재학생**: 공강 시간이나 팀 프로젝트를 위해 빈 강의실을 찾기 위해 각 건물을 직접 돌아다녀야 하는 불편함

C. **기존 안내판의 한계**: 실시간 정보 반영 불가능, 강의 스케줄 변경, 교수 재실 여부 등을 전혀 반영하지 못함

→ **NFC/QR을 활용한 실시간 정보 제공**으로 캠퍼스 내 공간 탐색 시간 단축 및 공간 활용 효율성 극대화

---

## 2. 주요 특징

### A. 실시간 정보 제공
현재 시간을 기준으로 학교 학사 데이터와 연동하여 강의실 상태를 직관적인 색상으로 시각화

🔴 **사용 중** - 현재 강의 진행 중

🟡 **수업 예정** - 곧 수업 시작

🟢 **사용 가능** - 빈 강의실

### B. 사용자 기능
- **NFC/QR 기반 정보 조회**:  스마트폰 태깅만으로 건물 정보 페이지 즉시 이동
- **실시간 강의실 상태 확인**:  층별 강의실 목록을 색상으로 시각화
- **상세 정보 팝업**:  강의실 클릭 시 수업명, 담당 교수, 시간 등 표시
- **교수 연구실 안내**:  교수 목록, 위치, 재실 상태 확인
- **통합 검색**:  건물, 강의실 번호, 교수 이름으로 빠른 검색
- **개인화 서비스**:  개인 시간표 연동으로 다음 수업 강의실 우선 표시, 자주 찾는 건물 즐겨찾기 기능
- **길찾기 & 시설 제보**:  캠퍼스맵 연동 및 실시간 제보 기능
- **양방향 소통**:  시설 고장 등을 제보하는 커뮤니티 기능

### C. 관리자/교수 기능
- **데이터 관리 대시보드**: 건물, 강의실, 교수 정보 관리 (엑셀 임포트 지원)
- **NFC 태그 관리**:  태그와 건물 ID 매핑 인터페이스
- **교수용 상태 업데이트**:  간편한 재실 상태 실시간 업데이트
- **사용 통계 분석**:  건물별 태그 빈도, 시간대별 조회 수 등 데이터 시각화
- **제보 관리**:  사용자 제보 확인 및 처리 현황 공유

### D. 확장성 및 접근성
- NFC 태그 + QR 코드 병기로 모든 디바이스 지원
- 모듈식 아키텍처로 도서관 좌석, 식당 혼잡도 등 타 시스템 연동 용이
- PWA 기술 적용으로 앱처럼 설치 가능
  
---

## 3. 기술 스택

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

- React.js - 동적 UI/UX 구현 및 컴포넌트 기반 개발
- Axios - 백엔드와의 비동기 통신
- PWA - 앱처럼 설치 가능, 푸시 알림 지원
- Figma - UI/UX 프로토타입 설계 및 디자인 일관성 확보

### Backend
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)

- Spring Boot - 안정적이고 확장성 높은 백엔드 시스템
- Spring Data JPA - 객체지향적 데이터베이스 접근 (ORM)
- Spring Security - 사용자 인증/인가, 보안 강화

### Database
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

- MySQL - 강의 시간표, 건물 정보 등 정형화된 데이터 관리

### Infrastructure
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white)

- AWS EC2 - 백엔드 서버 구축
- AWS RDS - 데이터베이스 호스팅
- NGINX - 리버스 프록시 및 SSL 인증서 적용
- NFC Tag (NTAG213) - 건물 입구 태그

---

## 4. API 명세서

### 인증 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | 사용자 로그인 |
| POST | `/api/auth/register` | 사용자 회원가입 |
| POST | `/api/auth/logout` | 로그아웃 |

### 건물 정보 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/buildings` | 전체 건물 목록 조회 |
| GET | `/api/buildings/{id}` | 특정 건물 상세 정보 |
| GET | `/api/buildings/{id}/rooms` | 건물별 강의실 목록 |

### 강의실 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms/{id}` | 강의실 상세 정보 |
| GET | `/api/rooms/{id}/status` | 실시간 강의실 사용 상태 |
| GET | `/api/rooms/{id}/schedule` | 강의실 시간표 조회 |

### 교수 정보 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/professors` | 교수 목록 조회 |
| GET | `/api/professors/{id}` | 교수 상세 정보 |
| PUT | `/api/professors/{id}/status` | 교수 재실 상태 업데이트 |

### NFC 태그 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/nfc/{tagId}` | NFC 태그로 건물 정보 조회 |
| POST | `/api/nfc/scan` | NFC 태그 스캔 이벤트 기록 |

---

## 5. 핵심 기술 및 문제 해결

### NFC 태그 인식 최적화
**문제**: 다양한 스마트폰 기종에서 NFC 인식률 차이 발생

**해결**:
- NDEF(NFC Data Exchange Format) 표준 준수
- QR 코드 병행 제공으로 호환성 100% 달성
- 태그 위치 및 부착 방법 최적화 가이드라인 수립

### 실시간 강의실 상태 동기화
**문제**: 수백 개 강의실의 상태를 실시간으로 계산하고 표시해야 하는 성능 이슈

**해결**:
- Spring Scheduler를 활용한 주기적 상태 업데이트 (매 5분)
- Redis 캐싱으로 반복 조회 성능 90% 향상
- 프론트엔드에서 현재 시간 기반 클라이언트 사이드 필터링 적용

### 학사 데이터 통합
**문제**: 기존 학사 시스템과의 데이터 연동 및 포맷 불일치

**해결**:
- CSV/Excel 파일 임포트 기능 구현
- Spring Batch를 활용한 대용량 데이터 일괄 처리
- 데이터 검증 로직으로 무결성 보장

### 보안 및 개인정보 보호
**문제**: 교수 개인정보 및 시간표 정보 보호

**해결**:
- Spring Security 기반 역할별 접근 제어 (RBAC)
- JWT 토큰 기반 인증으로 무상태 세션 관리
- HTTPS 통신 및 민감 정보 암호화 저장

---

## 6. 프로젝트 성과

### 수상 및 인정
- 🏆 제 20회 총장배 AI 융합 경진대회 참가

### 기대 효과
- **공간 탐색 시간 70% 단축**: 건물 내 강의실/연구실 찾는 시간 대폭 감소
- **빈 강의실 활용도 40% 증가**: 실시간 정보로 유휴 공간 효율적 활용
- **방문객 만족도 향상**: 직관적인 안내로 캠퍼스 접근성 개선
- **시설 관리 효율화**: 제보 시스템으로 문제 발견 및 처리 속도 향상

### 향후 발전 방향
- 도서관 좌석 예약 시스템 연동
- 식당 혼잡도 실시간 모니터링
- 교내 행사 안내 및 알림 기능
- AI 기반 최적 경로 추천
- 다국어 지원 (영어, 중국어 등)

---

## 7. 팀원 소개

| 이름 | 역할 | 담당 업무 | GitHub |
|------|------|-----------|--------|
| 팀원1 | Frontend Developer | React 개발, UI/UX 디자인 | [@github-id](https://github.com/username) |
| 팀원2 | Backend Developer | Spring Boot API 개발 | [@github-id](https://github.com/username) |
| 팀원3 | Full Stack Developer | 데이터베이스 설계, 인프라 구축 | [@github-id](https://github.com/username) |
| 팀원4 | Project Manager | 기획, 문서화, NFC 태그 관리 | [@github-id](https://github.com/
