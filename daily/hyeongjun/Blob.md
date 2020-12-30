https://developer.mozilla.org/ko/docs/Web/API/Blob

## Blob
blob object는 immutable, raw data의 file-like object이다. blob은 text나 binary data, ReadableStream으로 변한된 것을 읽을 수 있게하여 data를 processing하는데 사용된다.\
blob은 JavaScript-native format 아닐수도 있는 데이터를 표현할 수 있다. File interface는 Blob을 기반으로 한다. blob functionality와 expanding을 상속받아 user system의 file 도와준다.

### Using blobs
non-object나 데이터로부터 Blob을 만들기 위해서는 Blob() 생성자를 사용한다. 다른 blob의 data의 subset을 포함하는 blob을 만들기 위해서는 slice() method를 사용한다. user file system의 file의 Blob object를 얻기 위해서는 File을 사용한다.

### Constructor

Blob()\
&ensp;생성자에 전달된 모든 array 형태의 데이터의 concatenation을 포함하는 새로운 Blob object를 return 한다.

### Instance properties
......

......

### Example
### Creating a blob\
Blob() 생성자는 다른 object로 부터 blob을 만든다.
```js
const obj = {hello: 'world'};
const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
```
### Creating a URL representing the contents of a typed array
아래 코드는 JavaScript typed array를 생성하고 이 array를 포함하는 새로운 Blob을 생성한다
### HTML
```html
<p>This example creates a typed array containing the ASCII codes
   for the space character through the letter Z, then converts it
   to an object URL. A link to open that object URL is created.
   Click the link to see the decoded object URL.</p>
```
### JavsScript
아래 코드의 중요한 점은 주어진 typed array로 부터 Blob을 만들고 object URL을 return하는 typedArrayToUrl() 함수이다. data를 object URL로 바꾸면 다양하게 사용할 수 있다. 
```js
function typedArrayToURL(typedArray, mimeType) {
    return URL.createObjectURL(new Blob([typedArray.buffer], {type: mimeType}))
}

const bytes = new Uint8Array(59);

for(let i=0; i<59; i++) {
    bytes[i] = 32 + i;
}

const url = typedArrayToURL(bytes, 'text/plain');

const link = document.createElement('a');
link.href = url;
link.innerText = 'Open the array URL';

document.body.append(link);
```

### Extracting data form a blob
Blob으로 부터 content을 읽는 방법 중 하나는 FileReader를 사용하는 방버이다.
```js
const reader = new FileReader();
reader.addEventListener('loadend', () => {
    //reader.result contains the contents of blob as a typed array
})
reader.readAsArrayBuffer(blob);
```
다른 방법은 Response를 사용하는 방법이다.
```js
const text = await (new Response(blob)).text();
```
아니면 Blob.prototype.text()를 사용한다.
```js
const text = await.blob.text();
```
