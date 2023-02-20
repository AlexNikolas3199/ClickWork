import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Linking,
    TouchableOpacity
} from 'react-native'
import Icon from '../components/Icon'
import MainButton from '../components/MainButton'
import { THEME } from '../utils/theme'

const Contacts = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.flex}>
                <TouchableOpacity
                    onPress={() => Linking.openURL('mailto:clickwork.cz@gmail.com')}
                    style={styles.wrapper}
                >
                    <View style={styles.icon}>
                        <Icon name="envelope" size={20} color={THEME.MAIN_COLOR} />
                    </View>
                    <Text style={styles.link}>clickwork.cz@gmail.com</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Linking.openURL('tel:+420774706065')}
                    style={styles.wrapper}
                >
                    <View style={styles.icon}>
                        <Icon name="phone" size={20} color={THEME.MAIN_COLOR} />
                    </View>
                    <Text style={styles.link}>+420774706065</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://goo.gl/maps/NzmrkJpmi4p7gZe87')}
                    style={styles.wrapper}
                >
                    <View style={styles.icon}>
                        <Icon name="home" size={20} color={THEME.MAIN_COLOR} />
                    </View>
                    <Text style={styles.link}>Moulíkova 3285/1a 150 00 Praha 5 Smíchov</Text>
                </TouchableOpacity>
                <View style={{ height: 15 }} />
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <MainButton title="OK" onPress={() => navigation.goBack()} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 7.5
    },
    wrapper: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        marginVertical: 7.5,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    icon: {
        padding: 15,
        borderRightWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        justifyContent: 'center'
    },
    buttonWrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        borderColor: THEME.MAIN_COLOR,
        borderTopWidth: 2
    },
    link: {
        color: THEME.MAIN_COLOR,
        fontSize: 16,
        textDecorationLine: 'underline',
        padding: 15,
        flex: 1
    }
})

export default Contacts
