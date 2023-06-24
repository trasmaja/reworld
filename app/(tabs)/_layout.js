import { Tabs } from "expo-router"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Stack } from "expo-router";

export default () => {
    return (
        <Tabs>
            <Tabs.Screen  name="index" options={{
                tabBarIcon: ({focused, color, size }) => {
                    let iconName = focused
                        ? 'home'
                        : 'home-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#568F6F',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                headerShown: false,
            }} />
            <Tabs.Screen name="map" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused
                        ? 'map'
                        : 'map-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#568F6F',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                headerShown: false,
            }} />
            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = focused
                        ? 'person'
                        : 'person-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#568F6F',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                headerShown: false,
            }} />
        </Tabs>
    )
}