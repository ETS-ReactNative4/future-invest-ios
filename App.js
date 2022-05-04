import React from 'react';
import Providers from './navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'

const App = () => {
  Icon.loadFont();
  // console.log("App")
  
  return <Providers />;
}

export default App;
