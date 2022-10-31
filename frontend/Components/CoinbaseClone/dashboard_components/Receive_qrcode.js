import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';

import QRCode from 'react-native-qrcode-generator';
import btc from './btc.png';
import Clipboard from '@react-native-community/clipboard';

export const Receive_qrcode = ({
  modalVisible,
  toggleqrmodal,
  Publicaddress_sender,
}) => {
  const copyToClipboard = () => {
    Clipboard.setString(Publicaddress_sender);
  };
  //   const [modalVisible, setModalVisible] = useState(true);
  console.log(modalVisible);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          modalVisible = !modalVisible;
          toggleqrmodal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Scan this qr code </Text>
            <View style={{borderColor: 'white', borderWidth: 5}}>
              <QRCode value={Publicaddress_sender} size={250} />
            </View>
            <Text style={[styles.modalText, {marginTop: 30}]}>
              Public address{' '}
            </Text>
            <TouchableOpacity
              style={styles.copyToClipboardButton}
              onPress={() => copyToClipboard()}>
              <Text
                style={{
                  marginTop: 10,
                  padding: 20,
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                  borderColor: 'white',
                  borderWidth: 2,
                }}>
                {Publicaddress_sender}
              </Text>
              <Text style={styles.copyToClipboardText}>Copy to clipboard</Text>
            </TouchableOpacity>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                modalVisible = !modalVisible;
                toggleqrmodal();
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
            <TouchableOpacity
              style={styles.buttonclosemodal}
              onPress={() => toggleqrmodal()}>
              <Text style={styles.buttonText}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'rgba(52,52,52,0.95)',
    borderRadius: 20,
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 15,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  copyToClipboardButton: {
    // position: "absolute",
    bottom: 10,
    alignSelf: 'center',
  },
  copyToClipboardText: {
    color: '#DBA224',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
  },
  buttonclosemodal: {
    alignSelf: 'center',
    backgroundColor: 'red',
    width: '30%',
    height: 40,
    // marginRight: 50,
    borderRadius: 15,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

// export default App;
