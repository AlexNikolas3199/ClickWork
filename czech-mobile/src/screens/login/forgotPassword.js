import React, {useState} from 'react'
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {THEME} from '../../utils/theme'

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')

    return (
        <View>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    autoCompleteType={'email'}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Введите свою почту"
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => {
                    if (email !== '') {
                        Alert.alert('Email', 'OK', [{ text: 'OK' }])
                    } else {
                        Alert.alert('Error', 'Fill in all the fields!', [{ text: 'OK' }])
                    }
                }}
            >
                <Text style={styles.buttonText}>Restore password</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        padding: 10,
        marginVertical: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    wrapper: {
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 15,
        backgroundColor: THEME.MAIN_COLOR,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
})

export default ForgotPassword
