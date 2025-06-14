import React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../redux/loginReducer";
import { RootState } from "../redux/store";
import Button from "../Components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { MainNavigationProp } from "../Navigation/MainNav";

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<MainNavigationProp>();
    const userName = useSelector((state: RootState) => state.login.loginDetails.userName);

    const logout = () => {
        dispatch(setLoginStatus(false, {}));
        navigation.replace('SignIn');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'red' }}>Home Page</Text>
            {userName && (
                <Text style={{ fontSize: 20, marginVertical: 10 }}>Welcome, {userName}</Text>
            )}
            <Button label="Logout" color="#144bb8" textColor="#fff" onPress={logout} />
        </View>
    );
};

export default HomePage
