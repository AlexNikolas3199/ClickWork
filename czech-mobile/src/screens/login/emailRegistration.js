import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { useMutation } from '@apollo/client'
import MainButton from './../../components/MainButton'
import { THEME } from '../../utils/theme'
import { SIGN_UP_EMAIL } from '../../gqls/user/mutation'
import { showMessage } from 'react-native-flash-message'
import DarkLoadingIndicator from '../../components/DarkLoadingIndicator'

const EmailRegistration = ({ navigation }) => {
    const [signUpEmail] = useMutation(SIGN_UP_EMAIL, {
        onCompleted: () => {
            setLoader(false)
            navigation.replace('Login')
        },
        onError: () => {
            setLoader(false)
            Alert.alert('Error', 'Auth error', [{ text: 'OK' }])
        }
    })
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)

    const getToken = async () => {
        setLoader(true)
        const data = await auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                setLoader(false)
                if (error.code === 'auth/email-already-in-use')
                    showMessage({
                        message: 'E-mailová adresa je již používána!',
                        type: 'error'
                    })
                if (error.code === 'auth/invalid-email')
                    showMessage({
                        message: 'E-mailová adresa je neplatná!',
                        type: 'danger'
                    })
                if (error.code === 'auth/weak-password')
                    showMessage({
                        message: 'Slabé heslo',
                        type: 'danger'
                    })
            })
        if (!data && !data.user) {
            setLoader(false)
            Alert.alert('Error', 'Fill in all the fields!', [{ text: 'OK' }])
            return
        }
        const token = await auth().currentUser.getIdToken()
        if (!token) {
            setLoader(false)
            Alert.alert('Error', 'Fill in all the fields!', [{ text: 'OK' }])
            return
        }

        signUpEmail({
            variables: {
                data: {
                    token,
                    name,
                    surname
                }
            }
        })
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ width: '100%', alignItems: 'center', paddingTop: 15 }}>
                    <TextInput
                        style={styles.input}
                        autoCompleteType={'name'}
                        onChangeText={(text) => setName(text)}
                        placeholder="Jméno"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setSurname(text)}
                        placeholder="Příjmení"
                    />
                    <TextInput
                        style={styles.input}
                        autoCompleteType={'email'}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        autoCompleteType={'password'}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Heslo"
                    />
                </View>
                <View style={{ padding: 20, width: '100%' }}>
                    <MainButton
                        title="Zaregistrovat"
                        onPress={async () => {
                            if (email !== '' && password !== '') {
                                await getToken()
                            } else {
                                Alert.alert('Error', 'Fill in all the fields!', [{ text: 'OK' }])
                            }
                        }}
                    />
                </View>
            <DarkLoadingIndicator isVisible={loader} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        width: '90%',
        padding: 10,
        borderColor: THEME.GREY_COLOR,
        borderWidth: 1,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8
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

export default EmailRegistration
