# github

> social coding

## Github이란?
- 가장 인기있는 오픈소스코드 저장소
  - 2008년런칭
  - 28M users / 85M repos (2018현재)
- 많은 오픈소스 프로젝트들을 호스팅
	- sourceForge의 몰락
	- gem, npm등 package manager들이 지원

## Why Github?
- 강력하고 현대적인 DVCS인 git
- 멋진 UI와 프로젝트를 지원하는 많은 기능들
- 공짜
- 오픈소스 개발문화를 바꾼 **Fork & Pull Request**
- 기업용 솔루션제공 (github enterprise)

## Fork
```
프로젝트의 소스 코드를 통채로 복사하여 새로운 소프트웨어를 개발하는 것을 말함
(e.g. MySQL을 fork해서 MariaDB가 생겼다)

branch와 비슷하지만 전통적으로 오픈소스커뮤니티에서 fork는 터부시되는 행위. 목표의 불일치나 내부갈등으로 프로젝트 fork되어 커뮤니티가 깨지는 사건들이 있었기 때문.
```

## Fork / Pull Request
```
Github에서의 fork는 새로운 remote repo를 추가하는 것

Github의 fork는 repository를 통채로 복사해서 새로운 프로젝트 생성
(history 전체가 복사되고 기존 프로젝트와 연결 됨)

프로젝트 권한 관리 관점에서 모든 사람들에세 'push'권한을 줄 필요가 없다.
프로젝트에 참여하고자 하는 사람들은 fork해서 코드를 수정한 후에
원래 저장소에 보내는 (pull request) 형태로 프로젝트에 기여하게 된다.
```

## Pull Request
**github의 핵심기능**

```
변경을 merge할 project+branch를 선택하고 PR을 생성하면

- Github내에 code review가 가능한 change set을 볼 수 있다
- 코드라인 단위로 comment를 남기면서 토론할 수 있다
- 토론하면서 추가적인 변경을 commit&push할 수 있다
- PR을 승인하면 해당 branch가 merge된다
  - 충돌없이 merge할 수 있는지 github이 체크해준다
```

## Issues Checking Tools

## Documents
```
- markdown
- wiki
- gh-pages
  - html
  - auto generate
  - jekyll
```

## 서버에서 Github repo 접근
```
#1. 공용계정의 id/pw

공용계정의 password관리가 보안상이슈가 될 수 있으므로 권장하지 않음.
어쩔 수 없이 id/pw방식의 인증을 할 경우
공용계정에서 access token을 생성해서 사용할 것
  - setting > developer settings > personal access tokens
access token은 사용범위 제한 및 회수(revoke)가 가능함


#2. deploy key
프로젝트 설정에서 각 서버의 ssh key를 deploy key로 추가하면
해당 호스트에서 그 프로젝트의 repo에 접근할 수 있다.
```

## Version Control
- 동일한 문서의 여러 버전을 관리하는 것
- 소스코드 등의 디지털 문서를 관리하는데 사용
- 문서가 변경되면 변경에 대한 **버전**을 붙여 구분하고 **버전**을 통해 *시간에 따른 변경사항과 변경자를 추적*할 수 있다


## VCS: 데이터구조
일반적으로 directed tree로 모델링하지만 tree with merge를 지원하는 경우 directed acyclic grapg(DAG)로 모델링
  - Local VCS
  - Centralized VCS ( 분산VCS )
    - Checkout
    - Branch...
  - Distributed VCS
    - 중앙서버 동기화 ( merge 시점 )


## VCS 용어
- **change:** 버전컨트롤 하에서 문서의 수정을 의미 (diff, delta), 변경을 다루는 단위는 VCS마다 상이할 수 있다.
- **change List:** 대부분의 VCS는 다수의 파일에 대한 변경을 하나의 commit에서 atomic하게 다루는데 이를 change list(or change set)이라 한다.
- **revision:** (= vertion), repository 전체 tree 중 특정 시점의 상태.
- **branch:** 특정 시점을 기준으로 branched된 fileset. 분기된 사본은 서로 독립적으로 수정될 수 있다.
- **tag:** 특정 시점의 snapshot을 지정하기 위한 label. 릴리즈 된 fileset에 대한 tag를 지정하는 식으로 쓰인다.
- **trunk:** 개발을 위한 (branch가 아닌) base line. mainline혹은 master라 불린다.
- **repository:** 파일들의 현재와 과거 데이터를 저장하는 곳
- **working copy:** 특정시점의 repository파일들에 대한 local copy
- **conflic:** 충돌, 동일 문서에서 서로 다른 변경이 발생하고, 해결할 수 없는 상황을 confilct라고 함. 사용자가 직접 해결해야 한다

