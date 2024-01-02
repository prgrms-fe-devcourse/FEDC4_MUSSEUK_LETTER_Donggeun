## 📮 머-쓱레터

데브코스 내에서 익명/기명으로 편지를 보내는 SNS 서비스

[➡️ 서비스 이용하기](https://www.musseuk-letter.site/)  
[➡️ 노션 페이지 보러가기](https://prgrms.notion.site/SNS-9a454521e03748d8a6adb105778922b3)

## 기획 배경

![image](https://github.com/prgrms-fe-devcourse/FEDC4_MUSSEUK_LETTER_Donggeun/assets/50488780/fa7f76df-5bd3-4e92-b10c-aa758fc83e11)

피어리뷰를 진행하면서 전하지 못한 말들이 있어 아쉽지 않으셨나요? 또는 데브코스에 참여하는 교육생들에게 진실된 마음을 표현하지 못한 순간이 있지는 않으셨나요? 😄

머-쓱레터는 **익명/기명을 통해서 다른 교육생들에게 마음을 전달하기 위한 서비스**가 있다면 좋을 것 같다는 배경에 기획한 SNS 서비스입니다.

사용자는 다양한 머쓱이 테마를 선택해서 친구들에게 머쓱이를 꾸며달라고 공유할 수 있습니다.
머쓱이에게 장식스티커를 하나하나 붙이면서 평소에 하지 못했던 **응원과 피드백의 편지를 전송해 마음을 전달**해보세요📮

## 패키지

### yarn 설치 사전 작업

1. yarn이 활성화 되어 있지 않다면 터미널에서 corepack enable 명령어를 입력합니다. (최초 한번)
2. vscode에 ZipFS 익스텐션이 설치되어 있지 않다면 설치해야 합니다. (yarn berry가 패키지를 zip 파일로 관리하기 때문에, vscode에서 이 내용을 가져와서 쓰려면 익스텐션이 필요합니다.)

![image](https://github.com/prgrms-fe-devcourse/FEDC4_MUSSEUK_LETTER_Donggeun/assets/50488780/882a7850-2782-42b6-8ba5-cc37bc5ed079)

### VsCode 타입스크립트 버전 설정

1. 레포지토리 클론 후 프로젝트의 루트 폴더로 들어가서 터미널에 `yarn` 명령어를 입력합니다.
2. 타입스크립트 버전을 yarn sdk와 맞추기 위해 아무 .ts 파일이나 들어가서 `cmd + shift + p` 후에 `Select TypeScript Version` 를 입력 후 `Use Workspace Version` 을 선택합니다.

![image](https://github.com/prgrms-fe-devcourse/FEDC4_MUSSEUK_LETTER_Donggeun/assets/50488780/195f731d-b269-4e49-8301-a468ed0c94d0)

### 프론트엔드 개발 서버 실행 방법

1. 프론트엔드에서 사용할 `.env` 파일 내용을 `/packages/web/.env` 파일로 작성합니다.
2. `yarn web dev` 를 입력하면 개발 서버가 실행됩니다.
3. `yarn web build` 를 입력하면 프론트엔드 코드를 빌드합니다.

### 슬랙 서버 실행 방법

1. 슬랙 서버에서 사용할 `.env` 파일 내용을 `/packages/slack/.env` 파일로 작성합니다.
2. `yarn slack dev` 를 입력하면 개발 서버가 실행됩니다.
3. `yarn slack build` 를 입력하면 슬랙 서버 코드를 빌드합니다.
4. `yarn slack start` 를 입력하면 빌드한 코드로 서버를 실행합니다.

### 패키지 설치

루트 디렉토리의 package.json의 scripts로 이러한 내용을 적어두었습니다:

```
"common": "yarn workspace common",
"slack": "yarn workspace slack", // Express 앱
"web": "yarn workspace web", // React 앱
```

- React 앱에 대해서 axios를 설치: `yarn web add axios`
- React 앱에 대해서 axios를 제거: `yarn web remove axios`
- Express 앱에 대해서 dotenv를 설치: `yarn slack add dotenv`

## 기술 스택

<table>
  <tr>
    <td align="center">언어 및 라이브러리</td>
    <td>
      <a href="https://react.dev/">
        <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge"/>
      </a>
      &nbsp
      <a href="https://www.typescriptlang.org/">
        <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">패키지 및 빌드 환경</td>
    <td>
      <a href="https://yarnpkg.com/">
        <img src="https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=fff&style=for-the-badge"/>
      </a>
      &nbsp
      <a href="https://ko.vitejs.dev/guide/">
        <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">스타일링</td>
    <td>
      <a href="https://emotion.sh/docs/introduction/">
        <img src="https://img.shields.io/badge/emotion-DB7093?logo=styledcomponents&logoColor=fff&style=for-the-badge"/>
      </a>
      &nbsp
      <a href="https://chakra-ui.com/">
        <img src="https://img.shields.io/badge/Chakra%20UI-319795?logo=chakraui&logoColor=fff&style=for-the-badge"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">네트워크 및 서버 상태 관리</td>
    <td>
      <a href="https://axios-http.com/kr/docs/intro">
        <img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge"/>
      </a>
      &nbsp
      <a href="https://tanstack.com/query/latest">
        <img src="https://img.shields.io/badge/tanstack%20query-FF4154?logo=reactquery&logoColor=fff&style=for-the-badge"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">코드 포맷팅</td>
    <td>
      <a href="https://eslint.org/">
        <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge"/>
      </a>
      &nbsp
      <a href="https://prettier.io/">
        <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">폼 데이터 관리</td>
    <td>
      <a href="https://www.react-hook-form.com/">
        <img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff&style=for-the-badge"/>
      </a>
      &nbsp
      <a href="https://zod.dev/">
        <img src="https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=fff&style=for-the-badge"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">기타</td>
    <td>
      <a href="https://reactrouter.com/en/main">
        <img src="https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=for-the-badge"/>
      </a>
      &nbsp
      <a href="https://swiperjs.com/">
        <img src="https://img.shields.io/badge/Swiper-6332F6?logo=swiper&logoColor=fff&style=for-the-badge"/>
      </a>
    </td>
  </tr>
</table>

## 팀 소개

<table>
  <tr>
    <td align="center"><a href="https://github.com/from1to2"><img src="https://avatars.githubusercontent.com/from1to2" width="125px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/juyeon-park"><img src="https://avatars.githubusercontent.com/juyeon-park" width="125px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/howons"><img src="https://avatars.githubusercontent.com/howons" width="125px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/bbearcookie"><img src="https://avatars.githubusercontent.com/bbearcookie" width="125px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/Eosdia"><img src="https://avatars.githubusercontent.com/Eosdia" width="125px;" alt=""></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/from1to2"><b>남궁호수</b></a></td>
    <td align="center"><a href="https://github.com/juyeon-park"><b>박주연</b></a></td>
    <td align="center"><a href="https://github.com/howons"><b>신호원</b></a></td>
    <td align="center"><a href="https://github.com/bbearcookie"><b>이상훈</b></a></td>
    <td align="center"><a href="https://github.com/Eosdia"><b>우현지</b></a></td>
  </tr>
</table>
