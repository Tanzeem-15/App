import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View, TextInput as ReactTextInput, Keyboard } from "react-native";
import { _GLOBAL_COLORS } from "../Util/ColorConstants";
import LinearGradient from "react-native-linear-gradient";
import { GlobalContext } from "../../App";
import { TextInput } from "react-native-paper";
import Button from "../Components/UI/Button";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainNavigationProp } from "../Navigation/MainNav";

interface LoginDetails {
    userName: string;
    pin_1: string;
    pin_2: string;
    pin_3: string;
    pin_4: string;
}

interface GlobalContextType {
    isLogin: boolean;
    loginDetails: LoginDetails;
}

const SignInPage: React.FC = () => {
    const {
        isLogin,
        loginDetails: {
            userName = '',
            pin_1 = '',
            pin_2 = '',
            pin_3 = '',
            pin_4 = ''
        } = {} as LoginDetails
    } = useContext(GlobalContext) as unknown as GlobalContextType;


    type EnteredDetails = {
        userName: string;
        pin_1: string;
        pin_2: string;
        pin_3: string;
        pin_4: string;
    };

    const navigation = useNavigation<MainNavigationProp>();

    const [enteredDetails, setEnteredDetails] = useState<EnteredDetails>({
        userName: "",
        pin_1: "",
        pin_2: "",
        pin_3: "",
        pin_4: ""
    });
    const [error, setError] = useState({ userName: false, pin: false })

    const firstPinRef = useRef<ReactTextInput>(null);
    const secondPinRef = useRef<ReactTextInput>(null);
    const thirdPinRef = useRef<ReactTextInput>(null);
    const fourthPinRef = useRef<ReactTextInput>(null);

    useEffect(() => {

    }, [isLogin]);

    const updateEnteredDetails = (identifier: keyof EnteredDetails, value: string, index?: number) => {
        if (value.length <= 1) {
            if (value != "" && index == 1) {
                secondPinRef?.current?.focus();
            } else if (value != "" && index == 2) {
                thirdPinRef?.current?.focus();
            } else if (value != "" && index == 3) {
                fourthPinRef?.current?.focus();
            } else if (value == "" && index == 4) {
                thirdPinRef?.current?.focus();
            } else if (value == "" && index == 3) {
                secondPinRef?.current?.focus();
            } else if (value == "" && index == 2) {
                firstPinRef?.current?.focus();
            }
            setEnteredDetails(current => ({
                ...current,
                [identifier]: value
            }));
            setError({ userName: false, pin: false })
        } else if (value.length == 4) {
            const splitValue = value.split("");
            console.log("Value:::", splitValue)
        }
    };

    const renderHeaderImage = () => {
        return (
            <Image
                source={isLogin ? require('../Images/WelcomeBack.png') : require('../Images/Hello.png')}
                style={styles.imageStyle}
            />
        );
    };

    const renderUnameAndPinView = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    mode="flat"
                    style={styles.userNameInputStyle}
                    maxLength={15}
                    label={"User Name"}
                    keyboardType="default"
                    textColor={_GLOBAL_COLORS.TEXT_COLOR_4}
                    value={enteredDetails.userName}
                    onChange={data => updateEnteredDetails('userName', data.nativeEvent.text)}
                    onSubmitEditing={() => firstPinRef.current?.focus()}
                />
                {error.userName && <Text style={styles.errorText}>Enter User Name</Text>}
                <Text style={styles.pinLabelStyle}>Enter Pin</Text>
                <View style={styles.pinContainer}>
                    {[firstPinRef, secondPinRef, thirdPinRef, fourthPinRef].map((inputRef, index) => {
                        const id = `pin_${index + 1}` as keyof EnteredDetails;
                        return (
                            <ReactTextInput
                                ref={inputRef}
                                key={`input_${index}`}
                                style={styles.pinInputStyle}
                                maxLength={4}
                                keyboardType="number-pad"
                                value={enteredDetails[id] || ""}
                                onChange={data => updateEnteredDetails(id, data.nativeEvent.text, index + 1)}
                            />
                        );
                    })}
                </View>
                {error.pin && <Text style={styles.errorText}>Enter 4 digit Pin </Text>}
                <View style={{ height: 10 }} />
                <Button
                    label={"Sign In"}
                    color="#144bb8"
                    textColor="#FFFFFF"
                    onPress={signIn}
                />
            </View >
        );
    };

    const signIn = () => {
        Keyboard.dismiss();
        const { userName, pin_1, pin_2, pin_3, pin_4 } = enteredDetails;
        const errors: { [key: string]: boolean } = {};
        if (userName == "") errors.userName = true;
        if (pin_1 == "" || pin_2 == "" || pin_3 == "" || pin_4 == "") errors.pin = true;

        if (Object.values(errors).some(flag => flag)) {
            setError({ userName: errors.userName, pin: errors.pin });
        } else {
            RNSecureStorage.setItem("UserInfo", JSON.stringify(enteredDetails), { accessible: ACCESSIBLE.WHEN_UNLOCKED }).then((res) => {
                console.log(res);
                navigation.navigate('Home');
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const renderReloginView = () => {
        return (
            <View>
                <Text></Text>
            </View>
        )
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#292828', '#5e5f5c']} style={styles.linearGradient}>
            <View style={styles.mainContainer}>
                {renderHeaderImage()}
                {isLogin ? renderReloginView() : renderUnameAndPinView()}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '20%'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    imageStyle: {
        resizeMode: "contain",
        width: 300,
        height: 200
    },
    pinLabelStyle: {
        marginTop: '5%',
        marginBottom: '3%',
        color: "#FFFFFF",
        fontWeight: 'heavy',
        fontSize: 20,
        textAlign: 'center'
    },
    userNameInputStyle: {
        width: 300,
        backgroundColor: _GLOBAL_COLORS.APP_BACKGROUND,
        overflow: 'hidden',
        fontSize: 17,
        fontWeight: '600',
        color: _GLOBAL_COLORS.TEXT_COLOR_4,
        alignSelf: 'center'
    },
    pinInputStyle: {
        width: 50,
        backgroundColor: _GLOBAL_COLORS.APP_BACKGROUND,
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        color: _GLOBAL_COLORS.TEXT_COLOR_4
    },
    pinContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    errorText: {
        color: _GLOBAL_COLORS.ERROR_TEXT,
        fontSize: 18,
        fontWeight: '800',
        marginTop: 5
    }
});

export default SignInPage;
