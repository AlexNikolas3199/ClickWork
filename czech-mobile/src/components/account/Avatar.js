import React from 'react'
import { Image, StyleSheet } from 'react-native'
import personDefault from '../../assets/personDefault.png'
import { UPLOAD_URL } from './../../utils/urls'
const Avatar = ({ image }) => {
    return <Image style={styles.avatar} source={image ? { uri: UPLOAD_URL + image } : personDefault} />
}

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8
    }
})
export default Avatar
