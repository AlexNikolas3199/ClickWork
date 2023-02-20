import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { gql, useMutation } from '@apollo/client'

const SIGN_IN_FACEBOOK = gql`
    mutation SignInFacebook($token: String!) {
        sign(data: { token: $token }) {
            token
        }
    }
`

async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

    if (result.isCancelled) {
        throw 'User cancelled the login process'
    }

    // Once signed in, get the users AccesToken
    const dataFacebook = await AccessToken.getCurrentAccessToken()

    if (!dataFacebook) {
        throw 'Something went wrong obtaining access token'
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(dataFacebook.accessToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential)
}

const FacebookLoginButton = ({ navigation }) => {
    const [SignInFacebook, { data }] = useMutation(SIGN_IN_FACEBOOK)

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() =>
                Alert.alert('Souhlas', 'Přečtěte si souhlas se zpracováním osobních údajů a poté stiskněte tlačítko "OK", pokud souhlasíte.', [
                    {
                        text: 'Zrušit',
                        style: 'cancel'
                    },
                    {
                        text: 'Přečíst',
                        onPress: async () => {
                            navigation.navigate('ConsentData')
                        }
                    },
                    {
                        text: 'OK',
                        onPress: () =>
                            onFacebookButtonPress().then(async () => {
                                const token = await auth().currentUser.getIdToken()

                                await SignInFacebook({ variables: { token } }).then(
                                    async (data) => {
                                        await AsyncStorage.setItem('token', data.data.sign.token)
                                        await navigation.replace('Main')
                                    }
                                )
                            })
                    }
                ])
            }
        >
            <Icon name="facebook-square" size={20} color={'#fff'} />
            <Text style={styles.text}> Sign In</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        marginLeft: 15,
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#3b5998',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        flexGrow: 1
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})
export default FacebookLoginButton
