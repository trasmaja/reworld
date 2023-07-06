import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Link, Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams, } from "expo-router";
import React, { useRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import LottieView from 'lottie-react-native';


const copyToClipboard = async (id, animation, setAnimationShow) => {
  setAnimationShow(true)
  await Clipboard.setStringAsync(id);
  animation.current.play();
  setTimeout(() => {
    setAnimationShow(false)
  },1500)
};

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function resetRewards() {
  console.log("reset")
  const value = { data: [] }
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem('my-key', jsonValue);
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('my-key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

function arraysEqual(a, b) {
  console.log("in equal")
  console.log(a)
  console.log("###")
  console.log(b)
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default function Home() {
  const animation = useRef(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [data, setData] = useState({ data: [] });
  const [animationShow, setAnimationShow] = useState(false)

  React.useEffect(() => {
    // Perform some sort of async data or asset fetching.
    async function fetchData() {
      let data = await getData()
      console.log("In fetch data")
      console.log(data)
      setData(data)
    }
    fetchData()

  }, []);


  if (params && params["data"] && !arraysEqual(params["data"].split(","), data["data"])) {
    console.log("---------")
    console.log(params["data"].split(","))
    setData({ data: params["data"].split(",") })
  }

  console.log("#########")
  console.log(data)
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <View style={{}}>
            {/* <Ionicons style={{ marginRight: 15 }} name={"person-circle-outline"} size={100} color={"#333"} /> */}
            <Image
              style={{ height: 100, width: 100, borderRadius: 50, margin: 15 }}
              source={require('./davide.jpeg')}
            />
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Davide Guidi</Text>
          </View>
          <View style={{ width: "100%", height: 0 }}>
          </View>
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 14, marginLeft: 130, marginTop: -50 }}>Joined July 2023</Text>
          </View>
        </View>
        <Stack.Screen options={{ title: "Profile", headerTintColor: "#568F6F" }} />
        {
          data["data"].map((name, index) => (
            <TouchableOpacity onPress={() => copyToClipboard(index < 30 ? ids[index] : makeid(8), animation, setAnimationShow)} style={styles.rewardBox} key={index}>
              <Text style={styles.rewardTitle}>{name} - 10 % Discount</Text>
              <Text style={styles.rewardRed}>Code: {index < 30 ? ids[index] : makeid(8)}</Text>
              <Text style={styles.rewardEx}>Expires: 2023-12-31</Text>
              <Text style={styles.clickCopy}>Click to copy</Text>
            </TouchableOpacity>
          ))
        }
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => { resetRewards() }} style={{ width: "100%", height: 50, }}>
        </TouchableOpacity>
      </ScrollView >
      <View pointerEvents="none" style={{height: 100, width: "100%", position: "absolute", bottom: 0, left: 0, justifyContent: "center", alignItems: "center"}}>
        {animationShow && <LottieView
          loop={false}
          autoPlay={false}
          ref={animation}
          style={{
            width: "100%",
            height: "100%",
            left: 10,
          }}
          source={require('./copied.json')}
        />}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
  },
  rewardBox: {
    backgroundColor: "#FFF",
    height: 160,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5
  },
  rewardTitle: {
    fontWeight: "bold",
    fontSize: 22,
    margin: 20
  },
  rewardRed: {
    flex: 1,
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
  },
  rewardEx: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  clickCopy: {
    position: "absolute",
    bottom: 10,
    left: 10,
  }
});


const ids = [ //Temp solution to keep same ids
  "01y9Bjcm",
  "j1WQCCU5",
  "MKWfwcCG",
  "sJpVUiA1",
  "LbbJDqBM",
  "7LPGOHaR",
  "pvgg3AGI",
  "ZmcSOyIi",
  "3RLMaEcG",
  "ducwlhno",
  "R4IvVV7Y",
  "b1DOeeaB",
  "7S9iNehW",
  "UAny4WxI",
  "8lu86iKe",
  "dOTymzaW",
  "Y8yFAP0M",
  "kOpqztOs",
  "bWzOCSLs",
  "4sHLHg5Q",
  "zjQRhdkA",
  "GvZaxjmE",
  "SfwwQN4T",
  "eef3G7OD",
  "CFVy74kR",
  "VeghQ0es",
  "rvMBKRuu",
  "kkEm4Q5e",
  "Wjbwzi24",
  "8mweLHg0",]