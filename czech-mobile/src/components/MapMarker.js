import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { getUploadURL } from '../utils/urls'
import { Marker } from 'react-native-maps'

const MapMarker = ({ data, navigation, isLink }) => {
    return data.map((item) => (
        <Marker
            onPress={() => {
                if (!isLink)
                    navigation.navigate('HireMe', {
                        vacation: item,
                        category: item?.category.name
                    })
            }}
            key={item?.id}
            coordinate={{
                latitude: item?.location?.latitude ? Number(item.location.latitude) : 0,
                longitude: item?.location?.longitude ? Number(item.location.longitude) : 0
            }}
        >
            <View style={styles.mapBox}>
                <Image
                    source={getUploadURL(item.user.image)}
                    style={[styles.iconImg, { borderColor: item.category.color }]}
                />
            </View>
        </Marker>
    ))
}
const styles = StyleSheet.create({
    mapBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    iconImg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2
    }
})
export default MapMarker
