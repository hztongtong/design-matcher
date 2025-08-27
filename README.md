# Design Matcher - デザイン照合ツール

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-v1.2-blue?logo=google-chrome)](https://chrome.google.com/webstore)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Version](https://img.shields.io/badge/Version-1.2-orange)

## 概要

**Design Matcher** は、デザインカンプを Web ページに重ねて表示し、実装の精度を確認する Chrome 拡張機能です。フロントエンド開発者、デザイナー、QA エンジニアが、デザインと実装の差異を視覚的に比較することができます。

## 主な機能

### コア機能

- **デザインオーバーレイ**: デザインカンプ（画像）を Web ページの上に透明度付きで重ね合わせ表示
- **位置調整**: X/Y 座標をピクセル単位で調整
- **サイズ調整**: パーセント単位でのサイズ変更
- **透明度制御**: 0.0〜1.0 の範囲で透明度を調整
- **設定保存**: ファイル名ごとに調整した設定を保存・復元

### 操作機能

- **ドラッグ移動**: コントロールパネルをドラッグして任意の位置に移動
- **ワンクリック切り替え**: 拡張機能アイコンをクリックしてパネルの表示/非表示を切り替え
- **キーボード入力**: 数値入力フィールドで値を設定
- **方向ボタン**: 方向キーボタンでステップ単位の調整

## インストール

### Chrome Web Store から

1. [Design Matcher - デザイン照合ツール](https://chromewebstore.google.com/detail/design-matcher-%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E7%85%A7%E5%90%88%E3%83%84%E3%83%BC%E3%83%AB/ebgopdagnlagpgidgejohlmcgnejleib?authuser=0&hl=ja) へ移動
2. 「Chrome に追加」をクリック
3. 権限を確認して「拡張機能を追加」をクリック

### 開発者モードでのインストール（開発者向け）

1. このリポジトリをクローンまたはダウンロード

```bash
git clone https://github.com/username/design-matcher.git
cd design-matcher
```

2. Chrome で `chrome://extensions/` にアクセス
3. 「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. `src` フォルダを選択

## 使用方法

### 基本的な使い方

1. **拡張機能を起動**

   - Chrome ツールバーの Design Matcher アイコンをクリック

2. **デザインファイルを読み込み**

   - コントロールパネルの「Background」から画像ファイルを選択
   - 対応形式: JPG, PNG, GIF, WebP

3. **位置とサイズを調整**

   - Position X/Y: 画像の位置を調整
   - Size: 画像のサイズを percentage で変更
   - Opacity: 透明度を調整（0.0 = 完全透明、1.0 = 不透明）

4. **設定を保存**
   - 「Save Settings」で現在の設定を保存
   - 同じファイル名の画像を再度読み込むと設定が自動復元

### 高度な操作

- **ステップ移動**: Step Size を設定して、方向ボタンで移動
- **パネル移動**: ドラッグハンドルをドラッグしてパネル位置を変更
- **パネル最小化**: ドラッグハンドルをダブルクリックして最小化
- **設定削除**: 「Delete Settings」で保存済み設定をクリア

## 対象ユーザー

- **フロントエンド開発者**: デザインカンプと実装の差異確認
- **Web デザイナー**: 実装されたページとデザインの比較検証
- **QA エンジニア**: デザイン仕様通りの実装確認
- **UI/UX デザイナー**: プロトタイプと実装の整合性確認

## 使用例

### 典型的なワークフロー

1. デザイナーから受け取ったカンプファイルを用意
2. 実装中または完成した Web ページを開く
3. Design Matcher でカンプを重ね合わせ
4. 位置、サイズ、レイアウトの差異を視覚的に確認
5. 必要に応じて実装を調整

### 推奨される使用場面

- **レスポンシブデザインの確認**: 異なる画面サイズでの実装確認
- **コンポーネント単位の検証**: 個別 UI パーツのデザイン確認
- **最終品質チェック**: リリース前の確認

## プライバシーとセキュリティ

- **データ収集なし**: ユーザーデータや閲覧履歴は収集しません
- **ローカル保存**: 設定はブラウザのローカルストレージにのみ保存
- **最小権限**: 必要最小限の権限（storage のみ）で動作
- **Shadow DOM**: ページのスタイルに影響を与えない分離された UI

## 技術仕様

- **Manifest Version**: 3（最新の Chrome 拡張機能仕様）
- **対応ブラウザ**: Chrome 88+, Edge 88+（Chromium ベース）
- **権限**: `storage`（設定保存用）
- **言語**: JavaScript (ES6+)
- **UI 技術**: Shadow DOM, CSS3

## 既知の制限事項

- **大きなファイル**: 非常に大きな画像ファイルは読み込みが遅くなる場合があります
- **ファイル形式**: SVG 形式は現在サポートしていません

### 報告

- **バグ報告**: [Issues](https://github.com/hztongtong/design-matcher/issues) でバグを報告
- **機能要望**: 新機能のアイデアがあれば [Issues](https://github.com/hztongtong/design-matcher/issues) で提案
- **質問**: 使用方法に関する質問も [Issues](https://github.com/hztongtong/design-matcher/issues) で受け付けています

## サポート

### ヘルプ

- ~~[使用方法ガイド](#)~~
- ~~[既知の問題](#)~~
- ~~[Q&A](#)~~

### 連絡先

- **GitHub Issues**: 技術的な問題やバグ報告
- **Email**: [makoto@nakagiri.com](mailto:makoto@nakagiri.com)
- **Website**: [https://@nakagiri.com/contact/](https://@nakagiri.com/contact/)
-

## ライセンス

このプロジェクトは MIT License の下でライセンスされています。

- **ライセンス全文**: [LICENSE](LICENSE)
- **公式リファレンス**: [MIT License (OSI)](https://opensource.org/licenses/MIT)

---

[トップに戻る](#design-matcher---デザイン照合ツール)
