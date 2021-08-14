import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from "react-native-bluetooth-escpos-printer";

export default function App() {
  const scanDevices = () => {
    BluetoothManager.scanDevices().then(
      (s) => {
        var ss = JSON.parse(s); //JSON string
        console.log(">>> ss", ss.foundDs);
      },
      (er) => {
        this.setState({
          loading: false,
        });
        console.log("error", JSON.stringify(er));
      }
    );
  };

  const printReport = async () => {
    console.log(">>>>>> inicio da impressão");

    const reportData = [
      {
        text: "Placa veiculo: ABC-1928\n\r",
      },
      {
        text: `Ota linha: ${new Date()}\n\r`,
        align: BluetoothEscposPrinter.ALIGN.CENTER,
      },
      {
        text: `Cidade: Capital - BR\r`,
      },
    ];

    // await BluetoothEscposPrinter.printerAlign(
    //   BluetoothEscposPrinter.ALIGN.LEFT
    // );

    // await BluetoothEscposPrinter.printText("Placa veiculo: ABC-1928\n\r", {
    //   codepage: 0,
    //   widthtimes: 0,
    //   heigthtimes: 0,
    //   fonttype: 2,
    // });
    // await BluetoothEscposPrinter.printText(`Ota linha: ${new Date()}\n\r`, {
    //   codepage: 0,
    //   widthtimes: 0,
    //   heigthtimes: 0,
    //   fonttype: 5,
    // });

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );
    await BluetoothEscposPrinter.printQRCode(
      "https://github.com/marcelocolla/",
      320,
      1
    );
  };

  const connectPrint = () => {
    BluetoothManager.connect("0F:02:17:42:90:51") // the device address scanned.
      .then((s) => {
        console.log("deu bom", s);
        printReport();
      })
      .catch((err) => {
        console.log("deu ruim", err);
      });
  };

  React.useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        console.log(">>> enabled", enabled); // enabled ==> true /false
        scanDevices();
      },
      (err) => {
        console.log(">>> err", err);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.button} onPress={connectPrint}>
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
