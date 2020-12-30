https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
https://stackoverflow.com/questions/10808109/script-tag-async-defer#:~:text=With%20async%20(asynchronous)%2C%20browser,when%20the%20page%20finished%20parsing.

## \<script> : The Script element

HTML \<script> element는 exectuable code 나 data를 embed 할 때 사용된다. 보통 embed하거나 JavaScript code를 refer 한다. \<script> element는 WebGL's GLSL shader programming 언어나 JSO 같은 다른 언어에서도 사용된다.

### Attributes
이 element는 global attribute를 포함한다.

async : html5\
&ensp;classic script에서는 async attribute가 존재하면 classic script의 fetch가 parsing과 evaluate와 parallel하게 진행된다.\
&ensp;module script에서는 async attribute가 존재하면 script과 모든 dependencies가 defer queue에서 실행된다. 그러므로 parsing과 evalute와 parallel하게 진행된다.\
&ensp;이 attribute는 브라우저가 parse를 진행하기 이전에 script를 load하고 evaluate하는 <strong>parser-blocking JavaScript</strong>을 제거한다. defer는 이 경우에 비슷한 행동을 가진다.\
&ensp;이 값은 boolean attribute이다. 

crossorigin\
&ensp;기본 script element는 standard CORS check를 보내지 않는 script를 위해서 window.onerror에 작은 정보를 전달한다. static media를 위한 분리된 도메인을 사용하는 site에 error logging을 하기 위해서는 이 속성을 사용해야한다. 

defer\
&ensp;defer boolean attribute는 document가 parse된 이후에 script를 실행하는 것을 의미한다. 그러나 DOMContentLoaded 이전에 firing\
&ensp;defer 속성을 가진 Scripts는 DOMContentLoaded event를 firing으로부터 script가 load 되고 evaluating이 끝날 때까지 막는다.\
&ensp;defer 속성을 가진 
