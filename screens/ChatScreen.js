import React, {useEffect, useState, useCallback, useRef} from 'react';

import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

const TestContainer = () => {
    const [ms, setMs] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        wsSubscribe();
      return () => wsDisconnect();
    }, []);

    const client = new StompJS.Client({
        brokerURL:  "ws://3.38.20.168:8080/websocket/invest", // 왜 websocket을 붙여줘야하는거지..?
        // connectHeaders: {
        //     login: 'user',
        //     password: 'password'
        // },
        debug: function (str) {
            console.log(str);
        },
    });

    client.activate();

    const onClick = (message ) => {
        console.log(client.connected);
        if (!client.connected)
            return;

        client.publish({
            destination: '/app/hello',
            body: JSON.stringify({
                'message': message
            }),
        })
    }


    const wsSubscribe = () => {
        client.onConnect = () => {
          
            client.subscribe('/topic/message', (msg) => {
                const newMessage = JSON.parse(msg.body).message;
                setContent(newMessage);
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
