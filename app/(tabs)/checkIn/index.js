import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Stack } from "expo-router";
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    let extractedData;
    const acceptedStores = ["HM", "Zara"] // reworlddata====HM
    try {
      extractedData = data.split("reworlddata====")[1]
      console.log(extractedData)
      if (acceptedStores.includes(extractedData)) {
        setScanned(true);
        router.push({
          pathname: '/checkIn/reward',
          params: { store: extractedData }, // Can't use H&M due to & making params break
        });
      } else {
        Alert.alert("Error", "QR Code not recognised. Please try again")
        setScanned(true);
      }

    } catch (error) {
      Alert.alert("Error", "QR Code not recognised. Please try again")
      setScanned(true);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Check In", headerTintColor: "#568F6F" }} />
      <View style={styles.info}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.infoTitle}>Check in and earn rewards</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", }}>
          <Text style={styles.infoDesc1}>1. Go to return location</Text>
          <Text style={styles.infoDesc}>2. Drop-off your clothes</Text>
          <Text style={styles.infoDesc}>3. Scan the QR code at the return box</Text>
          <Text style={styles.infoDesc}>4. Get rewards in app</Text>
        </View>
      </View>
      <View style={styles.cameraWrapper}>
        <Text style={{ fontSize: 28, margin: 10 }}>QR Code Scanner</Text>
        <View style={styles.cameraSize}>
          <View style={styles.camera}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
            {scanned && <Button title={'Tap to try again'} onPress={() => setScanned(false)} />}
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraWrapper: {
    flex: 2,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraSize: {
    width: 260,
    height: 260,
    padding: 2,
    borderRadius: 3,
    backgroundColor: "#999",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  info: {
    flex: 1,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 28,
  },
  infoDesc1: {
    fontSize: 18,
    marginTop: 40
  },
  infoDesc: {
    fontSize: 18,
    marginTop: 10
  }
});

// reworlddata====H&M