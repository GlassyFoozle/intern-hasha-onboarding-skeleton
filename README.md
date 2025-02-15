# 👨‍💼 인턴하샤

- 🧇[**인턴하샤**](https://www.survey-josha.site/) 는 1조의 기획 프로젝트입니다!
- 인턴하샤는 스타트업과, 스타트업 인턴십을 구하는 학생들을 매칭시켜주는 역할을 합니다.
- 많이 부족하지만 열과 성을 다해 제작한 저희 인턴하샤 서비스를 만족스럽게 사용하실 수 있기를 바랍니다🙏🙏

- 개발 기간 : TODO

- 본 레포는 **TEAM1-WEB REPO** 이므로 FRONTEND 개발에 관한 내용을 위주로 설명합니다.

- BACKEND 개발에 관해 궁금하시다면? [TEAM1-SERVER REPO](https://github.com/wafflestudio22-5/team1-server)
  <br/><br/>

## 📈 기획

### 니즈 확인

- https://eng.snu.ac.kr/snu/bbs/BMSR00004/view.do?boardId=1875&menuNo=200176
- https://slashpage.com/match-snucba?lang=ko
- SNAAC에서도 자체적으로 진행 결과 있음

니즈가 존재하는 부분. 이에 따라 우리가 기능을 확실하게 구현해 그 니즈에서의 주된 플레이어가 되는 것을 목표.

### 페인 포인트

- 스타트업: 우리가 좋은 초기 스타트업인데, 직원 구하기가 어렵다
  - 분산된 창구(경력개발원, 단톡방, 에타)
  - 인맥과 수고가 필요
- 구직자: 인턴하고 싶은데 좋은 스타트업 찾기가 어렵다
  - 일단 기본적으로 좋은 스타트업이 많지 않음
  - 스타트업 구직 창구가 분산되어 있어 비교도 쉽지 않음
  - 좋은 정보에 대한 접근도 많은 수고가 들며, 내부 정보(IR 자료 등) 등은 아예 확인 불가

### 기획 의도

- 분산된 창구를 모은다
  - 스타트업의 수고를 줄이며, 구직자에게도 정보를 한눈에 모아볼 수 있게
- 좋은 스타트업을 고른다
  - SNAAC, SNUSV, VC, 교내 경력개발원 등 단체와의 협업을 통해, 그들이 한정된 수의 추천 티켓을 가지고 믿을만한 스타트업을 추천하도록 한다.
- 좋은 정보를 제공한다
  - IR 자료는 투자심의 때의 자료로, 스타트업의 방향성, 내부 정보등 가치 있는 정보들을 담고 있음
  - 온라인에 그냥 올려두면 최신이 아닌 자료가 올라가 있을 수 있다는 문제 때문에, 공개적이지 않음
  - 폐쇄형 커뮤니티에는 걱정 없이 업로드 가능할 것 같다는 것이 현재 SNAAC과의 컨택에서 얻은 답변
  - 추가적인 정보에 대해서는 논의 필요.
- 최대한 구직자 친화적으로 제공한다
  - 어차피 구직자의 수가 많고, 질 높은 사람들을 모을 수 있다면 좋은 스타트업들은 알아서 들어온다
  - 구직 기능을 제외하더라도 학생 트래픽을 최대한 높일 수 있는 기능이라면 도입이 필요하다

### 확장 가능성

- 커뮤니티 / 아티클 기능 추가
  - 아티클 기능의 예시
    - [https://eopla.net](https://eopla.net/)
    - https://www.tokyodev.com/articles
    - 아티클 기능에서는 eo플래닛이 강점이 있어, 차별화 포인트를 모색해보아야 할듯
      - 대표의 모교를 다니는 학생에게만 글이 보인다든가?
  - 학생 트래픽을 통한 선순환을 목표로 함
- SKP/KY/SSH까지 확대
  - 충분한 트래픽을 얻어내는 것과, 구직자풀 QC의 균형
    - 학벌을 통한 QC가 근원적인 해결책이라고는 생각하지 않음. 유저의 니즈 조사 통한 방안 확인해야 할 것.
  - 다만 학벌을 통한 일차적인 스크리닝을 통해, 희소성 효과를 만들어낼 수 있음
    - 희소성 효과: 아무나 얻는 기회가 아니니 좋을 것이다
- 디스코드 서버/단톡방 등 유저에게 노출될 창구 늘리기
  - 구직자를 모으는 것이 서비스의 성패를 결정함
- 이외 유저가 바라는 것이라면 무엇이든

## 💻 배포

프론트엔드 서버 도메인(Web server) : <https://www.survey-josha.site/>

백엔드 서버 도메인(Api server) : <https://api.survey-josha.site/>

AWS S3 + CLOUDFRONT를 이용하여 배포하였습니다.
<br/><br/>

## 🔧 Stacks // TODO

#### 기술 스택

메인: React

스타일링: tailwind

상태 관리: context api & tanstack query

코딩 컨벤션 관리: eslint

네비게이션 처리: react-router-dom

배포 : Cloudfront & S3

## 🚀 주요 기능

### 폼 처리

> Problem

- **유저가 입력**하는 상태와 실제로 **API 요청에 들어가는 상태**가 서로 다릅니다.
- 폼을 처리하는 데 **다양한 상태와 조건들**이 사용됩니다.
  - 회사 생성 페이지에서는 총 25개의 상태가 사용됩니다.
- **다양한 에러 상황**을 분리해야합니다.
  - 회원가입 비밀번호 조건의 경우 총 네 가지의 에러 상황으로 나누어 처리하고 있습니다.

⇒ 복잡한 상태 관리를 효율적으로 처리할 필요가 있습니다.

> Solve

- View-Presentation 계층을 사용하여 상태를 관리하였습니다.
  - **Presentation에서 상태와 유효성을 평가**합니다.
  - View에서는 유저로부터 입력을 받아 Presentation의 상태를 변화시키고, 실제로 폼을 입력하는 요청을 받았을 때 api 콜을 실행할지 여부를 판단합니다.
- 사용자가 입력하는 상태는 input State와 form State를 분리하여 입력할 때와 제출할 때의 유효성 평가를 분리하였습니다.

⇒ 모듈화를 통해 복잡한 상태를 더 깔끔하게 관리할 수 있었습니다.

관련 이슈 및 PR: https://github.com/wafflestudio/22-5-team1-web/pull/258

예시 페이지

- 로컬 회원가입
  ![비밀번호 다중 에러](<.github/assets/비밀번호 다중 입력.gif>)
- 회사 생성 페이지 해시태그 인풋
  ![해시태그 인풋](<.github/assets/해시태그 입력 폼.gif>)

### 다중 api 처리

> Problem

- 하나의 페이지에서 **다수의 API**를 불러오는 경우들이 발생합니다.
  - 회사 생성을 수행하려면 총 5개의 API를 호출해야 합니다.
- 여러 **API를 호출하는 도중 에러**가 발생하면 대응이 필요합니다.
  - 회사 생성 시 S3 이미지 업로드에 실패하면 회사 생성 API call을 수행하지 않아야 합니다.

⇒ 다양한 API 콜에서 에러를 관리할 수 있어야 합니다.

> Solve

- **async mutation**을 사용하여 Promise resolve 여부에 따라 예외를 처리합니다.
- 각 상태에 따른 API 호출 여부 또한 평가할 수 있습니다.

관련 이슈 및 PR: https://github.com/wafflestudio/22-5-team1-web/pull/282

### 다양한 폼

> Problem

- 단순한 형태의 폼이 아닌 다양한 요청을 받을 수 있는 폼이 필요합니다.
  - 사진, 날짜, **해시태그, 문자열 리스트, 객체 리스트**
- 다중 입력을 받는 경우, **유저가 중복되는 값을 입력하는 경우**를 막아야 합니다.
- 다중 입력 시 **공백을 제거**한 뒤 API 요청을 보내야 합니다.

> Solve

- **디자이너**님과의 협업을 통해 유저가 이해하기 쉬운 형태의 폼을 구현하였습니다.
- 다중 입력을 받을 때 유저가 **중복되는 값을 입력하면 즉각적으로 확인**할 수 있도록 에러 메세지를 띄웁니다.
- 다중 입력의 경우, 필터링을 통해 call에는 공백 등의 값이 들어가지 않도록 합니다.

⇒ 해시태그, 문자열 리스트, 객체 리스트 등 다양한 폼을 구현하였습니다.

관련 이슈 및 PR

- https://github.com/wafflestudio/22-5-team1-web/pull/276
- https://github.com/wafflestudio/22-5-team1-web/pull/272
- https://github.com/wafflestudio/22-5-team1-web/pull/278
- https://github.com/wafflestudio/22-5-team1-web/pull/270

예시 페이지

- 해시태그 폼
  ![해시태그 입력 폼](<.github/assets/해시태그 입력 폼.gif>)
- 문자열 리스트 폼
  ![문자열 리스트 폼](<.github/assets/투자사 정보 폼.gif>)
- 객체 리스트 폼
  ![객체 리스트 폼](<.github/assets/다중객체 인풋.gif>)
- 이미지 폼
  ![이미지 폼](<.github/assets/이미지 등록.gif>)

## 🙋‍♂️ 개발팀 & 역할 분담

| 김연우                                     | 최장혁                                     |
| ------------------------------------------ | ------------------------------------------ |
| [@Yeonu-Kim](https://github.com/Yeonu-Kim) | [@goranikin](https://github.com/goranikin) |

| 전체 구조 설정 및 인증/인가 구현
폼 예외처리 관리
회원가입 로그인 로직 관리
파일 업로드 및 다운로드 관리
회사 및 공고 생성 관리
VC 마이페이지 관리
랜딩페이지 스타일링 | 랜딩페이지 관리
공고 상세 페이지 관리
커피챗 생성 및 조회 페이지 관리
일반 유저 마이페이지 관리 |
