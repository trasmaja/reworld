import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link, Stack } from "expo-router";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [filter, setFilter] = useState(null);
    let button;
    let markerData;

    if (params && params.filter && filter !== params.filter) {
        setFilter(params.filter)
    }


    if (filter === null) {
        button = <TouchableOpacity onPress={() => {
            router.push("/map/qualitySelection");
        }} activeOpacity={0.9} style={styles.overlay}>
            <Text style={styles.text}>Help me</Text>
        </TouchableOpacity>
        markerData = data
    } else {
        button = <TouchableOpacity onPress={() => {
            setFilter(null)
            router.replace('/map')
        }} activeOpacity={0.9} style={styles.overlay}>
            <Text style={styles.text}>Clear selection</Text>
        </TouchableOpacity>
        markerData = data.filter(obj => {
            console.log(obj.accept.includes(filter))
            return obj.accept.includes(filter)
        })
    }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Map", headerTintColor: "#568F6F" }} />
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} showsUserLocation={true} showsMyLocationButton={true} mapPadding={10} initialRegion={{
                latitude: 48.137154,
                longitude: 11.576124,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            }}
            >
                {markerData.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                    >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name={"location"} size={42} color={marker.color} />
                            <Text>{marker.title}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
            {button}
            <StatusBar style="auto" />

        </View>
    );
}

const data = [
    {
        index: 1,
        latlng: { latitude: 48.137154, longitude: 11.576124 },
        title: "H&M",
        description: "H&M - Accepting XYZ.",
        color: "#000",
        accept: ["ripped/stained"]
    },
    {
        index: 2,
        latlng: { latitude: 48.157154, longitude: 11.556124 },
        title: "Zara",
        description: "Zara - Accepting XYZ.",
        color: "#000",
        accept: ['usable', "ripped/stained", "unusable"]
    },
    {
        index: 3,
        latlng: { latitude: 48.127154, longitude: 11.506124 },
        title: "Addidas",
        description: "Addidas - Accepting XYZ.",
        color: "#000",
        accept: ['usable']
    },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: 'absolute',
        bottom: 25,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        width: 200,
        textAlign: 'center',
        justifyContent: 'center',
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
    clearOverlay: {
        position: 'absolute',
        bottom: 25,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        width: 200,
        textAlign: 'center',
        justifyContent: 'center',
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
    text: {
        color: "#555",
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center'
    }
});

// if (filter !== "clear") {
//     button = (
//         <TouchableOpacity onPress={() => {
//             setFilter("clear")
//         }} activeOpacity={0.9} style={styles.clearOverlay}>
//             <Text style={styles.text}>Clear selection</Text>
//         </TouchableOpacity>
//     )
// } else {
//     button = (
//         <TouchableOpacity onPress={() => {
//             router.push("/map/qualitySelection");
//         }} activeOpacity={0.9} style={styles.overlay}>
//             <Text style={styles.text}>Help me</Text>
//         </TouchableOpacity>
//     )
// }