# EC2

EC2(Elastic Compute Cloud)는 독립된 컴퓨터를 임대해주는 서비스.  
가장 먼저 생겨난 서비스

## instances
임대한 컴퓨터 1대라고 생각하면 된다.  

## instance 생성

### AMI
운영체제 (아마존에서 제공하는 Linux)  
SQL 데이터베이스는 돈이 확 올라감.

### Type
nano < micro < small < medium < large ..  
각각의 컴퓨터 스펙을 타입이라고 표현했음  

* vCPU: 몇개의 cpu가 있는가 (v는 virtual이라는 뜻, 물리적 cpu가 아니다.)
* Memory: 몇 기가바이트를 갖고있는가

### 인스턴스 가격 정책
무료 용량은 ssd 스토리지 30GB (200만건 이상하면 과금)
모든 AWS 서비스 합산 15GB 이상이면 과금이 된다.

### 스팟 인스턴스
가변적인 요금

### network
* Network
* Subnet
* Auto-assign Public IP

### Shutdown behavior
운영체제에서 인스턴스를 지우지 않고 얼릴것인가?


## Configure Security Group
방화벽과 같은 기능을 제공. 기초지식이 필요하다  
인스턴스에 접속할 수 있는 허용하고, 막는 기능  
우리가 만든 인스턴스에 접속하는 여러가지 방법중 하나 (파일을 업로드 하기 위해 접속을 하던..)

SSH: 데스크탑 컴퓨터를 원격제어 한다.
ssh source: ssh로 접속하는걸 허락하긴하는데, 허용 ip를 제어한다. 
 
인스턴스타입 (type, CPU, memory)  
storage (가용할 GB)
보안 
