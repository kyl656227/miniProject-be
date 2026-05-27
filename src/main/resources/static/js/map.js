/* PALACES는 Thymeleaf가 주입 — emoji/wikiTitle/photo 필드 추가 */
const PALACE_EXTRA = {
    1: { emoji: '🐉', wikiTitle: 'Gyeongbokgung' },
    2: { emoji: '🪷', wikiTitle: 'Changdeokgung' },
    3: { emoji: '🦢', wikiTitle: 'Changgyeonggung' },
    4: { emoji: '🌹', wikiTitle: 'Deoksugung' },
    5: { emoji: '🥁', wikiTitle: 'Jongmyo_Shrine' },
};
PALACES.forEach(p => {
    const extra = PALACE_EXTRA[p.id] || {};
    p.emoji     = extra.emoji     || '🏯';
    p.wikiTitle = extra.wikiTitle || '';
    p.photo     = '';
});

const MUSEUMS = [
    { id: 'm1', name: '국립중앙박물관', nameEn: 'National Museum of Korea',            lat: 37.5228, lng: 126.9804, address: '서울 용산구 서빙고로 137',       color: '#2563EB', emoji: '🏺', wikiTitle: 'National_Museum_of_Korea',                      photo: '' },
    { id: 'm2', name: '국립민속박물관', nameEn: 'National Folk Museum',                lat: 37.5826, lng: 126.9786, address: '서울 종로구 삼청로 37',           color: '#059669', emoji: '🎎', wikiTitle: 'National_Folk_Museum_of_Korea',                  photo: '' },
    { id: 'm3', name: '서울역사박물관', nameEn: 'Seoul Museum of History',             lat: 37.5717, lng: 126.9715, address: '서울 종로구 새문안로 55',         color: '#7C3AED', emoji: '🗺️', wikiTitle: 'Seoul_Museum_of_History',                        photo: '' },
    { id: 'm4', name: '국립현대미술관', nameEn: 'MMCA Seoul',                          lat: 37.5790, lng: 126.9746, address: '서울 종로구 삼청로 30',           color: '#DC2626', emoji: '🎨', wikiTitle: 'National_Museum_of_Modern_and_Contemporary_Art', photo: '' },
    { id: 'm5', name: '전쟁기념관',     nameEn: 'War Memorial of Korea',               lat: 37.5361, lng: 126.9771, address: '서울 용산구 이태원로 29',         color: '#374151', emoji: '🪖', wikiTitle: 'War_Memorial_of_Korea',                         photo: '' },
    { id: 'm6', name: '리움미술관',     nameEn: 'Leeum Museum of Art',                 lat: 37.5389, lng: 126.9979, address: '서울 용산구 이태원로55길 60-16', color: '#D97706', emoji: '🖼️', wikiTitle: 'Leeum_Museum_of_Art',                            photo: '' },
    { id: 'm7', name: '서울시립미술관', nameEn: 'Seoul Museum of Art',                 lat: 37.5648, lng: 126.9749, address: '서울 중구 덕수궁길 61',           color: '#0891B2', emoji: '🖌️', wikiTitle: 'Seoul_Museum_of_Art',                           photo: '' },
];

const MUSEUM_DATA = {
    m1: { contentsKor: '국립중앙박물관',     explanationKor: '한국 최대 규모의 국립박물관. 선사시대부터 조선시대까지 30만여 점의 유물을 소장하며, 반가사유상실·야외 정원 등이 특히 유명하다. 용산 한강변에 위치해 접근성도 뛰어나다.',                                                                         link: 'https://www.museum.go.kr'    },
    m2: { contentsKor: '국립민속박물관',     explanationKor: '경복궁 안에 자리한 한국 민속 전문 박물관. 의식주·세시풍속·통과의례 등 한국인의 생활문화를 체험형으로 소개하며, 어린이박물관과 야외 전시장도 운영한다.',                                                                                            link: 'https://www.nfm.go.kr'       },
    m3: { contentsKor: '서울역사박물관',     explanationKor: '조선 건국부터 현대까지 서울 600년 역사를 조명하는 박물관. 도성 모형·고지도·사진 등 2,000여 점의 유물이 전시되며, 인근 복원된 경희궁지도 함께 둘러볼 수 있다.',                                                                                    link: 'https://museum.seoul.go.kr'  },
    m4: { contentsKor: '국립현대미술관 서울관', explanationKor: '경복궁 옆 북촌에 자리한 현대미술 전문 기관. 이중섭·박수근·김환기 등 한국 거장부터 국제 미디어아트까지 폭넓은 컬렉션을 선보인다.',                                                                                                           link: 'https://www.mmca.go.kr'      },
    m5: { contentsKor: '전쟁기념관',         explanationKor: '한국의 군사 역사와 6·25전쟁을 기록·전시하는 기념관. 실제 전차·전투기가 전시된 야외 광장과 디오라마로 재현된 주요 전투 장면이 인상적이다.',                                                                                                     link: 'https://www.warmemo.or.kr'   },
    m6: { contentsKor: '리움미술관',         explanationKor: '삼성문화재단이 운영하는 세계적 수준의 사립미술관. 마리오 보타·장 누벨·렘 콜하스가 설계한 세 개의 건물에 한국 고미술과 국제 현대미술을 나누어 전시한다.',                                                                                        link: 'https://www.leeum.org'        },
    m7: { contentsKor: '서울시립미술관',     explanationKor: '1928년 건립된 옛 대법원 건물을 리노베이션한 서울 대표 공립미술관. 국내외 현대미술 기획전과 백남준기념관, 덕수궁 돌담길과 이어지는 야외 조각공원을 운영한다.',                                                                                    link: 'https://sema.seoul.go.kr'    },
};

