# Git branch model
https://nvie.com/posts/a-successful-git-branching-model/
!! 사진추가

## The main branches
!! 사진추가
2가지 브랜치가 속한다
- master
- develop

origin의 master 브랜치 친숙할 것이다. master 브랜치와 parallel 한 develop 브랜치가 있다.

우리는 origin/master 의 HEAD는 항상 production-ready state 라는 것을 생각하자.

우리는 origin/develop 다음 release를 위한 개발자의 최신 코드가 반영되어있는 브랜치라는 것을 생각하자. 몇몇은 integration branch라고도 부른다.

develop 브랜치의 소스코드는 stable 하고 release 될 준비가 되어있다. 모든 변경들이 master 브랜치로 merger가 되며 release number를 태깅해야한다.

그러므로 master branch로 merger 될 때 새로운 release 정의가 있어야한다. 매우 엄격하게 지커야한다. 그래야 git hook script를 사용하여 자동으로 빌드하고 production server에 자동으로 software를 올릴 수 있다. (추가)

## Supporting branches
main branch인 master, develop 브랜치 다음에 다양한 development 브랜치와 parallel한 supporting branch를 사용한다. main branch와 다르게 이 브랜치들은 limited life time을 가지고 있다.

- Feature branches
- Release branches
- Hotfix branches

각각의 브랜치는 특정한 목적과 범위를 가지고 있다. 이 브랜치들은 이 브랜치가 originating 될 수 있거나 target branch에 merge하는 강력한 규칙을 가지고 있다.

브랜치들은 기술적인 관점에서 의미가 없다. branch type은 how we use에 따라서 나눈다.

### __Feature branches__
May branch off from:
> develop

Must  merge back into:
> develop

Branch naming convention:
> anythong expect master, develop, release-* or hotfix-*

feature 브랜치(topic 브랜치로도 불림)는 미래 realease 또는 이번 release에 필요한 새로운 feature 를 개발하는데 사용된다. 

feature branch는 developer의 repo에만 있어야 한다. origin이 아니라

### Creating a feature branch
```shell
$ git checkout -b myfeature develop
Switched to a new branch "myfeature"
```

### Incorporating a finished feature on develop
```shell
$ git checkout develop
Switched to branch 'develop'

$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)

$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).

$ git push origin develop
```
--no-ff 플래그는 새로운 commit을 만들어서 fast-forward로 수행될 수 있더라고 merge를 실행합니다. 이렇게하면 feature 브랜치의 historical existance의 정보 손실을 막으며 기능을 추가한 모든 commit을 그룹화 할 수 있습니다.

후자는 git history를 보기에 매우 힘들다.

### __Release branches__
May branch off from:
>develop

Must merge back into:
>develop and master

Branch naming convention:
> release-*

release 브랜치는 새로운 production release를 준비하는 것을 도와준다. 브랜치는 minor bug fix와 release를 위한 meta-data를 준비할 수 있다(version number, build dates, etc...) 위와 같은 일을 모두 끝내면 develop branch는 다음 big release를 위한 feature를 받을 준비가 되어있다.

develop 에서 새로운 release branch로 만드는 키 순간은 새로운 release의 희망하는 state를 반영사항을 개발할 떄 이다.

### Creating a release branch
release 브랜치는 develop 브랜치로 부터 만들어진다. 예를들면 version 1.1.5가 현재 production release이고 다가울 big release를 가지고 있다면 develop의 상태는 next-release를 위한 상태이며 1.2 version이 될 준비가 되었다는 거다.
```shell
$ git checkout -b release-1.2 develop
Switched to a new branch "release-1.2"

$ ./bump-version.sh 1.2
Files modified successfully, version bumped to 1.2.

$ git commit -a -m "Bumped version number to 1.2"
[release-1.2 74d9424] Bumped version number to 1.2
1 files changed, 1 insertions(+), 1 deletions(-)
```
위의 bump-version.sh는 새 버전을 반영하기 위해서 작업 복사본의 일부 파일을 변경하는 가상의 쉘 스크립트이다.
master 브랜치와 develop 브랜치에 모두 merge 되어야 한다.
### Finishing a release branch
release branch는 master, develop 브랜치에 합쳐져야 한다. 그리고 mater 에 tag를 해야한다.
```shell
$ git checkout master
Switched to branch 'master'
$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2
```

```shell
$ git checkout develop
Switched to branch 'develop'

$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
```
위의 command는 분명히 conflict 날 것이니 머지 잘해라

```shell
$ git branch -d release-1.2
Deleted branch release-1.2 (was ff452fe).
```

### __Hotfix branches__
hotfix 브랜치는 새로운 production release를 준비하는 점에서 release 브랜치와 매우 비슷하다. 즉시 수정해야하는 문제점이 발견될 때 발생한다.

### Creating the hotfix branch
```shell
$ git checkout -b hotfix-1.2.1 master
Switched to a new branch "hotfix-1.2.1"

$ ./bump-version.sh 1.2.1
Files modified successfully, version bumped to 1.2.1.

$ git commit -a -m "Bumped version number to 1.2.1"
[hotfix-1.2.1 41e61bb] Bumped version number to 1.2.1
1 files changed, 1 insertions(+), 1 deletions(-)
```

```shell
$ git commit -m "Fixed severe production problem"
[hotfix-1.2.1 abbe5d6] Fixed severe production problem
5 files changed, 32 insertions(+), 17 deletions(-)
```

### __Finishing a hotfix branch__
```shell
$ git checkout master
Switched to branch 'master'

$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)

$ git tag -a 1.2.1
```
