import { from } from '@apollo/client'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { THEME } from '../../utils/theme'

const ProfSquare = ({ title, value }) => {
    return (
        <View style={styles.ProfSquare}>
            <Text style={styles.grayText}>{title}</Text>
            <Text style={styles.boldText}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ProfSquare: {
        backgroundColor: THEME.BACKGROUND_COLOR,
        width: 95,
        height: 95,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boldText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    grayText: {
        color: 'gray',
        fontSize: 16
    },

})
export default ProfSquare
