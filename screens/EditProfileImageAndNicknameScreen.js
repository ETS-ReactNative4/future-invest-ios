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

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import FormInputWithDuplCheck from  '../components/FormInputWithDuplCheck';
import { windowWidth } from '../utils/Dimentions';

import DeviceInfo from 'react-native-device-info'; 
import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";

const EditProfileScreen = () => {
  const {user, logout, actionName, setActionName} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [textNickname, setTextNickname] = useState("");
  const [textNicknameError, setTextNicknameError] =  useState("check-need");


  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    // uploadUri
    __apiPutUpdateImage(uploadUri)
  };

  useEffect(()=> {
    console.log("page :::", actionName);
    __apiCheckOverlapNickname(true);
    setActionName("");
  },[actionName])

  useEffect(() => {
    setTextNickname(user.nickname);
    setActionName("");
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      this.bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      this.bs.current.snapTo(1);
    });
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  function __apiPutUpdateNickname(param1) {
    // if (param1 == null || param1 === undefined || typeof param1 === "undefined" || param1 == "") {
    //     return;
    // }
    // if (boolPossibleSubmit == true ) {
    // } else {

    //   return;
    // }

    var sendObject = {
      nickname : textNickname,
    }
    var formData1 = new FormData()
    formData1.append("memberUUID", user.uuid);
    if (textNickname != "" && textNickname == "") {
      formData1.append("nickname", sendObject.nickname);
    }
    const req = {
      data : formData1,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, },
      query: `?memberUUID=${user.uuid}`
    }

    FutureInvestApi.updateChangeNickname(req)
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

  }


  function __apiPutUpdateImage(param1) {
    // if (param1 == null || param1 === undefined || typeof param1 === "undefined" || param1 == "") {
    //     return;
    // }
    // if (boolPossibleSubmit == true ) {
    // } else {

    //   return;
    // }

    if (image != null) {
    } else {

      return;
    }

    var sendObject = {
      file : image,
    }
    var formData1 = new FormData()
    formData1.append("memberUUID", user.uuid);
    if (image ) {
      formData1.append("file", sendObject.file);
    }
    const req = {
      data : formData1,
      header: { 'Authorization': `Bearer ${user.memberTokenInfo.accessToken}`, },
      query: `?memberUUID=${user.uuid}`
    }

    FutureInvestApi.updateChangeImage(req)
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

  }


  function __apiCheckOverlapNickname(param1) {
    //checkOverlapNickname
    const req = {
      query : `?nickname=${textNickname}` 
    }
    FutureInvestApi.checkOverlapNickname(req)
    .then(res => {
      console.log("FutureInvestApi.__apiCheckOverlapNickname(req)");
      if (res.status < 300) {
        if (res.data == false) {
          setTextNicknameError("");
          if (param1 == true) {
            __apiPutUpdateNickname();
          }
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
        console.log(textNicknameError)

    })
  }



  return (
    <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, -5]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          marginLeft: 20, 
          marginRight: 20,
          marginTop: 50,
          marginBottom: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
        <View style={{alignItems: 'center', }}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                position: "relative",
              }}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.userImg ||
                      'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                    : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 50}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                </View>
              </ImageBackground>
            <TouchableOpacity
             style={{  position: "absolute", right: 0, bottom: 0}}
             onPress={()=> {
                this.bs.current.snapTo(0)
             }}
            >
                <Image  style={{width: 24, height: 24,}} source={require('../assets/profile/icon_profile_modify_icon.png')} resizeMode={'contain'}  />
            </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
          </Text>
        </View>
        <FormInputWithDuplCheck
            labelText={'닉네임'}
            labelValue={textNickname}
            onChangeText={(text) => setTextNickname(text)}
            placeholderText={"4자 이상 9자 이하"}
            iconType="user"
            // keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={textNicknameError}
            function1={__apiCheckOverlapNickname}
        />
        <View style={styles.hintTextContainer}>
            <Text style={styles.hintText}>9자 이하로 작성해주세요.</Text>
        </View>


        {/* <FormButton buttonTitle="Update" onPress={handleUpdate} /> */}
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    color : '#000',
    backgroundColor: '#fceb39',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3c1e1e',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
  imageContainer: {
    width: 118,
    height: 118,
    borderRadius: 59,
    overflow: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image0 : {
    width: 60,
    height: 60,
    objectFit: "contain",
    margin: "auto",
  },
  image1 : {
    width: "110%",
    height: "110%",
    
  },

  hintTextContainer: {
    width: windowWidth - 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
  hintText : {
    color: "#9b9b9b",
  }


});
