 import React, {Component, useEffect} from 'react';
 import Providers from './navigation';
 import Icon from 'react-native-vector-icons/MaterialIcons'
 import * as encoding from 'text-encoding';
 
 import {
   TextInput,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Alert,
   DeviceEventEmitter,
   Platform,
 } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

import {fcmService} from './services/FCMService';
import {localNotificationService} from './services/LocalNotificationService';


// 파이어베이스 테스트/배포하고 이후
// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {};

//     if (Platform.OS == 'ios') {
//       console.log("[App.js]:constructor ================== 00 ")
//       PushNotificationIOS.addEventListener('register', this.onRegisteredIOS);
//       PushNotificationIOS.addEventListener(
//         'registrationError',
//         this.onRegistrationErrorIOS,
//       );
//       PushNotificationIOS.addEventListener('notification',()=> {});
//       PushNotificationIOS.addEventListener('localNotification',()=> {});

//       PushNotificationIOS.requestPermissions().then(
//         (data) => {
//           console.log('PushNotificationIOS.requestPermissions', data);
//         },
//         (data) => {
//           console.log('PushNotificationIOS.requestPermissions failed', data);
//         },
//       );
      
//       // PushNotificationIOS.removeEventListener('register');
//       // PushNotificationIOS.removeEventListener('registrationError');
//       // PushNotificationIOS.removeEventListener('notification');
//       // PushNotificationIOS.removeEventListener('localNotification');
//     } else {

//       // ANDROID CONSTRUcTOR
//       fcmService.registerAppWithFCM();
//       fcmService.register(onRegister, onNotification, onOpenNotification);
//       localNotificationService.configure(onOpenNotification);

//       function onRegister(token) {
//         console.log('[App] onRegister: ', token);
//         console.log("token", token)
//         storedata.registration_token = token;
//       }
//       function onNotification(notify) {
//         console.log('[App] onNotification: ', notify);
//         // const options = {
//         //   sound: 'default',
//         //   playSound: true,
//         // };
//         // localNotificationService.showNotification(
//         //   0,
//         //   notify.title,
//         //   notify.body,
//         //   notify,
//         //   options,
//         // ); 
//       }
//       function onOpenNotification(notify) {
//         // console.log('[App] onOpenNotification: ', notify);
//         // alert('' + notify.body);
//         // const options = {
//         //   sound: 'default',
//         //   playSound: true,
//         // };
//         // localNotificationService.showNotification(
//         //   0,
//         //   notify.title,
//         //   notify.body,
//         //   notify,
//         //   options,
//         // );
//       }

//       // return () => {
//       //   console.log('[App] unRegister');
//       //   fcmService.unRegister();
//       //   localNotificationService.unregister();
//       // };

//       // console.log("[App.js]:constructor ================== 01 ")
//       // this.notif = new NotifService(
//       //   this.onRegister.bind(this),
//       //   this.onNotif.bind(this),
//       // );

//       // console.log("messaging().getToken()")
//       // const fcmToken = await messaging().getToken();
//       // console.log(fcmToken)

//       // try {
//       //   const token = await messaging().getToken();
//       //   if (token) return token;
//       //   console.log("token")
//       //   console.log(token)
//       //   storedata.token = token
//       // } catch (error) {
//       //   console.log(error);
//       // }
//       // // 앱이 Foreground 인 상태에서 푸쉬알림을 받으려면,
//       // const unsubscribe = messaging().onMessage(async remoteMessage => {
//       //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//       // });
//       // // 4.2. 앱이 Background 이거나 꺼진 상태에서 푸쉬알림 받는 코드 작성
//       // // Register background handler
//       // messaging().setBackgroundMessageHandler(async remoteMessage => {
//       //   console.log('Message handled in the background!', remoteMessage);
//       // });

//     }
//   }
  
//   onLocalNotificationIOS = (notification) => {
//    console.log("[onLocalNotificationIOS] ================= 00")
//    const isClicked = notification.getData().userInteraction === 1;

