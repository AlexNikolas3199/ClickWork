import React from 'react'
import { Alert, Linking, StyleSheet, Text, View } from 'react-native'
import { useMutation } from '@apollo/client'
import { UPDATE_ONE_ORDER } from '../../gqls/order/mutations'
import MainButton from '../MainButton'
import Icon from 'react-native-vector-icons/FontAwesome5'

const statuses = {
    IN_PROGRESS: () => {
        return <Text style={{ color: '#00B2FF', fontSize: 18, fontWeight: 'normal' }}>Probíhá</Text>
    },
    AWAITING: () => {
        return <Text style={{ color: '#FFB800', fontSize: 18, fontWeight: 'normal' }}>Čekat</Text>
    },
    CANCELED: () => {
        return (
            <Text style={{ color: '#FFB800', fontSize: 18, fontWeight: 'normal' }}>Zrušovat</Text>
        )
    }
}

const Card = ({ id, name, address, date, cost, status, phone, toMap }) => {
    const [save] = useMutation(UPDATE_ONE_ORDER)
    const onCancel = async () => {
        await Alert.alert('Zrušit', 'Zrušit objednávku?', [
            {
                text: 'Zrušit',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () =>
                    save({
                        variables: {
                            where: {
                                id
                            },
                            data: {
                                status: {
                                    set: 'CANCELED'
                                }
                            }
                        }
                    })
            }
        ])
    }
    const onApply = async () => {
        await Alert.alert('Použít', 'Použít objednávku?', [
            {
                text: 'Zrušit',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () =>
                    save({
                        variables: {
                            where: {
                                id
                            },
                            data: {
                                status: {
                                    set: 'IN_PROGRESS'
                                }
                            }
                        }
                    })
            }
        ])
    }

    return (
        <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{name}</Text>
            <Text style={{ fontSize: 18 }}>{address}</Text>
            <Text style={{ fontSize: 18 }}>{date}</Text>
            <Text style={{ fontSize: 18 }}>Cena</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{cost}</Text>
                {statuses[status]()}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                {status === 'AWAITING' ? (
                    <View style={styles.buttons}>
                        <MainButton
                            myStyle={[styles.button, { marginRight: 5 }]}
                            onPress={onCancel}
                            title="Zrušit"
                            isGray
                            leftIcon={
                                <Icon
                                    name="thumbs-down"
                                    size={15}
                                    color="gray"
                                    style={{ marginRight: 5 }}
                                />
                            }
                        />
                        <MainButton
                            myStyle={[styles.button, { marginLeft: 5 }]}
                            onPress={onApply}
                            title="Použít"
                            leftIcon={
                                <Icon
                                    name="thumbs-up"
                                    size={15}
                                    color="#fff"
                                    style={{ marginRight: 5 }}
                                />
                            }
                        />
                    </View>
                ) : (
                    <View style={styles.buttons}>
                        {/* <MainButton
                            onPress={toMap}
                            isGray
                            myStyle={[styles.button, { marginRight: 5 }]}
                            title="Show in map"
                        /> */}
                        <MainButton
                            myStyle={styles.button}
                            leftIcon={
                                <Icon
                                    name="phone"
                                    size={15}
                                    color="#fff"
                                    style={{ marginRight: 5 }}
                                />
                            }
                            title="Zavolat"
                            onPress={() => {
                                Linking.openURL(`tel:${phone}`)
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 245,
        marginVertical: 7.5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: { paddingVertical: 10, flex: 1, marginTop: 10 },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 26
    }
})