const PALACE_DATA = {
    1: [
        { contentsKor: '근정전',  explanationKor: '경복궁의 정전(正殿). 왕의 즉위식·외국 사신 접견 등 국가 주요 행사가 열린 공간. 현존하는 조선 궁궐 법전 중 규모가 가장 크다. 내부 천장에 조각된 두 마리의 칠조룡이 왕권을 상징한다. 국보 제223호.', imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '경회루',  explanationKor: '나라에 경사가 있거나 외국 사신이 왔을 때 왕이 연회를 베풀던 누각. 넓은 연못 위에 세운 우리나라 최대 누각으로 48개의 돌기둥이 2층 누마루를 받친다. 국보 제224호.',                                        imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '향원정',  explanationKor: '고종 때 건청궁을 조성하면서 함께 만든 육각형 2층 정자. 향원지 연못 가운데 인공 섬에 세워졌으며, 취향교라는 나무다리로 연결된다.',                                                                             imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '자경전',  explanationKor: '흥선대원군이 고종의 양어머니 조대비를 위해 지은 왕대비 침전. 아름다운 꽃담과 십장생 문양의 굴뚝이 유명하다. 국보 제809호.',                                                                                    imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '광화문',  explanationKor: '경복궁의 남쪽 정문으로 궁궐 문 중 규모가 가장 크다. 석축 위에 2층 누각이 올려진 형태로 세 개의 홍예문이 뚫려 있다.',                                                                                           imgUrl: '', link: 'https://www.heritage.go.kr' },
    ],
    2: [
        { contentsKor: '인정전',    explanationKor: '창덕궁의 정전. 왕의 즉위식·신하 하례·외국 사신 접견 공간. 20세기 초 서양식 샹들리에·유리창이 설치되어 전통과 근대가 공존한다. 국보 제225호.',                    imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '후원 부용지', explanationKor: '창덕궁 후원의 핵심. 네모난 연못 가운데 둥근 섬을 두어 천원지방(天圓地方)의 우주관을 표현했다. 부용정·주합루·영화당이 어우러진다.',                               imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '낙선재',    explanationKor: '헌종이 1847년 후궁 경빈 김씨를 위해 지은 건물군. 단청 없는 소박한 아름다움이 특징. 조선 마지막 황세손빈 이방자 여사가 1989년까지 거주했다.',                        imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '돈화문',    explanationKor: '1412년 건립된 창덕궁의 정문. 현존 궁궐 대문 중 가장 오래된 건물. 보물 제383호.',                                                                                        imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '주합루',    explanationKor: '정조가 1776년 창건한 2층 누각. 아래층 규장각은 왕실 도서 보관, 위층 주합루는 독서·열람 공간. 정조 문치 정책의 상징.',                                               imgUrl: '', link: 'https://www.heritage.go.kr' },
    ],
    3: [
        { contentsKor: '명정전',  explanationKor: '1616년 중건된 창경궁의 정전. 현존 조선 궁궐 정전 중 가장 오래된 건물. 동향 배치가 독특하다. 국보 제226호.',                                    imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '홍화문',  explanationKor: '1484년 건립된 창경궁의 정문. 영조가 백성의 민원을 직접 들은 친민 정치의 현장. 보물 제384호.',                                                   imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '통명전',  explanationKor: '왕비의 침전으로 사용된 창경궁 내전. 건물 뒤 화계와 연못이 아름다운 후원을 이룬다. 보물 제818호.',                                               imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '춘당지',  explanationKor: '원래 왕이 직접 농사를 짓던 내농포였으나 일제강점기에 연못으로 개조. 봄엔 벚꽃·진달래, 여름엔 연꽃이 피어난다.',                                 imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '대온실',  explanationKor: '1909년 일제가 건립한 우리나라 최초의 서양식 온실. 철골과 유리로 지어졌으며 현재 열대·아열대 식물을 전시 중.',                                   imgUrl: '', link: 'https://www.heritage.go.kr' },
    ],
    4: [
        { contentsKor: '중화전',       explanationKor: '대한제국 선포 후 황제국 위상에 맞게 세운 덕수궁 정전. 황제 용상 위 닫집에 황룡 두 마리가 조각되어 있다. 보물 제819호.',               imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '석조전',       explanationKor: '1910년 완공된 신고전주의 양식 석조 건물. 고종이 침전·편전으로 사용. 현재 대한제국역사관으로 운영 중.',                                    imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '정관헌',       explanationKor: '1900년경 건립된 서양식 정자. 고종이 커피를 마시며 외교관을 접견하던 공간. 로마네스크 기둥과 한국 전통 문양이 조화를 이룬다.',            imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '함녕전',       explanationKor: '1897년 건립된 고종황제의 침전. 1919년 1월 고종이 이곳에서 승하하였으며, 이 사건이 3·1운동 발발의 직접적인 계기가 되었다.',               imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '즉조당·석어당', explanationKor: '즉조당은 인조·철종이 즉위한 곳이며, 석어당은 선조가 피란 후 거처한 2층 건물. 덕수궁에서 가장 오래된 건물군.',                          imgUrl: '', link: 'https://www.heritage.go.kr' },
    ],
    5: [
        { contentsKor: '정전',     explanationKor: '역대 왕과 왕비 49위의 신주를 모신 종묘의 핵심 건물. 정면 19칸(101m)으로 단일 목조건물 세계 최장 수준. 국보 제227호·유네스코 세계문화유산.',   imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '영녕전',   explanationKor: '1421년(세종 3) 별도로 세운 별묘. 태조의 4대조와 추존왕 등 34위의 신주를 모신다. \'영원히 평안하라\'는 뜻의 이름을 지녔다.',                   imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '종묘제례', explanationKor: '조선 왕조 역대 왕·왕비 신위에 올리는 유교 국가 제례. 매년 5월 첫째 일요일 재현. 제례악·일무가 어우러진 유네스코 인류무형문화유산.',           imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '종묘제례악', explanationKor: '제향 때 연주하는 기악·노래·춤이 결합된 궁중 의례 음악. 보태평 11곡·정대업 11곡으로 구성. 2001년 유네스코 인류무형문화유산 최초 등재.',      imgUrl: '', link: 'https://www.heritage.go.kr' },
        { contentsKor: '재궁(齋宮)', explanationKor: '제례 전날 왕이 몸과 마음을 정결히 하며 머무는 공간. 어재실과 세자재실로 나뉘며, 망묘루에서 정전 신실을 바라보며 경건함을 다졌다.',           imgUrl: '', link: 'https://www.heritage.go.kr' },
    ],
};

