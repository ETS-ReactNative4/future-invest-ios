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


    return (
      // <SafeAreaView>
        <Container>
        <SafeAreaView></SafeAreaView>
        <HeaderView>
          <HeaderViewLabel>VIP리딩</HeaderViewLabel>
        </HeaderView>
        {/* EMPTY VIEW */}
        {
          mode == 0 &&
          <>
          
          <Image style={{ width: 24, height: 24, marginBottom: 12,marginTop: 100 }} source={require('../assets/icon_chat0.png')} />
          <TouchableOpacity 
            onPress={()=> {
              setMode(1);
            }}>
            <EmptyLabel
            >현재 개설된 채팅방이 없습니다.</EmptyLabel>

            </TouchableOpacity>
          </>

        }
        {
          mode == 1 &&
          <>
          {/* LIST VIEW */}
          <FlatList 
          style={{ height:  windowHeight - 56 }}
            data={Messages}
            keyExtractor={item=>item.id}
            renderItem={({item}) => (
              <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                <UserInfo>
                  <UserImgWrapper>
                    <UserImg source={item.userImg} />
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>
                        {/* {item.userName} */}
                        Type {item.type}
                        </UserName>
                      {/* <PostTime>
                        {item.messageTime}
                        </PostTime> */}
                    </UserInfoText>
                    <MessageText>
                      {/* {item.messageText} */}
                      마지막 메시지가 표시됩니다. 마지막 ...
                      </MessageText>

                  </TextSection>
                  <TextNumber>
                    11
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
