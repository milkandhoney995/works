# 配列とメソッド

## 配列の基本

### 配列の作成

```javascript
// リテラル表記
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];

// 混合型
const mixed = [1, 'two', true, null, undefined];

// Array コンストラクタ
const arr3 = new Array(3);     // 3つの要素を持つ配列
const arr4 = new Array(1, 2, 3); // [1, 2, 3]

// 空の配列
const empty = [];
```

### 配列のプロパティ

```javascript
const arr = [1, 2, 3, 4, 5];

// 長さを取得
console.log(arr.length); // 5

// インデックスでアクセス
console.log(arr[0]); // 1
console.log(arr[arr.length - 1]); // 5

// 要素の追加
arr[5] = 6;
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

## 配列を変更するメソッド

### push / pop

```javascript
const arr = [1, 2, 3];

// 末尾に追加
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// 複数追加
arr.push(5, 6);
console.log(arr); // [1, 2, 3, 4, 5, 6]

// 末尾を削除して取得
const last = arr.pop();
console.log(last); // 6
console.log(arr); // [1, 2, 3, 4, 5]
```

### shift / unshift

```javascript
const arr = [1, 2, 3];

// 先頭を削除して取得
const first = arr.shift();
console.log(first); // 1
console.log(arr); // [2, 3]

// 先頭に追加
arr.unshift(0);
console.log(arr); // [0, 2, 3]

// 複数追加
arr.unshift(-2, -1);
console.log(arr); // [-2, -1, 0, 2, 3]
```

### splice

特定のインデックスで要素を削除または挿入します。

```javascript
const arr = [1, 2, 3, 4, 5];

// インデックス2から2つ削除
arr.splice(2, 2);
console.log(arr); // [1, 2, 5]

// インデックス1に要素を挿入
arr.splice(1, 0, 'a', 'b');
console.log(arr); // [1, 'a', 'b', 2, 5]

// インデックス1を2つ削除して要素を挿入
arr.splice(1, 2, 'x');
console.log(arr); // [1, 'x', 2, 5]
```

### sort

```javascript
const arr = [3, 1, 4, 1, 5];

// アルファベット順でソート
arr.sort();
console.log(arr); // [1, 1, 3, 4, 5]

// 数値の昇順
const numbers = [10, 5, 40, 25];
numbers.sort((a, b) => a - b);
console.log(numbers); // [5, 10, 25, 40]

// 数値の降順
numbers.sort((a, b) => b - a);
console.log(numbers); // [40, 25, 10, 5]

// オブジェクトの配列をソート
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 },
];

users.sort((a, b) => a.age - b.age);
// [{ name: 'Jane', age: 25 }, ...]
```

### reverse

```javascript
const arr = [1, 2, 3, 4, 5];

arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
```

## 配列を変更しないメソッド

### slice

指定した範囲の要素をコピーして新しい配列を返します。

```javascript
const arr = [1, 2, 3, 4, 5];

// インデックス1から3の手前まで
const sliced = arr.slice(1, 3);
console.log(sliced); // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5] （元の配列は変わらない）

// 最後から2つ
const last2 = arr.slice(-2);
console.log(last2); // [4, 5]

// 全体をコピー
const copy = arr.slice();
console.log(copy); // [1, 2, 3, 4, 5]
```

### concat

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const combined = arr1.concat(arr2, arr3);
console.log(combined); // [1, 2, 3, 4, 5, 6]
console.log(arr1); // [1, 2] （元の配列は変わらない）
```

### join

```javascript
const arr = ['apple', 'banana', 'orange'];

// デフォルト: カンマ区切り
console.log(arr.join()); // "apple,banana,orange"

// 指定した区切り文字
console.log(arr.join('-')); // "apple-banana-orange"
console.log(arr.join(' ')); // "apple banana orange"

// 空文字列
console.log(arr.join('')); // "applebananaorange"
```

## 配列を「反復」するメソッド

### forEach

```javascript
const arr = ['a', 'b', 'c'];

arr.forEach((item, index, array) => {
  console.log(`${index}: ${item}`);
});
// 0: a
// 1: b
// 2: c
```

### map

```javascript
const numbers = [1, 2, 3, 4, 5];

const squared = numbers.map((n) => n * n);
console.log(squared); // [1, 4, 9, 16, 25]

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// より複雑な例
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];

const names = users.map((user) => user.name);
console.log(names); // ['John', 'Jane']
```

