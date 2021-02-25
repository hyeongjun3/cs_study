Event delegation은 child element에 listener를 등록하는 대신 부모 element에 등록하는 테크닉이다. listner는 descendant element에서 event가 trigger 될 때 event bubbling up the dom 때문에 fire 된다. 이 technique의 이점은 아래와 같다.
- 메모리 footprint 가 내려간다. 왜냐하면 각각의 element에 listenr가 붙는 대신에 하나의 handler가 부모 element에 필요하기 때문에
- 지워지는 element에 대해서 hander를 unbind할 필요가 없으며 새로운 elemnt에 대해서 bind 할 필요가 없다.

References
- https://davidwalsh.name/event-delegate
- https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation
