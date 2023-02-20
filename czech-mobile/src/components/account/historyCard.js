import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HisoryCard = ({ name, address, date, cost, status, categoryName }) => {
    let statusColor = '#24FF00'
    if (status === 'CANCELED') {
        statusColor = '#FF0000'
    }
    return (
        <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{name}</Text>
            <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 18, lineHeight: 18 }}>
                {categoryName}
            </Text>
            <Text style={{ fontSize: 18, lineHeight: 18 }}>{address}</Text>
            <Text style={styles.size18}>{date}</Text>
            <Text style={styles.size18}>Cena</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{cost}</Text>
                <Text style={{ color: statusColor, fontSize: 18, fontWeight: 'normal' }}>
                    {status == 'CANCELED' ? 'OBJEDNÁVKA ZRUŠENA' : 'PRÁCE BYLA PROVEDENA'}
                </Text>
            </View>
        </View>
    )
}

export default HisoryCard

const styles = StyleSheet.create({
    card: {
        paddingVertical: 10,
        width: '100%',
        borderRadius: 16,
        height: 245,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        marginVertical: 7.5
        // alignItems:'center',
    },
    size18:{fontSize:18}
})
