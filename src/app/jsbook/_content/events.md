# イベント

## イベントとは

イベントは、ウェブページ内で発生するユーザー操作やスステムの状態変化です。JavaScriptではイベントリスナーを使ってそれらに応答できます。

## よく使われるイベント

### マウスイベント

| イベント | 説明 |
|---------|------|
| `click` | 要素をクリックしたとき |
| `dblclick` | 要素をダブルクリックしたとき |
| `mousedown` | マウスボタンを押したとき |
| `mouseup` | マウスボタンを離したとき |
| `mousemove` | マウスが動いたとき |
| `mouseenter` | マウスが要素の上に入ったとき（バブリングしない） |
| `mouseleave` | マウスが要素から出たとき（バブリングしない） |
| `mouseover` | マウスが要素の上に入ったとき（バブリングする） |
| `mouseout` | マウスが要素から出たとき（バブリングする） |

### キーボードイベント

| イベント | 説明 |
|---------|------|
| `keydown` | キーを押したとき（継続して発火） |
| `keyup` | キーを離したとき |
| `keypress` | キーを押したとき（文字キーのみ） |

### フォームイベント

| イベント | 説明 |
|---------|------|
| `focus` | 要素がフォーカスを得たとき |
| `blur` | 要素がフォーカスを失ったとき |
| `change` | 値が変更され、フォーカスを失ったとき |
| `input` | 値が変更されたとき（入力中も発火） |
| `submit` | フォームが送信されたとき |
| `reset` | フォームがリセットされたとき |

### ウィンドウイベント

| イベント | 説明 |
|---------|------|
| `load` | ページの読み込みが完了したとき |
| `unload` | ページを離れるとき |
| `resize` | ウィンドウのサイズが変更されたとき |
| `scroll` | ページがスクロールされたとき |
| `beforeunload` | ページを離れる前 |

## イベントリスナーの追加

### addEventListener（推奨）

```javascript
const button = document.querySelector('button');

// イベントリスナーを追加
button.addEventListener('click', (event) => {
  console.log('ボタンがクリックされました');
});

// 複数のリスナーを追加可能
button.addEventListener('click', () => {
  console.log('これも実行されます');
});
```

### onイベント属性（非推奨）

```javascript
const button = document.querySelector('button');

// 直接設定（最後に設定したものだけが実行される）
button.onclick = (event) => {
  console.log('ボタンがクリックされました');
};
```

### HTML属性（非推奨）

```html
<button onclick="console.log('クリック')">ボタン</button>
```

## イベントオブジェクト

```javascript
element.addEventListener('click', (event) => {
  // イベント情報にアクセス
  console.log(event.type);        // "click"
  console.log(event.target);      // クリックされた要素
  console.log(event.currentTarget); // リスナーが付いている要素
  console.log(event.clientX);     // マウスのX座標（ビューポート基準）
  console.log(event.clientY);     // マウスのY座標（ビューポート基準）
  console.log(event.key);         // キーボードイベントの場合：キー名
  console.log(event.code);        // キーボードイベントの場合：キーコード
});
```

## イベントの制御

### preventDefault

イベントのデフォルト動作をキャンセルします。

```javascript
// リンクをクリックしてもページ遷移しない
const link = document.querySelector('a');
link.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('ページ遷移がキャンセルされました');
});

// フォーム送信をキャンセル
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('フォーム送信がキャンセルされました');
});
```

### stopPropagation

イベントのバブリングをストップします。

```javascript
const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

parent.addEventListener('click', () => {
  console.log('親がクリックされました');
});

child.addEventListener('click', (event) => {
  console.log('子がクリックされました');
  event.stopPropagation(); // 親への伝播をストップ
});

// 子をクリック: "子がクリックされました" だけ出力
```

### stopImmediatePropagation

同じ要素の他のリスナーの実行をストップします。

```javascript
const button = document.querySelector('button');

button.addEventListener('click', (event) => {
  console.log('1番目のリスナー');
  event.stopImmediatePropagation();
});

button.addEventListener('click', () => {
  console.log('2番目のリスナー（実行されない）');
});
```

