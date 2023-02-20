import React from 'react'
import { Image, ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logo from '../../assets/logo.png'
const Loader = ({ navigation }) => {
    let isNotFirst
    const getIsNotFirst = async () => {
        isNotFirst = await AsyncStorage.getItem('isNotFirstStartApp')
    }
    let token
    const getToken = async () => {
        token = await AsyncStorage.getItem('token')
    }
    getIsNotFirst()
    getToken()
    const checkIsFirstStart = () => {
        if (token) navigation.replace('Main')
        else if (isNotFirst) {
            navigation.replace('Login')
        } else {
            navigation.replace('Intro')
        }
    }
    setTimeout(checkIsFirstStart, 1000)
    return (
        <SafeAreaView style={styles.wrapper}>
            <ImageBackground style={styles.imageBack} source={require('../../assets/logoBack.png')}>
                <Image style={{ height: 100, width: '100%', resizeMode: 'contain' }} source={logo} />
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBack: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    }
})

export default Loader