const FALLBACK_NAMES = [
    '인정전', '광화문', '근정전', '경회루', '향원정',
    '옥천교', '선원전', '명정전', '통화문', '함녕전',
    '중화전', '석어당', '즉조당', '준명당', '경복궁 아미산',
];

/* ── 지하철 정보 데이터 ── */
const SUBWAY_INFO = {
    1:  { lines: ['3호선'], stations: ['경복궁역'], stationsEn: ['Gyeongbokgung'], colors: ['#EF7C1C'], walk: '도보 5분', walkEn: '5 min walk' },
    2:  { lines: ['3호선'], stations: ['안국역'],   stationsEn: ['Anguk'],         colors: ['#EF7C1C'], walk: '도보 10분', walkEn: '10 min walk' },
    3:  { lines: ['4호선'], stations: ['혜화역'],   stationsEn: ['Hyehwa'],        colors: ['#00A5DE'], walk: '도보 15분', walkEn: '15 min walk' },
    4:  { lines: ['1·2호선'], stations: ['시청역'], stationsEn: ['City Hall'],     colors: ['#263C96', '#3DBE29'], walk: '도보 5분', walkEn: '5 min walk' },
    5:  { lines: ['1·3·5호선'], stations: ['종로3가역'], stationsEn: ['Jongno 3-ga'], colors: ['#263C96', '#EF7C1C', '#996CAC'], walk: '도보 5분', walkEn: '5 min walk' },
    m1: { lines: ['4호선'], stations: ['이촌역'],   stationsEn: ['Ichon'],         colors: ['#00A5DE'], walk: '도보 5분', walkEn: '5 min walk' },
    m2: { lines: ['3호선'], stations: ['안국역'],   stationsEn: ['Anguk'],         colors: ['#EF7C1C'], walk: '도보 15분', walkEn: '15 min walk' },
    m3: { lines: ['5호선'], stations: ['서대문역'], stationsEn: ['Seodaemun'],     colors: ['#996CAC'], walk: '도보 5분', walkEn: '5 min walk' },
    m4: { lines: ['3호선'], stations: ['안국역'],   stationsEn: ['Anguk'],         colors: ['#EF7C1C'], walk: '도보 10분', walkEn: '10 min walk' },
    m5: { lines: ['4·6호선'], stations: ['삼각지역'], stationsEn: ['Samgakji'],   colors: ['#00A5DE', '#CD7C2F'], walk: '도보 5분', walkEn: '5 min walk' },
    m6: { lines: ['6호선'], stations: ['한강진역'], stationsEn: ['Hangangjin'],    colors: ['#CD7C2F'], walk: '도보 10분', walkEn: '10 min walk' },
    m7: { lines: ['1·2호선'], stations: ['시청역'], stationsEn: ['City Hall'],     colors: ['#263C96', '#3DBE29'], walk: '도보 5분', walkEn: '5 min walk' },
};

