import React, { useState, useEffect } from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation } from '@apollo/client'
import { showMessage } from 'react-native-flash-message'
import FacebookLoginButton from '../../components/FacebookLoginButton'
import MainButton from '../../components/MainButton'
import GoogleButton from '../../components/GoogleButton'
import { THEME } from '../../utils/theme'
import { SIGN } from '../../gqls/user/mutation'
import { ME } from '../../gqls/user/queries'
import DarkLoadingIndicator from '../../components/DarkLoadingIndicator'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '639891194417-m0gvj8l4p5hi7jptpo73ahljtb500i0l.apps.googleusercontent.com',
            offlineAccess: false,
        });
    }, [])

    const [sign] = useMutation(SIGN, {
        onError: () => {
            setLoader(false)
            showMessage({
                message: 'Nesprávná pošta nebo heslo',
                type: 'danger'
            })
        },
        onCompleted: async ({ sign }) => {
            setLoader(false)
            await AsyncStorage.setItem('token', sign.token)
            navigation.replace('Main')
        },
        update: (cache, data) => {
            cache.writeQuery({ query: ME, data: { me: data?.user } })
        }
    })

    const getToken = async () => {
        setLoader(true)
        const data = await auth()
            .signInWithEmailAndPassword(email, password)
            .catch((e) => {
                setLoader(false)
                showMessage({
                    message: 'Nesprávná pošta nebo heslo',
                    type: 'danger'
                })
            })
        if (!data && !data.user) {
            setLoader(false)
            showMessage({
                message: 'Vyplňte všechna pole!',
                type: 'danger'
            })
            return null
        }
        const token = await auth().currentUser.getIdToken()
        if (!token) {
            setLoader(false)
            showMessage({
                message: 'No token',
                type: 'danger'
            })
            return null
        }
        sign({ variables: { data: { token } } })
    }

    const signInGoogle = async () => {
        try{
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            const token = await auth().currentUser.getIdToken()
            sign({ variables: { data: { token } } })
        } catch (error){
            console.log(error)
        }
    }

    const alertConsent = (f) => {
        Alert.alert(
            'Souhlas',
            'Přečtěte si souhlas se zpracováním osobních údajů a poté stiskněte tlačítko "OK", pokud souhlasíte.',
            [
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
                    onPress: f
                }
            ]
        )
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}
        >
            <SafeAreaView style={styles.flexCenter}>
                <View style={{marginTop:20}}>
                </View>
                <View style={styles.wrapper}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={styles.image} source={require('../../assets/Register.png')} />
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
                        <TouchableOpacity
                            onPress={async () => navigation.push('ForgotPassword')}
                            activeOpacity={0.7}
                            style={styles.forgot}
                        >
                            <Text style={{ color: 'gray' }}>Zapomněli jste heslo ?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
                        <MainButton
                            title="Přihlásit"
                            onPress={() => {
                                if (email !== '' && password !== '') {
                                    getToken()
                                    return null
                                }
                                showMessage({
                                    message: 'Vyplňte všechna pole!',
                                    type: 'danger'
                                })
                            }}
                        />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    <MainButton
                        isGray={true}
                        title="Registrace E-Mailu"
                        myStyle={{ borderRadius: 5 }}
                        onPress={() => {
                            alertConsent(() => navigation.navigate('EmailRegistration'))
                        }}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <GoogleButton
                            onPress={() => {
                                // alertConsent(() =>
                                 signInGoogle()
                                //  )
                            }}
                        />
                        <FacebookLoginButton navigation={navigation} />
                    </View>
                </View>
            <DarkLoadingIndicator isVisible={loader} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    flexCenter: {
        flex: 1,
        justifyContent: 'space-between'
    },
    image: {
        marginBottom: 10,
        width: '90%',
        height: 200,
        resizeMode: 'contain'
    },
    text: {
        color: '#fff'
    },
    input: {
        width: '90%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderColor: THEME.GREY_COLOR,
        borderWidth: 1,
        borderRadius: 8
    },
    forgot: {
        width: '90%',
        marginTop: 5,
        marginLeft: 5
    },
    wrapper: {
        marginVertical: 10
    }
})

export default Login
