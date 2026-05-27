# 🏯 서울 궁궐 지도 (Seoul Palace Map)

> 서울의 5대 궁궐과 주요 박물관·미술관을 카카오맵 위에서 탐험하고,  
> 문화유산 퀴즈로 배우는 인터랙티브 웹 서비스

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🗺️ 인터랙티브 지도 | 카카오맵 기반, 궁궐(글로우 닷)·박물관(다이아몬드) 커스텀 마커 |
| 🏛️ 5대 궁궐 + 7개 박물관 | 경복궁·창덕궁·창경궁·덕수궁·종묘 + 국립중앙박물관 외 6곳 |
| 📖 문화유산 정보 | 국가문화유산포털 Open API 연동, 주요 문화재 설명 즉시 조회 |
| 🧠 문화유산 퀴즈 | 설명 힌트를 보고 문화재 이름 맞추기 (4지선다) |
| 📷 위키피디아 사진 | Wikipedia REST API로 대표 사진 자동 로드 & 말풍선 툴팁 |
| 🎯 이모지 커서 | 각 장소별 커스텀 이모지 커서 (🐉🪷🦢🌹🥁) |
| 🔄 Fallback 처리 | API 실패 시 내장 데이터로 자동 전환 |

## 🛠️ 기술 스택

**Backend**
- Java 17
- Spring Boot 3.2.5
- Thymeleaf (서버사이드 렌더링)
- RestTemplate (외부 API 호출)
- XML DOM 파싱 (국가문화유산포털 Open API)
- Maven

**Frontend**
- Vanilla JavaScript (번들러 없음)
- Kakao Maps JavaScript SDK
- Wikipedia REST API (`/api/rest_v1/page/summary`)
- NanumSquare 웹폰트
- CSS Custom Properties

**External API**
- [카카오 지도 API](https://developers.kakao.com/docs/latest/ko/local/dev-guide)
- [국가문화유산포털 Open API](https://www.heritage.go.kr)
- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/)

## 📁 프로젝트 구조

```
src/main/
├── java/com/miniproject/palace/
│   ├── PalaceApplication.java           # 진입점
│   ├── controller/PalaceController.java  # 라우팅 & REST API
│   ├── service/HeritageApiService.java   # 문화유산 API 호출 & XML 파싱
│   └── model/
│       ├── Palace.java                   # 궁궐 정보 모델
│       └── PalaceInfo.java              # 문화유산 항목 모델
└── resources/
    ├── templates/index.html              # Thymeleaf 메인 페이지
    ├── static/css/style.css              # 전체 UI 스타일
    └── static/js/map.js                  # 지도 & 퀴즈 로직
```

## 🚀 실행 방법

**1. 카카오 API 키 설정**

[카카오 개발자 센터](https://developers.kakao.com)에서 앱 생성 후 JavaScript 키를 발급받아  
`src/main/resources/application.properties`에 입력합니다.

```properties
kakao.maps.api.key=YOUR_KAKAO_JS_KEY
```

**2. 애플리케이션 실행**

```bash
mvn spring-boot:run
```

**3. 브라우저 접속**

```
http://localhost:8080
```

> 국가문화유산포털 API 키가 없어도 내장 Fallback 데이터로 동작합니다.

## 📡 API 명세

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/` | 메인 지도 페이지 |
| GET | `/api/palace/{id}` | 궁궐별 문화유산 목록 조회 |

## 🗺️ 등록된 장소

### 5대 궁궐
| 이름 | 영문명 | 이모지 |
|------|--------|--------|
| 경복궁 | Gyeongbokgung | 🐉 |
| 창덕궁 | Changdeokgung | 🪷 |
| 창경궁 | Changgyeonggung | 🦢 |
| 덕수궁 | Deoksugung | 🌹 |
| 종묘 | Jongmyo Shrine | 🥁 |

### 7개 박물관·미술관
국립중앙박물관, 국립민속박물관, 서울역사박물관, 국립현대미술관(서울관),  
전쟁기념관, 리움미술관, 서울시립미술관
