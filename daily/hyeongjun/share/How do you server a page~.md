# How do you server a page with content in multiple languages?
하나의 일관된 언어로 표시되는 것이 아닌 많은 언어의 content를 가진 page를 어떻게 제공할 것인지 물어보는 가장 평범한 질문이다.

HTTP request가 server로 보내질 때 요청한 user agent는 보통 language preference도 같이 보낸다. (Accept-Language header 같이). 그리고 서버는 이 정보를 사용하여 가능하다면 적절한 언어의 document를 응답한다. 응답된 HTML document는 반드시 <html> 태그에 lang 속성을 선언하여야한다. (<html lang="en">...</html> 같이)

물론 같은 content가 다른 언어로 구성 되어있다는 것을 검색 엔진에 알려줄 필요는 없다. 그래서 hreflang 속성을 <head> 에 사용하여야 한다. (E.g. <link rel="alternate" hreflang="de" href= "http://de.example.com/page.html"/>)

백엔드에서는 HTML markup은 i18n placeholder와 YML 이나 JSON format으로 저장되어있는 특정한 언어을 의한 content를 포함할 것이다. 그리고 서버는 동적으로 특정 언어의 HTML page의 content를 생성한다. 보통 backend framework의 도움을 받는다.

References
- https://www.w3.org/International/getting-started/language
- https://support.google.com/webmasters/answer/189077
