import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";

import QRCode from "react-native-qrcode-generator";
import btc from "./btc.png";
import Clipboard from "@react-native-community/clipboard";

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
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}></View>
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
    backgroundColor: "rgba(52,52,52,0.95)",
    borderRadius: 20,
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 15,

    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  copyToClipboardButton: {
    // position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  copyToClipboardText: {
    color: "#DBA224",
    textAlign: "center",
    marginTop: 30,
    fontSize: 20,
  },
  buttonclosemodal: {
    alignSelf: "center",
    backgroundColor: "red",
    width: "30%",
    height: 40,
    // marginRight: 50,
    borderRadius: 15,
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

// export default App;
