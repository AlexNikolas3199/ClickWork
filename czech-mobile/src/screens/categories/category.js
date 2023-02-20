import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { useQuery } from '@apollo/client'
import LoadingIndicator from '../../components/LoadingIndicator'
import { FIND_MANY_VACATION } from '../../gqls/vacation/queries'
import { getUploadURL } from '../../utils/urls'
import HaversineGeolocation from 'haversine-geolocation'
import Geolocation from '@react-native-community/geolocation'

const { width } = Dimensions.get('window')

const Category = ({ route, navigation }) => {
    const Point = { latitude: 62.05758235918124, longitude: 129.73302873102352 }
    const [myPosition, setMyPosition] = useState(Point)

    const setStateMyPos = () => {
        Geolocation.getCurrentPosition((info) => {
            setMyPosition({ latitude: info.coords.latitude, longitude: info.coords.longitude })
        })
    }
    const title = route?.params?.title
    useEffect(() => {
        navigation.setOptions({ title })
        setStateMyPos()
    }, [])

    const { data, loading,refetch } = useQuery(FIND_MANY_VACATION, {
        fetchPolicy: 'network-only',
        nextFetchPolicy:'network-only',
        variables: {
            where: {
                categoryId: {
                    equals: route.params.id
                }
            }
        }
    })

    const Delenie = (item) => {
        try {
            if ((HaversineGeolocation.getDistanceBetween(myPosition, item?.location, 'm') / 1000) | 0)
            return HaversineGeolocation.getDistanceBetween(myPosition, item?.location) + 'km'
        else return HaversineGeolocation.getDistanceBetween(myPosition, item?.location, 'm') + 'm'
        } catch (error) {
        }
    }

    if (loading) return <LoadingIndicator />
    const vacations = data?.findManyVacation ? data.findManyVacation : []
    return vacations.length !== 0 ? (
        <FlatList
            data={vacations}
            style={{ padding: 15 }}
            keyExtractor={(item) => item.id}
            numColumns={2}
            refreshing={loading}
            onRefresh={refetch}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HireMe', { vacation: item, category: title })
                        }}
                        activeOpacity={0.7}
                        style={styles.box}
                    >
                        <ImageBackground
                            source={getUploadURL(item?.user?.image)}
                            style={styles.image}
                        >
                            <View style={styles.DarkLayer}>
                                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}><Text style={styles.name}>{item?.user?.name}</Text>
                                <Text style={styles.league}>{item?.league}</Text>
                                </View>
                                <Text style={styles.distance}>{Delenie(item) ? Delenie(item): 'Žádné umístění' }</Text>

                                {/* <Text style={styles.distance}>{HaversineGeolocation.getDistanceBetween(myPosition, item.location, 'm')}</Text> */}
                                {/* <Text style={styles.distance}>{item.location.latitude}</Text> */}
                            </View>
                        </ImageBackground>

                    </TouchableOpacity>
                )
            }}
        />
    ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No workers</Text>
        </View>
    )
}
export default Category

const styles = StyleSheet.create({
    DarkLayer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'space-between'
    },
    box: {
        overflow: 'hidden',
        borderRadius: 6,
        height: (width / 2 - 15) / 1.22,
        width: width / 2 - 25,
        margin: 5
    },
    image: {},
    name: {
        padding: 10,
        color: '#fff',
        fontWeight: 'bold',
        // textShadowColor: '#000',
        // textShadowOffset: {
        //     width: 1,
        //     height: 1
        // },
        // textShadowRadius: 2,
        fontSize: 18
    },
    league: {
        padding: 10,
        color: '#fff',
        fontWeight: 'bold',
        // textShadowColor: '#000',
        // textShadowOffset: {
        //     width: 1,
        //     height: 1
        // },
        // textShadowRadius: 2,
        fontSize: 18
    },
    distance: {
        padding: 10,
        color: '#fff',
        opacity: 0.8,
        fontWeight: 'bold'
        // textShadowColor: '#000',
        // textShadowOffset: {
        //     width: 1,
        //     height: 1
        // },
        // textShadowRadius: 2
    }
})
