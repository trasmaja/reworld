import { View } from "react-native";
import { Link, Stack } from "expo-router";
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFF" }}>
            <Stack.Screen options={{ title: "Select Quality", headerTintColor: "#568F6F" }} />
            <Text style={styles.title}>
                My clothes are mainly
            </Text>
            <ScrollView contentContainerStyle={styles.container}>
                {categories.map((data, index) => (
                    <TouchableOpacity onPress={() => {
                        // Go back to the previous screen using the imperative API.
                        router.push({
                            pathname: '/map',
                            params: { filter: data.filter },
                        });
                    }} key={index} style={styles.item}>
                        <View style={styles.innerItem}>
                            <Text style={styles.itemText}>
                                {data.title}
                            </Text>
                            <Ionicons style={styles.icon} name={data.iconName} color="#555" size={80} />
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView >

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    title: {
        width: "100%",
        textAlign: "left",
        padding: 10,
        fontSize: 30,
        fontWeight: "bold"
    },
    icon: {
        marginTop: 10,
        width: "100%",
        textAlign: "center",
    },
    item: {
        width: '50%', // is 50% of container width
        height: 200,
        padding: 10,
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
    },
    innerItem: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        borderRadius: 5,
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
    itemText: {
        textAlign: "center",
    }
})

const categories = [
    {
        index: 1,
        title: "Usable",
        iconName: "shirt-outline",
        filter: "usable",
    },
    {
        index: 2,
        title: "Ripped",
        iconName: "cut-outline",
        filter: "ripped/stained",
    },
    {
        index: 3,
        title: "Stained",
        iconName: "color-fill-outline",
        filter: "ripped/stained",
    },
    {
        index: 4,
        title: "Unusable",
        iconName: "trash-bin-outline",
        filter: "unusable",
    },
]