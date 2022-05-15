import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

import DeviceInfo from 'react-native-device-info'; 
import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";

const Routes = () => {
  console.log("Routes")
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [boolLoading, setLoading]  = useState(true);


  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    // setUser(null);

    console.log("[:::: test :::: 000]")
    if (user && user.memberTokenInfo.accessToken &&  user.memberTokenInfo.accessToken) {

      DeviceInfo.getMacAddress().then((mac) => {
        // "E5:12:D8:E5:69:97"

        const req = {
          query : `?memberUUID=${user.uuid}&macAddress=${mac}`,
          header: { 
            "Authorization": `Bearer ${user.memberTokenInfo.accessToken}`,
           } 
        }
          console.log("[:::: test :::: 001]")
          FutureInvestApi.checkValidDevice(req)
          .then(res => {
            console.log("[:::: test :::: 002]", res.data);
            var isValid = res.data
            var isDeviceLogout = !isValid
            if (res.data == true) {
              __apiGetIsConfirm();
            }

          })
      });

      
    } else {

    }


    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount    
  }, []);


//   fun isValidTokenOrLoin() {
//     val tokenInfo = localDBManager.getMyTokenInfo()
//     val myInfo = localDBManager.getMyInfo()
//     if (tokenInfo?.accessToken.isNullOrBlank() || myInfo == null || myInfo.name.isNullOrBlank()) {
//         isLogin.value = false
//     } else {
//         viewModelScope.launch(ioDispatchers) {
//             val isValid = futureInvestRepository.checkValidDevice()
//             isDeviceLogout = !isValid
//             if (isValid) {
//                 val isConfirm = futureInvestRepository.getIsConfirm()
//                 localDBManager.setMyConfirm(isConfirm)
//             }
//             launch(Dispatchers.Main) {
//                 isLogin.value = isValid
//             }
//         }
//     }
// }

  function __apiGetIsConfirm() {
    //__apiGetIsConfirm
    const req = {
      query : `?memberUUID=${user.uuid}` ,
      header: { 
        "Authorization": `Bearer ${user.memberTokenInfo.accessToken}`,
       } 
    }
    FutureInvestApi.getIsConfirm(req)
    .then(res => {
      console.log("FutureInvestApi.getIsConfirm ::: 01");
      console.log(res.data)
      if (res.status < 300) {
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');

    })
  }

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
      {/* <AuthStack /> */}
      {/* <AppStack /> */}
    </NavigationContainer>
  );
};

export default Routes;
