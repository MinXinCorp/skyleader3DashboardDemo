# 腳環軌跡查詢系統 - Demo 原型

這是一個可互動的 HTML 原型，展示腳環軌跡查詢系統的完整流程。

## 🚀 快速開始

### 本地預覽

1. **直接開啟檔案**
   ```bash
   # 在瀏覽器中開啟
   open demo/index.html
   # 或
   firefox demo/index.html
   # 或
   google-chrome demo/index.html
   ```

2. **使用本地伺服器（推薦）**
   ```bash
   cd demo
   python -m http.server 8000
   ```
   然後開啟瀏覽器訪問: http://localhost:8000

## 📦 部署到 GitHub Pages

### 方法 1: 使用 GitHub 網頁介面（最簡單）

1. **創建新的 Repository**
   - 登入 GitHub
   - 點擊右上角的 `+` → `New repository`
   - 命名為 `anklet-track-demo`（或任意名稱）
   - 設定為 `Public`
   - 點擊 `Create repository`

2. **上傳檔案**
   - 在新建的 repository 頁面，點擊 `uploading an existing file`
   - 將 `demo` 資料夾內的所有檔案拖曳上傳：
     - `index.html`
     - `anklet-input.html`
     - `activities.html`
     - `tracks.html`
     - `styles.css`
     - `script.js`
   - 填寫 Commit message: "Add demo files"
   - 點擊 `Commit changes`

3. **啟用 GitHub Pages**
   - 進入 repository 的 `Settings` 頁面
   - 左側選單點擊 `Pages`
   - 在 `Source` 下拉選單選擇 `main` 分支
   - 資料夾選擇 `/ (root)`
   - 點擊 `Save`
   - 等待 1-2 分鐘後，頁面會顯示網址：
     ```
     Your site is live at https://[你的用戶名].github.io/anklet-track-demo/
     ```

### 方法 2: 使用 Git 命令列

```bash
# 1. 初始化 Git（如果還沒有）
cd demo
git init

# 2. 添加所有檔案
git add .

# 3. 提交
git commit -m "Initial commit: Add anklet track demo"

# 4. 在 GitHub 上創建 repository 後，連結遠端
git remote add origin https://github.com/[你的用戶名]/anklet-track-demo.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main

# 6. 啟用 GitHub Pages（使用 GitHub CLI）
gh repo edit --enable-pages --pages-branch main
```

### 方法 3: 部署到現有專案的子資料夾

如果要部署到現有的 `skyracinglite` 專案：

```bash
# 1. 將 demo 資料夾推送到 GitHub
cd /home/oliver/Projects/mxAccount/env3.8/skyleader3/skyracinglite
git add demo/
git commit -m "Add demo prototype for anklet track system"
git push origin MX-353-任務

# 2. 在 GitHub 上啟用 Pages
# Settings → Pages → Source → 選擇分支和 /demo 資料夾

# 訪問網址會是：
# https://[你的用戶名].github.io/skyracinglite/demo/
```

## 🎯 Demo 使用說明

### 頁面流程

1. **登入頁面** (`index.html`)
   - 輸入任意帳號密碼即可登入（Demo 模式）

2. **輸入腳環編號** (`anklet-input.html`)
   - 輸入任意腳環編號（例如：ABC123）
   - 點擊查詢

3. **活動列表** (`activities.html`)
   - 顯示該腳環的所有活動（1 年內）
   - 活動按日期由近至遠排序
   - 點擊任一活動進入軌跡頁面

4. **軌跡與地圖** (`tracks.html`)
   - 左側：軌跡列表（可勾選，最多 10 條）
   - 右側：OpenStreetMap 地圖
   - 功能：
     - ✅ 勾選軌跡在地圖上繪製
     - ✅ 下載 GPX 檔案
     - ✅ 生成分享連結

### Demo 資料

系統包含模擬資料：
- **5 個活動**：從 2025-01-15 到 2025-10-15
- **5 條軌跡**：每條包含經緯度座標
- **地圖中心**：台北市（25.0330, 121.5654）

## 📁 檔案結構

```
demo/
├── index.html              # 登入頁面
├── anklet-input.html       # 輸入腳環編號頁面
├── activities.html         # 活動列表頁面
├── tracks.html             # 軌跡與地圖頁面
├── styles.css              # 所有頁面的樣式
├── script.js               # 互動邏輯和地圖功能
└── README.md               # 說明文檔（本檔案）
```

## 🛠 技術棧

- **純 HTML/CSS/JavaScript** - 無需後端
- **Leaflet.js** - 開源地圖庫
- **OpenStreetMap** - 免費地圖圖資
- **SessionStorage** - 頁面間資料傳遞

## ✨ 功能特色

### 已實現功能
- ✅ 完整的使用者流程（登入 → 查詢 → 選擇 → 查看）
- ✅ 互動式地圖（縮放、拖曳）
- ✅ 多軌跡繪製（最多 10 條，不同顏色）
- ✅ 起點/終點標記
- ✅ GPX 檔案下載
- ✅ 分享連結生成
- ✅ 響應式設計（支援手機、平板）
- ✅ 活動日期篩選（1 年內）
- ✅ 活動日期排序（由近至遠）

### 後續可擴充
- 🔄 串接真實 API
- 🔄 使用者認證（JWT）
- 🔄 資料分頁載入
- 🔄 軌跡搜尋功能
- 🔄 軌跡統計資訊（距離、時間等）

## 🎨 自訂配置

### 修改地圖中心點

編輯 `script.js`:
```javascript
const map = L.map('map').setView([25.0330, 121.5654], 13);
//                                  ↑緯度    ↑經度      ↑縮放級別
```

### 修改模擬資料

編輯 `script.js` 中的 `DEMO_DATA` 物件：
```javascript
const DEMO_DATA = {
    activities: [ /* 你的活動資料 */ ],
    tracks: [ /* 你的軌跡資料 */ ]
};
```

### 修改顏色主題

編輯 `styles.css` 中的顏色變數：
```css
.btn-primary {
    background-color: #667eea;  /* 主色調 */
}
```

## 📱 響應式支援

- ✅ **桌面端**：左右分欄佈局
- ✅ **平板/手機**：上下堆疊佈局
- ✅ **觸控支援**：地圖可觸控操作

## 🐛 已知限制

1. **靜態資料**：目前使用模擬資料，需串接真實 API
2. **無認證**：Demo 模式無真實認證機制
3. **無持久化**：重新整理頁面會清除選擇狀態
4. **分享連結**：目前僅生成示例連結，無實際分享頁面

## 🔗 相關資源

- [Leaflet.js 文檔](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [GPX 格式規範](https://www.topografix.com/gpx.asp)

## 📞 回饋與建議

如有任何問題或建議，請透過以下方式聯繫：
- 建立 GitHub Issue
- 直接與開發團隊聯繫

---

**提示**：這是一個原型展示系統，用於與業務端確認流程和頁面佈局。實際生產環境需要整合後端 API 和完整的認證機制。
