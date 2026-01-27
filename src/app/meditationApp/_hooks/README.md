# meditationApp / hooks

MeditationApp 用のカスタム hooks を管理するディレクトリです。

各 hook は **責務単位で分離**され、`useMeditationTimer` が Facade として機能します。

---

## 構成

```
_hooks/
├── useMeditationTimer.ts # UI 向け Facade
├── useTimerCore.ts # タイマーの中核ロジック
├── useMediaController.ts # audio / video 制御
└── useCircleProgress.ts # SVG 円形プログレス制御
```


---

## 各 hook の責務

### useTimerCore
- タイマーの時間計測
- 再生 / 停止
- 残り時間計算
- **DOM / UI 非依存**

---

### useMediaController
- audio / video の再生制御
- 再生位置のリセット
- HTMLMediaElement に依存

---

### useCircleProgress
- SVG 円形プログレスの初期化
- 残り時間に応じた進捗更新
- SVG DOM 操作に限定

---

### useMeditationTimer（Facade）
- 上記 hooks を統合
- UI に必要な値・操作のみを公開
- 内部実装の変更が UI に波及しない設計

---

## 依存関係

```
useMeditationTimer
├── useTimerCore
├── useMediaController
└── useCircleProgress
```


UI コンポーネントは `useMeditationTimer` のみを利用し、
内部 hooks に直接依存しません。

---

## 設計方針

- 責務分離
- Facade による API 安定化
