import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditProfileImageAndNicknameScreen from '../screens/EditProfileImageAndNicknameScreen';
import EditProfileNotification from '../screens/EditProfileNotification';
// 

import styled from 'styled-components';
import { windowWidth, windowHeight, } from '../utils/Dimentions';
// import {AuthContext} from '../navigation/AuthProvider';
import {AuthContext} from './AuthProvider';

const MessageHeader = styled.Text`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  color : #ffffff;
  background-color: #fff;

  position: relative;
`;

const MessageIconLeftWrapper = styled.View`
  width: 33%;
  min-width: 33%;
  max-width: 33%;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: flex-start;
  min-height: 100%;
`;
const MessageCenterWrapper = styled.View`

width: 34%;
min-width: 34%;
max-width: 34%;

display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
min-height: 100%;
`;
const MessageIconRightWrapper = styled.View`

width: 33%;
min-width: 33%;
max-width: 33%;

display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
min-height: 100%;
`;



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="VIP 리딩"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#000',
          // fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => {

  const {
    user, setUser, 
    objectStore, setObjectStore,
    actionName,setActionName, 
    objectChatRoom1, setObjectChatRoom1,
    objectChattingRoomInfo, setObjectChattingRoomInfo,
} = useContext(AuthContext);

  return (
  <Stack.Navigator
  // screenOptions={{
  //   headerShown: false
  // }}
  >
    <Stack.Screen 
      name="VIP리딩" 
      component={MessagesScreen} 
      options={{headerShown: false, }}

   />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
        header: (props) => {
          return (
          <MessageHeader {...props} >

            {/* icon_chat_addfile0.png 
                icon_chat_back0.png 
                icon_chat_bell0.png 
                icon_chat_bell1.png 
                icon_chat_bot0.png 
                icon_chat_close0.png 
                icon_chat_enter0.png 
                icon_chat_more0.png 
                icon_chat_profile0.png 
                icon_chat_search0.png 
                icon_chat_searcharrow_down0.png 
                icon_chat_searcharrow_up0.png 
                */}

            <MessageIconLeftWrapper>
              <TouchableOpacity 
              onPress={()=> { 
                navigation.goBack();
              }}
              >
                <Image source={require('../assets/chat/icon_chat_back0.png')} resizeMode={'contain'} style={{ width: 24, height: 24, marginLeft: 20, marginTop: 40 }}></Image>
              </TouchableOpacity>
            </MessageIconLeftWrapper>
            <MessageCenterWrapper>
              <Text  style={{ width: "100%", height: 24,marginTop: 40, textAlign: 'center', color : "#303030",fontWeight: "bold", fontSize: 16  }}>
                {objectChattingRoomInfo && objectChattingRoomInfo.chattingRoomTitle && objectChattingRoomInfo.chattingRoomTitle }
              </Text>
            </MessageCenterWrapper>
            <MessageIconRightWrapper>
              <TouchableOpacity 
              onPress={()=> { 
                setObjectStore(
                  { type : 'search', code : 'search/chat'}
                );
              }}
              >
                <Image 
                  source={require('../assets/chat/icon_chat_search0.png')} 
                  resizeMode={'contain'}
                  style={{ width: 24, height: 24, marginRight: 20, marginTop: 40 }}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=> { 
                setObjectStore(
                  { type : 'popup', code : 'popup/chat/more'}
                );
              }}
              >
                <Image 
                  source={require('../assets/chat/icon_chat_more0.png')} 
                  resizeMode={'contain'}
                  style={{ width: 24, height: 24, marginRight: 20, marginTop: 40  }}
                ></Image>
              </TouchableOpacity>
            </MessageIconRightWrapper>
          </MessageHeader>
        )}
      })}
    />
  </Stack.Navigator>
)}

