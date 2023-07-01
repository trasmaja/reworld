import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Link, Stack } from "expo-router";
import { useRouter, useLocalSearchParams } from "expo-router";
import LottieView from 'lottie-react-native';
import React, { useRef, useEffect } from 'react';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';

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
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
        setTimeout(() => {
            randomOpacity.value = 1;
        }, 1000)

    }, []);
    const router = useRouter();
    const params = useLocalSearchParams();
    const randomOpacity = useSharedValue(0);

    const config = {
        duration: 2000,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = useAnimatedStyle(() => {
        return {
            opacity: withTiming(randomOpacity.value, config)
        };
    });

    return (
        <View style={styles.container}>
            <LottieView
                loop={false}
                autoPlay
                ref={animation}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                // source={require('./success-celebration.json')}
                // source={require('./party-celebration.json')}
                source={require('./golden-confetti-new.json')}
            />
            <Stack.Screen options={{ title: "Reward", headerTintColor: "#568F6F" }} />
            <Text style={{ fontSize: 40, }}>{params.store}</Text>
            <Animated.View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, style]}>
                <Text style={{ fontSize: 20, padding: 20, marginTop: 40 }}>Great work! {params.store} thanks you for dropping of your clothes for collection. As a thanks they offer you a 10 % discount code.</Text>
                <Button onPress={() => collectReward(router)} title="Collect Reward" />
            </Animated.View>
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