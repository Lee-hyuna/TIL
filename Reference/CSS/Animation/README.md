### CSS3로 애니메이션?

- 자바스크립트 적용 외에 간단한 애니메이션을 제작할 수 있다.
- 자바스크립트를 이용한 애니메이션 제작 시 성능이 좋지 못할 때가 있는데, frame-skipping같은 여러 기술을 이용해 부드럽게 렌더링 가능.
- 자바스크립트를 모르더라도 간단하게 애니메이션을 만들 수 있다.
- CSS 애니메이션은 frame-skipping 같은 여러 기술을 이용하여 최대한 부드럽게 렌더링됩니다.
(자바스크립트를 이용한 애니메이션은 잘 만들어졌더라도 성능이 좋지 못할 때가 있음. )
- 브라우저는 애니메이션의 성능을 효율적으로 최적화할 수 있습니다.
(ex.현재 안보이는 엘리먼트에 대한 애니메이션은 업데이트 주기를 줄여 부하를 최소화할 수 있는 이점이 있음.)

### css3 Animation 파헤치기

### Trnasform (변형)

요소 박스를 변형하는 속성으로, 2차원 및 3차원 변형이 가능하며 변형 형태별로 함수 타입의 속성 값을 지정합니다.

[https://jsfiddle.net/LEE_HYUNA/4qvjr6y2/](https://jsfiddle.net/LEE_HYUNA/4qvjr6y2/)

**translate()** : 요소 박스를 평면상에서 수평이동하는 기능입니다.

    div { trnasform : trnaslate (50px, 50px) }
    div { trnasform : trnaslateX (50px) }
    div { trnasform : trnaslateY (50px) }

trnaslateX() : X축 방향으로 이동

trnaslateY() : Y축 방향으로 이동

**scale()** : 요소 박스의 가로와 세로 크기를 조절할 수 있습니다.

    div { trnasform : scale (0.5) }
    div { trnasform : scaleX (0.5) }
    div { trnasform : scaleY (0.5) }

scaleX() : X축 방향으로 크기 변형

scaleY() : Y축 방향으로 크기 변형

**rotate()** : 요소 박스를 평면상에서 회전하는 기능으로, 함수값으로 회전각도(deg)를 지정할 수 있습니다.

    div { trnasform : rotate (45deg) }

양수 값일경우 : 시계 방향으로 회전

음수 값일경우 : 반시계 방향으로 회전

**skew() :** 요소 박스의 기울임을 지정하는 기능합니다.

    div { trnasform : skew (15deg , 15deg) }
    div { trnasform : skewX (15deg) }
    div { trnasform : skewY (15deg) }

skewX() : X축 방향으로 기울임

skewY() : Y축 방향으로 기울임

**matrix()** : 요소 박스에 이동 및 회전 크기 변화와 기울임 등을 복합적으로 적용할 수 있는 기능입니다.

    div { trnasform : matrix (0.5, 0.2, 0.3, 0.5, 50, 100) }

요소 순서 : scaleX, skewX, skewY, scaleY, translateX, translateY

### transform-origin

**transform-origin** : transform의 변형 기준점을 지정하는 속성입니다.

    div { transform-origin : right bottom }
    div { transform-origin : 10% 20px }
    div { transform-origin : 10px 20px 0 }

요소 순서 : X, Y, Z축 방향으로 3개까지 입력 가능.
값이 1개일경우 X, Y축은 동일하게 적용되고 Z축값은 0
값이 2개일경우 Z축 값은 0

### Trnasition (변환)

요소 박스에 지정된 속성이 점진적으로 변환하는 기능을 의미합니다.
transition을 이용하면 속성이 변화되는 과정을 통해 애니메이션 효과가 적용되어 동적인 느낌을 줄 수 있습니다.

transition은 페이지가 로드되면서 자동으로 시작되지 않습니다. :hover와 같은 가상 클래스 선택자(Pseudo-Classes) 혹은, 자바스크립트의 onclick 이벤트 따위의 부수적인 액션에 의해 작동합니다

[https://jsfiddle.net/LEE_HYUNA/h9mjart8/](https://jsfiddle.net/LEE_HYUNA/h9mjart8/)

**tansition-property**
요소에 지정된 속성을 변화하고자 할 때 사용하는 속성입니다.

    div { transition-property : all }
    div { transition-property: width, height, border-width, color; }

- all을 지정할 경우 요소에 지정된 모든 속성이 변화됨
- 2개 이상의 속성을 지정할 경우, 콤마(,)로 구분하여 여러개를 지정함
- 속성의 변환이 진행되는 상황을 보여주고자 할 경우에는 transition-duration 속성을 사용하여 함께 명시

**transition-duration**
변환이 진행되는 시간을 지정하는 속성입니다.

    div { transition-duration: 1s, 2s, 1s, 3s; }

- transition-property 속성값을 콤마로 구분하여 여러 개로 지정했을 경우 : duration 속성값 역시 콤마(,)로 구분하여 속성별로 시간을 지정할 수 있음.
- 시간은 초 단위(s)로 지정 ( 만약 1초로 설정했다면, 모든 변화가 1초 안에 끝남 )

**transition-timing-function**
속성이 변환될 때 진행 속도의 형태를 지정하는 속성입니다.

    div { transition-timing-function: ease / linear / ease-in / ease- out / ease-in-out / cubic-bezier(n,n,n,n) / steps }

[속성설명](https://www.notion.so/0b91d4e4121242968457702a5d6587fe)

**transition-delay**
변환이 진행되기 전 지연되는 시간을 지정하는 속성입니다. (만일 3초(3s)로 설정했다면, 페이지가 로드되고 나서 3초 후에 transition 효과가 시작됩니다)

    div { transition-delay: 3s ; }

- transition-duration 속성과 마찬가지로 시간은 초 단위(s)로 지정
- 지연되는 시간은 진행시간 (duration)에 포함되지 않음

### transition

속성 값들을 일괄 적용하는 대표 속성으로, transition 속성 값은 공백으로 구분하여 선언합니다.

    div { transition : all 3s ease-in 2s }

**trainsition syntax (구문법)**

    div { transition: property duration timing-function delay; }

**최대 단축형** : transiton의 속성과 값을 최대로 간단하게 작성할 때는 다음과 같이 할 수 있습니다.

    div { transition: background 2s ease 1s, padding 1s linear 2s; }

**확장 단축형** : 최대 단축형보다는 조금 더 유연한 작성방식입니다.

---

변경할 속성이 2개 이상이면 위와 같은 방식으로 사용할 수 있습니다.

이 방식의 장점은, 각 속성별로 지연시간이나 다른 값을 따로 두어 독립적인 움직임을 줄 수 있습니다.

반면, 변경할 속성은 많은데, 그 외에 사용하는 값들은 대체적으로 공통된 경우, 동일한 값을 계속 써주는 비능률적인 상황이 발생할 수 있습니다.

단축시킨 속성을 2개 이상 나열할 때에는 반드시 쉼표(,)로 구분해야 합니다.

**기본형** : 속성을 분리시켜서 정의할 수도 있습니다.

    div {
    	transition-property: width, color;
    	transition-duration: 1s;
    	transition-timing-function: ease;
    	transition-delay: 3s;
    }

## Animation (변환)

@keyframe rule을 사용하여 특정 시점에 키프레임을 지정하여, 애니메이션의 재생횟수, 진행 방향, 일시 정지 기능 등과 같은 풍부한 기 능을 제공하고 있어 조금 더 능동적으로 동적 효과를 구현 할 수 있습니다.

### @Keyframes

animation 속성에 적용할 키프레임을 생성하기 위한 규칙입니다. 키프레임이랑, 애니메이션을 구현할 때 기준이 되는 특정 시점으로, 각 키프레임 사이의 애니메이션은 자동으로 구현됩니다.

    @keyframes {
    	from { [css : ;] }
    	[percentage] { [css : ;] }
    	to { [css : ;] }
    }

- 애니메이션 이름은 @keyframes 규칙으로 생성된 애니메이션 정보를 대표하는 이름으로, 사용자가 정의하여 선언함.
- from{} 은 시작지점을 의미하며, 0%로 선언할 수도 있음 (특정 시점에서 변화하는 선언 값을 지정하고자 할 경우, 중간 단계를 백분율(percentage)로 지정할 수 있음)
- to{} 구문은 종료 지점을 의미하며, 100%로 선언할 수도 있음.

**animation-name**
@keyframes 규칙으로 생성한 애니메이션 이름을 지정하여 해당 애니메이션이 실행되도록 하는 속성입니다. 실행하고자 하는 애니메이션이 여러 개인 경우 애니메이션 이름을 콤마(,)로 구분하여 지정할 수 있습니다.

    div { animation-name : mainAni }

**animation-duration**
animation-name 속성으로 실행된 애니메이션 진행 시간을 지정하는 속성입니다. 지정할 수 있는 속성 값인 time은 초 단위(s)로 1회 진행 시간을 의미합니다.

    div {
    	animation-name : mainAni;
    	animation-duration : 5s;
    }

**animation-timing-function**
애니메이션 진행 속도의 변화 형태를 지정하는 속성입니다.

    div {
    	animation-name : mainAni;
    	animation-duration : 5s;
    	animation-timing-function : ease-in;
    }

**animation-iteration-count**
애니메이션의 반복 횟수를 지정하는 속성으로, infinite를 지정한 경우 애니메이션이 무한 반복되며, number값으로 직접 반복 횟수를 지정할 수 있습니다.

    div {
    	animation-name : mainAni;
    	animation-duration : 5s;
    	animation-iteration-count : infinite;
    }

**animation-direction**
애니메이션의 진행 방향을 지정하는 속성으로, 기본값은 normal이며, 순방향으로 진행됩니다.

    div {
    	animation-name : mainAni;
    	animation-duration : 5s;
    	animation-iteration-count : 5;
    	animation-direction : alternate;
    }

[animation-direction 속성 설명](https://www.notion.so/815fabd65f964d6db2d0684a1d5fef1d)

**animation-play-state**
애니메이션의 진행 및 정지 상태를 지정하는 속성으로, running과 paused 값을 사용할 수 있습니다.

    div {
    	animation-name : mainAni;
    	animation-duration : 5s;
    	animation-play-state : running;
    }

running : 애니메이션이 진행된 상태로 표시
paused : 애니메이션이 정지된 상태로 표시

**animation-delay**
애니메이션이 실행되기 전 지연 시간을 초 단위로(s)로 지정하는 속성입니다.

    div {
    	animation-name : mainAni;
    	animation-duration : 5s;
    	animation-delay : 5s;
    }

**animation-fill-mode**
애니메이션 실행 이전이나 이후에 애니메이션 효과를 표시할지의 여부를 지정하는 속성입니다. 애니메이션 실행 이전의 지연 시간에는 애니메이션에서 지정한 속성이 적용되지 않는데, 이 속성을 통해 정의 할 수 있습니다.

    div {
    	animation-name : mainAni;
    	animation-duration : 5s;
    	animation-delay : 5s;
    	animation-fill-mode : backwards;
    }

[animation-fill-mode 속성 설명](https://www.notion.so/98e9a64d95b443ab902699d9802ba3c0)

## animation

애니메이션과 관련된 속성을 일괄 지정하기 위한 대표 속성입니다.

**animation syntax (구문법)**

    div { 
    	animation: {name} {duration} {timing-function} {delay}
    {iteration-count} {direction} {fill-mode} {play-state}; 
    }