/* ── 추천 코스 데이터 ── */
const COURSES = [
    { id: 'c1', name: '반나절 코스', nameEn: 'Half-Day',    time: '3~4시간', timeEn: '3-4 hrs', desc: '경복궁과 인근 박물관', descEn: 'Gyeongbokgung & museums',   color: '#6C63FF', places: [1, 'm2', 'm4'] },
    { id: 'c2', name: '하루 코스',   nameEn: 'Full Day',    time: '6~7시간', timeEn: '6-7 hrs', desc: '북촌 궁궐 & 박물관',   descEn: 'Bukchon palaces & museums', color: '#059669', places: [1, 2, 3, 'm2'] },
    { id: 'c3', name: '궁궐 완주',   nameEn: 'All Palaces', time: '1박 2일', timeEn: '1-2 days', desc: '서울 5대 궁궐 전부',   descEn: 'All 5 royal palaces',       color: '#C0392B', places: [1, 2, 3, 4, 5] },
    { id: 'c4', name: '역사 탐방',   nameEn: 'History',     time: '5~6시간', timeEn: '5-6 hrs', desc: '조선 왕조 역사 심층', descEn: 'Deep Joseon history',        color: '#D97706', places: [1, 5, 4, 'm3'] },
];

let map;
let selectedPalaceId = null;
let currentPalace    = null;
let currentItems     = [];
let quizItem         = null;
let quizPalace       = null;
let currentLang      = 'ko';
let quizScore        = { correct: 0, total: 0 };

/* ── 모바일 사이드바 ── */
function isMobile() {
    return window.innerWidth <= 768;
}

function openMobileSidebar() {
    if (!isMobile()) return;   // 데스크톱에선 아무것도 하지 않음
    document.getElementById('sidebar').classList.add('mobile-open');
    document.getElementById('sidebar-backdrop').classList.add('visible');
    const btn = document.getElementById('mobile-sidebar-toggle');
    if (btn) btn.textContent = '닫기';
}

function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebar-backdrop').classList.remove('visible');
    const btn = document.getElementById('mobile-sidebar-toggle');
    if (btn) btn.textContent = '목록 보기';
}

function makeEmojiCursor(emoji) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>`
              + `<text y='36' font-size='36'>${emoji}</text></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 4 36, auto`;
}

/* 위키피디아 REST API로 대표 사진 미리 가져오기 */
async function prefetchPhotos() {
    await Promise.all([...PALACES, ...MUSEUMS].map(async place => {
        if (!place.wikiTitle) return;
        try {
            const res  = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${place.wikiTitle}`);
            const data = await res.json();
            place.photo = data.thumbnail?.source ?? '';
        } catch {
            place.photo = '';
        }
    }));
}

/* ── 지도 초기화 ── */
function initMap() {
    map = new kakao.maps.Map(document.getElementById('map'), {
        center: new kakao.maps.LatLng(37.5740, 126.9820),
        level: 5,
    });
    map.addControl(new kakao.maps.ZoomControl(),    kakao.maps.ControlPosition.RIGHT);
    map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);

    buildMuseumSidebar();
    buildCourseSection();
    prefetchPhotos().then(() => {
        PALACES.forEach(createMarker);
        MUSEUMS.forEach(createMuseumMarker);
    });
}

/* ── 박물관 사이드바 버튼 생성 ── */
function buildMuseumSidebar() {
    const nav = document.getElementById('museum-nav');
    nav.innerHTML = '';
    MUSEUMS.forEach(museum => {
        const btn = document.createElement('button');
        btn.className = 'palace-btn';
        btn.id = 'btn-' + museum.id;
        btn.innerHTML = `
            <span class="museum-dot" style="background:${museum.color}"></span>
            <span class="palace-btn-name">${currentLang === 'ko' ? museum.name : museum.nameEn}</span>
            <span class="palace-btn-en">${currentLang === 'ko' ? museum.nameEn : museum.name}</span>`;
        btn.addEventListener('click', () => selectMuseum(museum.id));
        nav.appendChild(btn);
    });
    if (selectedPalaceId !== null) {
        document.getElementById('btn-' + selectedPalaceId)?.classList.add('active');
    }
}

/* ── 궁궐 사이드바 버튼 갱신 (Thymeleaf 렌더 후 언어 갱신용) ── */
function rebuildPalaceSidebar() {
    const nav = document.getElementById('palace-nav');
    nav.innerHTML = '';
    PALACES.forEach(palace => {
        const btn = document.createElement('button');
        btn.className = 'palace-btn';
        btn.id = 'btn-' + palace.id;
        btn.innerHTML = `
            <span class="palace-dot" style="background:${palace.color}"></span>
            <span class="palace-btn-name">${currentLang === 'ko' ? palace.name : palace.nameEn}</span>
            <span class="palace-btn-en">${currentLang === 'ko' ? palace.nameEn : palace.name}</span>`;
        btn.addEventListener('click', () => selectPalace(palace.id));
        nav.appendChild(btn);
    });
    if (selectedPalaceId !== null) {
        document.getElementById('btn-' + selectedPalaceId)?.classList.add('active');
    }
}

