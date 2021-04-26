# MVC Pattern

MVC pattern은 주로 Startegy pattern, Observer pattern, Composite pattern 으로 이루어진 Compound Pattern 이다. (3가지 pattern 이외에도 다른 패턴이 포함 되어있다)

MVC pattern은 아래 3가지 종류의 object를 가지고 있다.
- Model : the application object
- View : UI
- Controller : defines the way the UI reacts to user inputs

(그림)

## Motivation and Solution

MVC pattern이 생긴 이유는 다음과 같다
- 같은 data로 다양한 View로 표현할 수 있다. (다양한 View를 사용)
- 서로 다른 interaction으로 같은 data가 수정될 수 있다. (다양한 Controller 사용)
- 서로다른 view와 interaction이 data에 영향을 주지 않는다.

위의 이유로 responsibilites를 분리하였다.

Model
-  Enterprise data and the business rules

View
- Renders the contents of a model
- Accesses data through the model

Controller
- Translated interactions with the view into actions to be performed by the model

## Patterns in MVC
Observer pattern
- View의 변화를 Model이 monitoring 할 때 사용된다.

Composite pattern
- View의 UI component를 만들 때 사용된다.

Strategy pattern
- Controller가 interaction을 설정할 떄 사용된다.

MVC pattenr은 Factory, Decorator pattern 도 사용된다.
