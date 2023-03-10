import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { THEME } from '../utils/theme'

const MainButton = ({ title, onPress, isGray, myStyle, myTextStyle, leftIcon }) => {
    let buttonStyle = styles.button
    let textStyle = styles.buttonText
    if (isGray) {
        buttonStyle = [styles.button, styles.buttonGrey]
        textStyle = { ...styles.buttonText, color: 'gray' }
    }
    return (
        <TouchableOpacity activeOpacity={0.8} style={[buttonStyle, myStyle]} onPress={onPress}>
            {leftIcon}
            <Text style={{ ...textStyle, ...myTextStyle }}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 7.5,
        paddingVertical: 15,
        paddingHorizontal: 5,
        backgroundColor: THEME.MAIN_COLOR,
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonGrey: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: 'grey'
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    wrap: {
        width: '100%',
        height: '32%',
        flexDirection: 'column'
    }
})

export default MainButton
