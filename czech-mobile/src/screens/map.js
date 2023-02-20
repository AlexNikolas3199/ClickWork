import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import MapView from 'react-native-maps'
import { useQuery } from '@apollo/client'
import Icon from './../components/Icon'
import { FIND_MANY_VACATION } from '../gqls/vacation/queries'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import Geolocation from '@react-native-community/geolocation'
import { ME } from '../gqls/user/queries'
import { UPDATE_ONE_VACATION } from '../gqls/vacation/mutation'
import { useMutation } from '@apollo/client'
import { DateTime } from 'luxon'
import MapMarker from '../components/MapMarker'

const Map = ({ navigation, route }) => {
    const [myPosition, setMyPosition] = useState({
        latitude: 0,
        longitude: 0,
        longitudeDelta: 0.004,
        latitudeDelta: 0.005
    })
    const [ids, setIds] = useState(null)
    const search = route?.params?.search

    const { data: dataMe } = useQuery(ME, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => setIds(data?.me?.vacation?.id)
    })

    const { data } = useQuery(FIND_MANY_VACATION, {
        variables: {
            where: {
                category: {
                    id: {
                        equals: search
                    }
                }
            }
        },
        pollInterval: 1000 * 10
    })

    useEffect(() => {
        console.log(dataMe, 'Me')
        console.log(ids, 'id__Vacation')
    }, [dataMe])

    const [updateOneVacation] = useMutation(UPDATE_ONE_VACATION, {
        options: {
            awaitRefetchQueries: true
        },
        onCompleted: () => console.log('uOneVacation'),
        onError: () => console.log('Map error')
    })

    const updateLocation = (location) => {
        if (ids) {
            updateOneVacation({
                variables: {
                    where: {
                        id: ids
                    },
                    data: {
                        updatedAt: { set: DateTime.now() },
                        location: { latitude: location.latitude, longitude: location.longitude }
                    }
                }
            })
        }
    }

    const myGeo = (info) => {
        return {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            longitudeDelta: 0.004,
            latitudeDelta: 0.005
        }
    }

    useEffect(() => {
        Geolocation.getCurrentPosition((info) => {
            setMyPosition(myGeo(info))
        })
        setTimeout(() => {
            Geolocation.getCurrentPosition((info) => {
                setMyPosition(myGeo(info))
            })
        }, 4000)
        if (dataMe?.me?.vacation) {
            setTimeout(() => {
                Geolocation.getCurrentPosition((info) => {
                    setMyPosition(myGeo(info))
                    updateLocation(myPosition)
                })
            }, 10000)
        }
    }, [])

    useEffect(() => {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 5,
            distanceFilter: 5,
            debug: false,
            startOnBoot: true,
            pauseLocationUpdates: false,
            stopOnTerminate: false,
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
            interval: 30000,
            fastestInterval: 2000,
            activitiesInterval: 2000,
            stopOnStillActivity: true
        })
        BackgroundGeolocation.on('location', (location) => {
            setMyPosition({
                latitude: location?.latitude,
                longitude: location?.longitude,
                longitudeDelta: 0.004,
                latitudeDelta: 0.005
            })
            updateLocation(location)
        })
        BackgroundGeolocation.on('foreground', (location) => {
            setMyPosition({
                latitude: location?.latitude,
                longitude: location?.longitude,
                longitudeDelta: 0.004,
                latitudeDelta: 0.005
            })
        })
        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background')
        })
        BackgroundGeolocation.on('authorization', (status, location) => {
            console.log('[INFO] BackgroundGeolocation authorization status: ' + status)
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                // we need to set delay or otherwise alert may not be shown
                setTimeout(
                    () =>
                        Alert.alert(
                            'Aplikace vyžaduje oprávnění ke sledování polohy',
                            ' chcete otevřít Nastavení Aplikace?',
                            [
                                {
                                    text: 'Ano',
                                    onPress: () => BackgroundGeolocation.showAppSettings()
                                },
                                {
                                    text: 'Ne',
                                    onPress: () => console.log('No Pressed'),
                                    style: 'cancel'
                                }
                            ]
                        ),
                    1000
                )
            }
        })
        BackgroundGeolocation.checkStatus((status) => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning)
            console.log(
                '[INFO] BackgroundGeolocation services enabled',
                status.locationServicesEnabled
            )
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization)
            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start() //triggers start on start event
            }
        })
    }, [])

    useLayoutEffect(() => {
        return () => {
            BackgroundGeolocation.removeAllListeners()
        }
    }, [])

    const vacation = data?.findManyVacation
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.container}>
                    {myPosition ? (
                        <MapView
                            showsUserLocation
                            // followsUserLocation
                            showsMyLocationButton
                            style={styles.wrapper}
                            initialRegion={myPosition}
                            // onRegionChangeComplete={vacationsMap}
                        >
                            {vacation ? (
                                <MapMarker navigation={navigation} data={vacation} />
                            ) : null}
                        </MapView>
                    ) : (
                        <MapView
                            showsUserLocation
                            showsMyLocationButton
                            style={styles.wrapper}
                            initialRegion={myPosition}
                        >
                            {vacation ? (
                                <MapMarker navigation={navigation} data={vacation} />
                            ) : null}
                        </MapView>
                    )}
                </View>
                <View style={styles.filter}>
                    <TouchableOpacity
                        style={styles.circle}
                        onPress={() => {
                            navigation.navigate('FilterMap', {
                                search: search
                            })
                        }}
                    >
                        <Icon style={{ marginTop: 5 }} name="filter" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filter: {
        position: 'absolute',
        top: 60,
        right: 15,
        zIndex: 1
    },
    circle: {
        height: 38,
        width: 38,
        borderRadius: 19,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
    }
})

export default Map
