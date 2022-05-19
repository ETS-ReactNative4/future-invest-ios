
import React, {useContext,  useState, useEffect, useCallback, useRef, useLayoutEffect} from 'react';
import {AppState,Alert, View, ScrollView, Text, Button, StyleSheet, Image, Modal, TouchableOpacity, Dimensions} from 'react-native';

import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import {AuthContext} from '../navigation/AuthProvider';
import moment from 'moment';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { getBottomSpace } from "react-native-iphone-x-helper";
import DeviceInfo from 'react-native-device-info'; 

import {WS_SERVER_URL} from "../api/index";
import * as BaseApi from "../api/BaseApi";
import * as FutureInvestApi from "../api/FutureInvestApi";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const safeAreaHeight= Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();

const TestContainer = () => {
    const {
        user, setUser, 
        objectStore, setObjectStore,  
        actionName, setActionName , 
        objectChatRoom1, setObjectChatRoom1,
        objectChattingRoomInfo, setObjectChattingRoomInfo,
      } = useContext(AuthContext);
    const [ms, setMs] = useState("");
    const [content, setContent] = useState("");
    
    const client = useRef({});

    useEffect(()=> {
        connect();
        return () => {
            disconnect();
        }
    }, [])
    

    const disconnect = () => {
        //채팅 연결 종료 메시지
        // sessionStorage.setItem('selectChattingRoomId', -1)
        client.current.deactivate();
    }

    const connect = () => {
        client.current = new StompJS.Client({
            brokerURL: "ws://3.38.20.168:8080/websocket/invest",
            connectHeaders: {
                Authorization: `${user.memberTokenInfo.accessToken}`
            },
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log("temp")
                subscribe();
            },
            onStompError: (frame) => {
                if (frame.headers.message.includes("invalid token")) {
                    refreshToken(() => {
                        client.current.deactivate()
                            .then(() => {
                                connect();
                            }).catch(error => {
                            console.log(error);
                        });
                    });
                } else {
                    alert("채팅방 연결 실패");
                    console.log(frame);
                }
            }
        });
        client.current.activate();
    }

    /** 현재 채팅방 새로운 메시지 구독 **/
    const subscribe = () => {

        console.log("[test ::: ] initiateSocketConnection")
        console.log("[test ::: ] ChatScreen objectStore", objectStore);
        console.log("[test ::: ] ChatScreen objectChatRoom1", objectChatRoom1);
        var chattingRoomId = objectChatRoom1 ? objectChatRoom1 : '';
        console.log("[test ::: ] ChatScreen chattingRoomId", chattingRoomId);

        var memberUUID = user && user.uuid ? user.uuid : '';
        var  PUB_NEW_PRIVATE_MESSAGE = `/topic/chatting/pub/newMessage/private/${chattingRoomId}`
        var  PUB_NEW_PUBLIC_MESSAGE =  `/topic/chatting/pub/newMessage/public/${chattingRoomId}`
        var  PUB_DISCONNECT_CHATTING_ROOM = `/topic/chatting/pub/disconnect/${chattingRoomId}`
        var  SUB_NEW_MESSAGE = `/topic/chatting/sub/member/newMessage/${chattingRoomId}`
        var  SUB_NEW_MESSAGE_TO_ME = `/topic/chatting/sub/member/newMessage/${chattingRoomId}/${memberUUID}`
        var  SUB_REMOVE_MESSAGE = `/topic/chatting/sub/removeMessage/${chattingRoomId}`
        var  SUB_NEW_MEMBERS = `/topic/chatting/sub/admin/newMembers/${chattingRoomId}`
        var  SUB_NEW_INFORM =  `/topic/chatting/sub/newInform/${chattingRoomId}`
        
        console.log("PUB_NEW_PRIVATE_MESSAGE", PUB_NEW_PRIVATE_MESSAGE)

        client.current.subscribe(PUB_NEW_PRIVATE_MESSAGE, (data) => {
            console.log(data)
        });
        client.current.subscribe(PUB_NEW_PUBLIC_MESSAGE, (data) => {
            console.log(data)
        });
        client.current.subscribe(PUB_DISCONNECT_CHATTING_ROOM, (data) => {
            console.log(data)
        });
        client.current.subscribe(SUB_NEW_MESSAGE, (data) => {
            console.log(data)
        });
        client.current.subscribe(SUB_NEW_MESSAGE_TO_ME, (data) => {
            console.log(data)
        });
        client.current.subscribe(SUB_REMOVE_MESSAGE, (data) => {
            console.log(data)
        });
        client.current.subscribe(SUB_NEW_MEMBERS, (data) => {
            console.log(data)
        });
        client.current.subscribe(SUB_NEW_INFORM, (data) => {
            console.log(data)
        });
    }

    return (
        <>
            
        </>
    )
}

export default TestContainer;
