# DOM操作

## DOMとは

Document Object Model（DOM）は、HTMLドキュメントをプログラムで操作するためのAPIです。JavaScriptでDOMを操作することで、ウェブページの内容を動的に変更できます。

## DOM構造

```
Document
  └── html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── header
          ├── main
          │   └── div
          │       ├── p
          │       └── button
          ├── aside
          └── footer
```

## 要素の取得

### getElementById

指定したIDを持つ要素を取得します。

```javascript
const element = document.getElementById('myId');
console.log(element);
```

**HTML:**
```html
<div id="myId">コンテンツ</div>
```

### querySelector

CSSセレクタで最初にマッチした要素を取得します。

```javascript
// IDで取得
const byId = document.querySelector('#myId');

// クラスで取得
const byClass = document.querySelector('.myClass');

// 要素名で取得
const byTag = document.querySelector('div');

// 複合セレクタ
const complex = document.querySelector('div.container #title');
```

### querySelectorAll

CSSセレクタでマッチしたすべての要素を取得します。

```javascript
const elements = document.querySelectorAll('.item');
console.log(elements); // NodeList

// ループで処理
elements.forEach((el) => {
  console.log(el.textContent);
});

// 配列に変換
const array = Array.from(elements);
```

### getElementsByClassName

指定したクラスを持つすべての要素を取得します。

```javascript
const items = document.getElementsByClassName('item');
console.log(items); // HTMLCollection
```

### getElementsByTagName

指定した要素名のすべての要素を取得します。

```javascript
const divs = document.getElementsByTagName('div');
console.log(divs); // HTMLCollection
```

## 要素の内容変更

### textContent

要素のテキスト内容を変更します。

```javascript
const element = document.getElementById('target');

// テキストを取得
const text = element.textContent;
console.log(text);

// テキストを設定
element.textContent = '新しいテキスト';
```

### innerHTML

要素のHTML内容を変更します。

```javascript
const element = document.getElementById('target');

// HTMLを設定
element.innerHTML = '<strong>太字</strong> と <em>斜体</em>';
```

**注意**: セキュリティ上のリスク（XSS）があるため、ユーザーからの入力をそのまま使うことは避けてください。

## 属性操作

### getAttribute

属性の値を取得します。

```javascript
const link = document.querySelector('a');
const href = link.getAttribute('href');
console.log(href);
```

### setAttribute

属性を設定します。

```javascript
const img = document.querySelector('img');
img.setAttribute('src', '/path/to/image.jpg');
img.setAttribute('alt', '画像の説明');
```

### removeAttribute

属性を削除します。

```javascript
const button = document.querySelector('button');
button.removeAttribute('disabled');
```

### プロパティでの操作

```javascript
const img = document.querySelector('img');

// プロパティで設定（推奨）
img.src = '/path/to/image.jpg';
img.alt = '画像の説明';

// クラス操作
element.className = 'new-class';
element.id = 'new-id';
```

## クラス操作

### classList

要素のクラスを操作します。

```javascript
const element = document.querySelector('div');

// クラスを追加
element.classList.add('active');

// クラスを削除
element.classList.remove('inactive');

// クラスを切り替え
element.classList.toggle('highlight');

// クラスが存在するか確認
const hasClass = element.classList.contains('active');
console.log(hasClass);

// 複数のクラスを追加
element.classList.add('bold', 'text-large');

// すべてのクラスを置換
element.className = 'new-class';
```

## スタイル操作

### style プロパティ

```javascript
const element = document.querySelector('div');

// 個別にスタイルを設定
element.style.color = 'red';
element.style.fontSize = '20px';
element.style.backgroundColor = '#f0f0f0';
element.style.padding = '10px';

// 複数設定
element.style.cssText = 'color: red; font-size: 20px; padding: 10px;';

// スタイルを取得
const color = element.style.color;
console.log(color);

// スタイルを削除
element.style.color = '';
```

### getComputedStyle

計算されたスタイル値を取得します。

```javascript
const element = document.querySelector('div');
const styles = window.getComputedStyle(element);

console.log(styles.color);
console.log(styles.padding);
console.log(styles.display);
```

## 要素の作成と追加

### createElement

新しい要素を作成します。

```javascript
const newDiv = document.createElement('div');
newDiv.textContent = '新しい要素';
newDiv.className = 'new-class';
```

### appendChild

要素を子要素として追加します。

```javascript
const parent = document.getElementById('parent');
const child = document.createElement('p');
child.textContent = 'これは子要素です';

parent.appendChild(child);
```

### insertAdjacentHTML

指定した位置にHTML要素を挿入します。

```javascript
const element = document.querySelector('div');

// 要素の直前に挿入
element.insertAdjacentHTML('beforebegin', '<p>前</p>');

// 要素の開始タグの直後に挿入
element.insertAdjacentHTML('afterbegin', '<p>中の前</p>');

// 要素の終了タグの直前に挿入
element.insertAdjacentHTML('beforeend', '<p>中の後</p>');

// 要素の直後に挿入
element.insertAdjacentHTML('afterend', '<p>後</p>');
```

## 要素の削除

### removeChild

子要素を削除します。

```javascript
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.removeChild(child);
```

### remove

要素自体を削除します。

```javascript
const element = document.getElementById('target');
element.remove();
```

## 要素の関係性にアクセス

```javascript
const element = document.querySelector('div');

// 親要素
const parent = element.parentElement;

// 最初の子要素
const firstChild = element.firstElementChild;

// 最後の子要素
const lastChild = element.lastElementChild;

// すべての子要素
const children = element.children;

// 次の兄弟要素
const next = element.nextElementSibling;

// 前の兄弟要素
const prev = element.previousElementSibling;
```

## 実践的な例

### リストアイテムの動的追加

```javascript
const list = document.getElementById('myList');
const inputField = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', () => {
  const text = inputField.value;
  if (text.trim() === '') return;

  const listItem = document.createElement('li');
  listItem.textContent = text;
  list.appendChild(listItem);

  inputField.value = '';
  inputField.focus();
});
```

### 要素の表示/非表示の切り替え

```javascript
const toggleButton = document.getElementById('toggleBtn');
const content = document.getElementById('content');

toggleButton.addEventListener('click', () => {
  if (content.style.display === 'none') {
    content.style.display = 'block';
    toggleButton.textContent = '非表示にする';
  } else {
    content.style.display = 'none';
    toggleButton.textContent = '表示する';
  }
});
```

### テーブルの行を削除

```javascript
const table = document.querySelector('table');

table.addEventListener('click', (event) => {
  if (event.target.className === 'delete-btn') {
    const row = event.target.closest('tr');
    row.remove();
  }
});
```

## パフォーマンスのヒント

1. **DOMアクセスを最小化**: ループ内でDOMにアクセスしない
2. **バッチ更新**: 複数の更新は一度にまとめる
3. **イベント委譲**: 親要素でイベントを処理する

## まとめ

- **取得**: querySelector系を使う
- **変更**: textContent/innerHTML でテキスト/HTML変更
- **属性**: getAttribute/setAttribute で操作
- **作成**: createElement で新規要素作成
- **削除**: remove/removeChild で削除
- **パフォーマンス**: DOMアクセスは慎重に
