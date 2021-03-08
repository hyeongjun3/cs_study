# What does a doctype do?

https://developer.mozilla.org/en-US/docs/Glossary/Doctype
# Doctype
html에서 doctype은 문성 가장 위에 있는 필수 <!DOCTYPE html> preamble 이다. 이것의 유일한 목적은 문서를 렌덜이 할 때 브라우저가 '[quirks mode](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)' 로 바뀌는 것을 막기 위해서이다. 즉, "<!DOCTYPE html>" doctype은 브라우저가 관련 사양을 최대한 따를 수 있도록 만들어준다. 몇몇 사항이 호환되지 않는 다른 렌더링 모드를 사용하는 것 보다는..

# Quirks Mode and Standards mode
오래전 웹에서 페이지는 전형적으로 2개의 버전으로 쓰여졌다. 하나는 Netscape Navigator 나머지는 Microsoft Internet Explorer. 웹 standard가 W3C에서 만들어졌을 때, 브라우저는 저것들을 바로 사용할 수 없었다. 사용을 한다면 이미 웹에 있는 사이트를 부술 수 있기 때문이다. 그러므로 브라우저는 lecagy 사이트와는 다른 새로운 standard와 호환되는 2개의 mode를 소개하였다.

현재는 웹브라우저 layout engine이 3가지의 mode가 있다. quirks mode, almost standards mode, 그리고 full standards mode. quirks mode에서 layout은 Navigator 4 와 Internet Explorer 5 의 nonstandard 동작을 emulate한다. 이것은 web standard가 널리 퍼지기 이전에 만들어진 웹사이트를 support하기 위해서 필수이다. full standards mode에서 동작은 HTML, CSS에 따라서 동작한다. almost standards moded 에서는 엄청 작은 부분이 quirk로 구현되어있다.

## How do browsers determine which mode to use?
HTML 문서에서 브라우저는 문서의 가장 위쪽에 DOCTYPE를 사용하여 quirk mode 또는 standard mode로 처리할지 정한다. page가 full standards mode를 사용하기 위해서는 아래처럼 DOCTYPE를 선언해야한다.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset=UTF-8>
    <title>Hello World!</title>
  </head>
  <body>
  </body>
</html>
```
위 예제에 보이는 DOCTYPE, <!DOCYPE html>,은 HTML5에서 추천하는 방법이다. HTML standard의 이전 버전에서 다른 variant를 추천했지만 현재 브라우저는 full standard mode를 사용한다. 심지어 Internet Explorer 6 마저도. 그래서 더이상 복잡한 DOCTYPE를 사용할 필요가 없다. 만약 다른 DOCTYPE를 사용하고 싶다면, standard mode나 quirk mode를 선택하면 된다.

HTML 문서에 DOCTYPE를 넣는다. Internet Explorer 9 또는 더 오래된 브라우저에서 comment나 XML 선언 같이 DOCTYPE 이전에 있는 것들은 quirk mode를 trigger 한다. 

HTML5에서 DOCTYPE의 유일한 목적은 full standard mode를 실행하기 위함이다. 오래된 HTML standard는 DOCTYPE에 추가적인 의미를 부여했지만 현재는 어떤 브라우저도 quirk mode 또는 standard mode로 바꾸기 위해서 DOCTYPE를 사용하지 않는다.

