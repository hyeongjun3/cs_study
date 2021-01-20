# What kind of things must you be wary of when designing or developing for multilingual sties?
- lang 속성을 HTML에서 사용해야 한다.
- 유저를 그들의 네이티브 언어로 direct한다. 유저가 혼란 없이 그들의 지역/언어로 쉽게 변경 할 수 있게한다.
- raster-based 이미지(e.g. png,gif,jpg,etc ..) 에 있는 텍스트는 확장 가능한 접근이 아니다. image에 있는 text는 font를 어떤 컴퓨터에도 표시할 수 있는 good-looking의 좋은 방법이지만 이미지 텍스트를 번역하기 위해서는 각각의 string은 각각의 언어를 만들기 위해서 분리된 이미지가 필요하다. 이와 같은 많이 발생하는 작은 교체는 통제에서 빨리 벗어나게 한다(???)
- 제한된 단어/문정 길이 - 몇몇 content는 다른 언어로 쓸 때 더이상 길어질 수 없다. 설계에서 layout 또는 overflow issue를 조심해야한다.이 것은 많은 텍스트가 설계를 부수는 것을 피할 수 있는 가장 좋은 방법이다. 문자 수는 헤드라인, 레이블 및 버튼과 같은 요소와 함계 동작한다. 이것들은 본문이나 댓글과 같은 자유로운 텍스트는 문제가 되지 않는다.
- 색상이 어떻게 인식 되는지 염두해두어야 한다. - 색상은 언어나 문화에 따라서 다르게 인식된다. 적절한 색상을 사용하여 설계해야한다.(???)
- 날짜와 통화를 포맷팅 해야한다. - 캘린더 날짜는 떄때로 다른 방법으로 존재한다 (Eg. "May 31,2012" vs "31 May 2012")
- 번역된 string은 concatenate하지 않는다. - "The date today is " + date 로 작성하지 말아라.  다른 순서가 다른 언어로 구분된다. 대신 각각의 언어를 위한 parameter substitution과 같이 template string을 사용해라. 예를들면 , 아래 두 문장을 봐라. I will travel on {% date %} 과 {% date %} 我会出发. 변수의 위치는 언어 규칙에 따라 다르다는 것을 명심해라
- 언어 읽는 방향 - 영어에서, left -> right + top -> bottom 으로 읽으나 일본에서는 up -> down, right -> left 로 읽는다.

References
- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites
