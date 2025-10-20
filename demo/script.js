// 模擬資料
const DEMO_DATA = {
    activities: [
        { id: 1, name: '2025秋季賽', date: '2025-10-15' },
        { id: 2, name: '夏季盃挑戰賽', date: '2025-09-20' },
        { id: 3, name: '測試飛行活動', date: '2025-08-10' },
        { id: 4, name: '春季錦標賽', date: '2025-05-05' },
        { id: 5, name: '新年挑戰賽', date: '2025-01-15' }
    ],
    tracks: [
        {
            id: 1,
            ankletId: 'ABC123',
            name: '軌跡-01',
            coordinates: [
                [25.0330, 121.5654],
                [25.0340, 121.5664],
                [25.0350, 121.5674],
                [25.0360, 121.5684],
                [25.0370, 121.5694]
            ]
        },
        {
            id: 2,
            ankletId: 'ABC123',
            name: '軌跡-02',
            coordinates: [
                [25.0320, 121.5644],
                [25.0330, 121.5654],
                [25.0340, 121.5664],
                [25.0350, 121.5674],
                [25.0360, 121.5684]
            ]
        },
        {
            id: 3,
            ankletId: 'ABC123',
            name: '軌跡-03',
            coordinates: [
                [25.0310, 121.5634],
                [25.0320, 121.5644],
                [25.0330, 121.5654],
                [25.0340, 121.5664],
                [25.0350, 121.5674]
            ]
        },
        {
            id: 4,
            ankletId: 'ABC123',
            name: '軌跡-04',
            coordinates: [
                [25.0340, 121.5660],
                [25.0350, 121.5670],
                [25.0360, 121.5680],
                [25.0370, 121.5690],
                [25.0380, 121.5700]
            ]
        },
        {
            id: 5,
            ankletId: 'ABC123',
            name: '軌跡-05',
            coordinates: [
                [25.0300, 121.5620],
                [25.0310, 121.5630],
                [25.0320, 121.5640],
                [25.0330, 121.5650],
                [25.0340, 121.5660]
            ]
        }
    ]
};

// 顏色池
const TRACK_COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80'
];

// ===============================
// 登入頁面邏輯 (index.html)
// ===============================
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            // 模擬登入成功
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            window.location.href = 'anklet-input.html';
        }
    });
}

// ===============================
// 輸入腳環編號頁面 (anklet-input.html)
// ===============================
if (document.getElementById('ankletForm')) {
    document.getElementById('ankletForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const ankletId = document.getElementById('ankletId').value.trim();

        if (ankletId) {
            sessionStorage.setItem('ankletId', ankletId);
            window.location.href = 'activities.html';
        }
    });
}

