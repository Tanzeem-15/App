import React from "react";
import { Text, View } from "react-native";

const HomePage: React.FC = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'red' }}>Home Page</Text>
        </View>
    )
}

export default HomePage