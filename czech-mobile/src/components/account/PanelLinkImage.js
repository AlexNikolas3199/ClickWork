import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getUploadURL } from '../../utils/urls'
const PanelLinkImage = ({ title, onPress, image }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.flexRowSB}>
            <View style={styles.flexRowSB}>
                <Image
                    style={styles.avatar}
                    source={getUploadURL(image)}
                />
                <Text style={{ ...styles.panelText, marginLeft: 10 }}>{title}</Text>
            </View>
            <Icon name="chevron-right" size={16} color={'#000'} />
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
        fontSize: 16,
        fontWeight: 'bold'
    },
    avatar: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 8
    }
})
export default PanelLinkImage
