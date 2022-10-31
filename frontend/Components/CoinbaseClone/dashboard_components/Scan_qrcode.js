import { RNCamera } from "react-native-camera";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { View } from "react-native";

export const Scan_qrcode = (scanqrcode, togglescanqrcode) => {
  if (scanqrcode) {
    return (
      <View>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: "100%",
          }}
        ></RNCamera>
        <Button onPress={togglescanqrcode()}>close</Button>
      </View>
    );
  }
};
