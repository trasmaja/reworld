import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Link, Stack } from "expo-router";
import { useRouter, useLocalSearchParams } from "expo-router";

function collectReward(router) {
    Alert.alert("Reward Collcetd", "Discount code added to your profile page", [
        {
            text: 'Take me there', onPress: () => {
                router.back()
                router.push({
                    pathname: '/profile/'
                });
            }
        },
    ],
        { cancelable: false })
}
export default function Home() {
    const router = useRouter();
    const params = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Reward", headerTintColor: "#568F6F" }} />
            <Text style={{ fontSize: 40, }}>{params.store}</Text>
            <Text style={{ fontSize: 20, padding: 20, marginTop: 40 }}>Great work! {params.store} thanks you for dropping of your clothes for collection. As a thanks they offer you a 10 % discount code.</Text>
            <Button onPress={() => collectReward(router)} title="Collect Reward" />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20
    },
});