# What are data- attributes good for?
JS framework가 유명해지기 이전에 프론트 개발자는 data- attribute를 사용하여 DOM 내부에 extra data를 저장하였다. non-standard 속성이나, DOM위의 extra properties 같은 다른 hack 없이. 이것은 페이지나 적절항 attributes라 element가 없는 어플리케이션의 private custom data를 저장하는 것을 의도하였다. 

요즘에는, data- attribute를 사용하는것은 일반적으로 장려하지 않는다. 하나의 이유는 유저가 브라우저에서 inspect element를 사용하여 data attrivute를 쉽게 수정할 수 있기 때문이다. data modle은 JavaScript 자체에 저장되어 있고 가능한 library나 framework를 통해서 data binding을 통해 DOM에 updated 된 상태로 남아있는 것이 더 좋다.

그러나 data attribute를 완벽하게 유용한 것은 의미없는 class나 ID attribute를 생성하지 않고 Selenium 이나 Capybara 같은 end to end testing framework에 후크를 추가하는 것이다. element는 특정한 Selenium spec에 의해서 찾아져야할 방법이 필요하다.data-selector='the-thing'과 같은 것은 semantic markup을 혼동하지 않고 그렇게 할 수 있는 유효한 방법이다.

References
- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes
