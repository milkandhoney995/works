# 面接で出るJavaScriptの問題

以下はフロントエンドの面接でよく問われる質問と、詳細な回答・コード例を含むガイドです。

---

## 1. JavaScriptのイベントループ

### Q: JavaScriptのイベントループとは何ですか？実際の実行順序を説明してください。

**A:** JavaScriptは単一スレッドで動作し、イベントループはコールスタックとタスクキュー（マクロタスク／マイクロタスク）を管理して非同期処理を実現します。

**実行順序（重要）:**

1. **Call Stack**: すべての同期コードを実行
2. **Microtask Queue**: Promise.then()、queueMicrotask()などを処理
3. **Macrotask Queue**: setTimeout()、setInterval()、I/O操作などを処理

```javascript
console.log('1. スタート');

setTimeout(() => {
  console.log('6. setTimeout（マクロタスク）');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3. Promise.then（マイクロタスク）');
  })
  .then(() => {
    console.log('5. 2つ目のPromise.then');
  });

queueMicrotask(() => {
  console.log('4. queueMicrotask（マイクロタスク）');
});

console.log('2. 同期コード終了');

// 出力順序:
// 1. スタート
// 2. 同期コード終了
// 3. Promise.then（マイクロタスク）
// 4. queueMicrotask（マイクロタスク）
// 5. 2つ目のPromise.then (Promise の次の then は「前の then が完了した後」に登録される)
// 6. setTimeout（マクロタスク）
```

**マイクロタスク > マクロタスク** の優先順位を覚えること！

---

## 2. パフォーマンス最適化

### Q: reflow（レイアウト）と repaint（再描画）の違いは？最適化方法は？

**A:** 
- **Reflow**: 要素のレイアウト（位置・サイズ）を再計算する処理。**非常にコストが高い**
- **Repaint**: 視覚的スタイル（色・背景）を再描画する処理。reflow より安価

**Reflow が発生する操作:**
```javascript
element.offsetWidth;        // 読み取りで Reflow 発生
element.style.width = '100px'; // 書き込みで Reflow 発生
element.style.display = 'block'; // geometric property
element.offsetHeight;       // 読み取り
element.style.height = '200px';  // 書き込み
```

**最適化例 - バッチ処理:**
```javascript
// ❌ 悪い例：複数の Reflow を引き起こす
for (let i = 0; i < 1000; i++) {
  element.style.width = element.offsetWidth + 1 + 'px'; // 毎回 Reflow
}

// ✅ 良い例1：CSS で一度に処理
element.style.transform = 'scaleX(1.001)'; // transform は Reflow を起こさない

// ✅ 良い例2：DocumentFragment で一度に挿入
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // 一度だけ Reflow
```

---

## 3. スコープと変数宣言

### Q: `var`, `let`, `const` の違いを詳しく説明してください。

**A:** 重要なポイントは**スコープ**と**ホイスティング**の挙動です。

| 特性 | var | let | const |
|------|-----|-----|-------|
| スコープ | 関数スコープ | ブロックスコープ | ブロックスコープ |
| 再宣言 | ✅ 可能 | ❌ 不可 | ❌ 不可 |
| 再代入 | ✅ 可能 | ✅ 可能 | ❌ 不可 |
| ホイスティング | あり（初期値: undefined） | あり（TDZ） | あり（TDZ） |
| グローバル登録 | globalThis に登録 | 登録されない | 登録されない |

**TDZ（Temporal Dead Zone）- 初期化前参照エラー:**
```javascript
console.log(x); // ❌ ReferenceError: Cannot access 'x' before initialization
let x = 5;

// var の場合は undefined（ホイスティングに初期値がある）
console.log(y); // undefined
var y = 10;
```

**ホイスティングの挙動:**
```javascript
// var はトップに巻き上げられる + 初期化される
function test1() {
  console.log(a); // undefined
  var a = 1;
}

// let / const はホイスティングされるが初期化されない（TDZ）
function test2() {
  console.log(b); // ReferenceError
  let b = 2;
}
```

