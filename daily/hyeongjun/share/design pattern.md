# An overview of design pattern - SOLID, GRASP

먼저 디자인 패턴을 공부하기 전에 Design Principle인 SOLID와 GRASP에 대해서 알아보자


# Design Smells
design smell이란 나쁜 디자인을 나타내는 증상같은 것이다.

아래 4가지 종류가 있다.
1. Rigidity(경직성)  
    시스템이 변경하기 어렵다. 하나의 변경을 위해서 다른 것들을 변경 해야할 때 경직성이 높다.
    경직성이 높다면 non-critical한 문제가 발생했을 때 관리자는 개발자에게 수정을 요청하기가 두려워진다. 

2. Fragility(취약성)  
    취약성이 높다면 시스템은 어떤 부분을 수정하였는데 관련이 없는 다른 부분에 영향을 준다. 수정사항이 관련되지 않은 부분에도 영향을 끼치기 떄문에 관리하는 비용이 커지며 시스템의 credibility 또한 잃는다.

3. Immobility(부동성)  
    부동성이 높다면 재사용하기 위해서 시스템을 분리해서 컴포넌트를 만드는 것이 어렵다. 주로 개발자가 이전에 구현되었던 모듈과 비슷한 기능을 하는 모듈을 만들려고 할 때 문제점을 발견한다.

4. Viscosity(점착성)  
    점착성은 디자인 점착성과 환경 점착성으로 나눌 수 있다.

    시스템에 코드를 추가하는 것보다 핵을 추가하는 것이 더 쉽다면 디자인 점착성이 높다고 할 수 있다. 예를 들어 수정이 필요할 때 다양한 방법으로 수정할 수 있을 것이다. 어떤 것은 디자인을 유지하는 것이고 어떤 것은 그렇지 못할 것이다(핵을 추가).

    환경 점착성은 개발환경이 느리고 효율적이지 못할 때 나타난다. 예를들면 컴파일 시간이 매우 길다면 큰 규모의 수정이 필요하더라도 개발자는 recompile 시간이 길기 때문에 작은 규모의 수정으로 문제를 해결할려고 할 것이다.

위의 design smell은 곧 나쁜 디자인을 의미한다.(스파게티 코드)

# Robert C. Martin's Software design principles(SOLID)
Robejt C. Martin은 5가지 Software design principles을 정의하였고 앞글자를 따서 SOLID라고 부른다.

## Single Responsibility Principle(SRP)
A class should have one, and only one, reason to change  

클래스는 오직 하나의 이유로 수정이 되어야 한다는 것을 의미한다.

### Example

SRP를 위반하는 예제로 아래 클래스 다이어그램을 보자

(그림)

Register 클래스가 Student 클래스에 dependency를 가지고 있는 모습이다.
만약 여기서 어떤 클래스가 Student를 다양한 방법으로 정렬을 하고 싶다면 아래와 같이 구현 할 수 있다.

(그림)

하지만 Register 클래스는 어떠한 변경도 일어나야하지 않지만 Student 클래스가 바뀌어서 Register 클래스가 영향을 받는다. 정렬을 위한 변경이 관련없는 Reigster 클래스에 영향을 끼쳤기 때문에 SRP를 위반한다.

(그림)

위의 그림은 SRP 위반을 해결하기 위한 클래스 다이어그램이다. 각각의 정렬 방식을 가진 클래스를 새로 생성하고 Client는 새로 생긴 클래스를 호출한다.

### 관련 측정 항목
SRP는 같은 목적으로 responsibility를 가지는 cohesion과 관련이 깊다. 

## Open Closed Principle(OCP)
Software entities (classes, modules, functions, etc) should be open for extension but closed for modification

자신의 확장에는 열려있고 주변의 변화에는 닫혀 있어야 하는 것을 의미한다.

### Example

(그림)
```java
void incAll(Employee[] emps) {
    for (int i=0; i<emps.size(); i++) {
        if(emps[i].empType == FACULTY)
            incFacultySalary((FACULTY)emps[i])
        else if(emps[i].empType == STAFF)
            incStaffSalary((STAFF)emps[i])
        else if(emps[i].empType == SECRETARY)
            incSecretarySalary((SECRETARY)emps[i])
    }
}
```
위의 예제는 아래 문제점을 가지고 있다.

Rigid - 새로운 employee type이 계속 요구된다.

Fragile - 많은 if/lese 구문과 코드를 찾기 어렵다

(그림)

이전에 설명한 문제점을 해결한 클래스 다이어그램이다.

incAll() 함수를 통해서 문제를 해결한 것을 볼 수 있다.

## Liskov Substitution Principle(LSP)
subtypes must be substitutable for their base types

base 클래스에서 파생된 클래스는 base 클래스를 대체해서 사용할 수 있어야한다.

### Example
아래는 Java 라이브러리의 Date 클래스이다.

(그림)

```java
java.util.Date date = new java.util.Date();
int dateValue = date.getDate(); // Okay

date = new java.sql.Time(10,10,10);
dataValue = date.getDate(); // throws IllegalArgumentException
```

### Inheritance Vs. Composition

(그림)

위의 예제엇 만약 List의 Implemenation을 재사용하게 된다면 inheritance보다 object composition을 사용하는 것을 추천한다.

위에서 Queue 클래스가 List 클래스를 inheritance 한다면 LSP를 위반하게 된다.

