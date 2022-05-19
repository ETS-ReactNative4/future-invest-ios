
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

    const client = new StompJS.Client({
        brokerURL:  "ws://3.38.20.168:8080/websocket/invest", 
        connectHeaders: {
            "Authorization": `Bearer ${user.memberTokenInfo.accessToken}`,
        },
        debug: function (str) {
            console.log(str);
        },
    });

    useEffect(() => {


    client.activate();

        wsSubscribe();
      return () => wsDisconnect();
    }, []);




    const onClick = (message ) => {

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
        
        var messageDummy =  {

            "sendMessageId" :1,
            "sendMemberUUID" :1,
            "sendMemberType" :1,
            "content" :1,
            "messageType" :1,
            "replyMessageId" :1,
            "replyMessageContent" :1,
            "targetMemberUUID" :1,
            "fileMetaData" :1,
        }
        
        // console.log(client.connected);
        if (!client.connected)
            return;

        client.publish({
            destination: PUB_NEW_PUBLIC_MESSAGE,
            body: JSON.stringify(
                // {
                // 'message': message
                // }
                messageDummy
            ),
        })
    }
    client.onDisconnect = e => {
        console.log("client.onDisconnect ::: 001", e)

    }
    client.onStompError = e => {

        console.log("client.onStompError ::: 001", e)
    }

    client.onWebSocketError = e => {

        console.log("client.onWebSocketError ::: 001", e)
    }

    const wsSubscribe = () => {
        console.log("wsSubscribe ::: 001 -- 001");
        // console.log("[test ::: ] initiateSocketConnection")
        // console.log("[test ::: ] ChatScreen objectStore", objectStore);
        // console.log("[test ::: ] ChatScreen objectChatRoom1", objectChatRoom1);
        var chattingRoomId = objectChatRoom1 ? objectChatRoom1 : '';
        // console.log("[test ::: ] ChatScreen chattingRoomId", chattingRoomId);
        var memberUUID = user && user.uuid ? user.uuid : '';
        var  PUB_NEW_PRIVATE_MESSAGE = `/topic/chatting/pub/newMessage/private/${chattingRoomId}`
        var  PUB_NEW_PUBLIC_MESSAGE =  `/topic/chatting/pub/newMessage/public/${chattingRoomId}`
        var  PUB_DISCONNECT_CHATTING_ROOM = `/topic/chatting/pub/disconnect/${chattingRoomId}`
        var  SUB_NEW_MESSAGE = `/topic/chatting/sub/member/newMessage/${chattingRoomId}`
        var  SUB_NEW_MESSAGE_TO_ME = `/topic/chatting/sub/member/newMessage/${chattingRoomId}/${memberUUID}`
        var  SUB_REMOVE_MESSAGE = `/topic/chatting/sub/removeMessage/${chattingRoomId}`
        var  SUB_NEW_MEMBERS = `/topic/chatting/sub/admin/newMembers/${chattingRoomId}`
        var  SUB_NEW_INFORM =  `/topic/chatting/sub/newInform/${chattingRoomId}`
        client.onDisconnect = e => {
            console.log("client.onDisconnect ::: 001", e)

        }
        client.onConnect = () => {
            console.log("client.onConnect ::: 001")
            // onClick();
            client.subscribe(`${PUB_NEW_PRIVATE_MESSAGE}`, (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                console.log(`SUBSCRIBE -> RECEIVED MSG :: ${PUB_NEW_PRIVATE_MESSAGE}`, newMessage)
                // setContent(newMessage);

            }, {id: "user"})

            client.subscribe(`${PUB_NEW_PUBLIC_MESSAGE}`, (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                console.log(`SUBSCRIBE -> RECEIVED MSG :: ${PUB_NEW_PUBLIC_MESSAGE}`, newMessage)
                // setContent(newMessage);

            }, {id: "user"})

            client.subscribe(`${PUB_DISCONNECT_CHATTING_ROOM}`, (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                console.log(`SUBSCRIBE -> RECEIVED MSG :: ${PUB_DISCONNECT_CHATTING_ROOM}`, newMessage)
                // setContent(newMessage);

            }, {id: "user"})
            client.subscribe(`${SUB_NEW_MESSAGE}`, (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                console.log(`SUBSCRIBE -> RECEIVED MSG :: ${SUB_NEW_MESSAGE}`, newMessage)
                // setContent(newMessage);

            }, {id: "user"})
            client.subscribe(`${SUB_NEW_MESSAGE_TO_ME}`, (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                console.log(`SUBSCRIBE -> RECEIVED MSG :: ${SUB_NEW_MESSAGE_TO_ME}`, newMessage)
                // setContent(newMessage);

            }, {id: "user"})
            client.subscribe(`${SUB_REMOVE_MESSAGE}`, (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                console.log(`SUBSCRIBE -> RECEIVED MSG :: ${SUB_REMOVE_MESSAGE}`, newMessage)
                // setContent(newMessage);

            }, {id: "user"})
            client.subscribe(`${SUB_NEW_MEMBERS}`, (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                console.log(`SUBSCRIBE -> RECEIVED MSG :: ${SUB_NEW_MEMBERS}`, newMessage)
                // setContent(newMessage);

            }, {id: "user"})
            client.subscribe(`${SUB_NEW_INFORM}`, (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                console.log(`SUBSCRIBE -> RECEIVED MSG :: ${SUB_NEW_INFORM}`, newMessage)
                // setContent(newMessage);

            }, {id: "user"})
            
        }
    }

    const wsDisconnect = () => {
        client.deactivate();
    }

    return (
        <>
            
        </>
    )
}

export default TestContainer;

const Container = (props ) => {
    const [ms, setMs] = useState("");
    const {sendMessage} = props;

    const _onChange = useCallback(
        (e) => {
            setMs(e.target.value);
        },
        []
    );

    return (
        <>
            {/* <input
                value={ms}
                onChange={_onChange}
                name={"ms"}
            /> */}
            <TouchableOpacity
                type={"button"}
                onClick={() => {
                    sendMessage(ms);
                    setMs("");
                }}
            >
                <Text>전송</Text>
            </TouchableOpacity>
        </>
    );
}
