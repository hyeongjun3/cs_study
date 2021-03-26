https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model
https://ko.javascript.info/class

# Details of the object model
JavaScript는 class-based 보다는 prototype의 base를 가진 object-based 언어이다 이런 다른 basis 때문에 어떻게 JavaScript가 object의 hierarchies를 만들고 속성과 그들의 값을 상속하는지에 대해서는 명백하지 못하다. 이 chapter는 이러한 문제점을 설명한다.

## Class-based vs. prototype-based languages
Java와 C++ 같은 Class-based object-oriented 언어는 class와 instance라는 2가지 entities를 명확히 가지고 있다.
-   class는 모든 특정 object을 characterize하는 속성(methods, fields, member 등등)을 선언한다. class는 object의 어떤 member보다 abstract하다. 예를들면, Employee class는 모든 employees를 표현할 수 있다.
- 반면에 instance는 class의 instanitaion이다. 예를들면, Victoria는 Employee class의 instance가 될 수 있다. instance는 parent class와 같은 속성을 가지고 있다.

prototype-based 언어(JavaScript 같은)는 구분하지 않는다. object를 가진다. A prototype-based 언어는 prototypical object(새로운 object를 위한 초기값을 위한 template를 사용하는 object)의 notion을 가지고 있다. 어떤 object든 자기 자신의 생성할 떄 또는 runtime에 properties를 specify할 수 있다. 게다가, 어떤 object는 다른 object의 prototype가 연결 될 수 있다. (첫번째 object의 properties를 두번째 object가 공유 받을 수 있다.)

### Defining a class
class-based language에서는 너는 각각의 class에 class를 정의한다. 이 정의는 class의 instance를 생성하는 생성자라고 불리는 특별한 메소드로 지정할 수 있다. 생성자 메소드는 instance 속성의 초기값을 지정하고 생성 시간에 적절한 processing을 실행한다. 너는 new operator를 사용하여 생성자 메소드를 사용하여 class instance를 만들 수 있다.

JavaScript는 비슷한 모델을 따르지만 생성자와 별도의 클래스 정의를 가지고 있지 않다. 대신에  constructor function을 정의하여 특정 초기값을 설정할 수 있다. 어떤 JavaScript 함수든 생성자가 될 수 있다. new operator와 생성자 함수를 같이 사용하여 새로운 object를 만들 수 있다.

### Subclasses and inheritance
class-based 언어에서는 class 선언을 사용하여 class의 hierarchy를 만들 수 있다. class 선언에 새로운 class가 어떤 class의 subclass 라는 것을 명시하면 된다. subclass는 superclass의 모든 속성을 상속받고 추가로 속성을 추가하거나 수정할 수 있다. 예를들면 Employee class는 name과 dept 속성만 있지만, Employee의 subclass인 Manager는 report 속성을 추가로 가지고 있다. 이 경우에 Manager class의 instance는 name, dept, report 이다.

JavaScript는 prototypical object와 생성자 함수를 붙여서 상속을 구현한다. 그래서 Employee-Manager 예제를 만들 수 있다. 그러나 terminology가 조금 다르다. 먼저 너는 name,dept 속성을 가진 Employee 생성자 함수를 선언해야 한다. 그리고 Employee 생성자와 report 속성을 불러 Manager 생성자 함수를 선언한다. 마지막으로 Manager 생성자의 prototype에 Employee.prototype를 assign 한다. 그리고 Manager를 새로 만든다.

### Adding and removing properties
class-based 언어에서, 전형적으로 compile time에 class를 생성하고 class의 instance는 compile time 또는 run time에 초기화 된다. class를 선언한 이후에 class의 속성을 추가하거나 제거할 수 없다. 그러나 JavaScript 에서는 rum time에 object의 속성을 추가하거나 제거할 수 있다. 만약 object에 prototype으로 사용되는 속성을 추가하면 object 새로운 속성을 가지게 된다.

### Summary of difference

나중에 사진 추가
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model

## The employee example

사진 추가

## Creating the hierarchy

....

### JavaScript(using this may cause an error for the following examples)
```js
class Employee{
    constructor() {
        this.name = '';
        this.dept = 'general';
    }
}
```

### JavaScrip**(use this instead)
```js
function Employee() {
    this.name = '';
    this.dept = 'general';
}
```

### Java
```java
public class Employee {
    public String name = '';
    public String dept = 'general';
}
```
Manager와 WorkerBee 선언은 inheritance chain에 있는 다음 높이에 있는 object를 지정하는데 차이를 보인다. JavaScript 에서 prototypical instance를 prototype에 추가하고 prototype.constructor에 override 한다.

### JavaScript
```js
function Manager() {
    Employee.call(this);
    this.reports = [];
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

function WorkerBee() {
    Employee.call(this);
    this.projects = [];
}
WorkerBee.prototype = Object.create(Employee.prototype);
WorkerBee.prototype.constructor = WorkerBee;
```

### Java
```java
public class Manager extends Employee {
    public Employee[] reports = 
        new Employee[0];
}

public class WorkerBee extends Employee {
    public String[] projects = new String[0];
}
```
Engineer와 SalesPerson 선언은 Wokerbee로 부터 만들어진다.

### JavaScript
```js
function SalesPerson() {
   WorkerBee.call(this);
   this.dept = 'sales';
   this.quota = 100;
}
SalesPerson.prototype = Object.create(WorkerBee.prototype);
SalesPerson.prototype.constructor = SalesPerson;

function Engineer() {
   WorkerBee.call(this);
   this.dept = 'engineering';
   this.machine = '';
}
Engineer.prototype = Object.create(WorkerBee.prototype)
Engineer.prototype.constructor = Engineer;
```

### Java
```java
public class SalesPerson extends WorkerBee {
   public String dept = "sales";
   public double quota = 100.0;
}

public class Engineer extends WorkerBee {
   public String dept = "engineering";
   public String machine = "";
}
```
이 선언을 사용하여 초기값을 가지는 object의 instance를 만들 수 있다.

## Object properties
### Inheriting properties
```js
var mark = new WorkerBee;
```
JavaScript가 new operator를 보면 새로운 generic object를 만들고 WorkerBee.prototype의 internal 속성의 값을 세팅 합니다. 
