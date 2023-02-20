import React from 'react'
import {Image, ImageBackground, StyleSheet, View} from 'react-native'
import {THEME} from '../utils/theme'
import ImageDefault from '../assets/ImageDefault.png'

const UploadImage = ({ image }) => {
    return (
        <View style={styles.imageWrapper}>
            <ImageBackground style={styles.image} source={image}/>
            <Image style={styles.ImageDefault} source={ImageDefault}/>
        </View>
    )
}

const styles = StyleSheet.create({
    imageWrapper: {
        height: 140,
        borderWidth: 2,
        borderColor: THEME.GREY_COLOR,
        overflow: 'hidden',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageDefault: {
        width: 90,
        height: 90
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center'
    }
})
export default UploadImage
