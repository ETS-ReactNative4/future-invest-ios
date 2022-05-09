import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [actionName, setActionName] = useState("");
  const [objectChatRoom1, setObjectChatRoom1] = useState(null);
  const [objectStore, setObjectStore] = useState(null);
  const [objectChattingRoomInfo, setObjectChattingRoomInfo]  = useState(null);

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
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        objectStore,
        setObjectStore,
        actionName,
        setActionName,
        objectChatRoom1,
        setObjectChatRoom1,
        objectChattingRoomInfo,
        setObjectChattingRoomInfo,

        login: async (email, password) => {
          // try {
          //   await auth().signInWithEmailAndPassword(email, password);
          // } catch (e) {
          //   console.log(e);
          // }
        },
        register: async (email, password) => {
          // try {
          //   await auth().createUserWithEmailAndPassword(email, password)
          //   .then(() => {
          //     //Once the user creation has happened successfully, we can add the currentUser into firestore
          //     //with the appropriate details.
          //     firestore().collection('users').doc(auth().currentUser.uid)
          //     .set({
          //         fname: '',
          //         lname: '',
          //         email: email,
          //         createdAt: firestore.Timestamp.fromDate(new Date()),
          //         userImg: null,
          //     })
          //     //ensure we catch any errors at this stage to advise us if something does go wrong
          //     .catch(error => {
          //         console.log('Something went wrong with added user to firestore: ', error);
          //     })
          //   })
          //   //we need to catch the whole sign up process if it fails too.
          //   .catch(error => {
          //       console.log('Something went wrong with sign up: ', error);
          //   });
          // } catch (e) {
          //   console.log(e);
          // }
        },
        logout: async () => {
          // try {
          //   await auth().signOut();
          // } catch (e) {
          //   console.log(e);
          // }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
