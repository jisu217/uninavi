// 상태 → 문장
export const STATUS_TEXT = {
  IN_CLASS: "현재 수업이 진행 중입니다.",
  SOON: "곧 수업이 시작됩니다.",
  IDLE: "현재 빈 강의실입니다.",
  OVER: "오늘 수업이 종료되었습니다.",
};

// 의도 트리거(간단 규칙)
export const INTENT_TRIGGERS = {
  // 건물/층/호의 상태를 알고 싶을 때
  room_status: [/수업/, /지금/, /상태/],
  // 특정 층의 빈 강의실 묻기
  floor_idle: [/빈.*강의실/, /강의실.*빈/, /비는.*강의실/],
  // 위치 묻기 (기본)
  room_where: [/어디/, /어딨어/, /위치/],
};