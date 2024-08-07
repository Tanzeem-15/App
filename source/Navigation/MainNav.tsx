import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react"
import HomePage from "../Pages/HomePage";
import { NavigationProp } from "@react-navigation/native";
import SignInPage from "../Pages/SignInPage";

type RootStackParamList = {
    SignIn: undefined;
    Home: undefined;
};

export type MainNavigationProp = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNav: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='SignIn' component={SignInPage} />
            <Stack.Screen name='Home' component={HomePage} />
        </Stack.Navigator>
    )
}

export default MainNav