// ===============================
// 活動列表頁面 (activities.html)
// ===============================
if (document.getElementById('activityList')) {
    const ankletId = sessionStorage.getItem('ankletId') || 'ABC123';
    document.getElementById('ankletIdDisplay').textContent = ankletId;

    // 過濾一年內的活動並排序
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const filteredActivities = DEMO_DATA.activities
        .filter(activity => new Date(activity.date) >= oneYearAgo)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // 渲染活動列表
    const activityList = document.getElementById('activityList');
    filteredActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="radio"></div>
            <div class="activity-info">
                <h3>${activity.name}</h3>
                <p class="date">${activity.date}</p>
            </div>
        `;

        activityItem.addEventListener('click', function() {
            // 移除所有選中狀態
            document.querySelectorAll('.activity-item').forEach(item => {
                item.classList.remove('selected');
            });
            // 添加選中狀態
            this.classList.add('selected');

            // 保存選中的活動
            sessionStorage.setItem('selectedActivity', JSON.stringify(activity));

            // 延遲跳轉，讓用戶看到選中效果
            setTimeout(() => {
                window.location.href = 'tracks.html';
            }, 300);
        });

        activityList.appendChild(activityItem);
    });

    if (filteredActivities.length === 0) {
        activityList.innerHTML = '<p class="loading">目前沒有近一年內的活動資料</p>';
    }
}

// ===============================
// 軌跡頁面 (tracks.html)
// ===============================
if (document.getElementById('map')) {
    const selectedActivity = JSON.parse(sessionStorage.getItem('selectedActivity') || '{}');
    const ankletId = sessionStorage.getItem('ankletId') || 'ABC123';

    // 設置活動標題
    if (selectedActivity.name) {
        document.getElementById('activityTitle').textContent =
            `${selectedActivity.date} - ${selectedActivity.name}`;
    }

    // 初始化地圖
    const map = L.map('map').setView([25.0330, 121.5654], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // 存儲已繪製的軌跡圖層
    const trackLayers = {};
    let selectedTracks = [];

    // 渲染軌跡列表
    const trackList = document.getElementById('trackList');
    DEMO_DATA.tracks.forEach((track, index) => {
        const trackItem = document.createElement('div');
        trackItem.className = 'track-item';
        trackItem.innerHTML = `
            <div class="track-header">
                <input type="checkbox" id="track-${track.id}" data-track-id="${track.id}">
                <label for="track-${track.id}" class="track-name">${track.ankletId} - ${track.name}</label>
            </div>
            <div class="track-actions">
                <button class="btn-download" data-track-id="${track.id}">
                    ⬇ 下載 GPX 檔案
                </button>
            </div>
        `;
        trackList.appendChild(trackItem);

        // 勾選軌跡事件
        const checkbox = trackItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            const trackId = parseInt(this.dataset.trackId);

            if (this.checked) {
                // 檢查是否超過 10 條
                if (selectedTracks.length >= 10) {
                    this.checked = false;
                    alert('最多只能選擇 10 條軌跡！');
                    return;
                }

                selectedTracks.push(trackId);
                trackItem.classList.add('selected');
                drawTrack(track, index);
            } else {
                selectedTracks = selectedTracks.filter(id => id !== trackId);
                trackItem.classList.remove('selected');
                removeTrack(trackId);
            }

            updateSelectedCount();
        });

        // 下載 GPX 事件
        trackItem.querySelector('.btn-download').addEventListener('click', function() {
            downloadGPX(track);
        });
    });

    // 繪製軌跡
    function drawTrack(track, colorIndex) {
        const color = TRACK_COLORS[colorIndex % TRACK_COLORS.length];

        const polyline = L.polyline(track.coordinates, {
            color: color,
            weight: 4,
            opacity: 0.8
        }).addTo(map);

        // 添加起點和終點標記
        const startMarker = L.circleMarker(track.coordinates[0], {
            radius: 6,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
        }).addTo(map).bindPopup(`${track.name} - 起點`);

        const endMarker = L.circleMarker(track.coordinates[track.coordinates.length - 1], {
            radius: 6,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
        }).addTo(map).bindPopup(`${track.name} - 終點`);

        trackLayers[track.id] = {
            polyline: polyline,
            startMarker: startMarker,
            endMarker: endMarker
        };

        // 自動縮放地圖以包含所有軌跡
        const allCoordinates = selectedTracks.map(id => {
            const t = DEMO_DATA.tracks.find(track => track.id === id);
            return t.coordinates;
        }).flat();

        if (allCoordinates.length > 0) {
            map.fitBounds(allCoordinates);
        }
    }

    // 移除軌跡
    function removeTrack(trackId) {
        if (trackLayers[trackId]) {
            map.removeLayer(trackLayers[trackId].polyline);
            map.removeLayer(trackLayers[trackId].startMarker);
            map.removeLayer(trackLayers[trackId].endMarker);
            delete trackLayers[trackId];
        }
    }

    // 更新已選數量
    function updateSelectedCount() {
        document.getElementById('selectedCount').textContent = selectedTracks.length;
    }

    // 分享按鈕
    document.getElementById('shareBtn').addEventListener('click', function() {
        if (selectedTracks.length === 0) {
            alert('請先選擇至少一條軌跡！');
            return;
        }

        // 生成分享連結（模擬）
        const shareId = Math.random().toString(36).substring(7);
        const shareUrl = `${window.location.origin}/demo/share.html?id=${shareId}`;

        document.getElementById('shareLink').value = shareUrl;
        document.getElementById('shareModal').classList.add('show');
    });

    // 下載 GPX 檔案
    function downloadGPX(track) {
        // 生成 GPX 格式內容
        let gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="腳環軌跡查詢系統">
  <trk>
    <name>${track.name}</name>
    <trkseg>
`;

        track.coordinates.forEach(coord => {
            gpxContent += `      <trkpt lat="${coord[0]}" lon="${coord[1]}"></trkpt>\n`;
        });

        gpxContent += `    </trkseg>
  </trk>
</gpx>`;

        // 創建下載
        const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${track.ankletId}-${track.name}.gpx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// 分享彈窗功能
function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');

    // 顯示複製成功提示
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ 已複製';
    btn.style.backgroundColor = '#28a745';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
    }, 2000);
}

function closeShareModal() {
    document.getElementById('shareModal').classList.remove('show');
}

// 點擊彈窗外部關閉
if (document.getElementById('shareModal')) {
    document.getElementById('shareModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeShareModal();
        }
    });
}
