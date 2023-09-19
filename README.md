# 👩🏻‍💻 Search recommend serivce
#### 과제 소개
* `추천 검색어 기능`이 있는 병명 검색창 서비스입니다.
* 검색어 `캐싱 기능`을 구현하여 API 호출을 줄였습니다. 
* 원티드 프리온보딩 3주차 개인과제로 진행했습니다.
* 진행기간: 2023.09.05-2023.09.07

#### 기술 스택
* React, TypeScript, Styled-component, Axios

#### 배포링크 및 데모영상
* 배포 링크: https://search-recommend-serivce-zfyf.vercel.app/
* 데모 영상
  ![intro](https://github.com/Aroma-oh/search-recommend-serivce/assets/115550622/a168220d-b605-43b1-b6e6-66d4cb7db0e8)

#### 실행 방법
* 서버 실행
```
$ git clone git@github.com:walking-sunset/assignment-api.git
$ npm install
$ npm start
```
* 클라이언트  실행
```
$ git clone git@github.com:Aroma-oh/search-recommend-serivce.git
$ npm install
$ npm start
```

## 📑 구현 방안 소개
### `1. 로컬 캐싱 구현 방안`
* 목표: 캐싱 라이브러리(React-Query 등) 없이 API 호출별 로컬 캐싱을 구현
#### 1-1.왜 캐싱해야하는가 고민하기 
* 어떻게 캐싱할지 전에, 왜 캐싱을 해야하는가에 대해서 먼저 고민했습니다. 프로젝트 성격에 따라 주안점이 다를 것이라고 생각했기 때문입니다.
* 구현 목표인 "병명 검색" 서비스의 경우, 병명 특성상 자주 업데이트 되지 않는 정보를 캐싱할 것으로 예상되었습니다. 따라서 프레쉬한 데이터를 리패칭하기 위한 로직은 덜 중요해보였습니다.
* 따라서 **캐싱의 목적으로 API 호출을 최소화하여 네트워크 비용을 줄이는 것**으로 하였습니다.
#### 1-2. 어떻게 캐싱하지? 
#### 언제, 무엇을
* 캐싱의 동작은 "언제, 무엇을 캐싱"하고, "언제, 무엇을 제거"할건지로 좁힐 수 있다고 생각했습니다. 
* 캐싱의 목적 고민을 통해 리패칭 동작은 덜 중요한 것으로 결정하였기 때문에, **언제, 무엇을 캐싱할지**에 주안점을 두어 API 호출을 줄이는 전략에 대해 고민했습니다. 
#### 키워드를 전처리하자 
* API 호출을 줄이기 위한 방안으로 키워드를 전처리했습니다. 전처리된 키워드는 캐싱 키로써 관리됩니다. 
* 한글 인풋의 경우, 완전한 음절인 경우에만 캐싱하였습니다.
* 영어 또는 한글 인풋의 경우 디바운싱을 적용하여 캐싱했습니다. 
* 이 외의 문자를 입력한 경우에는 무시하여 다소 엄격하게 키워드를 업데이트 하였습니다.
#### 캐시 스토어에 저장하자
* 키워드가 업데이트되면 먼저 캐시 스토어를 조회합니다.
* 조회는 키워드 완전 매칭과 expire time 검사를 합니다. 만약, 키워드가 캐싱 키 값과 완전 매칭되고 만료되기 전이라면 API 호출 없이 데이터를 반환합니다.
* 만일 이 외의 경우라면 API 호출하고, 결과를 `{ 키워드 : {data: string[], expireTime:number} }` 구조로 캐시 스토어에 새로 저장합니다. 
#### 1-3. 어디에 캐싱하지?
* 브라우저 스토리지 디스크를 이용하여 탭을 닫아도 유지되는 indexedDB, cache storage와, 브라우저 종료시 사라지는 상태를 후보로 두고 고민을 했습니다.
* 후보 모두 인위적으로 메모리를 비워주어야 하기 때문에, 탭을 닫으면 모든 캐싱을 제거하는 상태로 관리를 선택했습니다.
* 캐시 스토어로써 사용되는 상태는 recoil atom을 이용했습니다. 
### `2. API 호출 횟수 최소화 전략`
* API 호출 횟수를 줄이는 전략으로 키워드 핸들링을 선택했습니다. 내용은 ["키워드를 전처리하자"](https://github.com/Aroma-oh/search-recommend-serivce#%ED%82%A4%EC%9B%8C%EB%93%9C%EB%A5%BC-%EC%A0%84%EC%B2%98%EB%A6%AC%ED%95%98%EC%9E%90)와 같으며, 관련 코드는 아래와 같습니다.
  https://github.com/Aroma-oh/search-recommend-serivce/blob/38b045f69280afcedf910f73895f0706985bcfae/src/hooks/useUpdateKeyword.ts#L12-L34
### `3. 키보드만으로 추천 검색어 이동 방안`
* 키보드 이벤트의 'ArrowUp', 'ArrowDown'를 이용하여 방향키로 추천 검색어를 선택하고, 'Enter' 키로 검색이 가능하도록 했습니다.
  https://github.com/Aroma-oh/search-recommend-serivce/blob/38b045f69280afcedf910f73895f0706985bcfae/src/hooks/useSelectList.ts#L3-L43

----
## 🎊 팀프로젝트 결과물[(바로가기)](https://github.com/wanted-pre-onboarding-12th-11/pre-onboarding-12th-3-11)
* 개인 과제를 종합하여 best practice를 찾아내는 팀 과제 링크입니다.
