# Reflow & Repaint

## Reflow
  - 특정 엘리먼트에 대한 리플로우 발생 시 페이지가 해당 요소를 즉시 Reflow Stat가 되며 해당 엘리먼트의 자식요소와 부모, 조상 요소까지 레이아웃 계산을 진행함

## Repaint
  - 엘리먼트의 스킨 변화가 발생하지만 레이아웃에 영향을 미치지 않을때 발생

## 렌더링 엔진 구조
| Step1 | Step2 | Step3 | Step4 |
|---|---|---|---|
| HTML Tags | DOM Tree | Render Tree  | Paint |
| CSS | Style Struct | Render Tree  | Paint |  

- [Step1] 문서 파싱 : HTML 문서를 파싱하여 "Content Tree"에서 태그를 DOM 노드로 변환하고, 외부 CSS 파일을 포함하여 스타일 요소도 파싱한다.
- [Step2] 렌더트리 생성 : Step1에서 얻은 스타일 정보와 HTML 표시 규칙을 가지고 "렌더트리"를 생성한다. 렌더트리는 색상과 면적과 같은 시각적 속성 정보를 가지고 있다.
- [Step3] 렌더트리 배치 (Reflow) : Step2에서 생성된 렌더트리를 기반으로 각 노드가 화면에 정확한 위치에 표시되도록 배치하는 과정이다.
- [Step4] 그리기 (Repaint) : Step3에서 배치된 노드들을 가로지르며 그리는 과정으로 visibility, outline, background-color와 같이 시각적 속성에 해당하는 정보를 입힌다.

**Reflow**발생 시 Step3, Step4가 반복됨

## Reflow 발생 케이스
- 윈도우 resizing
- 스크롤
- DOM에서 element 삽입, 제거, 혹은 업데이트
- 페이지 내용 업데이트 (ex. input 박스 텍스트 입력)
- DOM 요소 위치 이동
- DOM 요소 애니메이션
- element에 대한 offset 값을 측정하거나 scrollTop, clientTop, getComputedStyle을 측정
- 스타일 바꾸기
- 글꼴 크기 변경
- 스타일 시트 추가 / 제거
- 엘리먼트 className 변경

## Reflow 피하는 방법
- CSS 하위 선택자는 필요한 뎁스만큼 넣는다
- 클래스 변화에 따른 스타일 변화를 원할 경우, 최대한 DOM구조 상 끝단에 위치한 노드에 준다.
- 인라인 스타일을 최대한 배제한다.
- 애니메이션이 들어간 엘리먼트는 가급적 `position: fixed` 또는 `position: absolute`로 지정한다
- 퀄리티와 퍼포먼스 사이에 타협한다
- 테이블 레이아웃을 피한다
- CSS에서의 JS표현식을 피한다
- JS를 통해 스타일 변화를 주어야 할 경우 가급적 한번에 처리한다
- `position: relative` 사용 시 주의한다
- DOM 접근 줄이기 
  - documentFragment 사용
  - cloneNode 사용
  - display: none사용
- DOM 요소에는 미리 사이즈 정하기