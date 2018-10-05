# 소켓이란

#### http 프로토콜 기반으로 웹브라우저와 웹 서버간 `양방향 통신`을 지원하기 위한 표준 API

- 서버와 클라이언트에는 각각 소켓이라는 부분이 있고 이 부분을 통해 서로 정보를 공유한다.


## 기존의 양방향 통신

http 규격 자체가 서버로의 단방향 통신을 위해 만들어짐. webSocket 이전에는 일반 http request에 트릭을 이용해 실시간인 것 처럼 보이게 하였다.

1. polling : 클라이언트가 평범한 http request를 계속 날림, but.. 비효율적

   ![img](http://2.bp.blogspot.com/-cvWY81etsao/ViZSUVxywxI/AAAAAAAAMHo/wxrd6dIntM8/s320/HttpPolling.gif)

2. long polling : 클라이언트가 http request를 날리고 기다림, 서버의 이벤트 response를 받고 연결 종료. but 이벤트의 시간간격이 좁거나 다수 클라이언트 동시 접속시 부하 문제 있음.

   ![img](http://2.bp.blogspot.com/-eL9rxi8th2A/ViZSW0ggEwI/AAAAAAAAMH4/k4S4-dRz3t4/s320/HttpLongPolling.gif)

3. streaming : 서버로 http request를 날리고, 요청 끊지 않고 필요한 메세지만 보내기를 반복.

   ![img](http://4.bp.blogspot.com/-sRVlAdeU-Kw/ViZSWw-wB2I/AAAAAAAAMH0/3CmKGISDV-A/s320/HttpStreaming.gif)



## Web Socket

HTML5 표준의 일부로 webSocket이 만들어지게 된다.

> webSocket이 기존의 일반 TCP Socket과 다른 점은 최초 접속이 일반 http request를 통해 handshaking 과정을 통해 이루어 진다는 점. http request를 그대로 사용하기 때문에 기존 80, 443 포트로 접속하여도 방화벽 열지 않고도 양방형 통신이 가능, CORS 적용 과정도 동일.

###### 그러나.... web socket 미지원 브라우저들이 있음. IE의 경우 11만 지원

#### 지원하면 web socket을 쓰고, 아니면 이전의 트릭을 사용하자!

- **socket.io(http://socket.io)**

  node.js 기반으로 만들어진 기술, 브라우저에 구애 받지 않고 실시간 통신이 가능. 모든 코드가 javascript로 작성되어 있어서 자바 개발자들은 socket.io를 쓸 수 없다. [자바로 개발이 가능하게 해주는 방법](https://github.com/keesun/mod-socket-io)이 몇가지 있긴한 것 같지만 역시 javascript 기반 솔루션은 javascript로 개발해야 문제발생을 줄일 수 있음.

- **sockJS(http://sockjs.org)**

  springframework에서 websocket 지원. 서버 개발시 스프링 설정에서 일반 webSocket으로 통신할지 SockJS 호환으로 통신할지 결정할 수 있음.



## Reference

[오바나딩요-Socket이란](http://blog.naver.com/PostView.nhn?blogId=myca11&logNo=80146459609)

[시나몬브레드webSocket 으로 개발하기 전에 알고 있어야 할 것들](http://adrenal.tistory.com/20)

