# **☀️ pick-fix-client**
<br>
약속을 정할때마다 오고가는 링크들이 번거롭고 귀찮지 않으셨나요?<br>
만나는 장소만 정해주면 평소 내가 가고 싶던 곳 뿐만 아니라 친구들이 가고싶었던 장소들까지 한 눈에 볼 수 있습니다. 링크 지옥에서 벗어날 수 있습니다! 🙂
<br>
<br>

# **🌱 동기**
이 어플은 평소 제가 지인들과 약속을 장소를 정하면서 오고 가는 수많은 링크들을 하나하나 클릭해서 봐야하는것도 귀찮고, 뭘 봤는지도 까먹게되는 불편함 때문에 편하게 장소들을 공유할 수는 없을까 라는 생각에서 시작되었습니다.
평소 제가 실사용하고 싶었던 서비스여서 더욱 더 사용자의 입장에서 생각해보며 작업한 프로젝트였습니다.
<br>
<br>

# **🗓 프로젝트 기간**
- **계획단계 2022.02.21 ~ 02.27**
  - 아이디어 및 기술스택 선정
  - mockup, schema 세팅
  - task 정리
  - git repository 생성 및 React Native 세팅
- **개발단계 2022.02.28 ~ 03.13**
    - 앱 어플리케이션 개발
    - 리팩토링 및 테스트코드 작성
<br>
<br>

# **🔨 기술 스택**
## **Front-end**
- React Native
- Recoil
    - user의 정보와 user들이 저장한 정보들을 전역으로 관리해주기 위해 상태관리 라이브러리가 필요했고, 이런 작은 규모의 앱의 상태들에 비해 보일러 플레이트가 많은 Redux는 너무 무겁다 생각이 되었습니다. 그래서 대안으로 찾은것이 Recoil인데, 우선 Recoil은 hook만 안다면 쉽게 접근할 수 있고 Atom이라는 작은 단위의 상태로 관리한다는 장점이 있습니다. 
- Expo
    - cli도 있지만 expo를 선택한 이유는 react-native를 처음 사용해보기에 적합한 툴이기도 하고, 배포가 쉽다는 장점때문에 선택을 했습니다. 또한 Google map API를 사용해야 하기 때문에 react-native-map 라이브러리를 사용하면 다른 라이브러리를 별도로 추가할 필요가 없기 때문에 선택했습니다.
- Firebase Google AUTH
    - 구글 로그인 인증 구현을 위해 선택했습니다.
- Axios
- Styled Component
<br>
<br>
## **Back**
- Node js
- MongoDB
- Express
<br>
<br>

## **Test**
- Jest
- Enzyme
- Supertest
- Mocha
- Chai
<br>
<Br>

# **📝 실행 방법**
## **Client**

```
npm install 
npm start
```
<br>

## **Server**
```
npm install
npm start // npm run dev (development 버전)
```

<br>
<br>
<br>

# **🔐 환경변수 설정 부분**

### **Client 폴더 최상단에 environment.js 파일을 생성한 후 아래의 정보를 넣어주세요**

```
    REACT_NATIVE_ANDROID_SERVER_URL: "YOUR_SERVER_URL",
    REACT_NATIVE_ANDROID_CLIENT_ID:
      "YOUR_ANDROID_CLIENT_ID",
    REACT_NATIVE_ANDROID_FIREBASE_API_KEY:
      "YOUR_FIREBASE_API_KEY,
    REACT_NATIVE_ANDROID_FIREBASE_AUTHDOMAIN: "YOUR_FIREBASE_AUTH_DOMAIN",
    REACT_NATIVE_ANDROID_FIREBASE_PROJECT_ID: "YOUR_FIREBASE_PROJECT_ID",
    REACT_NATIVE_ANDROID_FIREBASE_STORAGE_BUCKET: "YOUR_FIREBASE_STORAGE_BUCKET",
    REACT_NATIVE_ANDROID_FIREBASE_MESSAGING_SENDER_ID: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    REACT_NATIVE_ANDROID_FIREBASE_APP_ID:
      "YOUR_FIREBASE_APP_ID",
    REACT_NATIVE_ANDROID_MEASUREMENT_ID: "YOUR_ANDROID_MEASUREMENT_ID",
    REACT_NATIVE_ANDROID_GOOGLE_API_KEY:
      "YOUR_GOOGLE_MAP_API_KEY",
```
<br>

