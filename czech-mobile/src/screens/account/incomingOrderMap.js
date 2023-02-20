import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { THEME } from '../../utils/theme'
import LoadingIndicator from '../../components/LoadingIndicator'
import MapMarker from '../../components/MapMarker'

const IncomingOrderMap = ({ navigation, route }) => {
    const [myPosition, setMyPosition] = useState(null)
    useEffect(() => {
        console.log('change')
        Geolocation.getCurrentPosition((info) => {
            setMyPosition({ latitude: info?.coords?.latitude, longitude: info?.coords?.longitude })
        })
    }, [])
    const item = route?.params?.item?.vacation
    console.log(myPosition)
    console.log(item, 'item')
    return (
        <View style={[styles.container, { justifyContent: 'flex-end', alignItems: 'flex-end' }]}>
            <View style={{ width: '100%', height: '90%' }}>
                <View style={[styles.container, { backgroundColor: '#fff' }]}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.goBack()}
                        style={styles.arrow}
                    >
                        <Icon name="arrow-left" size={28} color={THEME.TEXT_COLOR} />
                    </TouchableOpacity>
                    {!myPosition ? (
                        <LoadingIndicator />
                    ) : (
                        <MapView
                            style={styles.wrapper}
                            initialRegion={myPosition}
                        >
                            <MapViewDirections
                                origin={myPosition}
                                destination={{
                                    latitude: item?.location?.latitude,
                                    longitude: item?.location?.longitude
                                }}
                                apikey={'AIzaSyC1rO31QNgNc8_Fruu6gui2QsH9qtEOBaI'}
                                strokeWidth={5}
                                strokeColor={THEME.MAIN_COLOR}
                            />
                            {myPosition ? <Marker coordinate={myPosition} /> : null}
                            <MapMarker navigation={navigation} isLink data={[item]} />
                        </MapView>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mark: {
        alignItems: 'center'
    },
    arrow: { position: 'absolute', top: 15, left: 15, zIndex: 1 },
    container: {
        position: 'relative',
        flex: 1,
        flexGrow: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden'
    },
    wrapper: {
        flex: 1
    }
})

export default IncomingOrderMap