/* ── 코스 섹션 빌드 ── */
function buildCourseSection() {
    const nav = document.getElementById('course-nav');
    nav.innerHTML = '';
    COURSES.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';

        const dotColors = course.places.map(pid => {
            const p = typeof pid === 'number'
                ? PALACES.find(x => x.id === pid)
                : MUSEUMS.find(x => x.id === pid);
            return p ? p.color : '#aaa';
        });

        const dotsHtml = dotColors.map(c =>
            `<span class="course-place-dot" style="background:${c}"></span>`
        ).join('');

        const timeText = currentLang === 'ko' ? course.time   : course.timeEn;
        const nameText = currentLang === 'ko' ? course.name   : course.nameEn;
        const descText = currentLang === 'ko' ? course.desc   : course.descEn;

        card.innerHTML = `
            <div class="course-card-left" style="background:${course.color}">
                <span class="course-time">${timeText}</span>
            </div>
            <div class="course-card-body">
                <div class="course-card-name">${nameText}</div>
                <div class="course-card-desc">${descText}</div>
                <div class="course-places">${dotsHtml}</div>
            </div>`;
        card.addEventListener('click', () => selectCourse(course));
        nav.appendChild(card);
    });
}

/* ── 코스 선택 ── */
function selectCourse(course) {
    if (!map) return;
    const firstId = course.places[0];
    const firstPlace = typeof firstId === 'number'
        ? PALACES.find(p => p.id === firstId)
        : MUSEUMS.find(m => m.id === firstId);

    if (firstPlace) {
        map.setLevel(5);
        map.panTo(new kakao.maps.LatLng(firstPlace.lat, firstPlace.lng));
    }

    const panel    = document.getElementById('info-panel');
    const loading  = document.getElementById('loading');
    const list     = document.getElementById('info-list');
    const subwayEl = document.getElementById('subway-info');

    loading.classList.add('hidden');
    panel.classList.remove('hidden');

    const courseName = currentLang === 'ko' ? course.name : course.nameEn;
    const courseDesc = currentLang === 'ko' ? course.desc : course.descEn;
    const courseTime = currentLang === 'ko' ? course.time : course.timeEn;

    document.getElementById('info-title').textContent   = courseName;
    document.getElementById('info-address').textContent = courseTime + ' · ' + courseDesc;

    if (subwayEl) {
        subwayEl.classList.add('hidden');
        subwayEl.innerHTML = '';
    }

    list.innerHTML = '';
    course.places.forEach((pid, idx) => {
        const place = typeof pid === 'number'
            ? PALACES.find(p => p.id === pid)
            : MUSEUMS.find(m => m.id === pid);
        if (!place) return;

        const stopEl = document.createElement('div');
        stopEl.className = 'info-card';
        stopEl.style.cursor = 'pointer';

        const placeName = currentLang === 'ko' ? place.name : place.nameEn;
        const subInfo = SUBWAY_INFO[place.id];
        const walkText = subInfo ? (currentLang === 'ko' ? subInfo.walk : subInfo.walkEn) : '';

        stopEl.innerHTML = `
            <div class="info-card-body" style="display:flex;align-items:center;gap:10px;padding:12px 14px">
                <span style="width:22px;height:22px;border-radius:50%;background:${place.color};color:white;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">${idx + 1}</span>
                <div style="flex:1">
                    <div class="info-card-title">${placeName}</div>
                    ${walkText ? `<div class="info-card-desc">${walkText}</div>` : ''}
                </div>
            </div>`;
        stopEl.addEventListener('click', () => {
            if (typeof pid === 'number') selectPalace(pid);
            else selectMuseum(pid);
        });
        list.appendChild(stopEl);
    });

    openMobileSidebar();
}

/* ── 정보 패널로 부드럽게 스크롤 ── */
function scrollToInfoPanel() {
    const sidebar = document.getElementById('sidebar');
    const panel   = document.getElementById('info-panel');
    if (!sidebar || !panel) return;
    const offset = panel.offsetTop - 12;
    sidebar.scrollTo({ top: offset, behavior: 'smooth' });
}

/* ── 지하철 정보 표시 ── */
function showSubwayInfo(id) {
    const el = document.getElementById('subway-info');
    if (!el) return;
    const info = SUBWAY_INFO[id];
    if (!info) {
        el.classList.add('hidden');
        el.innerHTML = '';
        return;
    }

    const stationName = currentLang === 'ko' ? info.stations[0] : info.stationsEn[0];
    const walkText    = currentLang === 'ko' ? info.walk : info.walkEn;

    const badgesHtml = info.lines.map((line, i) => {
        const color = info.colors[i] || info.colors[0];
        return `<span class="subway-line-badge" style="background:${color}">${line}</span>`;
    }).join('');

    el.innerHTML = `
        <span class="subway-icon">🚇</span>
        ${badgesHtml}
        <span class="subway-station">${stationName}</span>
        <span class="subway-walk">· ${walkText}</span>`;
    el.classList.remove('hidden');
}