### **Server 폴더 최상단에 .env 파일을 생성한 후 아래의 정보를 넣어주세요**
```
DB=YOUR_MONGODB_URI
SECRET_KEY=YOUR_JWT_SECRET_KEY
FIREBASE_CLIENT_ID=YOUR_FIREBASE_CLIENT_ID
```
<br>
<br>

# **⚙️ 기능**

- **회원가입 및 로그인**
    - Firebasae AUTH를 통해, 소셜(구글)로그인이 가능합니다.
<br>
<br>

- **Plan list & detail**<br>
<img src="https://user-images.githubusercontent.com/83581529/159529306-a8eeb832-9be5-440a-8005-86627abb37cb.gif" width="180">
    - 로그인한 유저가 fix한 약속 list가 메인 페이지에 보여집니다.
    - 약속을 클릭하면 해당 약속의 상세 내역과 fix된 약속 장소가 marker로 표시됩니다.
<br>
<br>

- **My pick & New Pick**<br>
<img src="https://user-images.githubusercontent.com/83581529/159538096-de1910e1-6493-4355-b6bb-df1700b9555f.gif" width="180">
    - my pick을 클릭하면 유저가 저장해놓은 장소들이 marker로 표시됩니다.
    - marker는 밥집, 술집, 카페 총 3가지 타입에 따라 다른 이미지로 표시됩니다.
    - marker를 클릭하면 유저가 저장해놓은 정보들이 뜹니다.
    - new 버튼을 클릭하면 새로운 장소를 검색하고 정보를 입력하여 my pick에 저장할 수 있습니다.
<br>
<br>

- **Make a plan**<br>
    <img src="https://user-images.githubusercontent.com/83581529/159538846-6a733eae-6451-4d68-a4d4-5048e4dbc860.gif" width="180">
    - 약속 시간, 장소, 약속날 몇군데를 갈지 pick의 숫자를 정해주고, 해당 서비스에 가입되어 있는 친구의 메일을 입력하면 약속이 생성됩니다.
<br>
<br>

- **Vote**<br>
<img src="https://user-images.githubusercontent.com/83581529/159539584-48544fdc-49bd-4c3d-98b2-b0bbda7412f9.gif" width="180">
    - 생성된 약속은 vote list에 올라가고 list의 약속을 클릭하면, 해당 약속 장소 주변으로 친구들의 저장된 pick과 유저의 저장된 pick이 함꼐 보입니다.
    - marker를 클릭하고 pick을 클릭하면 투표 목록에 올라가게 됩니다.
    - 투표가 완료되면 vote 버튼을 클릭하고, 친구들이 투표가 완료될때까지 '투표가 진행중입니다'라는 메세지가 뜹니다.
<br>
<br>

- **Fix**<br>
<img src="https://user-images.githubusercontent.com/83581529/159540306-8279e8af-6888-4480-b6a5-84312e4a7b5a.gif" width="180">
    - 친구들도 투표가 완료되면 투표 결과를 볼 수 있고, 약속 생성자에게는 fix버튼이 생성됩니다.
    - fix버튼을 클릭하면 해당 약속은 plan list에 올라가고, 클릭시 해당 약속의 상세 내용을 볼 수 있습니다.

# **🤔 이슈 & 고민되었던 부분**
<br>
<br>

# **🔧 보완해야 하는 부분**


# **🎤 프로젝트를 마치고**

<br>
<br>
