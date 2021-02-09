https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance

이 수업의 목표는 CSS의 가장 fundamental한 개념을 이해하는 것이다. cacade, specificity, inhertiance CSS가 HTML에 어떻게 적용될지 또는 conflict를 어떻게 해결할지 제어하는 것이다.

## Conflicting rules
CSS는 Cascading Style Sheets를 의미한다. 그리고 첫번쨰 단어인 cascading은 CSS를 이해하는데 엄청 중요하다.

몇몇 관점에서 너는 project 위에 CSS가 정상적으로 동작하는 않는 것을 찾을 것이다. 보통 문제는 하나의 element에 2가지의 규칙을 만들었기 때문이다. cascade와 speificity는 conflict가 발생할 대 어떤 규칙을 정할지 정하는 매커니즘이다. 너의 element를 styling해주는 규칙은 예상한 결과가 아닐 수 있다. 그래서 이 매커니즘에 대해서 이해해야한다.

또한 중요한 것은 inhertance 이다. inhertiance는 현재 element의 부모의 값으로 default 값을 가지는 CSS 속성과 그렇지 않은 것을 의미한다. 이것 또한 예상하지 못한 결과를 야기시킬 수 있다.

우리가 다룰 key thing을 빠르게 보는 것을 시작해라 그리고 어떻게 CSS가 작동하는지 볼 것이다. 

### The cascade
Stylesheets cascade - 매우 쉬운 레벨, 이것은 CSS 규칙의 순서를 의미한다. 두개의 규칙이 같은 specificiy에 적용될 때 하나의 CSS가 선택될 것이다.

아래 예제를 보면, h1에 적용되어있는 두개의 규칙을 볼 수 있다.

```css
h1 {
    color : red;
}
h1 {
    color : blue;
}
```
```html
<h1>This is my heading.</h1>
```

### Specificity
Specificiy는 어떻게 브라우저가 다수의 규칙이 다른 selector를 가질 때 어떤 규칙을 적용할지 정하는 방법이다. 아래는 기본적으로 selector의 selection이 얼마나 specific한지 측정한다.
- element selector는 덜 specific하다 - page에 나타나는 타압의 모든 element를 선택한다. - 그래서 낮은 점수를 받았다.
- class selctor는 좀 더 specific하다. - 구체적인 class를 가진 element만 선택된다. - 그래서 높은 점수를 받았다.

```css
.main-heading {
    color: red;
}
h1 {
    color:blue;
}
```
```html
<h1 class="main-heading">This is my heading</h1>
```

### Inheritance
이 문맥에서 Inhertiance의 이해도 필요하다. 몇몇 부모의 CSS 속성 값은 그들의 자식 element에 상속된다.

예를들면 만약 color와 font-family를 세탕하면 모든 자식 element는 상속 받는다.
```css
body {
    color: blue;
}
span {
    color:black;
}
```
```html
<p>As the body has been set to have a color of blue this is inherited through the descendants.</p>
<p>We can change the color by targetting the element with a selector, such as this <span>span</span>.</p>
```

몇몇 속성은 상속되지 않는다. 만약 너가 element의 width를 50%으로 설정한다면 모든 후손들이 50%가 적용되지 않는다.

## Understanding how the concepts work together
3가지 컨셉(cascade, specificity, inhertiance)는 CSS가 element에 적용되는 것을 제어한다. 아래 section에서 우리는 어떻게 그들이 같이 동작하는지 볼 것이다. 복잡해 보일 수 있지만 CSS 경험을 늘려가며 기억할려고 시작해야한다.

!!영상 다시 시청하기!!

## Understanding inheritance
inhertiance를 시작하다. 아래 예제를 보자
```css
.main {
    color: rebeccapurple;
    border: 2px solid #ccc;
    padding: 1em;
}

.special {
    color: black;
    font-weight: bold;
}
```
```html
<ul class="main">
    <li>Item One</li>
    <li>Item Two
        <ul>
            <li>2.1</li>
            <li>2.2</li>
        </ul>
    </li>
    <li>Item Three
        <ul class="special">
            <li>3.1
                <ul>
                    <li>3.1.1</li>
                    <li>3.1.2</li>
                </ul>
            </li>
            <li>3.2</li>
        </ul>
    </li>
</ul>
```

