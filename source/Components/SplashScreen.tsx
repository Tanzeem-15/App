import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet } from 'react-native';

const SplashScreen: React.FC = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim]);

    return (
        <View style={styles.mainContainer}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Image
                    source={require('../Images/logo.png')}
                    style={styles.image}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        height: 300,
        width: 300,
        borderWidth: 2,
        borderColor: '#5f5c5c',
        borderRadius: 8
    }
});

export default SplashScreen;
