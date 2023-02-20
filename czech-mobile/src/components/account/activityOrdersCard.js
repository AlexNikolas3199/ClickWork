import React from 'react'
import { Linking, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MainButton from '../MainButton'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { THEME } from '../../utils/theme'

const ActivityOrdersCard = ({
    id,
    name,
    surname,
    address,
    date,
    phone,
    cost,
    status,
    onPress,
    toMap
}) => {
    const statuses = {
        IN_PROGRESS: () => {
            return (
                <>
                    <Text style={{ color: '#00B2FF', fontSize: 18, fontWeight: 'normal' }}>
                        Probíhá
                    </Text>
                    <View style={styles.buttons}>
                        <MainButton
                            onPress={toMap}
                            isGray
                            leftIcon={
                                <Icon
                                    style={{ marginRight: 5 }}
                                    name="map-marked-alt"
                                    size={15}
                                    color={'gray'}
                                />
                            }
                            myStyle={[styles.button, { marginRight: 5 }]}
                            title="Zobrazit v mapě"
                        />
                        <MainButton
                            onPress={onPress}
                            myStyle={[styles.button, { marginLeft: 5 }]}
                            title="Accept work"leftIcon={
                                <Icon
                                    style={{ marginRight: 5 }}
                                    name="check"
                                    size={15}
                                    color={'#fff'}
                                />
                            }
                        />
                    </View>
                </>
            )
        },
        AWAITING: () => {
            return (
                <Text style={{ color: '#FFB800', fontSize: 18, fontWeight: 'normal' }}>Čekat</Text>
            )
        },
        CANCELED: () => {
            return (
                <Text style={{ color: '#FFB800', fontSize: 18, fontWeight: 'normal' }}>
                    Zrušovat
                </Text>
            )
        }
    }
    return (
        <View style={styles.card} key={id}>
            {phone ? (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL(`tel:${phone}`)}
                    style={styles.call}
                >
                    <Icon name="phone" size={15} color="#fff" />
                </TouchableOpacity>
            ) : null}
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{name + ' ' + surname}</Text>
            <Text style={{ fontSize: 18 }}>{address}</Text>
            <Text style={{ fontSize: 18 }}>{date}</Text>
            <Text style={{ fontSize: 18 }}>Cena</Text>
            <View style={styles.flexSB}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{cost}</Text>
                {statuses[status]()}
            </View>
        </View>
    )
}

export default ActivityOrdersCard

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        padding: 15,
        marginVertical: 7.5
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: { paddingVertical: 10, flex: 1, marginTop: 10 },
    flexSB: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
    call: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: THEME.MAIN_COLOR,
        borderRadius: 100,
        padding: 10,
        margin: 15,
        zIndex:10
    }
})