위에 언급한 것 처럼 width, margin, padding, border은 상속되지 않는다.

### Controlling inhertiance
CSS는 inheritance 제어를 위해 4개의 special universal property value를 제공한다.

>**inherit**  
부모 element와 같게 속성값이 선택된 element로 설정한다. 효과적으로 이것은 turns on inhertiance라고 한다.

>**initial**  
속성 값을 속성의 초기값으로 선택된 element에 적용한다.

>**unset**  
속성 값을 natural value로 리셋한다. 이것은 만약 속성이 자연적으로 상속된 것 처럼 보인다.

```css
body {
    color: green;
}
          
.my-class-1 a {
    color: inherit; /* green */
}
          
.my-class-2 a {
    color: initial; /* black? */
}
          
.my-class-3 a {
    color: unset; /* green */
}
```
```html
<ul>
    <li>Default <a href="#">link</a> color</li>
    <li class="my-class-1">Inherit the <a href="#">link</a> color</li>
    <li class="my-class-2">Reset the <a href="#">link</a> color</li>
    <li class="my-class-3">Unset the <a href="#">link</a> color</li>
</ul>
```

### Resetting all property values
CSS shorthand 속성 all은 속성값의 전부를 나타내는데 사용된다. 이 값은 inhertiance value를 가질 수 있다. 

```css
blockquote {
    background-color: red;
    border: 2px solid green;
}
        
.fix-this {
    all: unset;
}
```
```html
        <blockquote>
            <p>This blockquote is styled</p>
        </blockquote>

        <blockquote class="fix-this">
            <p>This blockquote is not styled</p>
        </blockquote>
```

## Understanding the cascade
우리는 HTML의 구조에서 깊게 nested되어있는 paragraph가 같은 body에 CSS를 적용되는지를 이해했다. 그리고 intorductory 수업에서 우리는 CSS를 어떻게 바꾸는지에 대해서 이해했다. 우리는 이제 어떻게 cascade가 정의 되는지 볼 것이다.

아래 3개의 요소를 고려해야한다. 중요도 순으로 정렬했고 뒤에 오는게 앞에 있는 rule를 overrule한다.
1. Source order
2. Specificity
3. Importance

### Source order
우리는 이미 얼마나 source order이 cascade에서 중요한지 보았다. 여기에 하나 rule을 추가하면 같은 우선순위의 rule 중에서 늦게 오는 CSS가 이긴다. 이 rule를 가까운 element가 적용된다고 생각해도 된다.

### Specificity
일단 너가 source order에 대해서 이해하면 어느시점에서 rule이 styleshee에 나중에 나오지만 이전의 충동하는 rule이 적용된다는 것을 알고 있는 상황에 처하게 된다. 이는 이전 rule이 더 놓은 specificity를 가지고 있기 때문이다. specificity는 좀더 구체적이여서 브라우저에서 element style로 지정된다.

위에서 본 것처럼 class selector는 element selector보다 우선순위가 높다. 그래서 override 된다.

여기서 주목해야할 점은 우리가 selector와 rule에 대해서 생각하고 있지만 ???

이 행동은 CSS에서 repetition은 피하는 것을 도와준다. common practice는 generic style을 정의한다. 그리고 각각 다른 class를 만든다. 예를들면 아래 stylesheet에서 h2의 generic style을 정의했다. 그리고 class를 만들었다. 처음에 모든 heading에 style이 적용되고 더 구체적인 값이 적용된다.

```css
h2 {
    font-size: 2em;
    color: #000;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
        
.small {
    font-size: 1em;
}
        
.bright {
    color: rebeccapurple;
}         
```
```html
<h2>Heading with no class</h2>
<h2 class="small">Heading with class of small</h2>
<h2 class="bright">Heading with class of bright</h2>
```

