import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Link, Stack } from "expo-router";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';

function getDirections(cords) {
    const url = "https://www.google.com/maps/search/?api=1&query=" + cords.latitude + "," + cords.longitude;
    console.log(url)
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err));
}

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
            <MapView provider={PROVIDER_GOOGLE} customMapStyle={generatedMapStyle} style={styles.map} showsUserLocation={true} showsMyLocationButton={true} mapPadding={10} initialRegion={{
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
                            <Text style={{ color: marker.color }}>{marker.title}</Text>
                        </View>
                        <Callout onPress={() => getDirections(marker.latlng)}>
                            <View style={{width: 100, height: "100%"}}>
                                <Text>{marker.title}</Text>
                                <Text>{marker.description}</Text>
                                <Text>Get directions</Text>
                            </View>
                        </Callout>
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
        color: "#02BB86",
        accept: ["ripped/stained"]
    },
    {
        index: 2,
        latlng: { latitude: 48.157154, longitude: 11.556124 },
        title: "Zara",
        description: "Zara - Accepting XYZ.",
        color: "#02BB86",
        accept: ['usable', "ripped/stained", "unusable"]
    },
    {
        index: 3,
        latlng: { latitude: 48.127154, longitude: 11.506124 },
        title: "Adidas",
        description: "Adidas - Accepting XYZ.",
        color: "#02BB86",
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

const generatedMapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]