/* ── 언어 전환 ── */
function toggleLang() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = currentLang === 'ko' ? 'EN' : '한';

    const titlePalace = document.getElementById('section-title-palace');
    const titleMuseum = document.getElementById('section-title-museum');
    const titleCourse = document.getElementById('section-title-course');
    if (titlePalace) titlePalace.textContent = currentLang === 'ko' ? '궁궐' : 'Palaces';
    if (titleMuseum) titleMuseum.textContent = currentLang === 'ko' ? '박물관' : 'Museums';
    if (titleCourse) titleCourse.textContent = currentLang === 'ko' ? '추천 코스' : 'Courses';

    rebuildPalaceSidebar();
    buildMuseumSidebar();
    buildCourseSection();

    if (currentPalace && !document.getElementById('info-panel').classList.contains('hidden')) {
        showSubwayInfo(currentPalace.id);
    }

    if (quizPalace && document.getElementById('quiz-panel').classList.contains('open')) {
        const nameText = currentLang === 'ko' ? quizPalace.name : quizPalace.nameEn;
        document.getElementById('quiz-palace-name').textContent = nameText;
    }
}

/* ── 퀴즈 점수 업데이트 ── */
function updateScoreDisplay() {
    const el = document.getElementById('quiz-score-display');
    if (!el) return;
    el.textContent = `정답 ${quizScore.correct}/${quizScore.total}`;
    el.classList.add('visible');
}

/* ── 궁궐 마커 생성 (글로우 닷) ── */
function createMarker(palace) {
    const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(palace.lat, palace.lng),
        content: `
            <div class="custom-marker" data-id="${palace.id}">
                <div class="marker-tooltip">
                    ${palace.photo
                        ? `<img class="marker-tooltip-img" src="${palace.photo}" alt="${palace.name}">`
                        : `<div class="marker-tooltip-emoji">${palace.emoji}</div>`}
                    <div class="marker-tooltip-label">
                        <span class="marker-tooltip-dot" style="background:${palace.color}"></span>
                        ${palace.name}
                    </div>
                </div>
                <div class="marker-dot" style="--dot-color:${palace.color}">
                    <div class="marker-dot-inner"></div>
                    <div class="marker-dot-pulse"></div>
                </div>
                <div class="marker-label">${palace.name}</div>
            </div>`,
        yAnchor: 1.05,
        zIndex: 3,
    });
    overlay.setMap(map);

    setTimeout(() => {
        const el = overlay.a;
        if (el) {
            el.style.cursor = makeEmojiCursor(palace.emoji);
            el.addEventListener('click', () => selectPalace(palace.id));
        }
    }, 0);
}

/* ── 박물관 마커 생성 (다이아몬드) ── */
function createMuseumMarker(museum) {
    const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(museum.lat, museum.lng),
        content: `
            <div class="custom-marker" data-id="${museum.id}">
                <div class="marker-tooltip">
                    ${museum.photo
                        ? `<img class="marker-tooltip-img" src="${museum.photo}" alt="${museum.name}">`
                        : `<div class="marker-tooltip-emoji">${museum.emoji}</div>`}
                    <div class="marker-tooltip-label">
                        <span class="marker-tooltip-dot" style="background:${museum.color}"></span>
                        ${museum.name}
                    </div>
                </div>
                <div class="marker-diamond-wrap" style="--dot-color:${museum.color}">
                    <div class="marker-diamond"></div>
                    <div class="marker-diamond-pulse"></div>
                </div>
                <div class="marker-label">${museum.name}</div>
            </div>`,
        yAnchor: 1.05,
        zIndex: 2,
    });
    overlay.setMap(map);

    setTimeout(() => {
        const el = overlay.a;
        if (el) {
            el.style.cursor = makeEmojiCursor(museum.emoji);
            el.addEventListener('click', () => selectMuseum(museum.id));
        }
    }, 0);
}

