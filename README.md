# MindFlow Studio

🌐 **[MindFlow Studio を開く（GitHub Pages）](https://t2k2pp.github.io/mindflow/)**

MindFlow Studio（マインドフロー・スタジオ）は、思考の整理やアイデア出しを直感的な操作で行えるWebベースの高機能マインドマップ作成ツールです。ブラウザ上で軽快に動作し、ノードの自由配置や階層構造の折りたたみ、カラーカスタマイズ、URLでのデータ共有に対応しています。

---

## 🏷️ タグ
#マインドマップ #MindMap #アイデア出し #思考整理 #Webツール #JavaScript #Tailwind #SVG #GitHubPages

---

## 🚀 アプリへのアクセス
ブラウザから以下のリンクをクリックするだけで、インストール不要ですぐにご利用いただけます：

👉 **[https://t2k2pp.github.io/mindflow/](https://t2k2pp.github.io/mindflow/)**  
*(別名URL: [mindflow_studio.html](https://t2k2pp.github.io/mindflow/mindflow_studio.html))*

---

## ✨ 主な機能

- **直感的なノード操作**
  - ノードの追加（子ノード・兄弟ノード）、テキストインライン編集
  - ノードのドラッグ移動・自由なキャンバス配置
  - ブランチの折りたたみ / 展開で巨大なマップもすっきり整理
- **キーボードショートカット対応**
  - `Tab`: 子ノードの作成
  - `Enter`: 同階層（兄弟）ノードの作成
  - `Delete` / `Backspace`: ノードの削除
  - `Space` / `Double Click`: ノードテキストの編集
- **デザイン・ビジュアル**
  - ノード先頭への絵文字（Emoji）付与機能（直近履歴＋カテゴリ別ピッカー）
  - スムーズな曲線（SVGベジェ曲線）によるブランチ接続
  - ノードごとのカラーパレット変更・カスタマイズ
  - ライトモード / ダークモードのワンクリック切り替え
- **タブレット・モバイル最適化 & PWA アプリ化**
  - **ホーム画面への追加（PWA対応）**: iPad, iPhone, Android, PCでブラウザ枠のないネイティブアプリ風スタンドアロン起動が可能
  - **オフライン動作 & 自動アップデート**: Service Workerによるキャッシュと、最新版プッシュ時のワンタップ更新検知
  - iPad / iPad mini / スマートフォン縦向きに最適化されたレスポンシブUI
  - 1本指でのスムーズなアイテム移動、2本指ピンチズーム＆パン対応
  - 物理キーボードなしでも下部ドック（編集、絵文字、追加、削除等）から全機能操作可能
- **データの保存・共有**
  - 高解像度 PNG 画像およびベクター SVG ファイルとしてのエクスポート
  - ローカルストレージ自動保存 & IndexedDB複数マップ管理
  - JSON / Markdown ファイル形式での双方向インポート＆エクスポート
  - LZ-String圧縮によるURL共有（マップ全体をURLに埋め込んで共有可能）

---

## 🛠️ 技術スタック
- **Frontend**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS, Font Awesome
- **Rendering**: SVG (Dynamic Bezier Connectors), Canvas
- **Compression**: LZ-String
- **Hosting**: GitHub Pages