//   //  console.log(`FCM-onRemoteNotificationIOS: isClicked : ${notification}`)
//   //  const result = `
//   //    Title:  ${notification.getTitle()};\n
//   //    Subtitle:  ${notification.getSubtitle()};\n
//   //    Message: ${notification.getMessage()};\n
//   //    badge: ${notification.getBadgeCount()};\n
//   //    sound: ${notification.getSound()};\n
//   //    category: ${notification.getCategory()};\n
//   //    content-available: ${notification.getContentAvailable()};\n
//   //    Notification is clicked: ${String(isClicked)}.`;

//   //  if (notification.getTitle() == undefined) {
//   //    console.log(`Silent push notification Received: ${notification}`)
//   //    // Alert.alert('Silent push notification Received', result, [
//   //    //   {
//   //    //     text: 'Send local push',
//   //    //     onPress: sendLocalNotification,
//   //    //   },
//   //    // ]);
//   //  } else {
//   //    console.log(`Push Notification Received: ${notification}`)
//   //    // Alert.alert('Push Notification Received', result, [
//   //    //   {
//   //    //     text: 'Dismiss',
//   //    //     onPress: null,
//   //    //   },
//   //    // ]);
//   //  }
//  };

//   onRegisteredIOS  = (deviceToken) => {
//     console.log(`[onRegisteredIOS] deviceToken`, deviceToken);
//     const fcmServerKey = `AAAAlnnCERk:APA91bF5IQfvwatvLMKL6CcmUXQJljUBTiNNd2HLOCvadz_bx_4Wpoh6tMpcuKbozgeRRos08NL5czaHwZWiSg8sx6z6AQBf41DdXA-4HbE2smkMDSaCRLwApruZCPJcxsKO47cu-INl`
//     const req = {  
//       header : {
//         // FCM Key needed
//         // EXAMPLE : AAAAlnnCERk:APA91bF5IQfvwatvLMKL6CcmUXQJljUBTiNNd2HLOCvadz_bx_4Wpoh6tMpcuKbozgeRRos08NL5czaHwZWiSg8sx6z6AQBf41DdXA-4HbE2smkMDSaCRLwApruZCPJcxsKO47cu-INl
//         "Authorization": `key=${fcmServerKey}`,
//         "Content-Type" : "application/json"
//       },
//       data : 
//         {
//         "application": "com.collegenieai.ecafit",
//         "sandbox":true,
//         "apns_tokens":[`${deviceToken}`]
//       }
//     }

//     axios({ method: 'POST', url: `https://iid.googleapis.com/iid/v1:batchImport`, data: req.data, headers: req.header })
//     .then(res => {
//         if (res.status < 300){
//           if (res.data && res.data.results && res.data.results[0] && res.data.results[0].registration_token) {
//             // console.log("_PushNotification - 4 res.data.results[0].registration_token")
//             // console.log(res.data.results[0].registration_token) // TODO => SAVE.
//             console.log("res.data.results[0].registration_token", res.data.results[0].registration_token)
//           }
//           this._storeRegistrationSaveToken(res.data.results[0].registration_token)
//           storedata.registration_token = res.data.results[0].registration_token;
//         } else {
//         }
//     })
//     .then(() => {
//     })
//     .catch(e=>{
//         console.log('[CATCH]');
//         console.log(e);
//     })
    
//   };


//   _getRegistrationSaveToken = () => {
//     AsyncStorage.getItem('registration_token').then((value) => {
//         if (value == null || value === undefined) {
//             storedata.registration_token = '';
//         } else {
//             storedata.registration_token = value;
//         }
//     })
//   }
//   _storeRegistrationSaveToken  = async (param) => {
//     storedata.registration_token = param
//     try {
//       await AsyncStorage.setItem(
//         'registration_token', param
//       );
//       this._getRegistrationSaveToken();
//     } catch (error) {
//       // Error saving data
//     }
//   };


//   onRegistrationErrorIOS = (error) => {
//     Alert.alert(
//       'Failed To Register For Remote Push',
//       `Error (${error.code}): ${error.message}`,
//       [
//         {
//           text: 'Dismiss',
//           onPress: null,
//         },
//       ],
//     );
//   };

