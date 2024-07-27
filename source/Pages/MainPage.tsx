import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { _GLOBAL_COLORS } from "../Util/ColorConstants";

const MainPage: React.FC = () => {
    
    return (
        <View style={styles.mainContainer}>
            <Text style={{color:"#FFF", fontWeight:'condensedBold',fontSize:40}}>Main Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: _GLOBAL_COLORS.BACKGROUND_1 ?? 'red'
    }
});

export default MainPage;
