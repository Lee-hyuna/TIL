## 선언방법
```js
var pattern = /pattern/gi;
var pattern2 = new RegExp("패턴", "플래그");
```
`/`로 둘러 쓰고 정규표현식을 입력하면 리터럴로 입력 된다.

`() [] {} ^ $ |` 과 같은 특수기호(메타문자)를 ‘문자’로서 입력하려면 `\` 역슬러시를 사용하여 입력한다.

## 리터럴 VS 문자열

| 리터럴 | 문자열로 입력 |
|:----:|:----------:|
|/\[bc]\]at/|“\\[bc\\]at”|
|/\w\\hello\\123/|/\w\\hello\\123/|


> 문자열 내부에서 특수기호를 입력할때는, \ 를 한 번 더 입력해줘야 한다. 
  문자열 자체에서도 메타문자를 인식하기 때문에, 그것을 한 번 더 escape한다고 생각하면 될듯.


## 플래그
**g :** 전역모드

**i :** 대소문자 구분

**m :** 검사 대상의 첫문자를 뜻하는 $, 와 마지막 문자를 뜻하는 ^를 각 행에 적용

## 특수기호(메타 문자)

![img](../image/png)

- .{n, m} : 글자수 적어도 n개 이상~m개 이하
- () : match를 수행해서 나온 결과를 기억한다. (아래에서 자세히 설명)
- (?=.*[0-9]) : 숫자가 적어도 하나는 있어야
- ^()$ :
- ?!.* : 없어야 하는것.
- ?=.* : 있어야 하는것
- ?: : 그룹이 아님

> JS에선 (?i) 지원하지 않음

## 응용
- 비밀번호 체크 : 숫자, 소문자, 대문자, 특수문자로 구성된 5~10 자리 비밀번호.
```js
/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{5,10}/
```

- 동영상 확장자 체크
```js
/^(mp4 |mov|wmv|3gp|flv|avi|mpg|mpeg|mpe|asf|asx|rm|mkv|webm|ogg|ogv|yuv|amv|m4p|m4v)$/
```

- 양의 정수
```js
/^[1-9][0-9]*$/
```

## 메서드
- test()

검사 패턴의 결과로 true/false를 리턴한다.
```js
var pattern1 = /at/g; // 모든 at에 일치
pattern1.test("bat cat sommat"); // true
```

- exec()

검사 패턴에 일치하는 문자열 배열을 반환한다. ()? 그룹을 사용하여 묶어서 사용한다.

```js
var matches = /mom( and dad( and baby)?)?/gi.exec("mom and dad and baby xx");
matches.index; // 0
matches.input; // mom and dad and baby xx
matches[0]; // 패턴에 일치하는 부분 전체 mom and dad and baby
matches[1]; // 그룹1 and dad and baby
matches[2]; // 그룹2 and baby
```

## 프로퍼티

현재 컨텍스트의 최근 정규표현식 관련 정보를 가져올 수 있다.

- **RegExp.input :** 최근 입력
- **RegExp.lastMatch :** 패턴에 일치하는 정보
- **RegExp.leftContext :** 패턴의 왼쪽 정보
- **RegExp.rightContext :** 패턴의 오른쪽 정보

## 유용한 사이트
- https://regexr.com/ : 결과 확인할때
- https://regexper.com : 표현식 시각화

## Reference
프론트엔드 개발자를 위한 자바스크립트 - 니콜라스 자칼스