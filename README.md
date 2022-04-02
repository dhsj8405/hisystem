![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=HI%20System&fontSize=80&animation=fadeIn&fontAlignY=38&desc=DOUZONE%20Team%20Project%20&descAlignY=51&descAlign=62)

## 팀원
1. 우동현
    https://github.com/dhsj8405
2. 이하윤
    https://github.com/lhyoun
3. 장은주
    https://github.com/nonamed006
    
## HISystem 개요  

`Front-end` React  
`Back-end` Spring Boot   
`Database` MariaDB  

### 설명

의료정보시스템(HIS)입니다.

그중 접수,진료,수납으로 구성된 HIS 입니다.

### 개발 순서  
스토리보드 설계 - ERD 설계 - 개발 - 배포  

### 개발 기간
`2021/11/22 ~ 2021/12/22`  

### 개발 인원
`3명`

---

## 설계 및 구현

### 시스템 구조 및 개발환경
![2022-01-12-19-30-09](https://user-images.githubusercontent.com/60701130/149143946-60c14523-835b-4317-88dd-59a5b83379aa.png)

spring boot와 react 기반의 (single page) application 입니다

REST API 기반의 프로젝트이기 때문에 모든 통신을 비동기로 이루어 지며, JWT 인증방식을 사용했습니다. 

db는 마리아를 사용했으며 
MyBatis는 복잡한 비즈니스가 있는 주요기능을 구현할 때 사용했고,

JPA는 비교적 간단한 부가 기능들을 구현할 때 사용해서 생산성을 향상시켰습니다.

WebSocket은 실시간 알림 및 채팅 기능에서 사용되었습니다.

### flow chart
![2022-01-12-19-40-12](https://user-images.githubusercontent.com/60701130/149144010-0170962a-600f-48af-b040-958471a9c4b9.png)

---

## 담당 기능


### 제증명관리 페이지

![2022-01-12-19-47-19](https://user-images.githubusercontent.com/60701130/149144066-679fe33c-f86f-4b9d-8321-1807bce086c1.png)

진료가 끝나고 수납을 완료한 환자의 진단서나 처방전을 발급 받을 수 있습니다.

증명서 양식을 컴포넌트화 해서 react-to-print npm 모듈로 화면 전체가 아닌 지정된 컴포넌트(증명서 양식)만 출력 됩니다.
![image](https://user-images.githubusercontent.com/60701130/149144314-96438e80-26eb-435f-8dd2-111412d0bd8d.png)

증명서 양식에 기제한 내용  

`진단서` :
진단번호,진단일,접수자,환자이름,담당의사,병명,소견  

필요테이블  
diagnosis, reservation, user, patient, receipt, dieases,   
doctor정보(접수시 선택한의사`reservation 테이블의 user_doctor_no`와 user테이블 조인),  
staff정보(접수자`reservation  테이블의 user_staff_no`와 user테이블 조인),

`처방전` :
처방번호,처방일,환자이름,담당의사,처방일,처방약품

### 직원관리 페이지

 ![image](https://user-images.githubusercontent.com/60701130/149254481-a66f194d-d8bd-403e-96c4-ac3b7b1e17c9.png)

직원 추가, 삭제,조회,수정이 가능한 페이지입니다.  

![image](https://user-images.githubusercontent.com/60701130/149254945-ac29bc67-19f5-4023-809c-bb1a29061812.png)

등록 시에 주소API를 이용하고 유효성 검사와 공백체크를 통해 정확한 정보 등록을 유도합니다.

![image](https://user-images.githubusercontent.com/60701130/149465107-ac7cdcef-46d2-44c7-8cc1-60c457b855ec.png)

직원 리스트에서 보기 희망하는 직원을  클릭하면 상세보기와 수정이 가능합니다.

### 공지사항 페이지

![image](https://user-images.githubusercontent.com/60701130/149467879-675554c8-4d30-4c1b-ab9a-87ef6711f1d0.png)

모든 직원이 볼 수 있는 공지사항 페이지 입니다. 등록,수정,삭제는 관리자만 가능합니다.

### 근무관리 페이지(FullCalendar API)
![image](https://user-images.githubusercontent.com/60701130/149489930-bc6f47d8-31dc-4538-a17b-c4464caa79b2.png)

![image](https://user-images.githubusercontent.com/60701130/149490075-d5149f25-affa-48f1-ab8b-40aee022e3e1.png)

간호사의 근무를 기록할 수 있는 페이지입니다.  사용 유저는 간호사이고 등록,수정,삭제는 수간호사만 가능합니다.

