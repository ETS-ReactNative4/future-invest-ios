import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';


import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { windowWidth } from '../utils/Dimentions';

import DeviceInfo from 'react-native-device-info'; 

import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";



const EditProfileScreen = () => {
  const {user, logout, actionName,  setActionName} = useContext(AuthContext);

  const [boolCheck1, setBoolCheck1] = useState(false);
  const [boolCheck2, setBoolCheck2] = useState(false);

//   function __apiPutUpdateInfo(param1) {
//     // if (param1 == null || param1 === undefined || typeof param1 === "undefined" || param1 == "") {
//     //     return;
//     // }
//     // if (boolPossibleSubmit == true ) {
//     // } else {

//     //   return;
//     // }

//     DeviceInfo.getMacAddress().then((mac) => {
//       // "E5:12:D8:E5:69:97"
//       console.log(mac);
      
      

//     var sendObject = {
//       pwd:  textPassword,
//       type : "GENERAL",
//       name : textName,
//       nickname : textNickname,
//       phone : textPhone1 + textPhone2,
//       macAddress : mac,
//     }
//     var formData1 = new FormData()
    // formData1.append("memberUUID", user.uuid);

//     if (textPassword != "" && textPassword == confirmPassword) {
//       formData1.append("pwd", sendObject.pwd);
//     }
//     if (textName != "" && textNameError == "") {
//       formData1.append("name", sendObject.name);
//     }
//     if (textPhone2 != "" && textPhone1Error == "") {
//       formData1.append("phone", sendObject.phone);
//     }
//     const req = {
//       data : sendObject,
//       header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
//     }

//     FutureInvestApi.putChangeInfo(req)
//     .then(res => {
//       console.log("FutureInvestApi.signup")
//       console.log(res)
//       if (res.status < 300) {
//         alert("수정되었습니다.");
//         setUser(res.data)
        
//       }
//       return 
//     })
//     .catch(e=>{
//       // console.log('[CATCH]');
//       console.log(e && e.response);
//       alert("에러가 발생했습니다.")

//     })

//     })
//     ;
    

// }

  useEffect(()=> {

    setActionName("");
  }, [])

  return (
    <View style={styles.container}>
        {/* row */}
        <View style={styles.border1}></View>
        <View style={styles.row1}>
            <View style={styles.column1}>
                <Text style={styles.text1}>메시지 알림</Text>
                <Text style={styles.text2}>새로운 메시지가 오면 알려드려요.</Text>
            </View>
            <View style={styles.column2}>

              <TouchableOpacity 
                onPress={()=> { 
                    
                    setBoolCheck1(!boolCheck1)
                }}
              >
                <Image source={
                    boolCheck1 == true ?
                    require('../assets/profile/icon_profile_switch_on.png')
                    :
                    require('../assets/profile/icon_profile_switch_off.png')
                } 
                resizeMode={'contain'} 
                style={{ width: 38, height: 22,  }}
                ></Image>
              </TouchableOpacity>

            </View>
        </View>
        <View style={styles.border1}></View>
        <View style={styles.row1}>
            <View style={styles.column1}>
                <Text style={styles.text1}>답장 메시지 알림</Text>
                <Text style={styles.text2}>내 메시지에 답장이 달리면 채팅방 알림이 꺼져있어도 알림을 받을 수 있습니다.</Text>
            </View>
            <View style={styles.column2}>
              <TouchableOpacity 
                onPress={()=> { 
                    setBoolCheck2(!boolCheck2)
                }}
              >
                <Image source={
                    boolCheck2 == true ?
                    require('../assets/profile/icon_profile_switch_on.png')
                    :
                    require('../assets/profile/icon_profile_switch_off.png')
                } resizeMode={'contain'} style={{ width: 38, height: 22,  }}></Image>
              </TouchableOpacity>

            </View>
        </View>
        <View style={styles.border1}></View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row1 : {
    width: windowWidth,
    minHeight: 84, 
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  column1 : {
    width: windowWidth - 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },    
  column2 : {
    width: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },    
  text1 : {
    color : "#303030",
    marginLeft: 20,
  },
  text2 : {
    color : "#9b9b9b",
    marginLeft: 20,
  },
  border1 : {
      width: windowWidth,
      height: 1,
      backgroundColor: "#ebebeb",
  }
});