이제 어떻게 brower가 specificity를 계산하는지 보자. 우리는 element selector가 낮은 specificity를 가지고 있어 class에 의해서 overwrite 되는 것을 이미 알고 있다. 기본적으로 포인트 값이 다양한 type의 selector에게 부여된다. 그리고 이것들으리 더해 특정한 selector의 weight를 주게 된다.

specificy를 가진 selector는 아래 4가지 값을 이용하여 측정된다.
1. Thousands : 만약 선언이 style attribute(aka inline style)안에 있다면 얻게 된다. 이 선언은 selector가 없다. 그래서 specificity는 항상 1000이다.
2. Hundreds : 각각의 ID selector에 점수를 준다.
3. Tens : class selector, attribute selctor, pseudo-class에 값을 준다.
4. Ones : element selector 또는 pseudo-element에 점수를 준다.

아래 테이블을 참고하자

| Selector  | Thousands | Hundreds | Tens | Ones | Total specificity|
|-----------|-----------|----------|------|------|------------------|
|h1         |          0|0         |0     |1     |0001              |
|h1 + p ::first-letter|          0|0         |0     |3     |0003              |
|l1 > a[href*="en-US"] > .inline-warning        |          0|0         |2     |2     |0022              |
|#identifier        |          0|1         |0     |1     |0100              |
|No selector, with a rule inside an element's style attribute         |          1|0         |0     |0     |1000              |

```css
/* specificity: 0101 */
#outer a {
    background-color: red;
}
        
/* specificity: 0201 */
#outer #inner a {
    background-color: blue;
}

/* specificity: 0104 */
#outer div ul li a {
    color: yellow;
}

/* specificity: 0113 */
#outer div ul .nav a {
    color: white;
}

/* specificity: 0024 */
div div li:nth-child(2) a:hover {
    border: 10px solid black;
}

/* specificity: 0023 */
div li:nth-child(2) a:hover {
    border: 10px dashed black;
}

/* specificity: 0033 */
div div .nav:nth-child(2) a:hover {
    border: 10px double black;
}

a {
    display: inline-block;
    line-height: 40px;
    font-size: 20px;
    text-decoration: none;
    text-align: center;
    width: 200px;
    margin-bottom: 10px;
}

ul {
    padding: 0;
}

li {
    list-style-type: none;
}    
```
```html
<div id="outer" class="container">
    <div id="inner" class="container">
        <ul>
            <li class="nav"><a href="#">One</a></li>
            <li class="nav"><a href="#">Two</a></li>
        </ul>
    </div>
</div>
```

### !important
위의 계산을 무시하고 적용시킬 수 있는 CSS가 있다. 그러나 !important를 사용하는 것에 매우 조심해야한다. 

```css
#winning {
    background-color: red;
    border: 1px solid black;
}
    
.better {
    background-color: gray;
    border: none !important;
}
    
p {
    background-color: blue;
    color: white;
    padding: 5px;
}           
```

```html
<p class="better">This is a paragraph.</p>
<p class="better" id="winning">One selector to rule them all!</p>
```

!important를 사용하는 것은 매우 usefule하다 **하지만 꼭 필요한 경우가 아니면 사용하지 않는 것을 강력하게 추천한다.** !important는 cascade의 동작을 바꾸어 CSS 문제를 debugging을 매우 어렵게 한다.

## The effect of CSS location
마침내 어떤 stylesheet에 CSS가 선언되어있는지에 중요도에 대해서 볼 수 있다. user가 개발자의 style을 override 할 수 있다.

## To summarize
선언 충돌은 아래의 순서로 적용될 수 있다.
1. Declarations in user agent style sheets (e.g. the borwers's default styles, used when no other styling is set).
2. Normal declarations in user style sheets(custom styles set by a user)
3. Normal declarations in authoer style sheets (these are the styles set by us, the web developers)
4. Important declarations in author styles shteets
5. Important declarations in user style sheets