## イベントリスナーの削除

### removeEventListener

```javascript
const button = document.querySelector('button');

// リスナー関数をあらかじめ保存
const handleClick = () => {
  console.log('クリック');
};

// リスナーを追加
button.addEventListener('click', handleClick);

// リスナーを削除
button.removeEventListener('click', handleClick);
```

## イベント委譲

親要素でイベントを処理することで、複数の子要素のイベントを効率的に処理できます。

```javascript
// 動的に追加される多数のボタンがある場合
const container = document.querySelector('.button-container');

// 親要素でリスナーを設定
container.addEventListener('click', (event) => {
  // クリックされた要素がボタンか確認
  if (event.target.tagName === 'BUTTON') {
    console.log(`ボタンがクリック: ${event.target.textContent}`);
  }
});
```

## 実践的な例

### クリック数カウンター

```javascript
let count = 0;
const button = document.querySelector('button');
const display = document.querySelector('.count-display');

button.addEventListener('click', () => {
  count++;
  display.textContent = count;
});
```

### 入力フォームのバリデーション

```javascript
const input = document.querySelector('#email');
const errorMsg = document.querySelector('.error-message');

input.addEventListener('blur', (event) => {
  const value = event.target.value;
  const isValid = value.includes('@');

  if (!isValid) {
    errorMsg.textContent = '有効なメールアドレスを入力してください';
    errorMsg.style.color = 'red';
  } else {
    errorMsg.textContent = '';
  }
});
```

### キーボードショートカット

```javascript
document.addEventListener('keydown', (event) => {
  // Ctrl + S で保存
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    console.log('保存しました');
  }

  // Enterキーで送信
  if (event.key === 'Enter') {
    console.log('送信しました');
  }
});
```

### マウスポジション追跡

```javascript
const mousePos = document.querySelector('.mouse-position');

document.addEventListener('mousemove', (event) => {
  mousePos.textContent = `X: ${event.clientX}, Y: ${event.clientY}`;
});
```

### ウィンドウリサイズ検出

```javascript
window.addEventListener('resize', () => {
  console.log(`ウィンドウサイズ: ${window.innerWidth}x${window.innerHeight}`);
});
```

### フォーム送信の処理

```javascript
const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const value = input.value.trim();
  if (value === '') {
    alert('テキストを入力してください');
    return;
  }

  console.log('デフォルト動作がキャンセルされました');
  console.log('入力値:', value);
  
  input.value = '';
  input.focus();
});
```

## イベント伝播

### バブリング

イベントが子要素から親要素へ伝播します。

```
子要素
  ↑ バブリング
親要素
  ↑
ドキュメント
```

### キャプチャリング

イベントがドキュメントから子要素へ伝播します。

```javascript
// キャプチャリングの途中で処理
element.addEventListener('click', (event) => {
  console.log('キャプチャ段階');
}, true); // 第3引数をtrueにするとキャプチャリング

// バブリング段階で処理
element.addEventListener('click', (event) => {
  console.log('バブリング段階');
}, false); // デフォルト
```

## パフォーマンスのベストプラクティス

1. **イベント委譲を使う**: 多数の要素にリスナーを付けない
2. **不要なリスナーを削除**: メモリリーク防止
3. **即座に大量のイベント処理を避ける**: スロットリング/デバウンスを使う

### デバウンス

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const input = document.querySelector('input');
const handleInput = debounce((event) => {
  console.log('ユーザーの入力を処理:', event.target.value);
}, 500);

input.addEventListener('input', handleInput);
```

### スロットリング

```javascript
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
}

const handleScroll = throttle(() => {
  console.log('スクロール処理');
}, 1000);

window.addEventListener('scroll', handleScroll);
```

## まとめ

- **リスナー追加**: `addEventListener` を使う
- **イベントオブジェクト**: `event` で詳細情報にアクセス
- **デフォルト動作**: `preventDefault()` でキャンセル
- **バブリング**: `stopPropagation()` で停止
- **イベント委譲**: 親要素で処理して効率化
- **パフォーマンス**: 不要なリスナーは削除し、デバウンス/スロットリングを活用
