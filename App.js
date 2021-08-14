import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from "react-native-bluetooth-escpos-printer";

export default function App() {
  React.useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        console.log(enabled); // enabled ==> true /false
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.button}>
        <Text>Imprimir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#777",
  },
});
