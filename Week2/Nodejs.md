
javascript는 그동안 웹에서만 국한적으로 사용되던 언어였습니다. 하지만 발전을 거듭하면서 웹이 아닌 다른 영역에서도 javascript를 사용할 수 있게 되었습니다.

이러한 Node.js라는 플랫폼이 있었기 때문에 가능하게 되었습니다. 

Node.js의 특징과 장단점에 대해 정리보겠습니다.

---

## Node.js란

``Node.js`` 는 크롬 V8 자바스크립트 엔진으로 빌드된 ``자바스크립트 런타임``입니다.

- 런타임   
컴퓨터 과학에서 컴퓨터 프로그램이 실행되고 있는 동안의 동작.

- 런타임 환경  
컴퓨터가 실행되는 동안 프로세스나 프로그램을 위한 소프트웨어 서비스를 제공하는 가상머신의 상태입니다.
노드만 깔려있으면 어느 플랫폼에서나 자바스크립트 런타임을 쓸 수 있습니다.  

**런타임** : 자바스크립트를 웹브라우저 밖 환경에서도 쓸 수 있게 해주는 프로그램


이것이 바로 Node.js 입니다.

## Node.js의 특징 

1. V8 Engine  

2. Event - driven 방식  
사용자가 이벤트를 발생시켰을 때. 즉, 입력 장치로 데이터를 전송했을 때만 작동하는 방식입니다.  
발생한 이벤트에 대해서만 웹서버가 '연결'을 해주기 때문에 자원을 최소화 할 수 있습니다.  
    
    - 이벤트 기반 
        - 이벤트가 발생할 때 ``미리지정해둔 작업``을 수행하는 방식
        - 노드도 이벤트 기반 방식으로 동작
        
    - 이벤트 루프
        - 이벤트 발생 시 호출할 콜백 함수들을 관리, ``어떤 순서로 콜백함수를 호출할 지 이벤트 루프가 판단``
        - 노드가 종료될 때 까지 ``이벤트 처리를 위한 작업을 반복``해서 루프라고 부름

    - 테스크 큐
        - 이벤트 발생 후 호출되어야 할 ``콜백 함수들이 기다리는 공간``
        - ``콜스택 안이 비워져있을 때``만 태스크 큐 안의 함수들을 콜스택 영역으로 이벤트 루프가 가져온다.
        
3. non - blocking 패러다임  
우선은 Blocking I/O방식 부터 알아보자. Blocking I/O방식(동기식 I/O)은 Read/Write 이벤트가 발생하면 이벤트가 끝날때 까지 해당 모듈을 점유하게 됩니다. 즉 해당 작업동안 다른 일을 못하게 됩니다. 또한 메모리 버퍼에 데이터를 차지하게 되기 때문에 메모리도 소비하게 됩니다.  
요청한 I/O(DB,File,Network)가 완료될 때까지 해당 Thread를 '대기 모드'로 전환 시켰다가 요청한 I/O완료 후 유저 코드를 실행시키는 방식입니다.  
Blocking 방식의 비효율성을 극복하고자 만들어진 것이 ``Non-Blocking`` 방식입니다.  
I/O작업을 진행하는 동안 유저 프로세스의 작업을 중단시키지 않습니다.
Non-Blocking I/O(비동기식 I/O)의 경우 Read/Write 이벤트가 시작하자마자 모듈을 변환시켜 다른 작업을 하도록 준비상태가 됩니다. 그래서 속도가 동기식보다 빠르고 메모리도 덜 차지하게 됩니다.


4. Single Thread  
Thread는 쉽게 말해 일을 처리하는 팔과 같은 용도.
    - Single Thread : 한번에 한가지 일 밖에 못함.
    - Multi Thread  : 한번에 여려개 일 가능.

---

## Node.js의 장점

- 이벤트 처리 방식으로 비동기 프로그래밍입니다.  

- 웹 개발시 프론트 엔드와 백엔드를 자바스크립트 하나의 언어로 만들 수 있습니다.

## Node.js의 단점

- 싱글 스레드이기 때문에 하나의 작업이 오래걸리면 시스템 전체의 성능이 떨어집니다.

- 에러가 발생하면 프로세스 자체가 죽어버립니다.

참조 : https://epdl-studio.tistory.com/76 , https://ozt88.tistory.com/20