**推奨ルール:**
- デフォルト: **const を使う**（再代入不可 = 予期しない変更を防ぐ）
- 再代入が必要な場合: **let を使う**
- **var は使わない**（レガシーコードを除く）

---

## 4. クロージャ

### Q: クロージャとは何か？実務的な使用例を示してください。

**A:** クロージャは外側の関数のスコープにアクセス可能な内側の関数です。**プライベート変数**の実装に使われます。

**基本例:**
```javascript
function createAdder(x) {
  // x はここで「記憶」される
  return function(y) {
    return x + y;
  };
}

const add5 = createAdder(5);
console.log(add5(3)); // 8
console.log(add5(10)); // 15
```

**実務例1 - モジュールパターン（プライベート変数）:**
```javascript
const counter = (() => {
  let count = 0; // プライベート変数

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    },
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count); // undefined（プライベート）
```

**実務例2 - データバインディング:**
```javascript
function createUser(name, email) {
  let _email = email; // プライベート

  return {
    getName: () => name,
    getEmail: () => _email,
    setEmail: (newEmail) => {
      _email = newEmail;
    },
  };
}

const user = createUser('Alice', 'alice@example.com');
console.log(user.getEmail()); // alice@example.com
user.setEmail('alice.new@example.com');
console.log(user.getEmail()); // alice.new@example.com
```

---

## 5. 非同期処理

### Q: Promise と async/await の違いは？実装パターンの違いを示してください。

**A:** `async/await` は Promise を簡潔に書くための構文糖です。本質的には Promise と同じです。

**Promise パターン:**
```javascript
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}
```

**async/await パターン（同等）:**
```javascript
async function fetchUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

**複数の Promise を並列実行:**
```javascript
// Promise.all - すべて成功したら OK、**1つ失敗すると全体が失敗**
async function fetchMultiple() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetch('/api/users/1').then(r => r.json()),
      fetch('/api/posts/1').then(r => r.json()),
      fetch('/api/comments/1').then(r => r.json()),
    ]);
    return { user, posts, comments };
  } catch (error) {
    console.error('1つ以上が失敗');
  }
}

