## <script> : The Script element

HTML <script> element는 exectuable code 나 data를 embed 할 때 사용된다. 보통 embed하거나 JavaScript code를 refer 한다. <script> element는 WebGL’s GLSL shader programming 언어나 JSO 같은 다른 언어에서도 사용된다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f13a3d23-0960-4235-a736-35d8603fd590/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f13a3d23-0960-4235-a736-35d8603fd590/Untitled.png)

### Attributes

이 element는 global attribute를 포함한다.

async : html5

classic script에서는 async attribute가 존재하면 classic script의 fetch가 parsing과 evaluate와 parallel하게 진행된다.

module script에서는 async attribute가 존재하면 script과 모든 dependencies가 defer queue에서 실행된다. 그러므로 parsing과 evalute와 parallel하게 진행된다.

이 attribute는 브라우저가 parse를 진행하기 이전에 script를 load하고 evaluate하는 **parser-blocking JavaScript**을 제거한다. defer는 이 경우에 비슷한 행동을 가진다.

이 값은 boolean attribute이다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2817e970-ca46-4a8d-9037-55285528fd06/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2817e970-ca46-4a8d-9037-55285528fd06/Untitled.png)

crossorigin

기본 script element는 standard CORS check를 보내지 않는 script를 위해서 window.onerror에 작은 정보를 전달한다. static media를 위한 분리된 도메인을 사용하는 site에 error logging을 하기 위해서는 이 속성을 사용해야한다.

defer

defer boolean attribute는 document가 parse된 이후에 script를 실행하는 것을 의미한다. 그러나 DOMContentLoaded 이전에 firing

defer 속성을 가진 Scripts는 DOMContentLoaded event를 firing으로부터 script가 load 되고 evaluating이 끝날 때까지 막는다.

defer 속성을 가진 scripts는 document에 나타난 순서대로 실행될 것이다.

이 속석은 브라우저가 parse를 계속하기 전에 script를 load하고 evaluate할 때 **parser-blocking JavaScript**를 배제할 수 있다. 이 부분은 async와 비슷하다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8c089c8d-3eb7-4952-9122-1e4fbea5bbb9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8c089c8d-3eb7-4952-9122-1e4fbea5bbb9/Untitled.png)

integrity

이 속성은 user agent가 fetched resource 예기치않은 조작없이 전달 되었는지 확인하는데 사용할 수 있는 inline metadata가 포함된다. [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) 참조

nomodule

이 boolean 속성은 ES2015 module를 제공하는 브라우저에서 실행되지 않아야 하는 것을 알려준다.

nonce

script-src Content-Security-Policy에서 스크립트를 whitelist에 추가하기 위한 암호화된 임시 값이다. 서버는 정책을 전송할 때마다 고유한 임시 값을 만들어야한다. resource 정책을 우회하는 것이 사소한 일이므로 추측할 수 없는 임시 값을 제공하는 것이 중요하다.

## defer vs. async
