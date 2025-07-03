# Ghoona Goods LP スタイルガイド

## 1. プロジェクト情報
- **プロジェクト名**: Ghoona Goods ランディングページ
- **スタイル名**: プレミアム・モダン・ミニマル
- **作成日**: 2025-07-03
- **更新日**: 2025-07-03

## 2. デザインコンセプト
- **全体テーマ**: 高級感と親しみやすさを両立したプレミアムデザイン
- **デザインキーワード**: 洗練、信頼感、エレガント、プロフェッショナル、親しみやすさ
- **参考サイト**: 現在のGhoona Goods LP実装

## 3. カラーパレット

### 3.1 メインカラー
- **プライマリカラー**: CSS変数 `primary` - ブランドメインカラー（ブルー系）
- **セカンダリカラー**: CSS変数 `secondary` - サブカラー

### 3.2 アクセントカラー
- **アンバー系**: `from-amber-500/30 via-orange-400/20 to-red-500/10` - Made in Japan強み
- **ブルー系**: `from-blue-500/30 via-cyan-400/20 to-purple-500/10` - スケーラブル強み
- **エメラルド系**: `from-emerald-500/30 via-green-400/20 to-teal-500/10` - ワンストップ強み

### 3.3 ニュートラルカラー
- **背景色**: CSS変数 `background` - メイン背景
- **カード背景**: `bg-card/30 backdrop-blur-sm` - 半透明カード
- **テキストカラー**: CSS変数 `foreground` - メインテキスト
- **サブテキスト**: `text-foreground/70`, `text-foreground/60` - 階層的なテキスト
- **ボーダーカラー**: `border-border/20` - 控えめなボーダー

### 3.4 グラデーション
- **背景グラデーション**: `bg-gradient-to-br from-background to-background/95`
- **セクション間**: `bg-gradient-to-b from-background to-primary/2`
- **カードホバー**: `hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent`

## 4. タイポグラフィ

### 4.1 フォントファミリー
- **メインフォント**: システムデフォルト（Next.js標準）
- **日本語対応**: ヒラギノ角ゴ、Noto Sans JP等の読みやすいゴシック体

### 4.2 フォントサイズ
- **H1**: `text-4xl md:text-6xl lg:text-8xl` - ヒーローメインタイトル
- **H2**: `text-5xl md:text-6xl` - セクションタイトル
- **H3**: `text-4xl md:text-5xl` - サブセクションタイトル
- **H4**: `text-2xl md:text-3xl` - カードタイトル
- **本文**: `text-lg` - 標準テキスト
- **キャプション**: `text-sm`, `text-xs` - 補足情報

### 4.3 フォントウェイト・スタイル
- **ライト**: `font-light` - エレガントな印象
- **レギュラー**: `font-medium` - 標準テキスト
- **ボールド**: `font-bold`, `font-black` - 強調テキスト
- **文字間**: `tracking-tight`, `tracking-wider` - 可読性重視

## 5. レイアウト

### 5.1 グリッドシステム
- **コンテナ最大幅**: `max-w-6xl`, `max-w-7xl` - セクションによって調整
- **カラム数**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - レスポンシブ対応
- **ガップ**: `gap-8`, `gap-16` - セクションに応じた間隔

### 5.2 余白・間隔
- **セクション間**: `py-24` - 大きな縦間隔
- **要素間**: `space-y-6`, `space-y-8` - 中程度の間隔
- **内部余白**: `p-6`, `p-8` - カード内パディング

### 5.3 ブレークポイント
- **モバイル**: デフォルト（〜768px）
- **タブレット**: `md:` （768px〜）
- **デスクトップ**: `lg:` （1024px〜）

## 6. コンポーネントスタイル

### 6.1 ボタン
- **プライマリボタン**: 
  ```css
  px-10 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg 
  hover:bg-primary/90 transition-all duration-300 hover:scale-105
  ```
- **セカンダリボタン**: 
  ```css
  px-10 py-4 border border-foreground/20 text-foreground rounded-lg font-medium text-lg 
  hover:bg-foreground/5 transition-all duration-300 hover:scale-105
  ```
- **ホバー効果**: `hover:scale-105` - 微細な拡大アニメーション

### 6.2 カード
- **ベースカード**: 
  ```css
  bg-gradient-to-br backdrop-blur-xl border-2 rounded-[2rem] p-8 
  transition-all duration-700 hover:shadow-3xl hover:-translate-y-6 hover:scale-105
  ```
