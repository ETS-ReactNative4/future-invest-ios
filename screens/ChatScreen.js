import React, {useContext,  useState, useEffect, useCallback, useRef, useLayoutEffect} from 'react';
import {AppState,Alert, View, ScrollView, Text, Button, StyleSheet, Image, Modal, TouchableOpacity, Dimensions} from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import {AuthContext} from '../navigation/AuthProvider';
import moment from 'moment';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getBottomSpace } from "react-native-iphone-x-helper";
import DeviceInfo from 'react-native-device-info'; 

import {WS_SERVER_URL} from "../api/index";
import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import StompWS from 'react-native-stomp-websocket';

const safeAreaHeight= Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();

/// https://reactnative.dev/docs/appstate
const ChatScreen = () => {
  const {
      user, setUser, 
      objectStore, setObjectStore,  
      actionName, setActionName , 
      objectChatRoom1, setObjectChatRoom1,
      objectChattingRoomInfo, setObjectChattingRoomInfo,
    } = useContext(AuthContext);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [messages, setMessages] = useState([]);
    const [boolOpenSidebar, setBoolOpenSidebar] = useState(false);
    const [boolOpenToast, setBoolOpenToast] = useState(false);
    const [boolOpenBottomInfo, setBoolOpenBottomInfo] = useState(false);
    const [boolNotificationPossible, setBoolNotificationPossible] = useState(false);
    const [arrayUsers, setArrayUsers] = useState([
      // {_id: 1, avatar: "https://placeimg.com/140/140/any", name: "한국매일증권"},
      // {_id: 2, avatar: "https://placeimg.com/140/140/any", name: "상담관리자"},
      // {_id: 3, avatar: "https://placeimg.com/140/140/any", name: "닉네임최대아홉자요"},
    ]);
    const ws = useRef(null);

    const [senderId, setSenderId] = useState("");
    const [receiverId, setReceiverId] = useState("")
    const [name, setName] = useState("")
    const [image_path, setImage_path] = useState("")
    
    useEffect(() => {
      console.log("ChatScreen objectStore", objectStore);
      console.log("ChatScreen objectChatRoom1", objectChatRoom1);
      if (objectStore && objectStore.type && objectStore.type == "popup") {
      setBoolOpenSidebar(true);
      }

    },[objectStore]);


    useEffect(() => {
      console.log("[test ::: ] initiateSocketConnection")
      console.log("[test ::: ] ChatScreen objectStore", objectStore);
      console.log("[test ::: ] ChatScreen objectChatRoom1", objectChatRoom1);
      var chattingRoomId = objectChatRoom1 ? objectChatRoom1 : '';
      console.log("[test ::: ] ChatScreen chattingRoomId", chattingRoomId);

      var memberUUID = user && user.uuid ? user.uuid : '';
      var  PUB_NEW_PRIVATE_MESSAGE = `/topic/chatting/pub/newMessage/private/${chattingRoomId}`
      var  PUB_NEW_PUBLIC_MESSAGE =  `/topic/chatting/pub/newMessage/public/${chattingRoomId}`
      var  PUB_DISCONNECT_CHATTING_ROOM = `/topic/chatting/pub/disconnect/${chattingRoomId}`
      var  SUB_NEW_MESSAGE = `/topic/chatting/sub/member/newMessage/${chattingRoomId}`
      var  SUB_NEW_MESSAGE_TO_ME = `/topic/chatting/sub/member/newMessage/${chattingRoomId}/${memberUUID}`
      var  SUB_REMOVE_MESSAGE = `/topic/chatting/sub/removeMessage/${chattingRoomId}`
      var  SUB_NEW_MEMBERS = `/topic/chatting/sub/admin/newMembers/${chattingRoomId}`
      var  SUB_NEW_INFORM =  `/topic/chatting/sub/newInform/${chattingRoomId}`
      
      // https://developer.mozilla.org/ko/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
      ws.current = new WebSocket("ws://3.38.20.168:8080/websocket/invest")
      // enter your websocket url
      ws.current.onopen = () => {
        console.log("[test ::: ] connection establish open")
        ws.current.send(JSON.stringify({ topic: "subscribe", to: `${PUB_NEW_PRIVATE_MESSAGE}`}))
        ws.current.send(JSON.stringify({ topic: "subscribe", to: `${PUB_NEW_PUBLIC_MESSAGE}`}))
        ws.current.send(JSON.stringify({ topic: "subscribe", to: `${PUB_DISCONNECT_CHATTING_ROOM}`}))
        ws.current.send(JSON.stringify({ topic: "subscribe", to: `${SUB_NEW_MESSAGE}`}))
        ws.current.send(JSON.stringify({ topic: "subscribe", to: `${SUB_NEW_MESSAGE_TO_ME}`}))
        ws.current.send(JSON.stringify({ topic: "subscribe", to: `${SUB_REMOVE_MESSAGE}`}))
        ws.current.send(JSON.stringify({ topic: "subscribe", to: `${SUB_NEW_MEMBERS}`}))
        ws.current.send(JSON.stringify({ topic: "subscribe", to: `${SUB_NEW_INFORM}`}))

      };
      ws.current.onclose = () => {
        console.log("connection establish closed");
      }
      return () => {
        ws.current.close();
      };
    }, [])
  
    useEffect(() => {
      const receiverId = user && user.uuid ? user.uuid : ''
      const senderId = user && user.uuid ? user.uuid : ''
      const name = user && user.name ? user.name : '';
      setMessages([
        {
          _id: receiverId,// receiver id
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: senderId,  // sender id
            name: name,
            avatar: image_path,
          },
        },
      ])
    }, [])
  
    useEffect(() => {
      ws.current.onmessage = e => {
        const response = JSON.parse(e.data);
        console.log("onmessage=>", JSON.stringify(response));
        Alert.alert(JSON.stringify(response))
        // parse data
        // const json = JSON.parse(event.data);
        // try {
        //   if ((json.event = "data")) {
        //     setBids(json.data.bids.slice(0, 5));
        //   }
        // } catch (err) {
        //   console.log(err);
        // }
        
        var sentMessages = {
          _id: response.receiverId,
          text: response.message,
          createdAt: new Date(response.createdAt * 1000),
          user: {
            _id: response.senderId,
            name: name,
            avatar: image_path,
          },
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, sentMessages))
      };
    }, []);
  
    const onSend = useCallback((messages = []) => {

      var chattingRoomId = objectChatRoom1 ? objectChatRoom1 : '';
      console.log("[test ::: ] ChatScreen chattingRoomId", chattingRoomId);

      var memberUUID = user && user.uuid ? user.uuid : '';
      var  PUB_NEW_PRIVATE_MESSAGE = `/topic/chatting/pub/newMessage/private/${chattingRoomId}`
      var  PUB_NEW_PUBLIC_MESSAGE =  `/topic/chatting/pub/newMessage/public/${chattingRoomId}`
      var  PUB_DISCONNECT_CHATTING_ROOM = `/topic/chatting/pub/disconnect/${chattingRoomId}`
      var  SUB_NEW_MESSAGE = `/topic/chatting/sub/member/newMessage/${chattingRoomId}`
      var  SUB_NEW_MESSAGE_TO_ME = `/topic/chatting/sub/member/newMessage/${chattingRoomId}/${memberUUID}`
      var  SUB_REMOVE_MESSAGE = `/topic/chatting/sub/removeMessage/${chattingRoomId}`
      var  SUB_NEW_MEMBERS = `/topic/chatting/sub/admin/newMembers/${chattingRoomId}`
      var  SUB_NEW_INFORM =  `/topic/chatting/sub/newInform/${chattingRoomId}`

      let obj = {
        "senderId": senderId,
        "receiverId": receiverId,
        "message": messages[0].text,
        "action": SUB_NEW_MESSAGE,
      }
      ws.current.send(JSON.stringify(obj))
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


    useEffect(()=> {
    setActionName("");


    // TEST
    console.log("ChatScreen objectStore", objectStore);
    console.log("ChatScreen objectChatRoom1", objectChatRoom1);
    // PROD
    // wsSubscribe();
    // return () => wsDisconnect();
    // console.log("objectChatRoom1.chattingRoomId", objectChatRoom1.chattingRoomId)
    
    // __apiGetChattingRoomInitData(objectChatRoom1);
    // __apiGetChattingMessages(objectChatRoom1);
  }, [])



  useEffect(() => {
    if (boolOpenToast == "true") {
      // 몇초 뒤 종료/ Hide
    }
  },[boolOpenToast]);



  function __apiGetChattingRooms(param1) {
    console.log("__apiGetChattingRooms - 0")
    const req = {
      query: `?chattingRoomId=${param1}&memberUUID=${user.uuid}`,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
    }
    FutureInvestApi.getChattingRoomInitData(req)
    .then(res => {
      // console.log("__apiGetChattingRooms - 1")
      // console.log(res)
      if (res.status < 300) {
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');

    })
  }

  function __apiGetChattingRoomInitData(param1) {
    console.log("__apiGetChattingRooms - 0", param1)
    console.log("--> ", `?chattingRoomId=${param1}&memberUUID=${user.uuid}`)
    const req = {
      query: `?chattingRoomId=${param1}&memberUUID=${user.uuid}`,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
    }
    FutureInvestApi
    .getChattingRoomInitData(req)
    .then(res => {

      if (res.status < 300) {
        console.log("__apiGetChattingRoomInitData - 2")
        // console.log(res.data)
        setObjectChattingRoomInfo(res.data);
        // setMessages(res.data.chattingRoomMessages)

      }
    })
    .catch(e=>{
        console.log('[CATCH]');
        console.log("getChattingMessages - 1")
        console.log(e)

    })
  }



  function __apiGetChattingMessages(param1) {
    console.log("__apiGetChattingRooms - 0", param1)
    console.log("--> ", `?chattingRoomId=${param1}&memberUUID=${user.uuid}`)
    const req = {
      query: `?chattingRoomId=${param1}&memberUUID=${user.uuid}`,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
    }
    FutureInvestApi.getChattingMessages(req)
    .then(res => {
      console.log("getChattingMessages - 1")
      console.log(res)

      if (res.status < 300) {
      }
    })
    .catch(e=>{
        console.log('[CATCH]');
        console.log("getChattingMessages - 1")
        console.log(e)

    })
  }


function __apiPutUpdateChattingRoomNotification(param1) {
  console.log("__apiPutUpdateChattingRoomNotification - 0")
  
  // @Body body: ChattingRoomNotificationResponseDTO,
  
  // val chattingRoomId: Long,
  // val memberUUID:String,
  // val isReceive: Boolean
  // @Header("Authorization") authorization: String
  const req = {
    query: `?chattingRoomId=${param1}&memberUUID=${user.uuid}`,
    header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
  }
  FutureInvestApi.putChangeAlarmStatus(req)
  .then(res => {
    console.log("putChangeAlarmStatus - 1")
    console.log(res)
    if (res.status < 300) {
    }
  })
  .catch(e=>{
      // console.log('[CATCH]');

  })
}



  function __apiGetChattingMessagesByKeyword(param1,param2, lastMessageCreatedDate) {
    console.log("__apiGetChattingRooms - 0")
    const req = {
      query: `?chattingRoomId=${param1}&keyword=${param2}&lastMessageCreatedDate=${lastMessageCreatedDate}&memberUUID=${user.uuid}`,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
    }
    FutureInvestApi.getChattingMessagesByKeyword(req)
    .then(res => {
      console.log("getChattingMessagesByKeyword - 1")
      console.log(res)
      if (res.status < 300) {
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');

    })
  }


  function __apiPOSTReportMessage(param1,param2, lastMessageCreatedDate) {
    console.log("__apiGetChattingRooms - 0")
    const req = {
      // @Body dto: ReportMessageRequestDTO,

      // val memberUUID: String,
      // val messageId: String,
      // val reportType: ReportType

      // @Header("Authorization") authorization: String

      query: `?chattingRoomId=${param1}&keyword=${param2}&lastMessageCreatedDate=${lastMessageCreatedDate}&memberUUID=${user.uuid}`,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
    }
    FutureInvestApi.postReportMessage(req)
    .then(res => {
      console.log("postReportMessage - 1")
      console.log(res)
      if (res.status < 300) {
        console.log(res.data)
        
        setArrayPageItems(res.data);
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
        
    })
  }

  function __apiPOSTSendNewFileMessage(param1,param2, lastMessageCreatedDate) {
    console.log("__apiGetChattingRooms - 0")
    var formData1 = new FormData();
    // formData1.append("file", )
    // @Part file: MultipartBody.Part,
    const req = {

      // @Query("chattingRoomId") chattingRoomId: Long,
      // @Query("chattingRoomType") chattingRoomType: ChattingRoomType,
      // @Query("memberUUID") memberUUID: String,
      // @Query("sendMemberType") sendMemberType: MemberType,
      // @Query("replyMessageId") replyMessageId: String?,
      // @Query("targetMemberUUID") targetMemberUUID: String?,
      // @Query("imageWidth") width: Int?,
      // @Query("imageHeight") height: Int?,

      query: `?chattingRoomId=${param1}&keyword=${param2}&lastMessageCreatedDate=${lastMessageCreatedDate}&memberUUID=${user.uuid}`,
      data : formData1,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
    }
    FutureInvestApi.getChattingMessagesByKeyword(req)
    .then(res => {
      // console.log("__apiGetChattingRooms - 1")
      // console.log(res)
      if (res.status < 300) {
        console.log(res.data)
        setArrayPageItems(res.data);
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');

    })
  }


  useEffect(() => {
    setMessages([
      // {
      //   _id: 1,
      //   text: `SK 바이오팜
      //   4Q21 Review : 어닝 서프라이즈, 연간 흑자 전환
      //   영업이익 1,344억 원(흑자 전환)으로 어닝 서프라이즈를 기록하며 2021년 사상 최대 실적 기록`,
      //   createdAt: new Date(),
      //   user: {
      //     _id: 2,
      //     name: 'React Native',
      //     avatar: 'https://placeimg.com/140/140/any',
      //   },
      // },
      // {
      //   _id: 2,
      //   text: 'Hello world',
      //   createdAt: new Date(),
      //   user: {
      //     _id: 1,
      //     name: 'React Native',
      //     avatar: 'https://placeimg.com/140/140/any',
      //   },
      // },
      // {
      //   _id: 3,
      //   text: 'Hello world',
      //   createdAt: new Date(),
      //   user: {
      //     _id: 1,
      //     name: 'React Native',
      //     avatar: 'https://placeimg.com/140/140/any',
      //   },
      // },
    ]);
  }, []);


  const renderSend = (props) => {
    return (
      <Send {...props}
      containerStyle={{ width: 44, height: 29, border : 'none', backgroundColor: "#3c1e1e",  display: 'flex',alignItems: 'center', justifyContent: 'center', marginBottom: 6, marginRight: 10, borderRadius: 15}}
      onSend={()=> {
        console.log("props", props.text)
        // SendMessageDTO
    // val sendMessageId: String?,
    // val sendMemberUUID: String,
    // val sendMemberType: MemberType?,
    // val content: String?,
    // val messageType: MessageType,
    // val replyMessageId: String?,
    // val replyMessageContent: String?,
    // var targetMemberUUID: String?,
    // val fileMetaData: MessageFileMetaDataDTO? = null


    // null,
    // vm.myInfo?.uuid!!,
    // MemberType.GENERAL,
    // content,
    // messageType = if (vm.replyMessageId.value == null) GENERAL else REPLY,
    // vm.replyMessageId.value,
    // vm.replyMessageContent.value,
    // vm.replyMessageCreatedMemberUUID.value


        var chattingRoomId = objectChatRoom1 ? objectChatRoom1 : '';
        console.log("[test ::: ] ChatScreen chattingRoomId", chattingRoomId);

        var memberUUID = user && user.uuid ? user.uuid : '';
        var  PUB_NEW_PRIVATE_MESSAGE = `/topic/chatting/pub/newMessage/private/${chattingRoomId}`
        var  PUB_NEW_PUBLIC_MESSAGE =  `/topic/chatting/pub/newMessage/public/${chattingRoomId}`
        var  PUB_DISCONNECT_CHATTING_ROOM = `/topic/chatting/pub/disconnect/${chattingRoomId}`
        var  SUB_NEW_MESSAGE = `/topic/chatting/sub/member/newMessage/${chattingRoomId}`
        var  SUB_NEW_MESSAGE_TO_ME = `/topic/chatting/sub/member/newMessage/${chattingRoomId}/${memberUUID}`
        var  SUB_REMOVE_MESSAGE = `/topic/chatting/sub/removeMessage/${chattingRoomId}`
        var  SUB_NEW_MEMBERS = `/topic/chatting/sub/admin/newMembers/${chattingRoomId}`
        var  SUB_NEW_INFORM =  `/topic/chatting/sub/newInform/${chattingRoomId}`
        
        const data = JSON.stringify({sendMessageId : '', sendMemberUUID : user.uuid, sendMemberType :'GENERAL', content : props.text , messageType : 'GENERAL', replyMessageId : '', replyMessageContent : '',  targetMemberUUID : '' });
        ws.current.send(JSON.stringify({topic : PUB_NEW_PUBLIC_MESSAGE, data : data}))
        // ws.current.send(JSON.stringify({topic : PUB_NEW_PRIVATE_MESSAGE, data : data}))
      }}
      >
        <View style={{ border : 'none', display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
          <View style={{ border : 'none', display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ color: "#fff", fontWeight: "700", display: 'flex',alignItems: 'center', justifyContent: 'center'}}>전송</Text>
          </View>
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  }

  const renderAvatar = (props) => {
    return (<></>)
  }

// https://stackoverflow.com/questions/67821703/how-to-display-chat-messages-on-left-and-right-in-react-native-gifted-chat
  const renderBubble = (props) => {
    // "currentMessage": {"_id": 3, "createdAt": 2022-04-30T16:44:55.015Z, "text": "Hello world", "user": {"_id": 1, "avatar": "https://placeimg.com/140/140/any", "name": "React Native"}}, 
    return (
      <>
      {props.position === 'left' &&

      <View style={[styles.bubbleTotalContainer,{backgroundColor: "transparent"}]}>
        <View style={[styles.bubbleWrapper, styles.marginRightAuto]}>
          <TouchableOpacity 
            style={{ width: 35, height: 35, borderRadius: 17.5, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#aeaeae', marginRight: 8 }}
            onPress={()=> {
              setBoolOpenBottomInfo(true);
            }}
          >
            <Image source={`https://picsum.photos/200/300`} resizeMode={'cover'} style={{ width: "110%", height: "110%", }}></Image>
          </TouchableOpacity>
          <View style={[styles.bubble, styles.leftBubble, { backgroundColor: "#f6f6f6", color: "#303030"}]}>
            <Text>{props.currentMessage.text}</Text>
            {/* <Text>{moment(props.currentMessage.createdAt).fromNow()}</Text> */}
          </View>
          <Text style={[styles.bubbleDateLabel, { marginLeft: 5 }]}>{moment("2022-04-30T16:44:55.015Z").format("HH:mm")}</Text>
        </View>
        </View>
      }
      {props.position === 'right' &&
        <View style={[styles.bubbleTotalContainer, styles.marginLeftAuto, {backgroundColor: "transparent"}]}>
          <View style={[styles.bubbleWrapper, styles.marginLeftAuto, ]}>
            <Text style={[styles.bubbleDateLabel,styles.marginLeftAuto, { marginRight: 5 }]}>{moment("2022-04-30T16:44:55.015Z").format("HH:mm")}</Text>
            <View style={[styles.bubble, styles.rightBubble, { backgroundColor: "#fceb39", color: "#303030"}]}>
              <Text>{props.currentMessage.text}</Text>
            </View>
            {/* <View style={{ width: 35, height: 35, borderRadius: 17.5, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: '#aeaeae', marginLeft: 8  }}>
              <Image source={`https://picsum.photos/200/300`} resizeMode={'cover'} style={{ width: "110%", height: "110%", }}></Image>
            </View> */}
          </View>
        </View>
      }
      </>
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const renderBottomUserInfo  = () => {
    return (
      
      <Modal 
      visible={boolOpenBottomInfo} 
      transparent={true} 
      onRequestClose={() => {
        setBoolOpenSidebar(false);
        setBoolOpenBottomInfo(false);
        setBoolOpenToast(false);
        setObjectStore(null);
      }} >

        <View
          style={[{ width : windowWidth, height: windowHeight, backgroundColor: "rgba(10,10,10,0.7)", alignItems: "center", justifyContent: "center"},]}
        >
          {/* outside click => terminate Popup */}
          <TouchableOpacity style={{width : windowWidth, height: windowHeight, backgroundColor : "transparent", zIndex: 1,position: 'absolute'}}
           onPress={()=> {
            setBoolOpenSidebar(false);
            setBoolOpenBottomInfo(false);
            setBoolOpenToast(false);
            setObjectStore(null);
          }}
          ></TouchableOpacity>
          {/* modal content */}
          <View style={[
              {  width : windowWidth , height: 239 ,
                 display: "flex", flexDirection: "column",
                 marginTop: "auto"
              },
              {  borderRadius: 8, shadowColor: '#000',  shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: '#F8F8F8', overflow: 'hidden' },
              { zIndex: 99, },
            ]}
           >
             <TouchableOpacity
                  onPress={()=> {
                    setBoolOpenSidebar(false);
                    setBoolOpenBottomInfo(false);
                    setBoolOpenToast(false);
                    setObjectStore(null);
                  }}
                >
                  <Image style={styles.bottomInfo_Image0} 
                    source={ require('../assets/chat/icon_chat_close0.png') } 
                  />
                </TouchableOpacity>

                <View style={styles.bottomInfo_ImageWrapper1}>

                  {/* <Image style={styles.bottomInfo_Image0} 
                    source={ require('../assets/chat/icon_star0.png') } 
                  /> */}
                  {/* <Image style={styles.bottomInfo_Image0} 
                    source={ require('../assets/chat/icon_star0.png') } 
                  /> */}
                </View>
                <Text style={styles.bottomInfo_Text1}>USERINFO</Text>
        
        
           </View>
        </View>
      </Modal>
    )
  }

  const renderBottomToast = () => {
    return (
      <Modal 
        visible={boolOpenToast} 
        transparent={true} 
        onRequestClose={() => {
          setBoolOpenSidebar(false);
          setBoolOpenBottomInfo(false);
          setBoolOpenToast(false);
          setObjectStore(null);
        }} 
      >
        <View
          style={[{ width : windowWidth, height: windowHeight, backgroundColor: "rgba(10,10,10,0.7)", alignItems: "center", justifyContent: "center"},]}
        >
          {/* modal content */}
          <View style={[
              {  width : windowWidth - 140 , minHeight: 35 ,
                 display: "flex", flexDirection: "column",
                 marginTop: "auto", 
                marginLeft: "auto", marginRight: "auto"
              },
              {  
                borderRadius: 20, shadowColor: '#000',  
                shadowOffset: {width: 0, height: 2}, 
                shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, 
                backgroundColor: '#303030', // 303030
                overflow: 'hidden' 
              },
              { zIndex: 99, },
            ]}
           >
                <Text style={styles.bottomInfo_Text1}>채팅방 알림이 설정되었습니다.</Text>
           </View>
          </View>
      </Modal>
    )
  }

  const renderSider = () => {
    return (
      <> 
      {
        objectStore != null &&
        objectStore.type && 
        objectStore.type == "popup" &&
        <Modal 
          visible={boolOpenSidebar} 
          transparent={true} 
          onRequestClose={() => {
            setBoolOpenSidebar(false);
            setBoolOpenBottomInfo(false);
            setBoolOpenToast(false);
            setObjectStore(null);
          }} >
        <View
          style={[{ width : windowWidth, height: windowHeight, backgroundColor: "rgba(10,10,10,0.7)", alignItems: "center", justifyContent: "center"},]}
        >
          {/* outside click => terminate Popup */}
          <TouchableOpacity style={{width : windowWidth, height: windowHeight, backgroundColor : "transparent", zIndex: 1,position: 'absolute'}}
           onPress={()=> {
            setBoolOpenSidebar(false);
            setBoolOpenBottomInfo(false);
            setBoolOpenToast(false);
            setObjectStore(null);
          }}
          ></TouchableOpacity>
          {/* sidebar */}
          <View style={[
              {  width : windowWidth - 100 , height: safeAreaHeight ,
                 alignItems: "flex-start", justifyContent: "flex-start", 
                 backgroundColor: "#F8F8F8", borderRadius : 40, 
                 overflow: 'hidden', position: 'relative', marginLeft: 'auto',
                 display: "flex", flexDirection: "column"
              },
              {  borderRadius: 8, shadowColor: '#000',  shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: '#F8F8F8', overflow: 'hidden' },
              { zIndex: 99, },
            ]}
           >

             <View style={[styles.sidebarTop1, ]}>
                <Text style={styles.sidebarTop1_Text1}>참여자 리스트</Text>


                <Text style={styles.sidebarTop1_Text2}>
                  {
                    objectChattingRoomInfo && 
                    objectChattingRoomInfo.chattingRoomMembers && 
                    objectChattingRoomInfo.chattingRoomMembers.length
                  }
                </Text>
                <TouchableOpacity
                  onPress={()=> {
                    setBoolNotificationPossible(!boolNotificationPossible)
                    // setBoolOpenSidebar(false);
                    // setBoolOpenToast(true);
                  }}
                >
                  <Image style={styles.sidebarTop1_Image1} 
                    source={
                    boolNotificationPossible == true ?
                    require('../assets/chat/icon_chat_bell0.png')
                    :
                    require('../assets/chat/icon_chat_bell1.png')
                  } 
                  />
                </TouchableOpacity>
             </View>
            {/*  */}
            <View style={styles.sidebar_UserItems_Container}>
              
            {
              objectChattingRoomInfo && 
              objectChattingRoomInfo.chattingRoomMembers && 
              objectChattingRoomInfo.chattingRoomMembers.map((arrayItem, arrayIndex)=> {

                // console.log("arrayItem", arrayItem)
                // {"memberImageUrl": null, "memberLastAccessDate": null, "memberName": "asd", "memberNickname": "test2", "memberType": "GENERAL", "memberUUID": "dffb3741-27"}
                return (

                <View style={styles.sidebar_UserItemRow1} key={`arrayIndex_` + arrayIndex}>
                <View style={styles.sidebar_UserItemRow1_ImageWrapper1}>
                  <Image style={styles.sidebar_UserItemRow1_Image0} 
                    // source={arrayItem.avatar} 
                    source={
                      arrayItem.memberImageUrl ?
                      arrayItem.memberImageUrl :
                      require('../assets/chat/icon_chat_profile0.png')
                    }
                    resizeMode={"contain"}
                  ></Image>
                </View>
                {
                  arrayItem.memberUUID == user.uuid &&
                  <Text style={styles.sidebar_UserItemRow1_Text1}>나</Text>
                }
                <Text style={styles.sidebar_UserItemRow1_Text2}>
                  {arrayItem.memberNickname}
                </Text>
              </View>
                )
              })
            }
            </View>
          </View>
          </View>
        </Modal>
      }
      </>
    )
  }
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
  // {
  //   _id: 1,
  //   text: 'My message',
  //   createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  //   user: {
  //     _id: 2,
  //     name: 'React Native',
  //     avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //   },
  //   image: 'https://facebook.github.io/react/img/logo_og.png',
  //   // You can also add a video prop:
  //   video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //   // Mark the message as sent, using one tick
  //   sent: true,
  //   // Mark the message as received, using two tick
  //   received: true,
  //   // Mark the message as pending with a clock loader
  //   pending: true,
  //   // Any additional custom parameters are passed through
  // }

  return (
    <View style={{ flex: 1, }}>
      {renderSider()}
      {renderBottomToast()}
      {renderBottomUserInfo()}
      
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        alwaysShowSend
        // 입력란 (input)
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderInputToolbar={renderInputToolbar}
        // renderSystemMessage={}
        // renderUsernameOnMessage={}
        // renderTime={}
        // renderDay={}
        // renderChatEmpty={}
        // renderMessage={}
        // renderMessageText={}
        // renderMessageImage={}
        // renderMessageVideo={}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginLeftAuto: {
    marginLeft: 'auto'
  },
  marginRightAuto: {
    marginRight: 'auto'
  },
  bubbleTotalContainer : {
    width: "100%",
    position: 'relative',
  },
  bubbleWrapper : {
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 5, 
    marginBottom: 5, 
    width: "100%",
    maxWidth: windowWidth / 2,
  },
  bubble: {
    
    maxWidth: windowWidth / 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 15, 
    paddingRight: 15,
    fontSize: 14,  
  },
  leftBubble : {

    borderTopLeftRadius: 8,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rightBubble : {

    borderTopLeftRadius: 20,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bubbleDateLabel : {
    color: "#cccccc",
    fontSize: 10, 
  },
  inputToolbar: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#aeaeae',
    borderRadius: 25,
    backgroundColor: "#eaeaea"
}, 
sendIcon: {
  fontSize: 25,
  color: '#3A97F9'
},
sidebarTop1 : {
  
  display: "flex",
  flexDirection: "row",
  width: windowWidth - 100 - 53,
  height: 50,
  marginLeft: 33,
  marginRight: 20,
  marginTop: 20, 
  marginBottom: 30,
  
}, 
sidebarTop1_Text1 : {
  fontSize: 16,
  fontWeight: "700",
  
}, 
sidebarTop1_Text2 : {
  fontSize: 16,
  fontWeight: "700",
  color: "#cccccc",
  marginRight: 'auto',
  marginLeft: 15,
},
sidebarTop1_Image1: {
  width: 24,
  height: 24,
  objectFit: "contain",
  marginLeft: 'auto',
},
sidebar_UserItems_Container : {
  width: `100%`,
  height: `auto`,
  marginBottom: "auto",
},
sidebar_UserItemRow1 : {

  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: 64,
  minHeight: 64,
  marginTop: 0, 
  borderBottom: "1px solid #f5f5f5",
  alignItems: "center",
},
sidebar_UserItemRow1_ImageWrapper1 : {
  width: 45,
  height: 45,
  borderRadius: 22.5,
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  marginLeft: 33,
  marginRight: 20,
  backgroundColor: "#f4f6f9",
},
sidebar_UserItemRow1_Image0 : {
  width: 24,
  height: 24,
  objectFit: "contain",
  margin: "auto"
},
sidebar_UserItemRow1_Image1 : {
  width: "110%",
  height:  "110%",
  objectFit: "cover",
},
sidebar_UserItemRow1_Text1 : {
  marginRight: 8,
  color: "#fceb39",
},
sidebar_UserItemRow1_Text2 : {
  fontSize: 14,
  color: "#303030",
},
bottomInfo_Image0: {
  width: 24,
  height: 24,
  objectFit: "contain",
  marginLeft: 'auto',
  marginRight: 20,
  marginTop: 20,
},
bottomInfo_ImageWrapper1: {
  width: 96,
  height: 96,
  borderRadius: 48,
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  position: "relative",
  backgroundColor: "#274ef7",
  

  marginTop: 6,
  marginLeft: "auto",
  marginRight: "auto",
},

bottomInfo_Text1: {
  color: "#303030",
  marginTop: 10,
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: 18,
  fontWeight: "700"
},




});