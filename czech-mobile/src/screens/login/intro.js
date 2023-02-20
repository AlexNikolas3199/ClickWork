import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import AsyncStorage from '@react-native-async-storage/async-storage'

const slides = [
    {
        key: '1',
        text: 'Najděte svěho vysněněho pracovíka!',
        image: require('../../assets/intro1.png'),
        backgroundColor: '#22bcb5'
    },
    {
        key: '2',
        text: 'Najděte svoji vysněnou práci!',
        image: require('../../assets/intro2.png'),
        backgroundColor: '#febe29'
    },
    {
        key: '3',
        text: 'Jste připojeni!',
        image: require('../../assets/intro3.png'),
        backgroundColor: '#27AE60'
    }
]
const renderItem = ({ item }) => {
    return (
        <View style={{ ...styles.slide, backgroundColor: item.backgroundColor }}>
            <View></View>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
        </View>
    )
}
const Intro = ({ navigation, route }) => {
    const onDone = async () => {
        await AsyncStorage.setItem('isNotFirstStartApp', 'true')
        navigation.replace('Login')
    }
    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            onDone={route?.params?.info ? navigation.goBack : onDone}
            bottomButton
            showSkipButton
            nextLabel={'další'}
            skipLabel={'přeskočit'}
            doneLabel={'Pokračovat'}
        />
    )
}
const styles = StyleSheet.create({
    slide: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 200
    },
    image: {
        width: '90%',
        resizeMode: 'contain'
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
})

export default Intro
