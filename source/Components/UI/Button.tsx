import { Pressable, StyleSheet, Text } from "react-native"
import { _GLOBAL_COLORS } from "../../Util/ColorConstants"

type ButtonProps = {
    label: string,
    color?: string,
    textColor?: string,
    onPress: () => void
}

const Button: React.FC<ButtonProps> = ({ label, color, textColor, onPress }) => {

    return (
        <Pressable
            style={{ ...style.buttonContainer, backgroundColor: color || _GLOBAL_COLORS.APP_BACKGROUND }}
            onPress={onPress}
        >
            <Text style={{ ...style.buttonText, color: textColor || 'black' }}>{label}</Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    buttonContainer: {
        marginVertical: '5%',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20
    }
});

export default Button;