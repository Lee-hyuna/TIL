# CSS - calc()

##개요
- "Recommendation" 단계
- width, height, margin, padding, font-size 등에 사칙계산으로 값을 지정.
- width: 100% 에서 특정 픽셀만큼 계산을 해주고 싶을 때 이용하면 편리하다.
- 반응형일시 %로 등분할된 width값 지정이 필요할때 사용가능한 방법 중 하나.
- 장점 : 현재 사용되는 방식에 비해, 간단한 구조로 작업이 가능하다.
- 단점 : IE9부터 지원, 안드로이드 4.4부터 지원한다.


## 지원 브라우저
http://caniuse.com/#search=calc
 
## 작성법
- 기본 산술연산인 -, +, *, /, mod 가 지원된다.
- 사칙연산과 마찬가지로 (), *, / 가 제일 먼저 연산된다.
- **주의 : +, - 의 경우 좌우로 공백을 한칸씩 넣어줘야 바르게 인식된다.**
- 호환성을 위해 -moz, webkit 과 같은 벤더프리픽스를 먼저 작성해야 한다.
- width:calc(50% + 2em) 과 같이 다른 단위값들 %, em, px, cm 등을 사용할 수 있다.

## 브라우저 대응

- 미지원 브라우저를 위해 calc계산식과 지정된 값을 함께 넣어준다.
```css
.class{
	width:250px; //미지원 브라우저 위한 fallback
	width:calc(100% - 25px)
}
```
- JQuery로 대체해준다.
```js
$(window).resize(function() {
	$('element').css('width', '100%').css('width', '=-30px');
});
```

## 활용
- [수직중앙정렬](https://jsfiddle.net/LEE_HYUNA/z8y07nrt/)
- [유동너비영역과 고정영역을 나란히두는 layout](https://jsfiddle.net/LEE_HYUNA/r1L9naz8/)
- [background-position](https://jsfiddle.net/LEE_HYUNA/16xe2pbL/1/)
- [너비값 등분](https://jsfiddle.net/LEE_HYUNA/wmf9rts6/1/)
- [그리드시스템](https://jsfiddle.net/LEE_HYUNA/0pkgrqmL/)