//    onRemoteNotificationIOS = (notification) => {
//     console.log("[onRemoteNotificationIOS] ================= 00")
//     const isClicked = notification.getData().userInteraction === 1;

//     console.log(`FCM-onRemoteNotificationIOS: isClicked : ${notification}`)
//     console.log(notification)

//     PushNotification.localNotification({
//       title: notification.getTitle(),
//       message: notification.getMessage(), // (required)
//     });
//   };

//   onMessageReceived = (message) => {
//     console.log("[onMessageReceived] ================= 00")
//     PushNotification.localNotification({
//       title: message.title,
//       message: message.message, // (required)
//     });
//   }


//   componentDidMount =  () => {
//     console.log("[App.js]:componentDidMount - 0")
//     Icon.loadFont();
//     if (Platform.OS == 'ios') {
//       PushNotificationIOS.addEventListener('notification', this.onRemoteNotification);
//     } 
//   }
    
//   onLocalNotificationIOS = (notification) => {
//     console.log("[onLocalNotificationIOS] ================= 00")
//     const isClicked = notification.getData().userInteraction === 1;
//     // PushNotification.localNotification({
//     //   autoCancel: true,
//     //   bigText:
//     //     'This is local notification demo in React Native app. Only shown, when expanded.',
//     //   subText: 'Local Notification Demo',
//     //   title: 'Local Notification Title',
//     //   message: 'Expand me to see more',
//     //   vibrate: true,
//     //   vibration: 300,
//     //   playSound: true,
//     //   soundName: 'default',
//     //   actions: '["Yes", "No"]'
//     // })


//     PushNotification.localNotification({
//       title: message.title,
//       message: message.message, // (required)
//     });

//     // Alert.alert(
//     //   'Local Notification Received',
//     //   `Alert title:  ${notification.getTitle()},
//     //   Alert subtitle:  ${notification.getSubtitle()},
//     //   Alert message:  ${notification.getMessage()},
//     //   Badge: ${notification.getBadgeCount()},
//     //   Sound: ${notification.getSound()},
//     //   Thread Id:  ${notification.getThreadID()},
//     //   Action Id:  ${notification.getActionIdentifier()},
//     //   User Text:  ${notification.getUserText()},
//     //   Notification is clicked: ${String(isClicked)}.`,
//     //   [
//     //     {
//     //       text: 'Dismiss',
//     //       onPress: null,
//     //     },
//     //   ],
//     // );
//   };


//     // return unsubscribe;
//   getToken = async () => {
//     const oldToken = await messaging().getToken();
//     // oldToken과 서버의 token이 같다면
//     await messaging().deleteToken(String(`${oldToken}`), '*');
//     const newToken = await messaging().getToken();
//     if (oldToken === newToken) {
//        console.log('not refresh')
//     } else {
//       console.log('newToken')
//       console.log(newToken)
//       return newToken;
//     }
//   };

//   render() {
//     // console.log(PushNotification.token); //Don't working in emulator only in pysical device
//       return <Providers />;
//   }

//   // onRegister = (token) => {
//   //   console.log("[onRegister] ================= 00")
//   //   console.log("FCM:registerToken - token") 
//   //   console.log(token)
//   //   console.log("FCM:registerToken - token.token") 
//   //   console.log(token.token)
//   //   storedata.registration_token = token.token
//   //   // this.setState({registerToken: token.token, fcmRegistered: true});
//   // }

//   // onNotif(notif) {
//   //   Alert.alert(notif.title, notif.message);
//   // }

//   handlePerm(perms) {
//     console.log("[handlePerm] ================= 00")
//     console.log("FCM:handlePerm - perms")
//     console.log(perms)
//     Alert.alert('Permissions', JSON.stringify(perms));
//   }

// }


// 파이어베이스 테스트/배포 아닐때

const App = () => {
  Icon.loadFont();
  // console.log("App")
  
  return <Providers />;
}

export default App;
