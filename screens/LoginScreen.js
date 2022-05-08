import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Modal
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import DeviceInfo from 'react-native-device-info'; 

import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textErrorMessage, setTextErrorMessage] = useState("");
  const [boolAutoLogin, setBoolAutoLogin] = useState(false);
  const [boolPermissionPopup,setBoolPermissionPopup ] = useState(false);

  const {user, setUser, login, googleLogin, fbLogin} = useContext(AuthContext);


  function __apiPostLogin(param1) {

    // if (param1 == null || param1 === undefined || typeof param1 === "undefined" || param1 == "") {
    //     return;
    // }


    DeviceInfo.getMacAddress().then((mac) => {
      // "E5:12:D8:E5:69:97"

    var sendObject = {
        
        // var id: String,
        // var pwd: String,
        // var macAddress: String,
        // var loginMemberType: MemberType = MemberType.GENERAL
          // GENERAL, DUMMY, MANAGER, ANONYMOUS
        id : email,
        pwd:  password,
        macAddress : mac,
        loginMemberType : "GENERAL"
    }
    const req = { data : sendObject, header: { 'Authorization': "Basic ZnV0dXJlaW52ZXN0OmZ1dHVyZXBhc3N3b3Jk", } }
    FutureInvestApi.login(req)
    .then(res => {

      // console.log("FutureInvestApi.login - 0")
      // console.log(res)
      if (res.status < 300) {

        console.log("FutureInvestApi.login - 1")
        console.log(res.data)
        // TEMP
        // setBoolPermissionPopup(false)
        setUser(res.data)

        // LOGIN RESPONSE (res.data)
        // {
        //   "confirmed": false, 
        //   "id": "test1", 
        //   "imageUrl": null, 
        //   "memberTokenInfo": {"accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTY1MjEwOTE5MH0.pPK2PYw8xP_zogCMiMbmO3WwKTHigQ84PER5EZbYNC9mjstCuX9sVu78nfqx0lARe5nf4_udVE0OQ0CBkpws3w", "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTY1ODI0MzU5MH0.UHKdll2FvExR5pgrIwtZuccZ_Wgcizp8c7pvtoOhxd99REySkgJj1cUvBhm6VmvmvVfqmTQ50fLw2Bz6N39_FA"}, 
        //   "memberType": "GENERAL", 
        //   "messageNotificationReceive": true, 
        //   "name": "name11", 
        //   "nickname": "test1", 
        //   "phone": "01030913971", 
        //   "replyMessageNotificationReceive": true,
        //   "uuid": "c91fb122-64"
        // }
      } else {
        alert("회원정보를 확인해주세요!")
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
        // console.log(e && e.response);
        alert("회원정보를 확인해주세요.")

    })
    
    });

    

}

function __apiPostUpdateLoginDevice(param1) {

  var sendObject = {
        
    id : email,
  }
  const req = { data : sendObject, header: { 'Authorization': `Bearer ${param1}`, } }
  FutureInvestApi.updateLoginDevice(req)
  .then(res => {
    // console.log("FutureInvestApi.login - 0")
    // console.log(res)
    if (res.status < 300) {
      console.log("FutureInvestApi.login - 1")
      console.log(res.data)
      // TEMP
      // setBoolPermissionPopup(false)
      // setUser(res.data)
    } else {
      alert("회원정보를 확인해주세요!")
    }
  })
  .catch(e=>{
      // console.log('[CATCH]');
      // console.log(e && e.response);
      alert("회원정보를 확인해주세요.")

  })
}


function __apiPostUpdateFcmToken(param1) {

  var sendObject = {
        
    id : email,
}
const req = { data : sendObject, header: { 'Authorization': `Bearer ${param1}`, } }
FutureInvestApi.updateFcmToken(req)
.then(res => {

  // console.log("FutureInvestApi.login - 0")
  // console.log(res)
  if (res.status < 300) {

    console.log("FutureInvestApi.login - 1")
    console.log(res.data)
    // TEMP
    // setBoolPermissionPopup(false)
    // setUser(res.data)
  } else {
    alert("회원정보를 확인해주세요!")
  }
})
.catch(e=>{
    // console.log('[CATCH]');
    // console.log(e && e.response);
    alert("회원정보를 확인해주세요.")

})

}



  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        boolPermissionPopup && 
        <Modal 
          visible={boolPermissionPopup} 
          transparent={true} 
          onRequestClose={() => {
            setBoolPermissionPopup(false)
          }} >
            <TouchableOpacity
            style={{ position: 'absolute', width: windowWidth, height: windowHeight}}
              onPress={()=> {
                console.log("false")
                setBoolPermissionPopup(false)
              }}
            >
            </TouchableOpacity>
        <View style={[{ width : windowWidth, height: windowHeight, backgroundColor: "rgba(10,10,10,0.7)", alignItems: "center", justifyContent: "center"},]}>
          <View style={[
              {  width : windowWidth - 40, height: 364 , alignSelf: "center",  alignItems: "flex-start", justifyContent: "center", backgroundColor: "#F8F8F8", borderRadius : 40, overflow: 'hidden', position: 'relative' },
              {  borderRadius: 8, shadowColor: '#000',  shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: '#F8F8F8', overflow: 'hidden' },]}
            >
                  {/* icon_warning1 */}
                  <TouchableOpacity
                  style={styles.popupCloseIconImgWrapper}
                  onPress={()=> {
                    setBoolPermissionPopup(false)
                  }}
                  >
                  <Image style={styles.popupCloseIconImg} source={require('../assets/icon_black_top_close0.png')} />
                  </TouchableOpacity>
              <View style={{   width : windowWidth - 80, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',marginLeft: 'auto', marginRight: 'auto' }}>
                <Text  style={{  fontSize: 16,  color : "#303030", fontStyle: 'normal', fontWeight: 'bold', textAlign: 'left'}}>VIP 리딩 어플을 이용하려면{"\n"}아래의 권한을 허용해주세요.</Text>
              </View>
              <View style={{width : windowWidth - 40, height: 1, backgroundColor: '#f6f6f6', marginTop: 20, marginBottom: 20 }}></View>

              <View style={{width : windowWidth - 80, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 'auto', marginRight: 'auto' }}>
                <View style={{ width : 40, height: 40, borderRadius: 20, backgroundColor: `#f6f6f6`, display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'center'}}>
                  <Image style={styles.archiveIconImg} source={require('../assets/icon_archive0.png')} />
                </View>
                <View style={{width : windowWidth - 120 - 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 'auto', marginRight: 'auto' }}>
                  <Text  style={{  fontSize: 16,  color : "#303030", fontStyle: 'normal', fontWeight: 'bold', textAlign: 'left'}}>저장</Text>  
                  <Text  style={{  fontSize: 12,  color : "#9b9b9b", fontStyle: 'normal', fontWeight: 'bold', textAlign: 'left', marginTop: 10,}}>내 기기에서 사진 및 파일을 저장하고 전송하기 위하여 저장 접근 허용이 필요합니다.</Text>  
                </View>
              </View>

              <View style={{width : windowWidth - 40, height: 1, backgroundColor: '#f6f6f6', marginTop: 20, marginBottom: 20 }}></View>
              <View style={{width : windowWidth - 80, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 'auto', marginRight: 'auto' }}>
                <View style={{ width : 40, height: 40, borderRadius: 20, backgroundColor: `#f6f6f6`, display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'center'}}>
                  <Image style={styles.archiveIconImg} source={require('../assets/icon_warning1.png')} />
                </View>
                <View style={{width : windowWidth - 120 - 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 'auto', marginRight: 'auto' }}>
                  <Text  style={{  fontSize: 12,  color : "#9b9b9b", fontStyle: 'normal', fontWeight: '500', textAlign: 'left', marginTop: 10,}}>권한 허용 후 어플을 시작합니다.아래 허용하기를 눌러 권한을 허용해 주세요.</Text>  
                </View>
              </View>


              <TouchableOpacity style={{ width : (windowWidth - 80), height: 50, color : "#303030", backgroundColor: "#fceb39", borderRadius: 40, alignItems: "center", justifyContent: "center",  marginLeft: 'auto', marginRight: 'auto', marginTop: 20}} 
                onPress={()=> { 
                  // 
                  // 퍼미션 요청
                  // TEST
                  // setUser({id : 123, name: 123, })
                  // PROD
                  // __apiPostLogin();

                }}
              >
                <Text  style={{   color : "#303030",}}>허용하기</Text>
              </TouchableOpacity>    
    
          </View>
          </View>
        </Modal>

      }
      <Text style={styles.text1}>VIP 리딩</Text>
      <Text style={styles.text2}>Hello!</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="아이디를 입력해주세요."
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="비밀번호를 입력해주세요."
        iconType="lock"
        secureTextEntry={true}
      />
      {
        textErrorMessage != "" && 

        <Text style={styles.cautionButtonText}>
          <Image style={styles.cautionLoginIconImg} source={require('../assets/icon_warning0.png')} />
          아이디와 비밀번호가 일치하지 않습니다.
        </Text>
      }
      <TouchableOpacity
        style={styles.autoLoginRow}
        onPress={() =>{
          setBoolAutoLogin(!boolAutoLogin);
        }}>
          <View style={styles.autoLoginIconDiv}>
            {
              boolAutoLogin == true &&
              <Image style={styles.autoLoginIconImg} source={require('../assets/icon_checkbox0.png')} />
            }
          </View>

        <Text style={styles.navButtonText}>
          자동 로그인하기
        </Text>
      </TouchableOpacity>

      <FormButton
        buttonTitle="로그인"
        onPress={() => {
          // setBoolPermissionPopup(true);
          __apiPostLogin();
        }}
      />

      {/* <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity> */}

      {/* {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null} */}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          회원가입
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: `100%`,
    backgroundColor: '#fceb39',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#303030',
  },
  text1: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 14,
    marginBottom: 10, 
    color: '#303030',
    fontWeight: 'bold',
    // fontFamily: 'NotoSansKR-Bold',
    
  },
  text2: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 26,
    marginBottom: 80,
    color: '#303030',
  },
  navButton: {
    marginTop: 15,
  },
  autoLoginIconDiv: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#ebebeb',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  autoLoginIconImg: {
    width: 20,
    height: 20,
    objectFit : 'contain',
  },
  autoLoginRow: {
    width: '100%',
    height: 54,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  forgotButton: {
    width: '100%',
    height: 54,
    marginVertical: 10,
    borderRadius: 62,
    borderWidth: 1, 
    borderColor: '#303030',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#303030',
    // fontFamily: 'Lato-Regular',
  },
  cautionButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fb5135',
    // fontFamily: 'Lato-Regular',
    display: 'flex',
    flexDirection: 'row',
  },
  cautionLoginIconImg : {
    width: 6,
    height: 6,
    objectFit : 'contain',
    marginRight: 4,
  },
  popupCloseIconImgWrapper : {

    position: 'absolute',
    right: 20,
    top: 20,
  },
  popupCloseIconImg: {
    width: 20,
    height: 20,
    objectFit : 'contain',
  },
  archiveIconImg: {
    width: 20,
    height: 20,
    objectFit : 'contain',
  },
});
