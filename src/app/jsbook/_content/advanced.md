# JavaScriptの高度なトピック

## 非同期処理

### コールバック

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'John' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data); // { id: 1, name: 'John' }
});
```

### Promise

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'John' };
      resolve(data);
    }, 1000);
  });
}

fetchData()
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### async/await

```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getData();
```

## オブジェクト指向

### クラス

```javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }

  static create(name, age) {
    return new User(name, age);
  }
}

const user = new User('John', 30);
console.log(user.greet()); // "Hello, I'm John"
```

### 継承

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

class Developer extends Person {
  constructor(name, language) {
    super(name);
    this.language = language;
  }

  code() {
    return `${this.name} is coding in ${this.language}`;
  }
}

const dev = new Developer('Jane', 'JavaScript');
console.log(dev.greet()); // "Hello, Jane"
console.log(dev.code()); // "Jane is coding in JavaScript"
```

## 関数型プログラミング

### map

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### filter

```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]
```

### reduce

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15
```

### 関数合成

```javascript
const compose = (...fns) => (x) => fns.reduceRight((acc, f) => f(acc), x);

const add = (n) => n + 1;
const multiply = (n) => n * 2;
const subtract = (n) => n - 3;

const composed = compose(subtract, multiply, add);
console.log(composed(5)); // ((5 + 1) * 2) - 3 = 9
```

## デストラクチャリング

### オブジェクトのデストラクチャリング

```javascript
const user = { name: 'John', age: 30, city: 'Tokyo' };

const { name, age } = user;
console.log(name); // "John"
console.log(age); // 30

// デフォルト値
const { email = 'no-email' } = user;
console.log(email); // "no-email"

// 名前の変更
const { name: userName } = user;
console.log(userName); // "John"
```

### 配列のデストラクチャリング

```javascript
const arr = [1, 2, 3, 4, 5];

const [first, second] = arr;
console.log(first); // 1
console.log(second); // 2

const [a, , c] = arr; // 2番目をスキップ
console.log(a); // 1
console.log(c); // 3

const [x, ...rest] = arr; // 残りを取得
console.log(x); // 1
console.log(rest); // [2, 3, 4, 5]
```

## スプレッド演算子とレスト演算子

### スプレッド演算子

```javascript
// 配列の展開
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// オブジェクトの展開
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// 関数の引数
const numbers = [1, 2, 3];
Math.max(...numbers); // 3
```

### レスト演算子

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 分割代入でのレスト
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]
```

## クロージャとモジュールパターン

```javascript
const createCounter = () => {
  let count = 0;

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
};

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
```

## this バインディング

```javascript
const user = {
  name: 'John',
  greet() {
    console.log(`Hello, ${this.name}`);
  },
  delayedGreet() {
    // 間違い: thisがグローバルになる
    setTimeout(function() {
      console.log(`Hello, ${this.name}`);
    }, 1000);
  },
  correctDelayedGreet() {
    // 正しい: アロー関数は外側のthisを継承
    setTimeout(() => {
      console.log(`Hello, ${this.name}`);
    }, 1000);
  },
};

user.greet(); // "Hello, John"
user.delayedGreet(); // "Hello, undefined"
user.correctDelayedGreet(); // "Hello, John"
```

### call, apply, bind

```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}`;
}

const user = { name: 'John' };

// call: 引数を直接指定
greet.call(user, 'Hello'); // "Hello, John"

// apply: 引数を配列で指定
greet.apply(user, ['Hi']); // "Hi, John"

// bind: 新しい関数を作成
const boundGreet = greet.bind(user, 'Hey');
boundGreet(); // "Hey, John"
```

## プロトタイプ

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal('Dog');
dog.speak(); // "Dog makes a sound"
```

## ジェネレータ

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

## まとめ

- **非同期処理**: Promise と async/await を使う
- **クラス**: ES6クラスで構造化されたコード
- **関数型**: map, filter, reduce で効率的に処理
- **デストラクチャリング**: 変数宣言を簡潔に
- **スプレッド演算子**: 配列/オブジェクトの展開
- **クロージャ**: プライベート変数の実装
- **this バインディング**: アロー関数で直感的に