## git
- linux 커널 개발 bitkeeper사용
- bitkeeper와 분쟁으로 리눅스 개발 커뮤니티에서 git을 만들기 시작
- git 설계목표
  - 빠른속도 + 단순구조
  - 비선형적인 개발 (수천개의 동시 다발적 브랜치)
  - 완벽한 분산
  - linux 커널같은 대형 프로젝트에도 유용할 것


## git, 어떻게 다른가?
기존 VCS는 데이터가 변경될 때 diff를 떠서 저장하고 관리한다
git은 데이터를 파일 시스템 snapshot으로 다룸 (변경되지 않는 파일은 이전 상태 파일을 Link.)


### Git의 무결성
- 데이터를 저장할 때 항상 checksum을 구하고 checksum으로 데이터를 관리한다.
- file, dir, commit 모두 checksum hash로 관리한다.

## Rebase
- **일반:** experiment라는 branch를 생성하고 merge를 하게되면 새로운 커밋객체가 생기게 되고 다시 commit을 해야한다.
- **rebase:** base를 바꾸게됨.(checkout experiment > git rebase master) 변경커밋을 하나씩 올린다고 보면 됨
  - 쪼개서 작업한게 다 날라가게 된다.... Rebase하면 confilct가 많이날 수 밖에 없음.
  - Commit history가 깔끔해짐.
- 공통 프로젝트에 참여하는 경우 rebase로 히스토리를 정리하는 것이 매너
- 충돌이 발생할 시 손이 많이 가는 단점
- 이미 공개 저장소에 push한 commit을 rebase하지마라!

## Stash
```
# 커밋하지 않은 작업이 있는데 다른 브랜치 작업을 해야할 때
$ git stash
$ git status

# 다른 브랜치 작업을 해야할 때
$ git stash list
$ git stash apply
```

## Git Submodule
- git 저장소 안에 다른 git 저장소를 둘 수 있게 해주는 기능
- submodule의 저장소 및 HEAD를 관리
  - git submodule init
  - git submodule update
- e.g
  - 모듈별로 별도 repo를 구성하고 통합모듈에서 각각 모듈을 submodule로 포함해서 프로젝트를 관리할 수 있음

## Branch 전략
- SW 형상관리
  - 단순한 '소스코드 버전관리'를 넘어서 SW생명주기 전반에 대한 관리.
  - 변경요청에서 부터 코드의 변경, 빌드, 테스트, 배포까지의 프로세스 진행에 대해 포괄적으로 어떻게 관리할 것인가가 핵심
- ISO/IEC 15504에서 정의한 형상관리 9가지 Best practice
  - 형상관리 전략
  - 형상관리 시스템 수립
  - 형상 항목 식별
  - 형상 항목 기술서 유지
  - 변경관리
  - 제품 릴리즈 관리
  - 형상 항목 이력 유지
- 각 개발팀은 자신들의 형상관리 전략 및 프로세스를 가지고 그에 적합한 브랜치관리모델을 선택해야 한다.
  - [A success git branching model](http://hundredin.net/2014/04/06/a-successful-git-branching-model/)
- Supporting branches
  - master, develp 브랜치 외에 팀원들간의 병렬 개발 
  - 기능별 브랜치 (Feature branch, .. 릴리즈에 포함될지 결정되지 않는 것들도 많음.)
- Relase branches
  - 새로운 릴리즈를 준비할 때 사용하는 브랜치.
  - develop 브랜치가 새로운 릴리즈를 위한 개발이 안정되었을 때 develop 브랜치에서 release 브랜치를 생성하게 되며 릴리즈 계획에 따라 버전번호를 붙히고 relase를 위한 준비(QA, test)를 진행하게 된다
  - 릴리즈 준비가 끝나면 release 브랜치는 master와 develop에 merge되고 삭제된다, 또한 릴리즈 버전에 대한 tag를 생성한다
- Hotfix branches
- [git-flow](http://danielkummer.github.io/git-flow-cheatsheet/index.ko_KR.html)
- [github flow](https://guides.github.com/introduction/flow/)
  - git-flow보다 간소한 모델
    - main branch보다 master브랜치만 가짐
    - 나머지 branch는 특별히 구별하지 않음
    - PRs로 협업하고 merge