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