- **シャドウ**: `shadow-2xl`, `hover:shadow-3xl` - 立体感演出
- **角丸**: `rounded-[2rem]`, `rounded-3xl` - モダンな印象

### 6.3 アニメーション要素
- **浮遊要素**: 
  ```css
  w-3 h-3 bg-primary/20 rounded-full animate-float-slow opacity-100
  ```
- **パルス効果**: `animate-pulse` - 注意を引く要素
- **バウンス**: `animate-bounce` - アクセント要素

## 7. アニメーション・エフェクト

### 7.1 トランジション
- **基本トランジション**: `transition-all duration-300` - 軽快な変化
- **長時間トランジション**: `transition-all duration-1000` - 重要な変化
- **ホバーエフェクト**: `hover:scale-105`, `hover:-translate-y-1` - インタラクティブ

### 7.2 登場アニメーション
- **フェードイン**: `opacity-100 translate-y-0` vs `opacity-0 translate-y-8`
- **段階的登場**: `transitionDelay: ${index * 200 + 300}ms` - 順次表示
- **Intersection Observer**: 画面内表示時にアニメーション発火

### 7.3 背景エフェクト
- **グラデーション球**: 
  ```css
  w-60 h-60 bg-gradient-to-r from-primary/15 via-purple-500/10 to-pink-500/15 
  rounded-full blur-3xl animate-pulse
  ```

## 8. セクション別スタイル

### 8.1 ヒーローセクション
- **背景**: `bg-gradient-to-br from-background to-background/95`
- **高さ**: `min-h-screen` - フルスクリーン
- **オーバーレイ**: 繊細な背景パターンとアニメーション要素

### 8.2 強みセクション
- **背景**: `bg-gradient-to-b from-background to-background/50`
- **カード**: 各強みごとに異なるグラデーションテーマ
- **アイコン**: 3Dグラデーション効果とアニメーション

### 8.3 商品セクション
- **背景**: `bg-gradient-to-b from-primary/3 to-background`
- **商品選択**: グリッドレイアウトによるタブ形式
- **画像**: `aspect-[4/3]` 比率統一

### 8.4 その他セクション
- **品質**: `bg-gradient-to-b from-background to-primary/2`
- **プロセス**: `bg-gradient-to-b from-secondary/5 to-background`
- **お客様の声**: `bg-gradient-to-b from-background to-secondary/5`

## 9. レスポンシブデザイン

### 9.1 モバイルファースト
- **アプローチ**: モバイル表示を基準に、段階的に拡張
- **優先要素**: CTAボタン、主要情報の可視性

### 9.2 デバイス別調整
- **デスクトップ**: 大きなタイポグラフィ、複雑なレイアウト
- **タブレット**: 中間的なグリッド配置
- **スマートフォン**: シンプルな縦積みレイアウト

## 10. インタラクション

### 10.1 ホバーエフェクト
- **スケール**: `hover:scale-105` - 軽微な拡大
- **移動**: `hover:-translate-y-1` - 浮上感
- **色変化**: `hover:bg-primary/10` - 背景色変化

### 10.2 クリックフィードバック
- **アクティブ状態**: `active:scale-95` - 押下感
- **フォーカス**: `focus:ring-2 focus:ring-primary` - アクセシビリティ

## 11. 特殊エフェクト

### 11.1 Backdrop Blur
- **半透明効果**: `backdrop-blur-sm`, `backdrop-blur-xl` - ガラス効果
- **用途**: カード背景、オーバーレイ

### 11.2 グラデーションマスク
- **テキストグラデーション**: 
  ```css
  text-transparent bg-clip-text bg-gradient-to-r 
  from-primary via-purple-600 to-pink-600
  ```

## 12. パフォーマンス考慮

### 12.1 アニメーション最適化
- **will-change**: CSSアニメーションの最適化
- **transform**: GPU加速によるスムーズな動作
- **減速**: `prefer-reduced-motion` 対応

### 12.2 画像最適化
- **遅延読み込み**: Next.js Image コンポーネント活用
- **レスポンシブ画像**: 複数解像度対応

## 13. アクセシビリティ

### 13.1 カラーコントラスト
- **テキスト**: WCAG AA準拠のコントラスト比
- **フォーカス**: 明確な視覚的フィードバック

### 13.2 キーボードナビゲーション
- **Tab順序**: 論理的なフォーカス順序
- **スキップリンク**: メインコンテンツへの直接アクセス