// Promise.allSettled - すべての結果を待つ（成功/失敗関係なく）
async function fetchSafe() {
  const results = await Promise.allSettled([
    fetch('/api/users/1').then(r => r.json()),
    fetch('/api/posts/1').then(r => r.json()), // これが失敗していても進む
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`${index}: 成功`, result.value);
    } else {
      console.log(`${index}: 失敗`, result.reason);
    }
  });
}
```

---

## 6. CORS（クロスオリジンリソース共有）

### Q: CORS とは何か？ブラウザ側と サーバー側での対応方法は？

**A:** CORS はブラウザが**同一生成元ポリシー（SOP）**を補強する仕組みです。異なるオリジン間の HTTP リクエストを制御します。

**オリジンが異なる例:**
```javascript
// https://example.com で実行
fetch('https://api.other-domain.com/data'); // ❌ CORS プリフライト発生
fetch('/api/data'); // ✅ 同じオリジン
fetch('https://example.com/api/data'); // ✅ 同じオリジン
```

**サーバー側の対応:**
```javascript
// Express.js 例
app.use((req, res, next) => {
  // どのオリジンからのアクセスを허用するか
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  
  // プリフライト OPTIONS リクエストのヘッダ
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Credentials（Cookie など）を許可するか
  res.header('Access-Control-Allow-Credentials', 'true');
  
  next();
});
```

**クライアント側の対応（credentials フラグ）:**
```javascript
// Cookie をリクエストに含める
fetch('https://api.other-domain.com/user', {
  credentials: 'include', // ⚠️ サーバー側も Allow-Credentials: true が必須
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 7. デバウンス vs スロットル

### Q: デバウンスとスロットルの違いは？実装例示してください。

**A:**
- **デバウンス**: 最後のイベントから一定時間、新しいイベントがなければ実行
- **スロットル**: 一定間隔ごとに最大 1 回実行

**デバウンス実装（検索入力など）:**
```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const handleSearch = debounce((query) => {
  console.log('検索:', query);
}, 500);

document.querySelector('input').addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
// 500ms 入力がなければ実行
```

**スロットル実装（スクロール・リサイズなど）:**
```javascript
function throttle(fn, delay) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= delay) {
      fn(...args);
      lastRun = now;
    }
  };
}

const handleScroll = throttle(() => {
  console.log('スクロール位置:', window.scrollY);
}, 1000); // 最大 1 秒に 1 回

window.addEventListener('scroll', handleScroll);
```

---

## 8. メモリリーク

### Q: メモリリークの原因と対策を説明してください。

**A:** メモリが解放されず蓄積し続ける問題です。SPAでは特に注意が必要。

**原因 1: イベントリスナーの未削除**
```javascript
// ❌ メモリリーク
const button = document.getElementById('btn');
button.addEventListener('click', () => {
  console.log('clicked');
});
// button が削除されてもリスナーが残る

// ✅ 対策：必ず削除
function cleanup() {
  button.removeEventListener('click', handler);
}
```

**原因 2: グローバル変数への参照**
```javascript
// ❌ メモリリーク
let largeData;
function loadData() {
  largeData = Array(1000000).fill(0); // グローバルに溜まり続ける
}

// ✅ 対策：使い終わったら null に
function cleanup() {
  largeData = null;
}
```

**原因 3: 閉包による不要な参照保持**
```javascript
// ❌ メモリリーク
function setupListener() {
  const largeArray = Array(1000000).fill(0);
  element.addEventListener('click', () => {
    // largeArray がクロージャで保持され続ける
    console.log(largeArray.length);
  });
}

// ✅ 対策：WeakRef で弱参照
function setupListenerSafe() {
  let largeArray = Array(1000000).fill(0);
  const weakRef = new WeakRef(largeArray);
  
  element.addEventListener('click', () => {
    const array = weakRef.deref();
    if (array) {
      console.log(array.length);
    }
  });
  
  largeArray = null; // GC の対象になる
}
```

---

## 9. その他頻出トピック

### Q: CSS の特異性（Specificity）について説明してください。

**優先度（高 → 低）:**

1. **インラインスタイル** (`style="color: red"`) → 1000
2. **ID セレクタ** (`#header`) → 100
3. **クラス・属性・疑似クラス** (`.active`, `[href]`, `:hover`) → 10
4. **タグセレクタ・疑似要素** (`p`, `::before`) → 1

```css
/* 特異性計算例 */
p { color: blue; } /* 0,0,0,1 */
.highlight { color: yellow; } /* 0,0,1,0 - p より優先 */
#main { color: red; } /* 0,1,0,0 - .highlight より優先 */
p.highlight#main { color: green; } /* 0,1,1,1 */

/* !important は最高（避けるべき） */
.text { color: blue !important; }
```

### Q: 仮想DOM とは何か？実DOM との違いは？

**仮想DOM:**
- JavaScript内の軽量なメモリ表現
- **差分（diff）アルゴリズム**で変更箇所を特定
- **最小限の実DOM操作**に変換して更新

```javascript
// React 的な概念
const oldVDOM = { type: 'div', props: { className: 'box', children: 'Hello' } };
const newVDOM = { type: 'div', props: { className: 'active', children: 'Hello' } };

// diff: className が変わっただけ → className だけ更新
// 実DOM: element.className = 'active';
```

---

## まとめ（面接で加点する回答のコツ）

✅ **理由まで説明する** - "そうだから" ではなく "なぜそうなるのか"<br />
✅ **コード例を示す** - 実装レベルの理解を示す<br />
✅ **トレードオフを認識** - "この方法も考えたが..." と判断プロセスを見せる<br />
✅ **実務経験を交える** - "プロジェクトで〜という課題があり..."<br />
✅ **新しい知識も示す** - WeakMap、Promise.allSettled など最新機能を知っていることをアピール