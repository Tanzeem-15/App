/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { _GLOBAL_COLORS } from './source/Util/ColorConstants';
import SplashScreen from './source/Components/SplashScreen';
import RNSecureStorage from 'rn-secure-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNav from './source/Navigation/MainNav';

export const GlobalContext = createContext({
  isLogin: false,
  setLoginStatus: () => { },
  loginDetails: {}
})

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [loginDetails, setloginDetails] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setShowSplashScreen(false), 4000);
    RNSecureStorage.getItem("UserInfo").then((result: string | null) => {
      if (result) {
        console.log("Received Result:", result);
        try {
          const details = JSON.parse(result);
          // setLoginStatus(true, details);
        } catch (error) {
          console.log('Error parsing JSON:', error);
          setLoginStatus(false, {});
        }
      } else {
        setLoginStatus(false, {});
      }
    }).catch((err) => {
      console.log(err);
      setLoginStatus(false, {});
    });
    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);

  const setLoginStatus = (flag: boolean = false, details: { [key: string]: string } = {}) => {
    setIsLogin(flag)
    setloginDetails(details);
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.mainContainer}>
        {showSplashScreen ?
          <SplashScreen />
          :
          <GlobalContext.Provider value={{
            isLogin,
            setLoginStatus,
            loginDetails
          }}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}>
                <Stack.Screen name='initial' component={MainNav} />
              </Stack.Navigator>
            </NavigationContainer>
          </GlobalContext.Provider>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _GLOBAL_COLORS.APP_BACKGROUND,
  }
});

export default App;
