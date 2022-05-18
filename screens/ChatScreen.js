import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { WS_SERVER_URL } from '../api/index';

export default class socketTest extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.socket = new WebSocket(WS_SERVER_URL);
    this.emit = this.emit.bind(this);
  }

  emit() {
    this.setState(prevState => ({ open: !prevState.open }))
    this.socket.send("It worked!")
  }

  render() {

    const LED = {
      backgroundColor: this.state.open ? 'lightgreen' : 'red',
      height: 30,
      position: 'absolute',
      flexDirection: 'row',
      bottom: 0,
      width: 100,
      height: 100,
      top: 120,
      borderRadius: 40,
      justifyContent: 'space-between'

    }

    return (
      <View style={styles.container}>
        <Button
          onPress={this.emit}
          title={this.state.open ? "Turn off" : "Turn on"}
          color="#21ba45"
          accessibilityLabel="Learn more about this purple button"
        />
        <View style={LED}></View>
      </View>
    );
  }

  componentDidMount() {
    this.socket.onopen = () => { 
      console.log('onopen.')
    }
    this.socket.onclose = () => { 
      console.log('onclose.')
    }
    this.socket.onclose = () => { 
      console.log('onclose.')
    }
    this.socket.onmessage = ({ data }) => console.log(JSON.parse(data).payload)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// AppRegistry.registerComponent('socketTest', () => socketTest);