const ProfileStack = ({navigation}) => {

  const {
    user, setUser, 
    objectStore, setObjectStore,
    actionName, setActionName, 
    objectChatRoom1, setObjectChatRoom1
  } = useContext(AuthContext);

  return (

  <Stack.Navigator>
  <Stack.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      headerShown: false,
    }}
  />
  <Stack.Screen
    name="EditProfile"
    component={EditProfileScreen}
    options={{
      
      headerTitle: 'Edit Profile',
      header: (props) => {
        return (
        <MessageHeader {...props} >
          <MessageIconLeftWrapper>
            <TouchableOpacity 
            onPress={()=> { 
              // navigation.goBack()
              navigation.navigate('Profile')
            }}
            >
              <Image source={require('../assets/chat/icon_chat_back0.png')} resizeMode={'contain'} style={{ width: 24, height: 24, marginLeft: 20, marginTop: 40 }}></Image>
            </TouchableOpacity>
          </MessageIconLeftWrapper>
          <MessageCenterWrapper>
            <Text  style={{ width: "100%", height: 24,marginTop: 44, textAlign: 'center', color : "#303030",fontWeight: "bold", fontSize: 16  }}>
              내 정보 관리
            </Text>
          </MessageCenterWrapper>
        </MessageHeader>
      )}
    }}
  />

  <Stack.Screen
    name="EditProfileImageAndNicknameScreen"
    component={EditProfileImageAndNicknameScreen}
    options={{
      headerTitle: 'Edit Profile',
      header: (props) => {
        return (
        <MessageHeader {...props} >
          <MessageIconLeftWrapper>
            <TouchableOpacity 
            onPress={()=> { 
              // navigation.goBack()
                    navigation.navigate('Profile')
            }}
            >
              <Image source={require('../assets/chat/icon_chat_back0.png')} resizeMode={'contain'} style={{ width: 24, height: 24, marginLeft: 20, marginTop: 40 }}></Image>
            </TouchableOpacity>
          </MessageIconLeftWrapper>
          <MessageCenterWrapper>
            <Text  style={{ width: "100%", height: 24,marginTop: 44, textAlign: 'center', color : "#303030",fontWeight: "bold", fontSize: 16  }}>
              프로필 편집
            </Text>
          </MessageCenterWrapper>
          <MessageIconRightWrapper>
            <TouchableOpacity 
            onPress={()=> { 
              console.log("clicked")
              setActionName("action/nickname-change")
            }}
            >
              <Text style={{  marginRight: 20, marginTop: 40, color: "#274ef7"  }}>저장</Text>
            </TouchableOpacity>
          </MessageIconRightWrapper>
        </MessageHeader>
      )}
    }}></Stack.Screen>

  <Stack.Screen
    name="EditProfileNotification"
    component={EditProfileNotification}
    options={{
      headerTitle: '알림설정',
      header: (props) => {
        return (
        <MessageHeader {...props} >
          <MessageIconLeftWrapper>
            <TouchableOpacity 
            onPress={()=> { 
              // navigation.goBack()
                    navigation.navigate('Profile')
            }}
            >
              <Image source={require('../assets/chat/icon_chat_back0.png')} resizeMode={'contain'} style={{ width: 24, height: 24, marginLeft: 20, marginTop: 40 }}></Image>
            </TouchableOpacity>
          </MessageIconLeftWrapper>
          <MessageCenterWrapper>
            <Text  style={{ width: "100%", height: 24,marginTop: 44, textAlign: 'center', color : "#303030",fontWeight: "bold", fontSize: 16  }}>
              알림 설정
            </Text>
          </MessageCenterWrapper>
        </MessageHeader>
      )}
    }}></Stack.Screen>

</Stack.Navigator>
  )
}
const AppStack = () => {
  console.log("AppStack")
  
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };


  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#3c1e1e',
      }}
      defaultNavigationOptions={({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === '채팅') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            // Sometimes we want to add badges to some icons. 
            // You can check the implementation below.
            IconComponent = HomeIconWithBadge; 
          } else if (routeName === '마이페이지') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }
  
          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
      })
      }
      >
      {/* <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      /> */}
      <Tab.Screen
        name="채팅"
        component={MessageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            // <TouchableOpacity 
            //     onPress={()=> {navigation.navigate('Login')}}
            //     >
                <Image  style={{width: 28, height: 28}} source={
                  focused == true  ?
                  require('../assets/icon_chat1.png')
                  :
                  require('../assets/icon_chat0.png')
                  } resizeMode={'contain'}  />
            // </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="마이페이지"
        component={ProfileStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => {
            return (
            // <TouchableOpacity 
            //     // onPress={()=> {navigation.navigate('Login')}}
            //     >
                <Image  style={{width: 28, height: 28}} source={
                  focused == true ?
                  require('../assets/icon_mypage1.png')
                  :
                  require('../assets/icon_mypage0.png')
                  } resizeMode={'contain'}  />
            // </TouchableOpacity>
          )},
        })
      }
      />
    </Tab.Navigator>
  );
};

export default AppStack;
