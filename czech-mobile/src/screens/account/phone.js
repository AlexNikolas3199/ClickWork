import React from 'react'
import { useState, useEffect } from "react"
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default (() => {
    return (
        <View style={styles.container}>


            <View style={styles.input}><TextInput style={{ marginLeft: 10 }} placeholder="Telefon"></TextInput></View>

            <View style={styles.button}>
                    <Text style={styles.text}>Použít</Text>
                </View>

        </View>
    )
})


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems:'center',
        marginVertical:15,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0085FF',
        width: '90%',
        height: 40,
        borderRadius: 8,
        marginTop: 20,
    },
    text: {
        color: 'white'
    },

    bott: {
        justifyContent: 'flex-end',
        width: '100%',
        flex: 1
    },
    input: {
 
        width: "90%",
        backgroundColor: "white",
        borderRadius: 5
    }
})