/* ── 궁궐 선택 ── */
function selectPalace(palaceId) {
    if (!map) return;
    const palace = PALACES.find(p => p.id === palaceId);
    if (!palace) return;

    document.querySelectorAll('.palace-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + palaceId)?.classList.add('active');

    map.setLevel(4);
    map.panTo(new kakao.maps.LatLng(palace.lat, palace.lng));

    selectedPalaceId = palaceId;
    currentPalace    = palace;

    closeQuiz();
    closeDetail();
    showSubwayInfo(palace.id);
    loadPalaceInfo(palace);
    openMobileSidebar();
}

/* ── 박물관 선택 ── */
function selectMuseum(museumId) {
    if (!map) return;
    const museum = MUSEUMS.find(m => m.id === museumId);
    if (!museum) return;

    document.querySelectorAll('.palace-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + museumId)?.classList.add('active');

    map.setLevel(4);
    map.panTo(new kakao.maps.LatLng(museum.lat, museum.lng));

    selectedPalaceId = museumId;
    currentPalace    = museum;

    closeQuiz();
    closeDetail();
    showSubwayInfo(museum.id);
    loadMuseumInfo(museum);
    openMobileSidebar();
}

/* ── 궁궐 정보 불러오기 ── */
function loadPalaceInfo(palace) {
    const panel   = document.getElementById('info-panel');
    const loading = document.getElementById('loading');
    const list    = document.getElementById('info-list');

    panel.classList.add('hidden');
    loading.classList.remove('hidden');
    list.innerHTML = '';

    document.getElementById('info-title').textContent   = currentLang === 'ko' ? palace.name : palace.nameEn;
    document.getElementById('info-address').textContent = palace.address;

    fetch(`/api/palace/${palace.id}`)
        .then(res => { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
        .then(items => {
            loading.classList.add('hidden');
            panel.classList.remove('hidden');
            scrollToInfoPanel();
            if (!items || items.length === 0) throw new Error('empty');
            currentItems = items;
            items.forEach(item => list.appendChild(buildCard(item, palace)));
        })
        .catch(() => {
            loading.classList.add('hidden');
            panel.classList.remove('hidden');
            scrollToInfoPanel();
            const fallback = PALACE_DATA[palace.id] ?? [];
            currentItems = fallback;
            if (fallback.length === 0) {
                list.innerHTML = '<p style="color:#7a7a7a;font-size:12px;padding:8px 0">정보가 없습니다.</p>';
                return;
            }
            fallback.forEach(item => list.appendChild(buildCard(item, palace)));
        });
}

/* ── 박물관 정보 표시 ── */
function loadMuseumInfo(museum) {
    const panel   = document.getElementById('info-panel');
    const loading = document.getElementById('loading');
    const list    = document.getElementById('info-list');

    panel.classList.add('hidden');
    loading.classList.remove('hidden');
    list.innerHTML = '';

    document.getElementById('info-title').textContent   = currentLang === 'ko' ? museum.name : museum.nameEn;
    document.getElementById('info-address').textContent = museum.address;

    loading.classList.add('hidden');
    panel.classList.remove('hidden');
    scrollToInfoPanel();

    const entry = MUSEUM_DATA[museum.id];
    currentItems = [];
    if (!entry) {
        list.innerHTML = '<p style="color:#7a7a7a;font-size:12px;padding:8px 0">정보가 없습니다.</p>';
        return;
    }
    list.appendChild(
        buildCard(entry, museum, (it) => {
            if (it.link) window.open(it.link, '_blank', 'noopener,noreferrer');
        })
    );
}

/* ── 카드 생성 ── */
function buildCard(item, palace, onClickFn) {
    const card = document.createElement('div');
    card.className = 'info-card';

    if (item.imgUrl) {
        const img   = document.createElement('img');
        img.src     = item.imgUrl;
        img.alt     = item.contentsKor;
        img.onerror = () => img.remove();
        card.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'info-card-body';

    const title = document.createElement('div');
    title.className   = 'info-card-title';
    title.textContent = item.contentsKor || '(이름 없음)';
    body.appendChild(title);

    if (item.explanationKor) {
        const desc = document.createElement('div');
        desc.className   = 'info-card-desc';
        desc.textContent = item.explanationKor;
        body.appendChild(desc);
    }
    card.appendChild(body);

    const arrow = document.createElement('div');
    arrow.className = 'info-card-arrow';
    arrow.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    card.appendChild(arrow);

    card.addEventListener('click', () => (onClickFn ?? openQuiz)(item, palace));
    return card;
}

/* ══════════════════════════════
   퀴즈 패널
══════════════════════════════ */

function openQuiz(item, palace) {
    quizItem   = item;
    quizPalace = palace;

    const palaceDisplayName = currentLang === 'ko' ? palace.name : palace.nameEn;
    document.getElementById('quiz-palace-name').textContent = palaceDisplayName;

    const hero = document.getElementById('quiz-hero');
    hero.innerHTML = '';
    if (item.imgUrl) {
        const img   = document.createElement('img');
        img.src     = item.imgUrl;
        img.alt     = '';
        img.onerror = () => { hero.innerHTML = ''; };
        hero.appendChild(img);
    }

    const hint = item.explanationKor
        ? item.explanationKor.slice(0, 80) + (item.explanationKor.length > 80 ? '…' : '')
        : '설명이 없습니다.';
    document.getElementById('quiz-hint').textContent = hint;

    if (!item.imgUrl) {
        const empty = document.createElement('div');
        empty.className = 'quiz-hero-empty';
        hero.appendChild(empty);
    }

    const correct = item.contentsKor || '(이름 없음)';

    const others = currentItems
        .filter(i => i.contentsKor && i.contentsKor !== correct)
        .sort(() => Math.random() - 0.5)
        .map(i => i.contentsKor);

    const fallbacks = FALLBACK_NAMES
        .filter(n => n !== correct && !others.includes(n))
        .sort(() => Math.random() - 0.5);

    const pool    = [...others, ...fallbacks];
    const choices = [
        { text: correct, correct: true },
        ...pool.slice(0, 3).map(n => ({ text: n, correct: false })),
    ].sort(() => Math.random() - 0.5);

    const LABELS = ['A', 'B', 'C', 'D'];
    const choicesEl = document.getElementById('quiz-choices');
    choicesEl.innerHTML = '';
    choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-choice';
        btn.innerHTML = `
            <span class="quiz-choice-badge">${LABELS[i]}</span>
            <span class="quiz-choice-text">${choice.text}</span>`;
        btn.addEventListener('click', () => handleAnswer(choice.correct, choice.text, correct));
        choicesEl.appendChild(btn);
    });

    document.getElementById('quiz-result').className  = 'quiz-result hidden';
    document.getElementById('quiz-actions').className = 'quiz-actions hidden';

    const panel = document.getElementById('quiz-panel');
    panel.classList.add('open');
    panel.scrollTop = 0;
}

function handleAnswer(isCorrect, selected, correct) {
    /* 점수 업데이트 */
    quizScore.total++;
    if (isCorrect) quizScore.correct++;
    updateScoreDisplay();

    document.querySelectorAll('.quiz-choice').forEach(btn => {
        btn.disabled = true;
        const text  = btn.querySelector('.quiz-choice-text')?.textContent;
        const badge = btn.querySelector('.quiz-choice-badge');
        if (text === correct) {
            btn.classList.add('correct');
            if (badge) badge.textContent = '✓';
        } else if (text === selected && !isCorrect) {
            btn.classList.add('wrong');
            if (badge) badge.textContent = '✗';
        }
    });

    const result = document.getElementById('quiz-result');
    if (isCorrect) {
        result.className = 'quiz-result correct-msg';
        result.innerHTML = `
            <div class="quiz-result-icon">🎉</div>
            <div class="quiz-result-title">정답입니다!</div>
            <div class="quiz-result-sub">문화유산에 대해 잘 알고 있네요</div>`;
    } else {
        result.className = 'quiz-result wrong-msg';
        result.innerHTML = `
            <div class="quiz-result-icon">😢</div>
            <div class="quiz-result-title">아쉽네요!</div>
            <div class="quiz-result-sub">정답은 <strong>${correct}</strong> 입니다</div>`;
    }

    const actions = document.getElementById('quiz-actions');
    actions.className = 'quiz-actions';
    actions.innerHTML = '';

    const detailBtn = document.createElement('button');
    detailBtn.className = 'detail-cta';
    detailBtn.innerHTML = `자세히 보기 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    detailBtn.addEventListener('click', () => {
        closeQuiz();
        openDetail(quizItem, quizPalace);
    });
    actions.appendChild(detailBtn);

    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeQuiz() {
    document.getElementById('quiz-panel').classList.remove('open');
}

/* ══════════════════════════════
   상세 패널
══════════════════════════════ */

function openDetail(item, palace) {
    document.getElementById('detail-palace-name').textContent = currentLang === 'ko' ? palace.name : palace.nameEn;

    const hero = document.getElementById('detail-hero');
    hero.innerHTML = '';
    if (item.imgUrl) {
        const img   = document.createElement('img');
        img.src     = item.imgUrl;
        img.alt     = item.contentsKor;
        img.onerror = () => { hero.innerHTML = ''; };
        hero.appendChild(img);
    }

    document.getElementById('detail-category').textContent = palace.name + ' · 문화유산';
    document.getElementById('detail-title').textContent    = item.contentsKor || '(이름 없음)';
    document.getElementById('detail-desc').textContent     = item.explanationKor || '상세 설명이 없습니다.';

    const actions = document.getElementById('detail-actions');
    actions.innerHTML = '';
    if (item.link) {
        const a  = document.createElement('a');
        a.href   = item.link;
        a.target = '_blank';
        a.rel    = 'noopener noreferrer';
        a.className = 'detail-cta';
        a.innerHTML = `자세히 보기 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        actions.appendChild(a);
    }

    const panel = document.getElementById('detail-panel');
    panel.classList.add('open');
    panel.scrollTop = 0;
}

function closeDetail() {
    document.getElementById('detail-panel').classList.remove('open');
}

/* ── 초기화 ── */
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quiz-back').addEventListener('click', closeQuiz);
    document.getElementById('detail-back').addEventListener('click', closeDetail);

    /* 언어 토글 */
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', toggleLang);

    /* 모바일 사이드바 토글 */
    const toggleBtn = document.getElementById('mobile-sidebar-toggle');
    const backdrop  = document.getElementById('sidebar-backdrop');
    const handle    = document.querySelector('.sidebar-handle');
    const sidebar   = document.getElementById('sidebar');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('mobile-open')) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }
        });
    }

    if (backdrop) backdrop.addEventListener('click', closeMobileSidebar);
    if (handle)   handle.addEventListener('click', closeMobileSidebar);
});