### filter

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]

const moreThanThree = numbers.filter((n) => n > 3);
console.log(moreThanThree); // [4, 5, 6]

// オブジェクトの配列
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 },
];

const adults = users.filter((user) => user.age >= 30);
// [{ name: 'John', age: 30 }, { name: 'Bob', age: 35 }]
```

### reduce

```javascript
const numbers = [1, 2, 3, 4, 5];

// 合計を計算
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// 積を計算
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product); // 120

// 配列をオブジェクトに変換
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user.name;
  return acc;
}, {});
console.log(userMap); // { 1: 'John', 2: 'Jane' }

// 複数行の使用例
const result = [1, 2, 3, 4, 5].reduce((acc, n, index, array) => {
  console.log(`Iteration: acc=${acc}, n=${n}, index=${index}`);
  return acc + n;
}, 0);
console.log('Final result:', result);
```

### find

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];

const user = users.find((u) => u.name === 'Jane');
console.log(user); // { id: 2, name: 'Jane' }

const notFound = users.find((u) => u.name === 'Alice');
console.log(notFound); // undefined
```

### findIndex

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];

const index = users.findIndex((u) => u.name === 'Jane');
console.log(index); // 1
```

### some

少なくとも1つの要素が条件を満たす場合、true を返します。

```javascript
const numbers = [1, 2, 3, 4, 5];

const hasEven = numbers.some((n) => n % 2 === 0);
console.log(hasEven); // true（2と4がある）

const hasNegative = numbers.some((n) => n < 0);
console.log(hasNegative); // false
```

### every

すべての要素が条件を満たす場合、true を返します。

```javascript
const numbers = [2, 4, 6, 8];

const allEven = numbers.every((n) => n % 2 === 0);
console.log(allEven); // true

const numbers2 = [2, 4, 5, 8];
const allEven2 = numbers2.every((n) => n % 2 === 0);
console.log(allEven2); // false
```

### flatMap

map して flatten します。

```javascript
const arr = [1, 2, 3];

const result = arr.flatMap((n) => [n, n * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]
```

## 配列を検索するメソッド

### indexOf / lastIndexOf

```javascript
const arr = ['a', 'b', 'c', 'b', 'd'];

console.log(arr.indexOf('b')); // 1（最初のインデックス）
console.log(arr.lastIndexOf('b')); // 3（最後のインデックス）
console.log(arr.indexOf('e')); // -1（見つからない）

const numbers = [1, 2, 3, 2, 1];
console.log(numbers.indexOf(2)); // 1
```

### includes

```javascript
const arr = ['apple', 'banana', 'orange'];

console.log(arr.includes('banana')); // true
console.log(arr.includes('grape')); // false

const numbers = [1, 2, 3, NaN];
console.log(numbers.includes(2)); // true
console.log(numbers.includes(NaN)); // true（indexOf とは異なる）
```

## 配列の展開

### flat

```javascript
const nested = [1, [2, 3], [4, [5, 6]]];

// 1階層だけ展開
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]

// 全階層を展開
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
```

## 実践的な例

### データフィルタリング

```javascript
const products = [
  { id: 1, name: 'A', price: 100, category: 'electronics' },
  { id: 2, name: 'B', price: 50, category: 'books' },
  { id: 3, name: 'C', price: 150, category: 'electronics' },
  { id: 4, name: 'D', price: 75, category: 'books' },
];

// 電子機器で100円以上をソート
const filtered = products
  .filter((p) => p.category === 'electronics' && p.price >= 100)
  .sort((a, b) => b.price - a.price);

console.log(filtered);
// [{ id: 3, name: 'C', price: 150, category: 'electronics' }]
```

### データ変換

```javascript
const users = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' },
];

const transformed = users.map((user) => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
}));

console.log(transformed);
// [
//   { id: 1, firstName: 'John', lastName: 'Doe', fullName: 'John Doe' },
//   { id: 2, firstName: 'Jane', lastName: 'Smith', fullName: 'Jane Smith' },
// ]
```

## まとめ

- **追加/削除**: push, pop, shift, unshift, splice
- **変換**: map, filter, reduce
- **検索**: find, findIndex, some, every, includes
- **その他**: slice, concat, join, sort, reverse
- **反復処理**: forEach, map, filter, reduce を使い分ける
