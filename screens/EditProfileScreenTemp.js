import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, Dimensions} from 'react-native';
import FormInput from '../components/FormInput2';
import FormInputWithDuplCheck from  '../components/FormInputWithDuplCheck';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';

const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;
const SignupScreen = ({navigation}) => {
  const [id, setId] = useState();
  const [textNickname, setTextNickname] = useState("");
  const [textName, setTextName] = useState("");
  const [textPhone, setTextPhone] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
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
      />

      <FormInputWithDuplCheck
        labelText={'닉네임'}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="9자 이하"
        iconType="lock"
        secureTextEntry={false}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelText={'실명'}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInputWithDuplCheck
        labelText={'휴대폰'}
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelText={'비밀번호'}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelText={'비밀번호 확인'}
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
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
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>회원가입하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
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
  navButton: {
    position: 'absolute',
    bottom: 0,
    width: device_width,
    height: 70,
    backgroundColor: '#cccccc',
    color : '#fff',
    display: 'flex',
    justifyContent:  'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color : '#fff',
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
