import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, Dimensions, Image} from 'react-native';
import FormInput from '../components/FormInput2';
import FormInputWithDuplCheck from  '../components/FormInputWithDuplCheck';
import FormInputPhoneSelect from  '../components/FormInputPhoneSelect';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import DeviceInfo from 'react-native-device-info'; 
import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";
import { ScrollView } from 'react-native-gesture-handler';

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

const SignupScreen = ({navigation}) => {

  const {user, setUser, objectStore, setObjectStore, logout,  actionName,  setActionName} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  const [id, setId] = useState("");
  const [idError, setIdError] =  useState("check-need");
  const [textNickname, setTextNickname] = useState("");
  const [textNicknameError, setTextNicknameError] =  useState("check-need");
  const [textName, setTextName] = useState("");
  const [textNameError, setTextNameError] =  useState("check-need");
  const [textPhone1, setTextPhone1] = useState("010");
  const [textPhone1Error, setTextPhone1Error] =  useState("check-need");
  const [textPhone2, setTextPhone2] = useState("");
  const [textPhone2Error, setTextPhone2Error] =  useState("");
  const [textPassword, setTextPassword] = useState("");
  const [textPasswordError, setTextPasswordError] = useState("check-need");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("check-need");
  const [boolPossibleSubmit, setBoolPossibleSubmit] = useState(false);

  const [idOrigin, setIdOrigin] = useState("");
  const [textNameOrigin, setTextNameOrigin] = useState("");
  const [textNicknameOrigin, setTextNicknameOrigin] = useState("");
  const [textPhoneOrigin, setTextPhoneOrigin] = useState("010");
  const [textPasswordOrigin, setTextPasswordOrigin] = useState("");


  useEffect(()=> {
    setId(user.id)
    setTextName(user.name)
    setTextPhone1("010")
    setTextPhone2(user.phone.substring(3))

    setIdOrigin(user.id)
    setTextNameOrigin(user.name)
    setTextPhoneOrigin(user.phone);



    // {
    //   "confirmed": false, 
    //   "id": "test1", 
    //   "imageUrl": null, 
    //   "memberTokenInfo": {
    //      "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTY1MjEwOTE5MH0.pPK2PYw8xP_zogCMiMbmO3WwKTHigQ84PER5EZbYNC9mjstCuX9sVu78nfqx0lARe5nf4_udVE0OQ0CBkpws3w", 
    //      "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MSIsImV4cCI6MTY1ODI0MzU5MH0.UHKdll2FvExR5pgrIwtZuccZ_Wgcizp8c7pvtoOhxd99REySkgJj1cUvBhm6VmvmvVfqmTQ50fLw2Bz6N39_FA"
    // }, 
    //   "memberType": "GENERAL", 
    //   "messageNotificationReceive": true, 
    //   "name": "name11", 
    //   "nickname": "test1", 
    //   "phone": "01030913971", 
    //   "replyMessageNotificationReceive": true,
    //   "uuid": "c91fb122-64"
    // }
  }, [])

  useEffect(() => {
    if (textPassword >=4 && textPassword < 9) {
      setTextPasswordError("비밀번호는 4자이상 8자이하입니다.")
    } else {
      setTextPasswordError("")
    }
    if (textPassword != confirmPassword) {
      setConfirmPasswordError("비밀번호가 같지 않습니다.")
    } 

    if (confirmPassword >=4 && confirmPassword < 9) {
      setConfirmPasswordError("비밀번호는 4자이상 8자이하입니다.")
    } else {
      setConfirmPasswordError("")
    }

    
  }, [
    textPassword,
    confirmPassword,
  ]);

  useEffect(() => {

    // if (
    //   id == "" || 
    //   textName == "" || 
    //   textPhone1 == "" || 
    //   textPhone2 == "" || 
    //   textPassword == "" || 
    //   confirmPassword == "" || 
    //   textPassword != confirmPassword
    // ) {
    //   setBoolPossibleSubmit(false);
    //   return;
    // }



    if (
      idError == "check-need" &&
      textPhone1Error == "check-need" &&
      textPasswordError == "check-need" &&
      confirmPasswordError == "check-need" 
      ) {

      setBoolPossibleSubmit(false);
      return;
      }
    
    if (
      idError == "" &&
      textPhone1Error == "" &&
      textPasswordError == "" &&
      confirmPasswordError == ""
    ) {
      setBoolPossibleSubmit(true);
    } else {
      setBoolPossibleSubmit(false);

    }

  }, [
    id,
    idError,
    textName,
    textNameError,
    textPhone1,
    textPhone1Error,
    textPhone2,
    textPhone2Error,
    textPassword,
    textPasswordError,
    confirmPassword,
    confirmPasswordError,
  ]);


  function __apiCheckOverlapId() {

    if (id == idOrigin) {
      setIdError("기존 ID와 같습니다.")
      return;
    }

    //checkOverlapId
    const req = {
      query : `?id=${id}` ,
      header: { 'Authorization': "Basic ZnV0dXJlaW52ZXN0OmZ1dHVyZXBhc3N3b3Jk", } 
    }
    FutureInvestApi.checkOverlapId(req)
    .then(res => {
      console.log("FutureInvestApi.checkOverlapId(req)");
      // console.log(res.status);
      // console.log(res.data);

      if (res.status < 300) {
        if (res.data == false) {
          console.log("=== false")
          setIdError("");
        } else {
          console.log("!== false")
          setIdError("사용할 수 없습니다");
          console.log(idError)
        }
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
        console.log(e && e.response);
        console.log("!== false")
        setIdError("사용할 수 없습니다");
        console.log(idError)

    })
  }
  function __apiCheckOverlapNickname() {

    if (textNickname == textNicknameOrigin) {
      setTextNameError("기존 값과 같습니다.")
      return;
    }

    //checkOverlapNickname
    const req = {
      query : `?nickname=${textNickname}` ,
      header: { 'Authorization': "Basic ZnV0dXJlaW52ZXN0OmZ1dHVyZXBhc3N3b3Jk", } 
    }
    FutureInvestApi.checkOverlapNickname(req)
    .then(res => {
      console.log("FutureInvestApi.__apiCheckOverlapNickname(req)");
      if (res.status < 300) {
        if (res.data == false) {
          setTextNicknameError("");
        } else {
          setTextNicknameError("사용할 수 없습니다");
        }
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
        console.log(e && e.response);
        console.log("!== false")
        setTextNicknameError("사용할 수 없습니다");
        console.log(idError)

    })
  }



  function __apiCheckOverlapPhone() {

    if ((textPhone1 + textPhone2) == textPhoneOrigin) {
      setTextPhone1Error("기존 값과 같습니다.")
      return;
    }

    const req = {
      query : `?phone=${textPhone1 + "" + textPhone2}`,
      header: { 'Authorization': "Basic ZnV0dXJlaW52ZXN0OmZ1dHVyZXBhc3N3b3Jk", } 
    }
    
    FutureInvestApi.checkOverlapPhone(req)
    .then(res => {
      console.log("FutureInvestApi.checkOverlapPhone(req)");
      console.log(res.status);
      console.log(res.data);

      if (res.status < 300) {
        if (res.data == false) {
          setTextPhone1Error("");
        } else {
          setTextPhone1Error("사용할 수 없습니다");
        }
      }
    })
    .catch(e=>{
        // console.log('[CATCH]');
        console.log(e && e.response);
        console.log("!== false")
        setTextPhone1Error("사용할 수 없습니다");
        console.log(idError)

    })
    

  }

  function __apiPutUpdateInfo(param1) {
    // if (param1 == null || param1 === undefined || typeof param1 === "undefined" || param1 == "") {
    //     return;
    // }
    // if (boolPossibleSubmit == true ) {
    // } else {

    //   return;
    // }

    DeviceInfo.getMacAddress().then((mac) => {
      // "E5:12:D8:E5:69:97"
      console.log(mac);
      
      

    var sendObject = {
      pwd:  textPassword,
      type : "GENERAL",
      name : textName,
      nickname : textNickname,
      phone : textPhone1 + textPhone2,
      macAddress : mac,
    }
    var formData1 = new FormData()
    formData1.append("memberUUID", user.uuid);

    if (textPassword != "" && textPassword == confirmPassword) {
      formData1.append("pwd", sendObject.pwd);
    }
    if (textName != "" && textNameError == "") {
      formData1.append("name", sendObject.name);
    }
    if (textPhone2 != "" && textPhone1Error == "") {
      formData1.append("phone", sendObject.phone);
    }
    const req = {
      data : sendObject,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, }
    }

    FutureInvestApi.putChangeInfo(req)
    .then(res => {
      console.log("FutureInvestApi.signup")
      console.log(res)
      if (res.status < 300) {
        alert("수정되었습니다.");
        setUser(res.data)
        
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

  return (
    <ScrollView style={styles.scrollview}>
    <View style={styles.container}>
      <FormInputWithDuplCheck
        labelText={'아이디'}
        labelValue={id}
        onChangeText={(id) => setId(id)}
        placeholderText="4자 이상 9자 이하"
        iconType="user"
        // keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={idError}
        function1={__apiCheckOverlapId}
      />

      <FormInput
        labelText={'이름'}
        placeholderText={'이름 입력'}
        labelValue={textName}
        onChangeText={(textName) => setTextName(textName)}
        iconType="lock"
        secureTextEntry={false}
      />

      <FormInputPhoneSelect
        labelText={'휴대폰'}
        placeholderText={''}
        labelValue1={textPhone1}
        labelValue2={textPhone2}
        onChangeText1={(text) => setTextPhone1(text)}
        onChangeText2={(text) => {setTextPhone2(text)}}
        secureTextEntry={false}
        error={textPhone1Error}
        function1={__apiCheckOverlapPhone}
      />

      <FormInput
        labelText={'비밀번호'}
        placeholderText={'4자 이상 8자 이하'}
        labelValue={textPassword}
        onChangeText={(textPassword) => setTextPassword(textPassword)}
        iconType="lock"
        secureTextEntry={true}
        error={textPasswordError}
      />

      <FormInput
        labelText={'비밀번호 확인'}
        placeholderText={'비밀번호 확인'}
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        iconType="lock"
        secureTextEntry={true}
        error={confirmPasswordError}
      />

      {/* <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email, password)}
      /> */}

      {/* <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View> */}

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />
    
          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => {}}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={boolPossibleSubmit == true ? styles.navButtonActive : styles.navButton}
        onPress={() => {
          // navigation.navigate('Login')
          // __apiPutUpdateInfo();

          __apiPutUpdateInfo()
        }}
        >
        <Text style={boolPossibleSubmit == true ? styles.navButtonActiveText : styles.navButtonText}>
          수정완료
          </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#303030',
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#303030',
  },
  navButtonActive: {
    position: 'static',
    bottom: 0,
    width: device_width,
    height: 70,
    backgroundColor: '#fceb39',
    color : '#303030',
    display: 'flex',
    justifyContent:  'flex-start',
    alignItems: 'center',
    paddingTop: 20,

  },
  navButtonActiveText: {
    fontSize: 18,
    fontWeight: '500',
    color : '#303030',
    // fontFamily: 'Lato-Regular',
  },
  navButton: {
    position: 'static',
    bottom: 0,
    width: device_width - 40,
    height: 60,

    borderRadius: 50, 
    backgroundColor: '#eeeeee',
    color : '#fff',
    display: 'flex',
    justifyContent:  'center',
    alignItems: 'center',

    marginTop: 50, 

  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color : '#cccccc',
    // fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    // fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
