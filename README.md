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
<br>

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
    - Firebase AUTH를 통해, 소셜(구글)로그인이 가능합니다.
<br>
<br>

- **Plan list & detail**<br>
<img src="https://user-images.githubusercontent.com/83581529/159529306-a8eeb832-9be5-440a-8005-86627abb37cb.gif" width="180">
    - 로그인한 유저가 fix한 약속 list가 메인 페이지에 보여집니다.<br>
    - 약속을 클릭하면 해당 약속의 상세 내역과 fix된 약속 장소가 marker로 표시됩니다.<br>
<br>
<br>

- **My pick & New Pick**<br>
<img src="https://user-images.githubusercontent.com/83581529/159538096-de1910e1-6493-4355-b6bb-df1700b9555f.gif" width="180">
    - my pick을 클릭하면 유저가 저장해놓은 장소들이 marker로 표시됩니다.<br>
    - marker는 밥집, 술집, 카페 총 3가지 타입에 따라 다른 이미지로 표시됩니다.<br>
    - marker를 클릭하면 유저가 저장해놓은 정보들이 뜹니다.<br>
    - new 버튼을 클릭하면 새로운 장소를 검색하고 정보를 입력하여 my pick에 저장할 수 있습니다.<br>
<br>
<br>

- **Make a plan**<br>
    <img src="https://user-images.githubusercontent.com/83581529/159538846-6a733eae-6451-4d68-a4d4-5048e4dbc860.gif" width="180">
    - 약속 시간, 장소, 약속날 몇군데를 갈지 pick의 숫자를 정해주고, 해당 서비스에 가입되어 있는 친구의 메일을 입력하면 약속이 생성됩니다.<br>
<br>
<br>

- **Vote**<br>
<img src="https://user-images.githubusercontent.com/83581529/159539584-48544fdc-49bd-4c3d-98b2-b0bbda7412f9.gif" width="180">
    - 생성된 약속은 vote list에 올라가고 list의 약속을 클릭하면, 해당 약속 장소 주변으로 친구들의 저장된 pick과 유저의 저장된 pick이 함꼐 보입니다.<br>
    - marker를 클릭하고 pick을 클릭하면 투표 목록에 올라가게 됩니다.<br>
    - 투표가 완료되면 vote 버튼을 클릭하고, 친구들이 투표가 완료될때까지 '투표가 진행중입니다'라는 메세지가 뜹니다.<br>
<br>
<br>

- **Fix**<br>
<img src="https://user-images.githubusercontent.com/83581529/159540306-8279e8af-6888-4480-b6a5-84312e4a7b5a.gif" width="180">
    - 친구들도 투표가 완료되면 투표 결과를 볼 수 있고, 약속 생성자에게는 fix버튼이 생성됩니다.<br>
    - fix버튼을 클릭하면 해당 약속은 plan list에 올라가고, 클릭시 해당 약속의 상세 내용을 볼 수 있습니다.<br>

# **🤔 이슈 & 고민되었던 부분**

## React native navigation의 스택구조
React native의 navigation은 React와는 달리 스택구조로 이루어져 있어서 화면 이동을 할 경우 그 스택 안에서만 가능하다는 특징이 있습니다.<br>
그래서 처음에 이 특징을 잘 이해하지 못하고 다른 스택에 있는 스크린으로 이동시키려고 하니 해당 스크린이 존재하지 않는다는 에러로 시간이 많이 지체되었던 경험이 있습니다.<br>
👉🏻 이 에러를 해결하기 위해 일단 React native의 navigation의 스택구조를 이해하고, 저는 drawer navigation을 사용했기 때문에 app.js의 root엔 그 stack이 들어가는것이 아니라 drawer navigation을 넣어주고, 그 drawer navigation에 해당 관련 스크린을 이동하는 순서대로 넣어준 그 스택을 넣어주었습니다.<br>
그리고 다른 스택의 스크린으로 이동해야 하는 경우 그 screen을 연결해주는것이 아니라 스택을 넣어주니 원하는대로 작동시킬 수 있었습니다.<br>
덧붙여 그 스크린으로 이동했을때 이전 기록들이 남아있는 오류가 있어서, 해당 스크린의 data들을 reset시키는 메서드를 사용하니 위 문제점을 해결할 수 있었습니다.
<br>

