# 幸運日記 ✨ (Cozy Lucky Diary)

暖心可愛的手寫風格占卜卡牌日記，紀錄生活中的小確幸 🐾💖

[👉 立即點此開啟幸運日記](https://toydogcat.github.io/ai-lucky/)

---

## 🌟 PWA 行動/桌面 App 安裝指南 (PWA Installation Guide)

本專案已全面支援 **PWA (Progressive Web App)** 技術！您可以將「幸運日記」直接安裝到手機或電腦的主畫面上，就像安裝了一個獨立、精美的原生 App 一樣，享受無邊框的全螢幕占卜體驗與極致的載入速度。

### 📱 iOS (iPhone / iPad) 安裝步驟
1. 使用 **Safari** 瀏覽器開啟 [幸運日記網址](https://toydogcat.github.io/ai-lucky/)。
2. 點擊瀏覽器底部的 **「分享」** 按鈕（一個向上箭頭的方塊圖示 📤）。
3. 向上滑動分享選單，找到並點選 **「加入主畫面」 (Add to Home Screen)** ➕。
4. 點擊右上角的 **「新增」**，可愛的睡覺小橘貓 App 圖示就會出現在您的手機桌面上囉！🐾

### 🤖 Android (安卓手機) 安裝步驟
1. 使用 **Chrome** 瀏覽器開啟 [幸運日記網址](https://toydogcat.github.io/ai-lucky/)。
2. 頁面載入完成後，瀏覽器底部會自動跳出 **「將 幸運日記 新增至主畫面」** 的提示框，點擊它即可安裝。
3. 若沒有出現提示，可以點擊 Chrome 右上角的 **「三個點 (選單)」** ⚙️，然後選擇 **「安裝應用程式」** 或 **「新增至主畫面」** 即可！

### 💻 Desktop (Mac / Windows / Linux 電腦端) 安裝步驟
1. 使用 **Chrome** 或 **Edge** 瀏覽器開啟網址。
2. 在瀏覽器頂部的網址列（URL bar）右側，您會看到一個 **「安裝應用程式」** 的小圖示（像是電腦螢幕外加向下箭頭 🖥️📥）。
3. 點擊該圖示並選擇 **「安裝」**。
4. 「幸運日記」將立即轉化為一個獨立的無邊框視窗 App，並在您的電腦桌面與應用程式清單中建立一個可愛的小橘貓捷徑！

---

## 🛠️ 本地開發與運行 (Local Development)

本專案是一個靜態 Jekyll 網站，我們已為您準備了最便捷的 **Docker 運行環境**，免去配置 Ruby 和 Bundler 的煩惱！

### 🐳 使用 Docker 啟動本地伺服器
請在專案根目錄下執行以下指令：

```bash
docker run --rm -it \
  -v "$PWD:/srv/jekyll" \
  -p 4000:4000 \
  jekyll/jekyll:4.2.2 jekyll serve
```

啟動後，請在瀏覽器中打開 `http://localhost:4000/ai-lucky/` 即可進行即時預覽與測試。
修改 CSS 或網頁內容後，Jekyll 會自動重新編譯，且本項目已配備 **UNIX 戳記自動防快取機制**，每次重新編譯都會迫使瀏覽器加載最新樣式，預覽即時且完美！
