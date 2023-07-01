import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Link, Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams, } from "expo-router";
import React, { useRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

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
  const router = useRouter();
  const params = useLocalSearchParams();
  const [data, setData] = useState({ data: [] });

  React.useEffect(async () => {
    // Perform some sort of async data or asset fetching.
    let data = await getData()
    console.log(data)
    setData(data)
  }, []);

  console.log("params")
  console.log(params)
  if (params && params["data"] && !arraysEqual(params["data"].split(","), data["data"])) {
    console.log("---------")
    console.log(params["data"].split(","))
    setData({ data: params["data"].split(",") })
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Profile", headerTintColor: "#568F6F" }} />
      {data["data"].map((name, index) => (
        <View style={styles.rewardBox} key={index}>
          <Text style={styles.rewardTitle}>{name}</Text>
          <Text style={styles.rewardRed}>Redemption Code: {makeid(8)}</Text>
          <Text style={styles.rewardEx}>Expires: 2023-12-31</Text>
        </View>
      ))}
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => { resetRewards() }} style={{ width: "100%", height: 50, }}>

      </TouchableOpacity>
    </ScrollView>
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
    fontSize: 28,
    margin: 10
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
});