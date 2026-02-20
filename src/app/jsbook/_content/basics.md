# JavaScript 基本文法

## 変数宣言

JavaScriptで変数を宣言する方法は3つあります。

### var - 古い方法

```javascript
var name = "太郎";
var age = 25;
```

**特徴:**
- 関数スコープ
- 再宣言可能
- 初期化前で`undefined`になる（ホイスティング）

### let - モダンな方法

```javascript
let count = 0;
let user = { name: "次郎", age: 30 };
```

**特徴:**
- ブロックスコープ
- 再宣言不可
- Temporal Dead Zone（TDZ）がある
- 推奨される使い方

### const - 再代入不可

```javascript
const PI = 3.14159;
const USER = { name: "三郎", age: 35 };
```

**特徴:**
- ブロックスコープ
- 再代入不可（ただしオブジェクトのプロパティは変更可能）
- 初期化が必須
- 最も推奨

## データ型

JavaScriptは7つのプリミティブ型と1つのオブジェクト型があります。

### プリミティブ型

#### 1. Number（数値）

```javascript
const integer = 42;
const decimal = 3.14;
const negative = -10;
const infinity = Infinity;
const notANumber = NaN;
```

#### 2. String（文字列）

```javascript
const single = 'Hello';
const double = "World";
const template = `Hello, ${name}!`;
```

#### 3. Boolean（真偽値）

```javascript
const isTrue = true;
const isFalse = false;
const result = 10 > 5; // true
```

#### 4. Undefined（未定義）

```javascript
let value;
console.log(value); // undefined
```

#### 5. Null（ヌル）

```javascript
const empty = null;
```

#### 6. Symbol（シンボル）

```javascript
const symbol1 = Symbol('desc');
const symbol2 = Symbol('desc');
console.log(symbol1 === symbol2); // false
```

#### 7. BigInt（大整数）

```javascript
const big = 123456789012345678901234567890n;
```

### オブジェクト型

```javascript
const obj = { key: 'value' };
const arr = [1, 2, 3];
const func = () => {};
```

## 演算子

### 算術演算子

```javascript
const a = 10;
const b = 3;

console.log(a + b);  // 13（加算）
console.log(a - b);  // 7（減算）
console.log(a * b);  // 30（乗算）
console.log(a / b);  // 3.333...（除算）
console.log(a % b);  // 1（余剰）
console.log(a ** 2); // 100（べき乗）
```

### 比較演算子

```javascript
console.log(5 > 3);      // true
console.log(5 < 3);      // false
console.log(5 >= 5);     // true
console.log(5 <= 5);     // true
console.log(5 == '5');   // true（型変換あり）
console.log(5 === '5');  // false（厳密比較）
console.log(5 != '5');   // false
console.log(5 !== '5');  // true（厳密不等価）
```

### 論理演算子

```javascript
const a = true;
const b = false;

console.log(a && b); // false（論理積）
console.log(a || b); // true（論理和）
console.log(!a);     // false（論理否定）
```

## 制御構文

### if文

```javascript
const age = 20;

if (age >= 18) {
  console.log('成人です');
} else if (age >= 13) {
  console.log('13歳以上20歳未満です');
} else {
  console.log('13歳未満です');
}
```

### switch文

```javascript
const day = 'Monday';

switch (day) {
  case 'Monday':
    console.log('月曜日');
    break;
  case 'Friday':
    console.log('金曜日');
    break;
  default:
    console.log('その他の曜日');
}
```

### ループ

#### for文

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

#### while文

```javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
```

#### for...of文

```javascript
const arr = ['a', 'b', 'c'];
for (const item of arr) {
  console.log(item);
}
```

#### forEach文

```javascript
arr.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});
```

## 関数

### 関数宣言

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('太郎')); // "Hello, 太郎!"
```

### 関数式

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

### アロー関数

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};

// 1行の場合
const greet = (name) => `Hello, ${name}!`;

// パラメータが1つの場合
const greet = name => `Hello, ${name}!`;
```

### デフォルトパラメータ

```javascript
const greet = (name = '誰か') => {
  return `Hello, ${name}!`;
};

console.log(greet());        // "Hello, 誰か!"
console.log(greet('次郎'));  // "Hello, 次郎!"
```

## スコープ

JavaScriptのスコープは、変数がアクセスできる範囲を定義します。

### グローバルスコープ

```javascript
const global = 'グローバル';

function test() {
  console.log(global); // アクセス可能
}
```

### ローカルスコープ

```javascript
function test() {
  const local = 'ローカル';
  console.log(local); // アクセス可能
}

console.log(local); // ReferenceError
```

### クロージャ

```javascript
function outer() {
  const message = 'Hello';
  
  return function inner() {
    console.log(message); // outerの変数にアクセス可能
  };
}

const fn = outer();
fn(); // "Hello"
```

## テンプレートリテラル

```javascript
const name = '太郎';
const age = 25;

// テンプレートリテラル
const message = `
  名前: ${name}
  年齢: ${age}
  翌年: ${age + 1}
`;

console.log(message);
```

## まとめ

JavaScriptの基本文法を理解することは、より複雑なプログラミングの基礎となります。

- **変数**: `let`と`const`を使い分ける
- **データ型**: JavaScriptは動的型付け
- **演算子**: 比較には`===`を使う
- **制御構文**: if/switch/ループで流れを制御
- **関数**: 処理を再利用可能にする
- **スコープ**: 変数の有効範囲を理解する
