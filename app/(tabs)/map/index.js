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
      <Text style={styles.text}>Filter</Text>
    </TouchableOpacity>
    markerData = data
  } else {
    button = <TouchableOpacity onPress={() => {
      setFilter(null)
      router.replace('/map')
    }} activeOpacity={0.9} style={styles.overlay}>
      <Text style={styles.text}>Clear filter</Text>
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
              <Text style={{ color: "#000", fontWeight: "bold" }}>{marker.title}</Text>
            </View>
            <Callout onPress={() => getDirections(marker.latlng)}>
              <View style={{ width: 150, height: "100%" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{marker.title}</Text>
                <Text style={{ fontSize: 14 }}>{marker.description}</Text>
                <Text style={{ color: "#0E7AFE", marginTop: 10, fontSize: 16, fontWeight: "bold" }}>Get directions</Text>
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
    title: "HM",
    description: "HM Store",
    color: "#02BB86",
    accept: ['usable', "ripped/stained", "unusable"]
  },
  {
    index: 2,
    latlng: { latitude: 48.157154, longitude: 11.556124 },
    title: "Zara",
    description: "Zara Store",
    color: "#02BB86",
    accept: ['usable', "ripped/stained", "unusable"]
  },
  {
    index: 3,
    latlng: { latitude: 48.152340, longitude: 11.577090 },
    title: "Oxfam",
    description: "Second Hand Shop",
    color: "#02BB86",
    accept: ['usable']
  },
  {
    index: 4,

    latlng: { latitude: 48.136589, longitude: 11.548120 },

    title: "H&M",

    description: "H&M Store",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  }, {

    index: 5,

    latlng: { latitude: 48.121840, longitude: 11.599120 },

    title: "AWG München",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  }, {

    index: 6,

    latlng: { latitude: 48.136740, longitude: 11.566370 },

    title: "AWG München",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  }, {

    index: 7,

    latlng: { latitude: 48.138240, longitude: 11.564580 },

    title: "ReSales",

    description: "Second Hand Shop",

    color: "#02BB86",

    accept: ['usable']

  }, {

    index: 8,

    latlng: { latitude: 48.147100, longitude: 11.543170 },

    title: "AWG München",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 9,

    latlng: { latitude: 48.138000, longitude: 11.510540 },

    title: "Deutches Rotes Kreuz",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 10,

    latlng: { latitude: 48.183580, longitude: 11.532580 },

    title: "H&M",

    description: "H&M Store",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 11,

    latlng: { latitude: 48.127490, longitude: 11.535470 },

    title: "Deutsches Rotes Kreuz",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 12,

    latlng: { latitude: 48.149690, longitude: 11.453990 },

    title: "Deutsches Rotes Kreuz",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 13,

    latlng: { latitude: 48.180140, longitude: 11.548170 },

    title: "AWG München",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 14,

    latlng: { latitude: 48.159840, longitude: 11.579200 },

    title: "ReSales",

    description: "Second Hand Shop",

    color: "#02BB86",

    accept: ['usable']

  },
  {
    index: 15,

    latlng: { latitude: 48.139660, longitude: 11.575630 },

    title: "Zara",

    description: "Zara Store",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 16,

    latlng: { latitude: 48.158990, longitude: 11.584880 },

    title: "Zara",

    description: "Zara Store",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 17,

    latlng: { latitude: 48.166290, longitude: 11.619160 },

    title: "AWG München",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 18,

    latlng: { latitude: 48.137590, longitude: 11.572080 },

    title: "C&A",

    description: "C&A Store",

    color: "#02BB86",

    accept: ['usable']

  },
  {
    index: 19,

    latlng: { latitude: 48.183050, longitude: 11.535770 },

    title: "C&A",

    description: "C&A Store",

    color: "#02BB86",

    accept: ['usable']

  },
  {
    index: 20,

    latlng: { latitude: 48.132180, longitude: 11.691160 },

    title: "Zara",

    description: "Zara Store",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 21,

    latlng: { latitude: 48.166460, longitude: 11.561720 },

    title: "AWG München",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 22,

    latlng: { latitude: 48.174210, longitude: 11.540790 },

    title: "Deutsches Rotes Kreuz",

    description: "Collector Bin",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  },
  {
    index: 23,

    latlng: { latitude: 48.148680, longitude: 11.462270 },

    title: "H&M",

    description: "H&M Store",

    color: "#02BB86",

    accept: ['usable', "ripped/stained", "unusable"]

  }
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
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
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
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
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
  }
]

// const data = [
//   {
//       index: 1,
//       latlng: { latitude: 48.137154, longitude: 11.576124 },
//       title: "H&M",
//       description: "Accepting: ripped/stained",
//       color: "#02BB86",
//       accept: ["ripped/stained"]
//   },
//   {
//       index: 2,
//       latlng: { latitude: 48.157154, longitude: 11.556124 },
//       title: "Zara",
//       description: "Accepting: usable, ripped/stained, and unusable.",
//       color: "#02BB86",
//       accept: ['usable', "ripped/stained", "unusable"]
//   },
//   {
//       index: 3,
//       latlng: { latitude: 48.127154, longitude: 11.506124 },
//       title: "Adidas",
//       description: "Accepting: usable",
//       color: "#02BB86",
//       accept: ['usable']
//   },
// ]
