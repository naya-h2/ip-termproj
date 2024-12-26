# MyBeautyPick 🎀

인터넷프로그래밍 및 응용(CSE4177) Term Project <Br>
by 20211550 안희원

## 5. 구동 환경

- 개발 IDE: `vscode`
- node.js: `v22.11.0`

<br>

<b>Backend 관련</b>

- Express.js: `v4.21.2`
- mongoose: `v8.9.2`

이외에 Backend 개발에 사용한 dotenv, cors 라이브러리 버전은 `/back/package.json` 확인 부탁드립니다.

<br>

<b>Frontend 관련</b>

- React & React-dom: `v18.3.1`

(✨ React 19버전에서 실행되지 않는 라이브러리가 있어 18버전인지 꼭 확인 부탁드립니다!)

이외에 Frontend 개발에 사용한 라이브러리들 버전은 `/front/package.json - dependencies 및 devDependencies` 확인 부탁드립니다.

<br>
<br>

## 6. 실행 방법 (로컬)

`6. 구동 url` 관련 설명입니다.

<br>

### 💄 Backend 서버 실행

1. `/back` 경로로 이동해 주세요.

2. .zip 파일에 첨부한 `.env` 파일을 `/back`에 추가해 주세요. 🌟

3. 아래 명령어로 필요한 패키지를 다운받아 주세요. (gitHub로 파일 다운 시 필수)

```shell
npm install
```

4. 아래 명령어로 서버를 실행시켜 주세요.

```shell
npm start
```

5. 아래 문구가 터미널에 뜨면 서버 실행 완료입니다.

```
db 연결이 완료되었습니다.
```

6. 아래 url에 접속하였을 때, 전체 data가 정상적으로 보이는 지를 통해 서버 상태를 확인하는 방법도 있습니다.

```
http://localhost:8000/cosmetic
```

<BR>
<br>

### 💄 Frontend 서버 실행

1. `/front` 경로로 이동해 주세요.

2. 아래 명령어를 통해 필요한 패키지를 다운받아 주세요. (gitHub로 파일 다운 시 필수)

```shell
npm install
```

3. 아래 명령어로 서버를 실행시켜 주세요.

```shell
npm start
```

4. 아래 URL을 통해 서비스를 이용할 수 있습니다.

```
http://localhost:3000/
```
