import React from 'react';
import {View, TextInput, StyleSheet, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {windowHeight, windowWidth} from '../utils/Dimentions';
// import AntDesign from 'react-native-vector-icons/AntDesign';

const FormInput = ({labelText, labelValue1, labelValue2, placeholderText, iconType, onChangeText1, onChangeText2, error,function1,  ...rest}) => {
  return (
    <View  style={styles.inputFormContainer}>
        <Text  style={styles.inputLabel}>{labelText}</Text>
        <View style={styles.inputContainer1}>
        {/* <View style={styles.iconStyle}>
            <AntDesign name={iconType} size={25} color="#666" />
        </View> */}
          <TextInput
              value={labelValue1}
              style={styles.input1}
              numberOfLines={1}
              placeholder={placeholderText}
              placeholderTextColor="#cccccc"
              onChangeText={onChangeText1}
              {...rest}
          />
          {/* inputDropdown1 */}
          <Image  style={styles.inputDropdown1}  source={require('../assets/icon_mid_sort_arrow_down.png')} resizeMode={'contain'}  />
        </View>
        <View style={styles.inputContainer2}>
        {/* <View style={styles.iconStyle}>
            <AntDesign name={iconType} size={25} color="#666" />
        </View> */}
        <TextInput
            value={labelValue2}
            style={styles.input1}
            numberOfLines={1}
            placeholder={placeholderText}
            placeholderTextColor="#cccccc"
            onChangeText={onChangeText2}
            {...rest}
            keyboardType={`number-pad`}
        />
        </View>
        <TouchableOpacity style={styles.checkButton}
        
        onPress={()=> {
          function1 && function1()
        }}
        >
            <Text>{'중복확인'}</Text>
        </TouchableOpacity>
        {
          error != "" &&
          error != "check-need" &&
          <Text style={{ width: windowWidth - 40, color : "#fb5135", marginTop: 5, height: 20, }}>{error}</Text>
        }
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
    inputFormContainer : {
        width: windowWidth - 40,
        height: 100,
        marginTop: 5,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputLabel : {
        width: windowWidth - 40,
        fontWeight: 'bold',
        height: 24,
        color: '#303030',
        marginBottom: 12,
    },
    inputContainer1: {
      width: (windowWidth  - 135 - 10)* 0.4,
      height: windowHeight / 15,
      borderColor: '#ebebeb',
      backgroundColor: '#f6f6f6',
      borderRadius: 62,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputDropdown1: {
      
      width: 20,
      height: 20,
      objectFit : 'contain',
      position: 'absolute',
      right: 20,
      top: 20,
    },
    inputContainer2: {
      width: (windowWidth  - 135 - 10)* 0.6,
      height: windowHeight / 15,
      borderColor: '#ebebeb',
      backgroundColor: '#f6f6f6',
      borderRadius: 62,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',

      marginLeft: 10, 
    },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input1: {
    width: '100%',
    padding: 20,
    fontSize: 16,
    // fontFamily: 'Lato-Regular',
    // fontFamily: 'NotoSansKR-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButton : {
    width: 90,
    fontSize: 16,
    height: windowHeight / 15,
    // fontFamily: 'Lato-Regular',
    // fontFamily: 'NotoSansKR-Regular',
    color: '#3c1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor:  '#3c1e1e',
    borderRadius: 62,
    marginLeft: 5
  },    
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 3,
    borderWidth: 1,
  },
});
