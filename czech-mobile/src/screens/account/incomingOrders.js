import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useQuery } from '@apollo/client'
import Card from '../../components/account/zakazCard'
import { ME } from '../../gqls/user/queries'
import { INCOMING_ORDERS } from '../../gqls/order/queries'
import LoadingIndicator from '../../components/LoadingIndicator'
import getDate from '../../components/getDate'

const incomingOrders = () => {
    const { data: dataMe, loading: loadingMe } = useQuery(ME)
    const { data, loading, refetch } = useQuery(INCOMING_ORDERS, {
        variables: {
            id: dataMe?.me?.id
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only'
    })

    if (loading || loadingMe) return <LoadingIndicator />

    const TypePriceCheck = () => {
        const leagues = ['BLOCKED', 'DEFAULT', 'VOID', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND']
        return leagues.findIndex((i) => i === dataMe?.me?.vacation?.league)
    }

    const orders = data?.findManyOrder
    return (
        <SafeAreaView style={styles.container}>
            {orders?.length === 0 ? (
                <Text>Žádné příchozí objednávky</Text>
            ) : (
                <FlatList
                    style={styles.flat}
                    showsVerticalScrollIndicator={false}
                    data={orders ? orders : []}
                    refreshing={loading}
                    onRefresh={refetch}
                    keyExtractor={(item) => item?.id}
                    ListFooterComponent={<View style={{ marginTop: 15 }} />}
                    renderItem={({ item }) => {
                        return (
                            <Card
                                id={item.id}
                                name={item.user.surname + ' ' + item.user.name}
                                phone={item.user.phone}
                                address={item.address}
                                status={item.status}
                                date={getDate(item)}
                                cost={
                                    item?.vacation?.category.pricing[TypePriceCheck(item)].price *
                                        item.duration +
                                    ' Kč'
                                }
                                toMap={() => {
                                    navigation.navigate('IncomingOrderMap', { item })
                                }}
                            />
                        )
                    }}
                />
            )}
        </SafeAreaView>
    )
}

export default incomingOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    flat: { flex: 1, width: '100%', paddingTop: 7.5 }
})
