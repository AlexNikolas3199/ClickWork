import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from './Icon'

const { width } = Dimensions.get('window')

const CategoryItem = ({ item, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            key={item.id}
            style={[styles.container, style]}
        >
            <View style={[styles.box, { backgroundColor: item.color }]}>
                <Icon name={item.icon} iconFamily={item.iconFamily} size={35} color="white" />
                <Text style={[styles.boxTitle, textStyle]}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 7.5,
    },
    box: {
        borderRadius: 20,
        width: (width-60) / 3 ,
        height: (width-60) / 3 ,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxTitle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 8,
        width: 100
    }
})

export default CategoryItem
