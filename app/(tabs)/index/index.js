import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link, Stack } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home", headerTintColor: "#568F6F" }} />
      <Image
        style={{ height: "100%", width: "100%"}}
        source={require('./home.png')}
      />
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
});

