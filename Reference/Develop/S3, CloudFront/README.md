# S3, CloudFront

> Cloud Front는 CDN로 빠른 속도와 큰 규모의 콘텐츠를 저장 및 전달하는 서비스이다.

<br>

### Cloud Front 동작 시나리오

① Client가 웹사이트에 접속한다. 웹사이트를 www.terry.com이라고 하자.

② Client는 DNS 서버를 통해서 www.terry.com 의 주소를 look up 한다. 이 때, www.terry.com은 cloud front의 URL로 맵핑이 되어있어야 하는데, CNAME 레코드를 이용하여 www.terry.com을 해당 사이트에 대한 Cloud Front URL 로 맵핑 해놓는다. 여기서는 asdf.cloudfront.net이라고 가정하자

③ Client는 asdf.cloundfront.net 의 주소를 다시 look up을 하는데, Route53에 의해서, Client와 가장 가까운 위치에 있는 Cloud Front의 edge node 주소를 리턴 받게 된다.

④ Client는 리턴 받은 ip를 가지고 Cloud Front의 edge server로 접속을 한다.

⑤ Cloud Front에는 URL에 따라서 resource의 위치를 RULE로 정해놓는데, 위의 예에서는 /image 디렉토리의 파일은 S3에 원본을 두고 Cloud Front에 캐슁하도록 하고, /css/ 아래 파일들은 원격지에 있는 (Amazon이 아닌) 서버에 두고 캐슁을 하도록 하였다. 그리고 *.jsp 파일은 캐슁 없이 직접 원본 서버로 가도록 하였다.

⑥ 만약에 /image/나 /css/에 있는 파일을 Client가 요청 하였을 경우 edge node의 캐쉬를 체크해보고, 캐쉬에 내용이 없으면 원본 서버로 부터 파일을 읽어서 캐쉬에 저장한 후에, Client에 리턴한다. 캐쉬에 있을 경우에는 바로 리턴을 한다.


<br>

### 리서치 내용 
- CloudFront는 Origin Server로 부터 파일을 가져온 다음 엣지 로케이션에 배포하는 형태이다. ([참고](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Introduction.html#HowCloudFrontWorksOverview ))
- 원본 액세스 ID라는 특별한 CloudFront 사용자를 만듭니다.
- 버킷의 파일을 읽을 수 있는 원본 액세스 ID 권한을 부여한다.
- 나머지 모든 사람으로부터 Amazon S3 URL로 파일을 읽을 수 있는 권한을 제거한다.
- HTTPS 요청을 제공하는 방식에 대해 알아봄.

### Cloud Front 설정 방법

1. CloudFront 서비스 시작 -> Create Distribution
2. Distribution 컨텐츠 선택 (Web or RTMP)
3. WEB분배설정 - Origin 설정
 