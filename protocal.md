

www.naver.com > 

우리나라에서 KT를 쓴다고 가정을 하면 => 인터넷환경 DNS

IP 규칙
127.0.0.1 > 내 컴퓨터 ip

:80 기본포트
:443 ssl

web => nginx, apache

http프로토콜 #WIKI검색
=> 통신규약

https 군대 사내 규율용도..... > 모두가 쓰게됨


# Http protocol 1.1
나 이렇게 만들었으니까(DB), 이렇게 보내(FRONT)
header: {
 method-
 contentsType-
 Accept-
},
body: {
 .....
}

1request -------> 1 response

# 개념 method
Get: Read, 
Post: Create,
Put: Update, 
Delete: Delete

GET > body를 받아온다, 하지만 body로 보낼 수 없다
userID="dia"... > GET가능(유저의 정보를 가져오는 것, 목적지를 가르킴 그리고 그것을 파라미터로 표기함)
POST(목적지가 아니고 실 데이터, )

프로토콜규약에 이미 만들어놈
SSL (HTTPS)

## header에 셋팅함. 데이터셋팅!!!!!!!
ContentsType : application/JSON
jsp
user에 대한 get처리가 안되어있으면 data가 있어도 form이 404가뜸

# 자바스크립트 보안정책
소유주는 naver.com
자바스크립트는 www.naver.com/api.naver.com 다른 소유주라고 판단한다
1. 서버쪽에서 풀어주거나
2. jsonP 이용하기
