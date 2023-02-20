import React, { useState, useEffect, useLayoutEffect } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HisoryCard from '../../components/account/historyCard'
import { FIND_MANY_ORDER } from '../../gqls/order/queries'
import LoadingIndicator from '../../components/LoadingIndicator'
import { useLazyQuery } from '@apollo/client'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { THEME } from '../../utils/theme'
import getDate from '../../components/getDate'

const History = ({ navigation, route }) => {
    const [isCustomer, setIsCustomer] = useState(false)
    const dataMe = route.params?.dataMe

    const HeaderToggle = ({ icon, text }) => {
        return dataMe.vacation ? (
            <View style={styles.headerToggle}>
                <Icon name={icon} size={20} color={'#fff'} />
                <Text style={{ color: '#fff' }}>{text}</Text>
            </View>
        ) : null
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ marginRight: 5 }}
                    onPress={() => {
                        setIsCustomer(!isCustomer)
                    }}
                >
                    {!isCustomer ? (
                        <HeaderToggle icon={'shopping-basket'} text={'Zákazník'} />
                    ) : (
                        <HeaderToggle icon={'suitcase'} text={'Vykonavatel'} />
                    )}
                </TouchableOpacity>
            )
        })
    }, [navigation, isCustomer])

    const getWhere = () => {
        if (!isCustomer) {
            return {
                OR: [{ status: { equals: 'COMPLETE' } }, { status: { equals: 'CANCELED' } }],
                userId: { equals: dataMe.id }
            }
        }
        return {
            OR: [{ status: { equals: 'COMPLETE' } }, { status: { equals: 'CANCELED' } }],
            vacation: {
                userId: { equals: dataMe.id }
            }
        }
    }

    const [getOrders, { data, loading, refetch }] = useLazyQuery(FIND_MANY_ORDER, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only'
    })

    useEffect(() => {
        console.log('lol', getWhere())
        getOrders({
            variables: {
                where: getWhere()
            }
        })
    }, [isCustomer])

    const TypePriceCheck = (item) => {
        const l = item?.vacation.league
        const leagues = ['BLOCKED', 'DEFAULT', 'VOID', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND']
        return leagues.findIndex((i) => i === l)
    }

    if (loading) return <LoadingIndicator />
    return (
        <SafeAreaView style={styles.container}>
            {data?.findManyOrder.length !== 0 ? (
                <FlatList
                    style={{ flex: 1, width: '100%', paddingTop: 7.5 }}
                    showsVerticalScrollIndicator={false}
                    data={data?.findManyOrder ? data?.findManyOrder : []}
                    keyExtractor={(item) => item?.id}
                    refreshing={loading}
                    onRefresh={() => {
                        refetch()
                    }}
                    ListFooterComponent={<View style={{ marginTop: 15 }} />}
                    renderItem={({ item }) => {
                        return (
                            <HisoryCard
                                name={
                                    item?.vacation?.user.name + ' ' + item?.vacation?.user.surname
                                }
                                categoryName={item?.categoryName}
                                address={item?.address}
                                date={getDate(item)}
                                cost={
                                    item?.vacation?.category.pricing[TypePriceCheck(item)].price *
                                        item?.duration +
                                    ' Kč'
                                }
                                status={item?.status}
                            />
                        )
                    }}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Žádná historie</Text>
                </View>
            )}
        </SafeAreaView>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerToggle: {
        alignItems: 'center',
        backgroundColor: THEME.MAIN_COLOR,
        padding: 5,
        borderRadius: 10
    },
    textStyle: {
        color: 'blue'
    },
    card: {
        paddingVertical: 10,
        width: '100%',
        borderRadius: 16,
        height: 245,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20
    },
    button: {
        padding: 5,
        width: '40%',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#000000',
        textAlign: 'center',
        lineHeight: 26,
        justifyContent: 'center',
        fontSize: 18
    },
    buttonBlue: {
        padding: 5,
        width: '40%',
        borderRadius: 8,

        backgroundColor: '#0085FF',
        borderColor: '#000000',
        textAlign: 'center',
        lineHeight: 26,
        justifyContent: 'center',
        color: 'white',
        fontSize: 18
    }
})