## Interface Segregation Principle(ISP)
Clients should not be forced to depend on methods they do not use

사용하지 않는 메소드에 의존하면 안된다.

(그림)

Roast Application은 getName(), getSSN() 메소드만을 사용하고 Account Application은 getInvoice(), postPayment() 메소드만을 사용한다.

(그림)

위 클래스 다이어그램 처럼 클래스에 맞는 interface를 만들어서 제공하면 ISP 문제를 해결할 수 있다.

## Dependency Inversion Principle(DIP)
high-level modules should not depend on low-level modules. Both should depend on abstractions

자신(high level module)보다 변하기 쉬운 모듈(low level modeul)에 의존해서는 안된다.

### Inversion?

(그림)

Program 클래스는 Module 클래스에 dependency를 가지고 있으며 Module 클래스는 Function 클래스에 의존하고 있다.

(그림)

Module 클래스를 인터페이스 클래스로 변경을 한 클래스 다이어그램이다.
이전 그림과 다르게 depenedency가 inversion 된 모습을 볼 수 있다.


DIP는 dependency를 inversion 하는 것 뿐 아니라 ownership 또한 inversion 한다.

# General Responsibility Assignment Software Patterns (GRASP)
GRASP는 어떻게 responsibility 부여하여 object 끼리 상호작용 하는지 알려주며 9가지의 원칙을 가지고 있다.

## Coupling과 Cohesion
9가지 원칙을 보기전에 Modularity를 측정하는 척도인 Coupling과 Cohesion을 알아보자

### Coupling

(그림)

위 그림을 보면 coupling이 낮아야 한다는 것을 알 수 있다.

만약 coupling이 높다면 1) 어떤 부분의 변화가 다른 부분에도 영향을 끼치며 2) 재사용하기 어렵고 3) isolation 하게 이해하기 어렵다

### Cohesion
모듈 또는 클래스 내부의 element가 얼마나 연관이 있는지를 나타내는 척도이다. 
Cohesion은 높아야 modularity가 좋으며 1) 쉽게 유지보수 할 수 있고 2) 재사용하기 쉽고 3) Coupling이 낮아진다.

## 1. Creator Pattern
누가 A를 만들 것이냐?

B가 아래에 해당하면 A를 만드는 것을 추천한다.
- B가 A를 포함하거나 aggregate한다.
- B가 A를 기록한다.
- B가 A를 closely하게 사용한다.
- B가 A를 초기화한다.

### Example

(그림)

Q) 누가 SaleLineItem instance 을 생성할 것이냐?

A) Sale 클래스가 SaleLineItem을 포함하거나 aggregate 하기 때문에 Sale 클래스가 생성한다.


### Summary
장점 : 낮은 Coupling

관련 패턴 : Abstract Factory, Singleton

## 2. Information Expert Pattern

object의 responsibility를 누가 가지고 있을 것이냐?

필요한 정보를 가지고 있는 클래스가 object의 responsibility를 가지고 있는다.

### Example

(그림)

누가 총 지불 가격을 알고 있을 것 인가?

ProductDescription 클래스는 가격, SalesLineItem은 갯수를 알고 있다.
충분한 정보를 가지고 있는 Sale 클래스가 총 지불 가격을 알고 있는 것이 알맞다

### Summary
장점 : Information encapsulation -> 낮은 Coupling

## 3. Controller Pattern
누가 UI layer에서 받는 system operation을 제어할 것인가?

root object가 제어(facade controller)와 use case에 따라서(use case or session controller) 결정하는 두가지 방법이 있다.

### Summary
장점 : GUI에 logic이 없다 -> 컴포넌트를 재사용할 가능성이 크다. 

## 4. Low Coupling Pattern
side effect를 얼마나 줄일 수 있나?

coupling이 작아지는 responsiblity를 할당한다.

### Example
Payment instance를 생성해야하고 Sale과 interact 해야한다. 어떤 클래스가 responsibility를 가지고 있는 것이 좋을까?

(그림)

## 5. High Cohesion Pattern
object가 side effect를 가지지 않고 가독성이 좋고 low coupling을 지원하기 위해서 어떻게 해야하나?

### Example
이전 예제와 같은 예제이다
Register 클래스가 많은 역하을 가지고 있는 것은 좋지 못하기 때문에 후자의 다이어그램이 더 선호된다.

## 6. Pure Fabrication Pattern
high cohesion과 low coupling, 재사용을 위해서 behavior 클래스를 생성하고 reponsibility를 할당한다.

### Example
Sale instance를 DB에 저장한다고 가정하자

Information Expert에 의해서 Sale 클래스가 위의 responsibility를 가진다면 
- 많은 DB operation이 필요해지면 Sale 클래스는 low cohesive 된다.
- reuse가 힘들며 duplication code가 많아진다.

Pure Fabrication에 의하면 위의 responsibility를 가지는 새로운 클래스를 생성하여 위의 문제를 해결할 수 있다.

## 7. Ploymorphism Pattern
다양한 종류의 behavior가 있을 때 누가 responsibility를 가질 것인가?

polymorphic operation을 사용하여 responsibility를 가질 수 있다.

## 8. Indirection Pattern
direct coupling을 피하기 위해서 어떻게 responsibilty를 할당하나?

두 object 사이에 새로운 indirection level을 추가하고 polymorphism를 추가한다

## 9. Protected Variations Pattern
변경이 많은 element에 어떻게 responsibility를 할당할 것인가?

