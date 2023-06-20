import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Home() {
    return (
        <View style={styles.container}>
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
            <TouchableOpacity activeOpacity={0.9} style={styles.overlay}>
                <Text style={styles.text}>Help me</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const markerData = [
    {
        index: 1,
        latlng: { latitude: 48.137154, longitude: 11.576124 },
        title: "H&M",
        description: "H&M - Accepting XYZ.",
        color: "#000"
    },
    {
        index: 2,
        latlng: { latitude: 48.157154, longitude: 11.556124 },
        title: "Zara",
        description: "Zara - Accepting XYZ.",
        color: "#000"
    },
    {
        index: 3,
        latlng: { latitude: 48.127154, longitude: 11.506124 },
        title: "Addidas",
        description: "Addidas - Accepting XYZ.",
        color: "#000"
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
    text: {
        color: "#555",
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center'
    }
});