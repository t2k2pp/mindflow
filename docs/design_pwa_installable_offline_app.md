# MindFlow Studio - PWA（Progressive Web App）化・端末インストール設計書

## 1. 目的と概要
iPad、iPhone、Android、PCなどの端末において、ブラウザのアドレスバーやナビゲーション枠のない「スタンドアロンアプリ」としてホーム画面に追加・インストールして使えるようにする。
GitHub Pagesの静的ホスティング環境で完全稼働し、オフライン環境下でも起動でき、将来の機能追加やコード更新もスムーズにユーザー端末へ反映される仕組み（PWA）を構築する。

---

## 2. PWA要件と技術仕様

### 2.1 Web App Manifest (`manifest.json`)
- `name`: MindFlow Studio - マインドマップ
- `short_name`: MindFlow
- `display`: `standalone`（ブラウザUIのないアプリ画面）
- `background_color`: `#0f172a`（スプラッシュ画面用）
- `theme_color`: `#2563eb`（ステータスバー・ツールバー色）
- `orientation`: `any`（縦・横両対応）
- `icons`: 高精細SVGアイコンおよび各解像度対応PNGアイコン（192x192, 512x512）

### 2.2 Apple（iOS / iPadOS）Safari向け最適化
- `<meta name="apple-mobile-web-app-capable" content="yes">`
- `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
- `<meta name="apple-mobile-web-app-title" content="MindFlow">`
- `<link rel="apple-touch-icon" href="...">`

### 2.3 Service Worker (`sw.js`) と将来のアップデート考慮
- **オフライン動作 & キャッシュ戦略**:
  - 主要静的アセット（`index.html`, `manifest.json`, アイコン、FontAwesome、Google Fonts、Tailwind CDN等）をプリキャッシュ。
  - **Stale-While-Revalidate / ネットワーク優先キャッシュ戦略**:
    - オンライン時はバックグラウンドで最新ファイルを確認・取得。
  - **自動アップデート検知とプロンプト**:
    - バージョン名（例: `mindflow-cache-v1.0.0`）を管理。
    - GitHubリポジトリに新しいコミットがプッシュされてService Workerが更新されると、ブラウザが新しいWorkerを検知。
    - `waiting` 状態になった際にユーザーへ「新しいバージョンが利用可能です。更新しますか？ [今すぐ更新]」というトースト通知を表示。
    - ユーザーがクリックすると `skipWaiting()` を発行し、スムーズに最新バージョンへ再読み込み（リロード）。

### 2.4 インストール促進UI
- Chrome/Android等で `beforeinstallprompt` イベントを捕捉し、ヘッダーまたはモバイルメニューに「📲 アプリをインストール」ボタンを表示。
- iPad/iPhone（iOS）向けには、ヘルプまたはメニュー内に「共有ボタン ⎋ → ホーム画面に追加」のわかりやすいガイドを表示。

---

## 3. 実装計画
1. **設計書の作成とTODO更新・リモート格納**
2. **アプリアイコンと manifest.json の作成**
3. **Service Worker (`sw.js`) の実装（キャッシュとアップデート更新検知）**
4. **HTML (`index.html`, `mindflow_studio.html`) への PWA メタタグ・登録スクリプト・インストール導線の追加**
5. **検証、TODO完了更新、mainブランチへのプッシュ**
