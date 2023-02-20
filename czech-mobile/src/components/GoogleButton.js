import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native'

const GoogleButton = ({ onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
            <Image
                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                source={require('../../src/assets/google.png')}
            />
            <Text style={styles.buttonText}> Sign in</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 20,
        padding: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'grey',
        flexGrow: 1,
        marginRight: 5
    },
    buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
})

export default GoogleButton
