Representational state transfer(REST)는 World Wide Web위 디자인과 개발을 가이드하기 위해서 만들어진 소프트웨어 아키텍쳐 스타일이다.REST는 웹과 같은 Internet-scale distributed hypermedia system 의 아키텍쳐가 어떻게 작동해야 하는지에 대한 제약 조건의 set를 정의합니다. REST 아키텍쳐 스타일은 component 끼리의 상호작용의 확장성, uniform interface, component 배포의 독립성, 그리고 user-perceived latency를 줄이기 위한 component caching을 가능하게 하는 layered 생성, 보안성을 올리고, legacy system을 감싼다.

REST는 소프트웨어 산업에서 선택됬고 stateless, reliable web APIs를 만드는 가이드라인으로 선택되었다. REST constraints를 조종하는 web API를 RESTful 하다고 합니다. RESTful web API는 일반적으로 URL-encoded parameter를 통해 리소스에 access하는 HTTP 메소드와 JSON 또는 XML를 사용하여 데이터를 전송하는 방식을 기반으로 합니다.

"Web resource"는 World Wide Web에서 URL로 식별되는 문서 또는 파일로 처음 정의 되었습니다. 현재 정의는 더 generic하고 모호해졌으며, entity, action named 등 다양한 것들이 포함되었습니다. RESTful Web Service에서 리소스의 URI에 대한 요청은 HTML, XML, JSON 또는 기타 형식으로 형식화된 페이로드로 응답을 이끌어냅니다. 예를들면, response는 resousrece 상태가 변화된것을 확신할 수 있다. response는 또한 관련 자원과 연결되어잇는 hypertext 를 포함할 수 있다. 이런 request와 response에 쓰이는 가장 common한 protocol은 HTTP 이다. HTTP는 GET과 POST,PUSH, DELETE같은 operation(HTTP methods)를 제공한다. stateless procotol과 standard operation을 사용하여 RESTful 시스템은 빠른 성능, reliability, component을 resuse하여 system 전체에 영향을 주지 않고 관리되고 업데이트 될 수 있는 능력에 집중 했다.

REST의 목적은 performance, scalability, simplicity, modifiablity, visibility, portability, relabiliy를 증가 시키는 것이다. 이것은 아래 REST 원칙 (client-server architecture, statelessness, cacheability, use of a layred system, support for code on deamn, using uniform interface) 를 통해 달성되었다.  

## History
웹은 1993-1994년에 일상적으로 사용되기 시작했으며, 이 때 웹사이트가 제공되기 시작했습ㄴ비다. 당시에는 웹 architecture에 대한 단편적인 설명만 있었고 Web Interface protocol에 대한 일부 표준에 동의해야한다는 업계 압력이 있었습니다. 예를들어 프록시를 지원하기 위해 몇가지 실험적 확장이 통신 프로토콜(HTTP)에 추가되었고 더 많은 확장이 제안되었지만, 이러한 변경의 영향을 평가할 공식 웹 아키텍쳐가 필요했습니다.

W3C와 IEFT workgin group이 함께 웹의 3가지 주요 표준을 만들기 시작했습니다. URI, HTTP, HTML. Roy Fielding은 위 표준(정확히 HTTP1.0과 1.1, URI) 만드는 것에 참여했습니다. 그리고 6년 동안 그는 REST architectural sytle을 만들었습니다.

REST architectural style을 만들기 위해서, Fielding은 
