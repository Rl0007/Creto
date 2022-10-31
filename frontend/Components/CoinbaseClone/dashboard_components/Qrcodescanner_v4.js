import {CameraScreen} from 'react-native-camera-kit';
import {Camera, CameraType} from 'react-native-camera-kit';

import React, {useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import cameraicon from './btc.png';

const App = ({
  scanqrcode,
  togglescanqrcode,
  set_value_of_publicaddress_receiver,
}) => {
  // const [usecamera, setusecamera] = useState(false);

  if (scanqrcode) {
    console.log('inside username');
    return (
      <View style={{flex: 1}}>
        <CameraScreen
          actions={{rightButtonText: 'Done', leftButtonText: 'Cancel'}}
          onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
          hideControls={true}
          showCapturedImageCount={false}
          scanBarcode={true}
          onReadCode={event => {
            set_value_of_publicaddress_receiver(
              event.nativeEvent.codeStringValue,
            );
            console.log(
              'qr is read ha ha ha',
              event.nativeEvent.codeStringValue,
            );
            togglescanqrcode();
          }} // optional
          showFrame={true}
          laserColor="red"
          frameColor="white"
        />
      </View>
    );
  }
  return <View></View>;
  // return (
  //   <View style={styles.container}>
  //     {/* <Text style={styles.item}>Try permissions</Text> */}
  //     <TouchableOpacity
  //       onPress={requestCameraPermission}
  //       style={{height: 20, width: 20, backgroundColor: 'purple'}}>
  //       <Image
  //         source={require('./camera_icon.png')}
  //         style={{
  //           width: 30,
  //           height: 30,
  //           // position: 'absolute',
  //           // top: 100,
  //           // borderColor: 'pink',
  //           // borderWidth: 100,
  //           backgroundColor: 'black',
  //           // right: 40,
  //           // zIndex: 9999,
  //           alignSelf: 'flex-end',
  //         }}
  //       />
  //     </TouchableOpacity>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});

export default App;
