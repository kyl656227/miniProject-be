let map;
let markers = [];
let selectedPalaceId = null;

function initMap() {
    const center = new kakao.maps.LatLng(37.5740, 126.9820);
    map = new kakao.maps.Map(document.getElementById('map'), {
        center: center,
        level: 5
    });

    map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);

    PALACES.forEach(palace => createMarker(palace));
}

function createMarker(palace) {
    const position = new kakao.maps.LatLng(palace.lat, palace.lng);

    const markerHtml = `
        <div class="custom-marker">
            <div class="marker-pin" style="background:${palace.color}"></div>
            <div class="marker-label">${palace.name}</div>
        </div>`;

    const overlay = new kakao.maps.CustomOverlay({
        position: position,
        content: markerHtml,
        yAnchor: 1.0,
        zIndex: 3
    });
    overlay.setMap(map);

    // 마커 클릭 이벤트는 DOM 이벤트 위임으로 처리
    overlay.getContent();

    // CustomOverlay의 실제 DOM에 이벤트 바인딩 (렌더링 후)
    setTimeout(() => {
        const el = overlay.a;
        if (el) {
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => selectPalace(palace.id));
        }
    }, 0);

    markers.push({ id: palace.id, overlay, position });
}

function selectPalace(palaceId) {
    const palace = PALACES.find(p => p.id === palaceId);
    if (!palace) return;

    // 버튼 활성화 표시
    document.querySelectorAll('.palace-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + palaceId);
    if (activeBtn) activeBtn.classList.add('active');

    // 지도 이동
    const pos = new kakao.maps.LatLng(palace.lat, palace.lng);
    map.setLevel(4);
    map.panTo(pos);

    selectedPalaceId = palaceId;
    loadPalaceInfo(palace);
}

function loadPalaceInfo(palace) {
    const panel = document.getElementById('info-panel');
    const loading = document.getElementById('loading');
    const infoList = document.getElementById('info-list');

    panel.classList.add('hidden');
    loading.classList.remove('hidden');
    infoList.innerHTML = '';

    document.getElementById('info-title').textContent = palace.name;
    document.getElementById('info-address').textContent = palace.address;

    fetch(`/api/palace/${palace.id}`)
        .then(res => {
            if (!res.ok) throw new Error('API 오류: ' + res.status);
            return res.json();
        })
        .then(items => {
            loading.classList.add('hidden');
            panel.classList.remove('hidden');

            if (items.length === 0) {
                infoList.innerHTML = '<p style="color:#a89880;font-size:0.8rem;padding:8px 0">정보가 없습니다.</p>';
                return;
            }

            items.forEach(item => {
                const card = buildInfoCard(item, palace.color);
                infoList.appendChild(card);
            });
        })
        .catch(err => {
            loading.classList.add('hidden');
            panel.classList.remove('hidden');
            infoList.innerHTML = `<p style="color:#e74c3c;font-size:0.8rem;padding:8px 0">데이터를 불러오지 못했습니다.<br>${err.message}</p>`;
        });
}

function buildInfoCard(item, accentColor) {
    const card = document.createElement('div');
    card.className = 'info-card';
    card.style.borderLeftColor = accentColor;

    if (item.imgUrl) {
        const img = document.createElement('img');
        img.src = item.imgUrl;
        img.alt = item.contentsKor || '';
        img.onerror = () => img.remove();
        card.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'info-card-body';

    const title = document.createElement('div');
    title.className = 'info-card-title';
    title.textContent = item.contentsKor || '(이름 없음)';

    const desc = document.createElement('div');
    desc.className = 'info-card-desc';
    desc.textContent = item.explanationKor || '';

    body.appendChild(title);
    if (item.explanationKor) body.appendChild(desc);
    card.appendChild(body);

    if (item.link) {
        card.addEventListener('click', () => window.open(item.link, '_blank'));
    }

    return card;
}
