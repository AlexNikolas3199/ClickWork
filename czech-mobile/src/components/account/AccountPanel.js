import React from 'react'
import { Image,View,Text, StyleSheet } from 'react-native'
import { THEME } from '../../utils/theme'
const AccountPanel = ({ title, text, image, imageStyle, children }) => {
    return (
        <View style={styles.accountPanel}>
            <View style={styles.panelHeading}>
                <View style={styles.iconWrap}>
                    <Image
                        style={imageStyle}
                        source={image}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                    <Text style={styles.panelGrayText}>{text}</Text>
                </View>
            </View>
            <View style={styles.panelMain}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    panelHeading: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconWrap: {
        backgroundColor: THEME.MAIN_COLOR,
        width: 40,
        marginRight: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    panelMain: {
        padding: 16,
        marginVertical: 15,
        backgroundColor: '#e6e6e6',
        borderRadius: 10
    },
})
export default AccountPanel
