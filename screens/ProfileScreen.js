import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

import firestore from '@react-native-firebase/firestore';
import PostCard from '../components/PostCard';
import { windowHeight, windowWidth } from '../utils/Dimentions';

const ProfileScreen = ({navigation, route}) => {
  const {user, setUser, objectStore, setObjectStore, logout} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', '==', route.params ? route.params.userId : user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc( route.params ? route.params.userId : user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
    fetchPosts();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  const handleDelete = () => {};

  return (
//     icon_profile_approbation.png
// icon_profile_pencil.png
// icon_profile_pencil1.png
// icon_profile_switch_off.png
// icon_profile_switch_on.png 

    <SafeAreaView style={{flex: 1, backgroundColor: '#fceb39'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>

          <View style={{ width: windowWidth, height: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor:'#fceb39',  position: 'absolute', top: 0, zIndex: 1,}}>

          <TouchableOpacity style={styles.top1_button1} 
            onPress={()=> {
              navigation.navigate('EditProfileImageAndNicknameScreen',)
            }} 
          >

            <Text style={styles.top1_text1}>수정하기</Text>
            <Image style={styles.top1_image1} 
              source={
              require('../assets/chat/icon_profile_pencil.png')
            } 
            />
          </TouchableOpacity>



            <Image
              style={styles.userImg}
              source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
            />
            <Text style={styles.userName}>
              한국매일증권
              {/* {userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'} */}
            </Text>
            {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
            <Text style={styles.aboutUser}>
            {userData ? userData.about || 'No details added.' : ''}
            </Text>
          </View>

          <View style={{ 
            minHeight: 132, 
            width: windowWidth - 100, 
            backgroundColor: '#ffffff', 
            position: 'absolute', 
            top: 200, 
            backgroundColor: '#FFFFFF',
            shadowColor: '#333333',
            shadowOffset: {width: 1, height: 1},
            shadowRadius: 2,
            shadowOpacity: 0.4,
            paddingTop: 20,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex : 9, 
            }}>
              <TouchableOpacity 
              style={{ width: '100%', height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center'}}
              onPress={()=> {

                navigation.navigate('EditProfile',)
              }}
              >
                <Text 
                    style={{ marginLeft: 20}}
                  >내 정보 관리</Text>
                <TouchableOpacity 
                    onPress={()=> {}}
                    style={{ marginLeft: 'auto', marginRight: 20}}
                    >
                    <Image  style={{width: 28, height: 28}} source={require('../assets/icon_black_chevron_right.png')} resizeMode={'contain'}  />
                </TouchableOpacity>
              </TouchableOpacity>

              <View style={{ minHeight: 1 , width: windowWidth - 140, backgroundColor: '#ebebeb', marginLeft: 'auto', marginRight: 'auto'}}></View>
              
              <TouchableOpacity style={{ width: '100%', height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10}}
              
              onPress={()=> {
                navigation.navigate('EditProfileNotification',)
              }} 
              >
                <Text 
                    style={{ marginLeft: 20}}>알림 설정</Text>
                <TouchableOpacity 
                    onPress={()=> {
                      navigation.navigate('EditProfileNotification',)
                    }} 
                    style={{ marginLeft: 'auto', marginRight: 20}}
                    >
                    <Image  style={{width: 28, height: 28}} source={require('../assets/icon_black_chevron_right.png')} resizeMode={'contain'}  />
                </TouchableOpacity>
              </TouchableOpacity>

        </View>
            <TouchableOpacity style={{ minHeight: 54 , width: windowWidth - 40, backgroundColor: '#f6f6f6',  position: 'absolute', bottom: 240,zIndex: 9, borderRadius: 50,  
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={()=> {
              setUser(null);
            }}
            >
              <Text>로그아웃</Text>
            </TouchableOpacity>
            <View style={{ minHeight: 54 , width: windowWidth - 40, backgroundColor: '#ffffff',  position: 'absolute', bottom: 180,zIndex: 9, borderRadius: 50,  
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            >
              <TouchableOpacity 
              onPress={()=> {
                setUser(null);
              }}>
            <Text 
              style={{ color : "#aeaeae"}}
            >회원탈퇴</Text>
            </TouchableOpacity>
            </View>


          <View style={{ minHeight: windowHeight , width: windowWidth, backgroundColor: '#ffffff'}}>

          </View>
        {/* <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View> */}

        {/* <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View> */}

        {/* {posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  top1_button1 : {
    width: 80,
    height: 28,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#3c1e1e",
    position: "absolute",
    top: 25,
    right: 20,
  },
  top1_text1 : {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
    marginRight: 4,
  },
  top1_image1 : {
    width: 12,
    height: 12,
  }
});
