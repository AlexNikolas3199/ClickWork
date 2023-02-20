import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
const PanelLink = ({ title, onPress, children, icon, color }) => {
    return (
        <TouchableOpacity activeOpacity={0.4} onPress={onPress}>
            <View style={styles.flexRowSB}>
                <View style={{ flexGrow: 1 }}>
                    {children}
                    <Text style={{ ...styles.panelText, marginVertical: 5, color: color ? color : '#000' }}>{title}</Text>
                </View>
                <Icon name={icon ? icon : 'chevron-right'} size={16} color={ color ? color :'#000'} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    flexRowSB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    panelText: {
        maxWidth: '98%',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
export default PanelLink
