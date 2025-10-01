# 🏫 UniNavi - 스마트 캠퍼스 NFC 기반 실시간 건물 안내 시스템

> NFC/QR 태그를 활용한 실시간 캠퍼스 정보 제공 서비스

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)]()
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)]()
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)]()
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)]()

## 📌 프로젝트 소개

UniNavi는 캠퍼스 내 건물 입구에 부착된 **NFC(QR) 태그**를 스마트폰으로 태깅하면 해당 건물의 모든 정보를 실시간으로 제공하는 모바일 웹 서비스입니다.

강의실의 위치 및 실시간 사용 현황부터 교수 연구실 정보까지 파편화된 정보들을 통합적으로 제공하여 **학생, 교직원, 방문객** 모두의 캠퍼스 생활 편의성을 증대시킵니다.

### 🎯 프로젝트 배경 및 필요성

- **신입생 & 방문객**: 넓고 복잡한 캠퍼스에서 원하는 건물이나 강의실을 찾는 데 어려움
- **재학생**: 공강 시간이나 팀 프로젝트를 위해 빈 강의실을 찾기 위해 각 건물을 직접 돌아다녀야 하는 불편함
- **기존 안내판의 한계**: 실시간 정보 반영 불가능, 강의 스케줄 변경, 교수 재실 여부 등을 전혀 반영하지 못함

→ **NFC 기술을 활용한 즉각적이고 정확한 실시간 정보 제공**으로 캠퍼스 내 공간 탐색 시간 단축 및 공간 활용 효율성 극대화

## ✨ 주요 특징

### 🔴🟡🟢 실시간 정보 제공
현재 시간을 기준으로 학교 학사 데이터와 연동하여 강의실 상태를 직관적인 색상으로 시각화
- 🔴 **사용 중** - 현재 강의 진행 중
- 🟡 **수업 예정** - 곧 수업 시작
- 🟢 **사용 가능** - 빈 강의실

### 👤 개인화 서비스
- 개인 시간표 연동으로 **다음 수업 강의실** 우선 표시
- 자주 찾는 건물 **즐겨찾기** 기능
- 맞춤형 사용자 경험 제공

### 🔌 확장성 및 접근성
- NFC 태그 + QR 코드 병기로 모든 디바이스 지원
- 모듈식 아키텍처로 도서관 좌석, 식당 혼잡도 등 타 시스템 연동 용이
- PWA 기술 적용으로 앱처럼 설치 가능

### 💬 양방향 소통
- 시설 고장 등을 제보하는 커뮤니티 기능
- 관리자의 신속한 문제 파악 및 처리 현황 공유

## 🚀 주요 기능

### 👨‍🎓 사용자 기능
- **NFC/QR 기반 정보 조회** - 스마트폰 태깅만으로 건물 정보 페이지 즉시 이동
- **실시간 강의실 상태 확인** - 층별 강의실 목록을 색상으로 시각화
- **상세 정보 팝업** - 강의실 클릭 시 수업명, 담당 교수, 시간 등 표시
- **교수 연구실 안내** - 교수 목록, 위치, 재실 상태 확인
- **통합 검색** - 건물, 강의실 번호, 교수 이름으로 빠른 검색
- **개인화** - 내 시간표 연동 및 즐겨찾기 기능
- **길찾기 & 시설 제보** - 캠퍼스맵 연동 및 실시간 제보 기능

### 👨‍💼 관리자/교수 기능
- **데이터 관리 대시보드** - 건물, 강의실, 교수 정보 관리 (엑셀 임포트 지원)
- **NFC 태그 관리** - 태그와 건물 ID 매핑 인터페이스
- **교수용 상태 업데이트** - 간편한 재실 상태 실시간 업데이트
- **사용 통계 분석** - 건물별 태그 빈도, 시간대별 조회 수 등 데이터 시각화

## 🛠 기술 스택

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

## 📊 시스템 아키텍처