## Recoil의 비동기 useRecoilValueLoadable
처음 리코일을 선택했던 이유는 비교적 작은 프로젝트에 Redux의 보일러플레이트는 불필요하다 생각되었기 때문인데, 말고도 다른 선택이유 중 하나는 Recoil에 비동기 데이터를 처리할 수 있는 메서드가 내장되어 있다는점입니다.<br>
`useRecoilValueLoadable`이 그 메서드 인데, 이 메서드를 이용해 바로 서버와 통신할 수 있는데, 여기서 고민되었던 부분이 있었습니다.<br>
이 메서드는 통신뿐만이 아니라, 또 통신해서 받아온 data를 state에 저장을 시켜 불러와서 사용할 수 있기도 한데 그렇다면 이 로직은 state쪽에 위치를 해야 하는것인지 아니면 api쪽에 위치해야 하는것인지 고민이 되었습니다.<br>
👉🏻 이 부분은 이것이 맞는지는 모르지만 관심사 분리에 따라 selector는 state에 위치시키고 api uri만 분리시켜 보았습니다.<br>
그리고 이 메서드에서 또 고민이 되었던 부분은 `useRecoilValueLoadable`을 사용하여 받아온 data를 사용할 때 마다 서버로 불필요하게 통신이 되는 부분이 있었습니다. 이 메서드를 잘못 이해하고 사용한것 같은데, 이 부분을 다시 공부해보고  이 메서드를 적용할 것인지, 아니면 그냥 넘어갈것인지 고민이 많이 되었습니다.<br>
2주라는 짧은 시간동안 이 부분만 잡고 있을 수 없어 비동기메서드를 사용하지 않고 useEffect나 다른 방법들로 서버와 통신을 하였으나, React native 특성상 loading되는 부분을 잘 컨트롤해주어야 하기 때문에 추후 다시 loadable을 다시 공부해서 적용해보아야 할 것 같습니다.

# **🔧 앞으로 보완해야 하는 부분**
## **Recoil 비동기**
위에서 언급한것과 같이 `useRecoilValueLoadable`을 사용하고 있지 않아 loading이나 이런 부분들이 어색하게 작동하고 있어서 loadable을 사용하여 pending이나 error 부분들을 처리해줄 필요가 있어 보완이 필요합니다.
<br>

## **make a plan에서 키보드 대응**
현재 키보드가 올라오면 input창이나 picker들이 겹쳐지는 오류가 발생하고 있어서 보완이 필요합니다. <br>
`KeyboardAvoidingView`를 사용해봤으나, 해결되지 않아 다른 방법을 찾아 해결해야할 것 같습니다.<br>
<br>

## **AWS S3 에러 해결**
marker에 해당 가게의 정보를 등록할 때 이미지도 함께 저장하고 싶었는데 s3연결과 image를 가져오는것까지는 되었으나 에러가 생겨서 시간내 해결하지 못할것 같아 일단 뺴두었습니다<br>
에러를 해결하고 이 기능까지 보완하여 추가하고 싶습니다.
<br>
<br>

# **🎤 프로젝트를 마치고**
React native를 찾아보면 React를 아는 사람은 그래도 러닝커브가 높지 않다는 말들이 대부분이어서 그래도 3주안에 해볼만 하겠구나 생각하며 시작했지만, 생각보다 많은 차이점이 있었고, Emulator가 불안정하고 에러들도 어디서 생긴건지 알 수 없어서 이런 부분에서 시간을 많이 쓰게 되었습니다.<br>
하지만 처음 개발을 시작했던 7개월 전을 떠올려보면 개인적으로 정말 많이 성장함을 느낄 수 있었고, 앞으로도 새로운 기술이어도 이렇게 공부하면 해나갈 수 있겠구나, 앞으로 더 성장할 수 있겠구나라고 생각하게 해주는 계기가 되었습니다.<br>
그리고 팀프로젝트에서는 서로 소통하며 협업하는 것을 배웠다면, 개인프로젝트는 함께한 팀원들에게 배운 좋은 코드나 스킬들을 더 다지고 내것으로 만드는 방법을 배운것 같습니다.<br>
이렇게 짧은 시간내 불완전하지만 무언가를 완성하는 경험을 했으니, 이제는 이 프로젝트를 꼼꼼하게 뜯어보면서 공부하며 깊이있는 공부를 하고 싶습니다.<br>
<br>
<br>
