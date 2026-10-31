# MindFlow - リポジトリ設計書（README & GitHub Pages連携設計）

## 1. 目的と背景
`https://github.com/t2k2pp/repositories_search` は、GitHub上のリポジトリを検索・カタログ化し、README情報やデモURLを自動収集して一覧表示するポータルシステムである。

本リポジトリ（`mindflow`）において、`repositories_search` 上で以下の要件を満たすことを目的とする：
1. **説明の自動抽出**: リポジトリ一覧のカード・リストに、本ツールの概要と魅力が端的に伝わる説明文が表示されること。
2. **ワンクリックでのPagesアクセス**:
   - `repositories_search` のカード詳細モーダルから直接クリックして GitHub Pages を開けること。
   - GitHubリポジトリの `homepage` 設定による「Demo」リンクからも直接開けること。
   - `https://t2k2pp.github.io/mindflow/` および `mindflow_studio.html` の両方のURLで正常にアプリが稼働すること。
3. **適切なカテゴリ・タグ分類**: `repositories_search` の自動判定により、Webアプリ（`biz-app`）および関連技術タグ（`GitHub Pages`, `JavaScript`, `Tailwind`, `SVG`, `Markdown` 等）が正しく付与されること。

---

## 2. repositories_search の解析結果と設計方針

### 2.1 説明文（Summary）の抽出ロジック
- `repositories_search` は `repo.description` が未設定の場合、`README.md` の見出し・コメントを除いた最初の段落（8文字以上、最大160文字）を `summary` として抽出する。
- したがって、`README.md` の冒頭に「MindFlow Studio」の具体的な機能・魅力を表すクリアな導入段落を配置する。

### 2.2 リンクの表示と配置
- **README冒頭の目立つリンク**:
  - `README.md` のファーストビュー直下に、GitHub Pages へのダイレクトリンクを配置する。
  - URL: `https://t2k2pp.github.io/mindflow/`
- **GitHub Homepage設定**:
  - GitHubの `About` -> `Website`（`homepage` フィールド）に `https://t2k2pp.github.io/mindflow/` を設定することで、`repositories_search` のカード上にある `<i class="fa-solid fa-link"></i> Demo` ボタンが有効化される。

### 2.3 GitHub Pages のルーティング対応
- GitHub Pages では通常リポジトリルートの `index.html` がデフォルトドキュメントとして配信される。
- 現在は `mindflow_studio.html` のみ存在するため、ルートアクセス（`https://t2k2pp.github.io/mindflow/`）で即座にアプリが利用できるよう、`index.html` を作成（`mindflow_studio.html` と同一構成）し、既存の `mindflow_studio.html` も保持する。

### 2.4 タグおよびカテゴリ判定
- 抽出対象キーワード（`GitHub Pages`, `Tailwind`, `SVG`, `JavaScript`）およびハッシュタグ（`#MindMap`, `#JavaScript`, `#Webツール`, `#SVG` 等）を README 内に明記する。

---

## 3. 実装計画

1. **設計書・ToDo作成**:
   - 本設計書および `TODO.md` の作成・コミット・プッシュ。
2. **GitHub Pages ルート用 index.html 作成**:
   - `mindflow_studio.html` をもとに `index.html` を配置。
3. **README.md 作成**:
   - 冒頭にデモリンク・要約・特徴・タグ・使い方を記載。
4. **確認とリモート反映**:
   - 各ステップでのリモート格納と整合性確認。
