## REST

Representational state transfer (REST)는 World Wide WEb(www)의 디자인과 개발 가이드로 만들어진 software architectural sytle 입니다. REST는 containts 집합를 정의하였습니다. REST 아킥텍쳐 스타일은 component간 상호작용의 scalability와 uniform interface, component 배포의 독립성, user-percieved latency를 줄이기 위한 caching component 사용 용이, 보안강화, legacy 코드 encapsulate 하기 위한 layered architecture를 강조하고 있다.

REST는 많은 sw 산업에서 사용되고 있으며 statelss, reliable web APIs를 만들기 위한 가이드로 선택되었습니다. REST constraints를 따르는 web API를 RESTful하다고 합니다. RESTful web API는 보통 약하게 HTTP method를기반으로 URL-encoded 파라미터를 통해 자원에 접근하고 JSON 또는 XML 를 이용하여 data를 전송합니다.

"Web resources"는 World Wide Web에서 처음으로 URLs로 인해 식별되는 document 또는 파일이라고 정의했습니다. 현재, 정의는 저 generic해지고 모호해졌으며 entity, action, named, address, handled web에서 실행되는 모든 것을 뜻합니다. RESTful web 서비스에서, 자원의 URI로 만들어진 요청은 HTML, XML, JSON 또는 다른 format으로 formatted된 payload의 response로 받게 된다. 예를 들면, response는 resource state가 바뀌였는지 확인할 수 있다. 이런 request와 response에 사용되는 가장 보편적인 protocol은 HTTP 입니다. GET, POST, PUT과 DELETE같은 HTTP methods를 제공해줍니다. stateless protocol과 standard operation을 사용하여, RESTful 시스템은 빠른 성능과, reliabilty와 component를 재사용할 수 있는 능력을 ㄹ기를 수 있다.

REST의 목표는 performance, scalability, simplicity, modifiability, visibility, portability, reliability를 증가 시키는 것 입니다.
