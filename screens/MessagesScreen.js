import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView,  View, Text, Button, StyleSheet, FlatList , Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
  TextNumber,
} from '../styles/MessageStyles';
import { windowHeight, windowWidth } from '../utils/Dimentions';

import DeviceInfo from 'react-native-device-info'; 
import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";
import {AuthContext} from '../navigation/AuthProvider';

const Messages = [
  {
    id: '1',
    type: "A",
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    type: "B",
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    type: "C",
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    type: "C",
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    type: "C",
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const HeaderView= styled.View`
  width: 100%;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid #f6f6f6;
`;
const HeaderViewLabel= styled.Text`

  width: ${windowWidth - 40}
  height: 56px;
  color: #303030;

  font-size: 20px;
  font-weight: 700;

`;

const EmptyLabel = styled.Text`

width: ${windowWidth - 40}
height: 56px;
color: #303030;

margin-left: auto;
margin-right: auto;
text-align: center;
color : #cccccc;
`;

const MessagesScreen = ({navigation}) => {
  const [mode, setMode] = useState(0);
  const [arrayPageItems, setArrayPageItems] = useState([]);
  const {user, setUser, login, googleLogin, fbLogin,  actionName,  setActionName,objectChatRoom1, setObjectChatRoom1, } = useContext(AuthContext);

  useEffect(()=> {
    __apiGetChattingRooms();
    setActionName("");
  },[])



  function __apiPOST1(param1) {
    // if (param1 == null || param1 === undefined || typeof param1 === "undefined" || param1 == "") {
    //     return;
    // }

    DeviceInfo.getMacAddress().then((mac) => {
      // "E5:12:D8:E5:69:97"
      console.log(mac);


    var sendObject = {
      id : id,
    }
    var formData1 = new FormData()
    formData1.append("id", sendObject.id);
    const req = {
      data : sendObject
    }

    FutureInvestApi.signup(req)
    .then(res => {
      console.log("FutureInvestApi.signup")
      console.log(res)
      if (res.status < 300) {
        
      }
      return 
    })
    .catch(e=>{
      // console.log('[CATCH]');
      console.log(e && e.response);
      alert("에러가 발생했습니다.")

    })

    })
    ;
    

}


function __apiCheckValidDevice() {
  //checkOverlapNickname

  DeviceInfo.getMacAddress().then((mac) => {
    // "E5:12:D8:E5:69:97"
    console.log(mac);

    const req = {
      query : `?memberUUID=${user.uuid}&macAddress=${mac}` 
    }
    FutureInvestApi.checkValidDevice(req)
    .then(res => {
      console.log("FutureInvestApi.__apiCheckOverlapNickname(req)");
      if (res.status < 300) {
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
  
    })
  });
}

function __apiGetIsConfirm() {
  //checkOverlapNickname
  const req = {
    query : `?memberUUID=${user.uuid}` 
  }
  FutureInvestApi.getIsConfirm(req)
  .then(res => {
    console.log("FutureInvestApi.__apiCheckOverlapNickname(req)");
    if (res.status < 300) {
    }
  })
  .catch(e=>{
      // console.log('[CATCH]');

  })
}

function __apiGetCheckOverlapId() {
  //checkOverlapNickname
  const req = {
    query : `?id=` ,
    header: { 'Authorization': "Basic ZnV0dXJlaW52ZXN0OmZ1dHVyZXBhc3N3b3Jk", } 
  }
  FutureInvestApi.getIsConfirm(req)
  .then(res => {
    console.log("FutureInvestApi.__apiCheckOverlapNickname(req)");
    if (res.status < 300) {
    }
  })
  .catch(e=>{
      // console.log('[CATCH]');

  })
}

function __apiGetChattingRooms() {
    console.log("__apiGetChattingRooms - 0")
    const req = {
      query: `?memberUUID=${user.uuid}`,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
    }
    FutureInvestApi.getChattingRooms(req)
    .then(res => {
      // console.log("__apiGetChattingRooms - 1")
      // console.log(res)
      if (res.status < 300) {
        console.log(res.data)
        
        // [
        //   {
        //     "chattingRoomId": 57,
        //     "chattingRoomImageUrl": null,
        //     "chattingRoomMemberCount": 0,
        //     "chattingRoomStatus": "ACTIVITY",
        //     "chattingRoomTitle": "ios_test_공개방",
        //     "chattingRoomType": "PUBLIC",
        //     "isReceiveNotification": true,
        //     "lastMessageContent": "",
        //     "lastMessageCreatedDate": null,
        //     "unreadMessageCount": 0
        //   },
        //   {
        //     "chattingRoomId": 58,
        //     "chattingRoomImageUrl": null,
        //     "chattingRoomMemberCount": 0,
        //     "chattingRoomStatus": "ACTIVITY",
        //     "chattingRoomTitle": "ios_test_비공개방",
        //     "chattingRoomType": "PRIVATE",
        //     "isReceiveNotification": true,
        //     "lastMessageContent": "",
        //     "lastMessageCreatedDate": null,
        //     "unreadMessageCount": 0
        //   }
        // ]
        setArrayPageItems(res.data);
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');

    })
  }


    return (
      // <SafeAreaView>
        <Container>
        <SafeAreaView></SafeAreaView>
        <HeaderView>
          <HeaderViewLabel>VIP리딩</HeaderViewLabel>
        </HeaderView>
        {/* EMPTY VIEW */}
        {
          arrayPageItems &&
          arrayPageItems.length == 0 &&
          <>
          
          <Image 
            style={{ width: 24, height: 24, marginBottom: 12,marginTop: 100 }} 
            source={require('../assets/icon_chat0.png')} />
          <TouchableOpacity 
            onPress={()=> {
              setMode(1);
            }}>
            <EmptyLabel>
              현재 개설된 채팅방이 없습니다.
            </EmptyLabel>

            </TouchableOpacity>
          </>

        }
        {
          arrayPageItems &&
          arrayPageItems.length > 0 &&
          <>
          {/* LIST VIEW */}
          <FlatList 
          style={{ height:  windowHeight - 56 }}
            data={
              // DEV
              //Messages
              // PROD
              arrayPageItems
            }
            keyExtractor={item=>item.id}
            renderItem={({item}) => (
              <Card onPress={() => {
                
        //     "chattingRoomId": 58,
        //     "chattingRoomImageUrl": null,
        //     "chattingRoomMemberCount": 0,
        //     "chattingRoomStatus": "ACTIVITY",
        //     "chattingRoomTitle": "ios_test_비공개방",
        //     "chattingRoomType": "PRIVATE",
        //     "isReceiveNotification": true,
        //     "lastMessageContent": "",
        //     "lastMessageCreatedDate": null,
        //     "unreadMessageCount": 0

                  setObjectChatRoom1(item.chattingRoomId)
                  navigation.navigate('Chat', {userName: item.userName})
                }}>
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg source={item.chattingRoomImageUrl} />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>
                        {/* {item.userName} */}
                        Type {item.chattingRoomType}
                        </UserName>
                      {/* <PostTime>
                        {item.messageTime}
                        </PostTime> */}
                    </UserInfoText>
                    <MessageText>
                      {item.lastMessageContent}
                      </MessageText>
                  </TextSection>
                  <TextNumber>
                    {item.unreadMessageCount}
                  </TextNumber>
                </UserInfo>
              </Card>
            )}
          />
          </>

        }
        
      </Container>
      // </SafeAreaView>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
