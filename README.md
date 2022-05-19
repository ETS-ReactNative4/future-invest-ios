- 빌드 ERROR
react-native-vector-icons
https://frontmulti.tistory.com/126
1. Xcode 실행 후 프로젝트 선택합니다.
2. 탭 메뉴 중 'Build Phases'를 선택합니다.
3. 'Copy Bundle Resources' 항목에서 중복되는 리소스들을 제거합니다.

- xd / 디자인 링크
https://zpl.io/Am9GkzO

- 페이지 반영 
1. 스플래쉬
2. 1_1 로그인, 1_1 로그인 입력, 1_1 로그인 경고
3. 접근 권한 pop
4. 1_3_회원가입, 1_3_회원가입_입력(경고) (https://zpl.io/Q0A3dwm) , (https://zpl.io/GEk3RZE)
5. 2_1_채팅목록_채팅방없음 (https://zpl.io/jZLK7Gp) , 2_1_채팅목록 채팅방 있음 (https://zpl.io/5EkloWe)
6. 2_2_채팅화면_Type A(https://zpl.io/p1rq79o)
7. 2_2_채팅화면_메시지 입력(https://zpl.io/Dlk3oyO)
8. 2_3_채팅화면_01_검색입력 (https://zpl.io/dxmoYO7)
9. 2_3_채팅화면_02_검색결과 (https://zpl.io/9qk3zWy) 
10. 2_3_채팅화면_03_검색결과없음 (https://zpl.io/xmGWQPR)
11. 2_4_채팅화면_파일전송 (https://zpl.io/vMgXA47)
12. 2_5_채팅화면_01_공지 (https://zpl.io/Emk3xMg) 
13. 2_5_채팅화면_02_공지확인 (https://zpl.io/40kX9Wz) 
14. 2_6_채팅화면_01_답장기능 (https://zpl.io/KGk3QM6)
15. 2_7_채팅화면_02_답장입력 (https://zpl.io/Pqz3DkD)
16. 2_7_채팅화면_참여자리스트_01_알림설정 (https://zpl.io/8lk3RM4)
17. 2_7_채팅화면_참여자리스트_02_알림해제 (https://zpl.io/7wk3vM8)
18. 2_8_채팅화면_관리자프로필 (https://zpl.io/Mdk3jOJ)
19. 2_9_채팅화면_회원프로필 (https://zpl.io/g8qEOjZ)
20. 3_2_마이페이지 (https://zpl.io/jZLK7zp)
21. 3_2_마이페이지_회원인증 (https://zpl.io/5Eklo7e)
22. 3_3_마이페이지_프로필 편집 (https://zpl.io/p1rq75o)
23. 3_4_마이페이지_내정보관리 (https://zpl.io/GEk3RrW) 
24. 3_4_마이페이지_내정보관리(경고) (https://zpl.io/Dlk3oew)
25. 3_5_마이페이지_알림설정 (https://zpl.io/xmGWQEx)

# API 연결 프로세스

로그인 시 서버와 통신 프로세스
로그인 시도 (/login) -> 성공 시 기기 맥 주소 전송 (/member/updateLoginDevice) -> 완료 시 fcm 토큰 전송 (/token/fcmToken)

맥주소 전송 요청 시 기존에 접속해 있던 기기와 다를 경우 기존에 접속돼있던 기기에 fcm전송 
fcm 전송 데이터 json 구조
{
    "title": "title",
    "body": "body",
    "type": "FcmDataType",
    "obj": "object"
}
FcmDataType: 
 - FCM_NEW_MESSAGE_BY_CHATTING_ROOM_ID
  채팅방에 새로운 메세지 수신
  - obj
  {
       "chattingRoomId": "Long",
        "newMessage": {
              "content": "content(메세지 내용)",
              "createDate": Long(메세지 생성 time milis),
            "sendMemberUUID": "String"(작성 유저 UUID),
              "viewPushMessage": "boolean"(true-알림 생성, false-알림 생성하지않고 채팅방 안 읽은 메세지 개수만 카운팅)
    }
  }
 -  FCM_FORCE_LOGOUT
  다른 기기에서 로그인 되어 강제 로그아웃


# 
회원가입에서 500나오는건 basic token이 누락되어서의 이슈

Basic YWxiYW5vdGVfaWRfYmxhYzphbGJhbm90ZV9wd2RfMjAxMw==

/login post요청 시에만 basic Token을 Authorization header에 넣어 주시면 될거같습니다.

그 외 요청에는 Authentication에 Bearer [accessToken] 넣어주시면 됩니다.

/member/signup/checkOverlapId
/member/signup/checkOverlapNickname
/member/signup/checkOverlapPhone
/member/signup
/login
해당 요청에는 Basic Token 넣어주시면 될거같습니다.

## 아이디 alalal  비밀번호 121212 

# MessagesScreen => 채팅 목록(채팅방 목록)
# ChatScreen => 채팅 방 안의 메시지 목록

# API 확인 리스트 

- 1. 회원가입 확인 완료
- 2. 로그인 500 에러
error response (Basic YWxiYW5vdGVfaWRfYmxhYzphbGJhbm90ZV9wd2RfMjAxMw==)
{"config": {"adapter": [Function xhrAdapter], "data": "{\"id\":\"test1\",\"pwd\":\"dlatl123!\",\"macAddress\":\"02:00:00:00:00:00\",\"loginMemberType\":\"GENERAL\"}", "env": {"FormData": null}, "headers": {"Accept": "application/json, text/plain, */*", "Authorization": "Basic YWxiYW5vdGVfaWRfYmxhYzphbGJhbm90ZV9wd2RfMjAxMw==", "Content-Type": "application/json"}, "maxBodyLength": -1, "maxContentLength": -1, "method": "post", "timeout": 0, "transformRequest": [[Function transformRequest]], "transformResponse": [[Function transformResponse]], "transitional": {"clarifyTimeoutError": false, "forcedJSONParsing": true, "silentJSONParsing": true}, "url": "http://3.38.20.168:8080/login", "validateStatus": [Function validateStatus], "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN"}, "data": {"error": "Internal Server Error", "path": "/login", "status": 500, "timestamp": "2022-05-08T15:06:18.810+00:00"}, "headers": {"cache-control": "no-cache, no-store, max-age=0, must-revalidate", "connection": "close", "content-type": "application/json", "date": "Sun, 08 May 2022 15:06:18 GMT", "expires": "0", "pragma": "no-cache", "transfer-encoding": "Identity", "x-content-type-options": "nosniff", "x-xss-protection": "1; mode=block"}, "request": {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": false, "_headers": {"accept": "application/json, text/plain, */*", "authorization": "Basic YWxiYW5vdGVfaWRfYmxhYzphbGJhbm90ZV9wd2RfMjAxMw==", "content-type": "application/json"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {"cache-control": "no-cache, no-store, max-age=0, must-revalidate", "connection": "close", "content-type": "application/json", "date": "Sun, 08 May 2022 15:06:18 GMT", "expires": "0", "pragma": "no-cache", "transfer-encoding": "Identity", "x-content-type-options": "nosniff", "x-xss-protection": "1; mode=block"}, "_method": "POST", "_perfKey": "network_XMLHttpRequest_http://3.38.20.168:8080/login", "_performanceLogger": {"_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]}, "_requestId": null, "_response": "{\"timestamp\":\"2022-05-08T15:06:18.810+00:00\",\"status\":500,\"error\":\"Internal Server Error\",\"path\":\"/login\"}", "_responseType": "", "_sent": true, "_subscriptions": [], "_timedOut": false, "_trackingName": "unknown", "_url": "http://3.38.20.168:8080/login", "readyState": 4, "responseHeaders": {"Cache-Control": "no-cache, no-store, max-age=0, must-revalidate", "Connection": "close", "Content-Type": "application/json", "Date": "Sun, 08 May 2022 15:06:18 GMT", "Expires": "0", "Pragma": "no-cache", "Transfer-Encoding": "Identity", "X-Content-Type-Options": "nosniff", "X-XSS-Protection": "1; mode=block"}, "responseURL": "http://3.38.20.168:8080/login", "status": 500, "timeout": 0, "upload": {}, "withCredentials": true}, "status": 500, "statusText": undefined}

 (Basic ZnV0dXJlaW52ZXN0OmZ1dHVyZXBhc3N3b3Jk) -> 이걸로 하니 되어서 임시 처리 (response)

 - 3. /member/updateLoginDevice


##
npx react-native-clean-project
Need to install the following packages:
  react-native-clean-project
Ok to proceed? (y) y
Wipe iOS build folder? (Y/n) Y
Wipe iOS Pods folder? (Y/n) Y
Wipe system iOS Pods cache? (Y/n) Y
Wipe user iOS Pods cache? (Y/n) Y
Update pods? (Y/n) Y
Wipe android build folder? (Y/n) Y
Clean Android project? (Y/n) Y
Wipe node_modules folder? (Y/n) Y
Update brew? (Y/n) Y

// https://yannichoongs.tistory.com/192
// yannichoongs.tistory.com/195
// https://velog.io/@mementomori/React-Native-Chatting-구현
// https://blog.logrocket.com/build-chat-app-react-native-gifted-chat/
// https://stackoverflow.com/questions/61483269/highlight-the-search-text-in-flatlist-react-native
// https://medium.com/@decentpianist/react-native-chat-with-image-and-audio-c09054ca2204

// OBJECT SAMPLE
// export interface IMessage {
//   _id: string | number
//   text: string
//   createdAt: Date | number
//   user: User
//   image?: string
//   video?: string
//   audio?: string
//   system?: boolean
//   sent?: boolean
//   received?: boolean
//   pending?: boolean
//   quickReplies?: QuickReplies
// }


https://aboutreact.com/file-uploading-in-react-native/


The main thing that seems to have worked is to use the GUI to create a new AssetCatalog, then reference the images again. Not to be confused with using the current asset catalogue and uploading the images again. That didn' work for me.

Other things that I tried and am not sure if they helped are the following:

I moved the AssetCatalog.xcassets folder from its location under the Resources folder to a level up i.e. the root iOS PCL folder
In addition to the above, I changed the reference in the info.plists that reference this folder to reference the correct location i.e. I removed the directory "Resources" in front of the refrerence.
I removed the following lines in the info.plists:



## api 소통으로 이해 + 추가 소통 나눈 내용 (핵심)
로그인 정책은 단일기기 로그인
macAddress -> 로그인 유효성 체크 (splashView, android) -> splashViewModel 초기 로그인 체크

채팅목록 관련 api
1) GET 목록
2) 갱신 (새로운 메시지 왔을 때), push 오면 갱신

채팅방에 들어갔을때는 socket으로

~

https://stackoverflow.com/questions/69238297/how-can-i-attach-word-pdf-files-to-react-native-gifted-chat

https://chatkitty.com/blog/building-a-chat-app-with-react-native-and-gifted-chat-part-2

https://lifesaver.codes/answer/multiline-does-not-grow-textinput-until-several-characters-into-new-line-1727
r



# STOMP ERROR

https://stomp-js.github.io/guide/stompjs/rx-stomp/ng2-stompjs/pollyfils-for-stompjs-v5.html#in-react-native

 npm install text-encoding
 import * as encoding from 'text-encoding';


 
https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
https://ably.com/topic/websockets-react-native
https://velog.io/@ysung327/react-native웹소켓-적용하기
https://stackoverflow.com/questions/60152922/proper-way-of-using-react-hooks-websockets


It is known bug in react-native to support ios14 https://github.com/facebook/react-native/issues/29279

and fixed in react-native v0.63.2 https://github.com/facebook/react-native/issues/29237#issuecomment-666940070

Solution

Update react native using https://reactnative.dev/docs/upgrading.html
or

Use https://github.com/DylanVann/react-native-fast-image


https://developer.apple.com/forums/thread/92638

https://github.com/oblador/react-native-vector-icons/issues/1074



https://velog.io/@tlatldms/Socket-인증-with-API-Gateway-Refresh-JWT

https://websockets.readthedocs.io/en/latest/topics/authentication.html

https://driip.me/d24af1eb-c5bd-49a9-a9dc-18446274ace5
https://tjdans.tistory.com/25
https://stackoverflow.com/questions/37246446/sending-cookies-with-react-native-websockets/37251989#37251989
