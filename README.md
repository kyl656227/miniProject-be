# 서울 궁궐 지도 (Seoul Palace Map)

> 서울의 5대 궁궐과 주요 박물관·미술관을 지도 위에서 탐험하고,  
> 문화유산 퀴즈로 역사를 배우는 인터랙티브 웹 서비스

## 배포

| | URL |
|---|---|
| GitHub Pages (정적 배포) | https://kyl656227.github.io/seoul-palace-map/ |
| Spring Boot 로컬 | `mvn spring-boot:run` → http://localhost:8080 |

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 인터랙티브 지도 | 궁궐(글로우 닷)·박물관(다이아몬드) 커스텀 마커, 호버 시 사진 툴팁 |
| 5대 궁궐 + 7개 박물관 | 경복궁·창덕궁·창경궁·덕수궁·종묘 + 국립중앙박물관 외 6곳 |
| 문화유산 정보 | 국가문화유산포털 Open API 연동 — 문화재 목록·설명 실시간 조회 |
| 문화유산 퀴즈 | 설명 힌트를 보고 문화재 이름 맞추기 (4지선다) |
| 퀴즈 점수 기록 | 세션 내 정답/전체 횟수 누적 표시 |
| 지하철 정보 | 장소별 가장 가까운 역·호선·도보 시간 자동 표시 |
| 한/영 언어전환 | 버튼 한 번으로 사이드바 전체를 한국어 ↔ 영어로 전환 |
| 추천 코스 4종 | 반나절·하루·궁궐완주·역사탐방 — 코스별 장소 순서 및 도보 정보 안내 |
| Wikipedia 사진 | REST API로 대표 사진 자동 로드, 마커 호버 시 말풍선 툴팁 표시 |
| 모바일 반응형 | 하단 시트(bottom sheet) 사이드바, 드래그 핸들, 플로팅 토글 버튼 |
| Fallback 처리 | API 실패 시 내장 데이터로 자동 전환 |

---

## 기술 스택

**Backend**
- Java 17 / Spring Boot 3.2.5
- Thymeleaf — 서버사이드 렌더링 (궁궐 목록 주입)
- RestTemplate — 외부 API HTTP 호출
- XML DOM 파싱 — 문화유산포털 XML → Java 객체 변환
- Maven

**Frontend**
- Vanilla JavaScript (프레임워크·번들러 없음)
- Kakao Maps JavaScript SDK (Spring Boot 버전)
- Leaflet 1.9.4 (GitHub Pages 버전)
- CSS Custom Properties 기반 디자인 토큰 시스템
- NanumSquare 웹폰트 (CDN)

**External API**
- [국가문화유산포털 Open API](https://www.heritage.go.kr) — 공공 Open API (핵심 데이터 소스)
- [카카오 지도 API](https://developers.kakao.com) — 지도 렌더링 및 커스텀 마커
- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) — 장소별 대표 사진 자동 로드

---

## 프로젝트 구조

```
src/main/
├── java/com/miniproject/palace/
│   ├── PalaceApplication.java
│   ├── controller/PalaceController.java   # 라우팅 & REST 엔드포인트
│   ├── service/HeritageApiService.java    # 문화유산 API 호출 & XML 파싱
│   └── model/
│       ├── Palace.java                    # 궁궐 기본 정보 모델
│       └── PalaceInfo.java               # 문화유산 항목 모델
└── resources/
    ├── templates/index.html               # Thymeleaf 메인 페이지
    ├── static/css/style.css               # 전체 UI 스타일
    ├── static/js/map.js                   # 지도·퀴즈·코스·언어 로직
    └── static/favicon.png
```

---

## 실행 방법

**1. 카카오 API 키 설정**

[카카오 개발자 센터](https://developers.kakao.com)에서 앱 생성 후 JavaScript 키를 발급받아  
`src/main/resources/application.properties`에 입력합니다.

```properties
kakao.maps.api.key=YOUR_KAKAO_JS_KEY
```

**2. 실행**

```bash
mvn spring-boot:run
```

**3. 접속**

```
http://localhost:8080
```

> 국가문화유산포털 API 키 없이도 내장 Fallback 데이터로 동작합니다.

---

## API 명세

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/` | 메인 지도 페이지 (Thymeleaf 렌더링) |
| GET | `/api/palace/{id}` | 궁궐별 문화유산 목록 조회 (국가문화유산포털 XML → JSON) |

---

## 등록된 장소

### 5대 궁궐

| 이름 | 영문명 | 마커 색상 |
|------|--------|-----------|
| 경복궁 | Gyeongbokgung | 🔴 빨강 |
| 창덕궁 | Changdeokgung | 🟢 초록 |
| 창경궁 | Changgyeonggung | 🔵 파랑 |
| 덕수궁 | Deoksugung | 🟠 주황 |
| 종묘 | Jongmyo | 🟣 보라 |

### 7개 박물관·미술관

국립중앙박물관, 국립민속박물관, 서울역사박물관, 국립현대미술관(서울관),  
전쟁기념관, 리움미술관, 서울시립미술관

---

## 구현 포인트

1. **공공 Open API 활용** — 문화재청 국가문화유산포털 XML API를 백엔드에서 `DocumentBuilder`로 파싱해 JSON으로 변환 후 프론트에 제공
2. **커스텀 마커** — `kakao.maps.CustomOverlay`로 CSS pulse 애니메이션 마커 직접 구현, 박물관은 다이아몬드 형태로 구분
3. **사진 프리패치** — Wikipedia API를 `Promise.all`로 병렬 호출해 페이지 로드 시 사진을 미리 캐시 → 마커 호버 시 즉시 표시
4. **퀴즈 생성** — 선택 문화재의 설명 앞 80자를 힌트로, 같은 궁궐의 다른 문화재를 오답으로 우선 구성. 4지선다 완성
5. **지하철 정보** — `SUBWAY_INFO` 객체에 12개 장소별 역명·호선색·도보 시간 정의, 장소 선택 시 사이드바에 자동 렌더링
6. **추천 코스** — `COURSES` 배열 4종(반나절/하루/궁궐완주/역사탐방), 코스 클릭 시 정류장 목록·도보 정보 렌더링
7. **한/영 전환** — `currentLang` 전역 상태로 사이드바 전체 텍스트를 전환. Spring Boot 버전은 Thymeleaf 렌더링 영역을 JS로 재빌드
8. **모바일 반응형** — 사이드바를 CSS bottom sheet로 전환 (`position: fixed; height: 68vh`), `isMobile()` 가드로 데스크톱에서 모바일 로직 완전 차단
9. **이중 Fallback** — 백엔드(`catch`)와 프론트(`.catch()`) 양쪽에 Fallback 설계, API 없이도 정상 동작
