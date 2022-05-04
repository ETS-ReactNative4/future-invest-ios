import React, {useContext,  useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Image, Modal, TouchableOpacity, Dimensions} from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import {AuthContext} from '../navigation/AuthProvider';
import moment from 'moment';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { FlatList } from 'react-native-gesture-handler';

const safeAreaHeight= Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();


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

const ChatScreen = () => {

  const {user, setUser, objectStore, setObjectStore} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [boolOpenSidebar, setBoolOpenSidebar] = useState(false);
  const [boolOpenToast, setBoolOpenToast] = useState(false);
  const [boolOpenBottomInfo, setBoolOpenBottomInfo] = useState(false);
  const [boolNotificationPossible, setBoolNotificationPossible] = useState(false);
  const [arrayUsers, setArrayUsers] = useState([
    {_id: 1, avatar: "https://placeimg.com/140/140/any", name: "한국매일증권"},
    {_id: 2, avatar: "https://placeimg.com/140/140/any", name: "상담관리자"},
    {_id: 3, avatar: "https://placeimg.com/140/140/any", name: "닉네임최대아홉자요"},
  ]);

  useEffect(() => {
    console.log("objectStore");
    console.log(objectStore);

    if (objectStore && objectStore.type && objectStore.type == "popup") {
      setBoolOpenSidebar(true);
    }

  },[objectStore]);


  useEffect(() => {
    if (boolOpenToast == "true") {
      // 몇초 뒤 종료/ Hide
    }

  },[boolOpenToast]);


  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `SK 바이오팜
        4Q21 Review : 어닝 서프라이즈, 연간 흑자 전환
        영업이익 1,344억 원(흑자 전환)으로 어닝 서프라이즈를 기록하며 2021년 사상 최대 실적 기록`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}
      containerStyle={{ width: 44, height: 29, border : 'none', backgroundColor: "#3c1e1e",  display: 'flex',alignItems: 'center', justifyContent: 'center', marginBottom: 6, marginRight: 10, borderRadius: 15}}
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
             {/* top HEADER */}
             <View style={[styles.sidebarTop1, ]}>
                <Text style={styles.sidebarTop1_Text1}>참여자 리스트</Text>
                <Text style={styles.sidebarTop1_Text2}>15</Text>
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
              arrayUsers && arrayUsers.map((arrayItem, arrayIndex)=> {
                return (

                <View style={styles.sidebar_UserItemRow1} key={`arrayIndex_` + arrayIndex}>
                <View style={styles.sidebar_UserItemRow1_ImageWrapper1}>
                  <Image style={styles.sidebar_UserItemRow1_Image0} 
                    // source={arrayItem.avatar} 
                    source={
                      require('../assets/chat/icon_chat_profile0.png')
                    }
                    resizeMode={"contain"}
                  ></Image>
                </View>
                {
                  arrayItem._id == 1 &&
                  <Text style={styles.sidebar_UserItemRow1_Text1}>나</Text>
                }
                <Text style={styles.sidebar_UserItemRow1_Text2}>{arrayItem.name}</Text>
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
