import React, { useEffect, useState } from 'react'
import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { DateTime } from 'luxon'
import MainButton from '../components/MainButton'
import Backicon from '../assets/Backicon.png'
import { getUploadURL } from '../utils/urls'
import { ME } from './../gqls/user/queries'
import { useQuery } from '@apollo/client'
import LoadingIndicator from '../components/LoadingIndicator'
import Blockedl from './../assets/league/Blocked.png'
import Void from './../assets/league/Void.png'
import Bronze from './../assets/league/Bronze.png'
import Silver from './../assets/league/Silver.png'
import Gold from './../assets/league/Gold.png'
import Diamond from './../assets/league/Diamond.png'
import Modal from 'react-native-modal'

const HireMe = ({ route, navigation }) => {
    const [Rating, setRating] = useState(0)
    const vacation = route?.params?.vacation
    const user = vacation?.user
    const category = route?.params?.category
    const [modalVisible, setModalVisible] = useState(false)

    const leaguesImages = {
        BLOCKED: Blockedl,
        VOID: Void,
        BRONZE: Bronze,
        SILVER: Silver,
        GOLD: Gold,
        DIAMOND: Diamond
    }

    const { data, loading } = useQuery(ME)

    useEffect(() => {
        const RatingValue = user?.feedbacks?.map((item) => 0 + item.value)
        let sum = 0
        for (let i = 0; i < RatingValue?.length; i++) {
            sum += RatingValue[i]
        }
        setRating(Math.round((sum / RatingValue?.length) * 10) / 10)
    }, [setRating])

    const Desc = async () => {
        setModalVisible(true)
        console.log('me')
    }

    const Activity = (vacation) => {
        const startTime = DateTime.fromISO(vacation?.createdAt)
        const nowTime = DateTime.now()
        let hourNowMinute = nowTime.minute
        let hourNowHour = nowTime.hour
        let hourNowDay = nowTime.day
        let hourNowMonth = nowTime.month
        let hourNowYear = nowTime.year
        let NowTimeInMinutes =
            (((hourNowYear * 12 + hourNowMonth) * 30 + hourNowDay) * 24 + hourNowHour) * 60 +
            hourNowMinute
        let hourStartMinute = startTime.minute
        let hourStartHour = startTime.hour
        let hourStartDay = startTime.day
        let hourStartMonth = startTime.month
        let hourStartYear = startTime.year
        let StartTimeInMinutes =
            (((hourStartYear * 12 + hourStartMonth) * 30 + hourStartDay) * 24 + hourStartHour) *
                60 +
            hourStartMinute
        const ActivityMinutes = NowTimeInMinutes - StartTimeInMinutes
        if (ActivityMinutes / 60 / 24 / 30 / 12 > 1)
            return `${parseInt(ActivityMinutes / 60 / 24 / 30 / 12)}y`
        else if (ActivityMinutes / 60 / 24 / 30 > 1)
            return `${parseInt(ActivityMinutes / 60 / 24 / 30)}m`
        else if (ActivityMinutes / 60 / 24 > 1) return `${parseInt(ActivityMinutes / 60 / 24)}d`
        else if (ActivityMinutes / 60 > 1) return `${parseInt(ActivityMinutes / 60)}h`
        else if (ActivityMinutes > 1) return `${parseInt(ActivityMinutes)}min`
    }
    if (loading) return <LoadingIndicator />
    return (
        <SafeAreaView style={styles.wrapper}>
            <ImageBackground source={getUploadURL(user?.image)} style={styles.image}>
                <View style={styles.backgroundDarkLayer}>
                    <View style={styles.header}>
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    navigation.goBack()
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ height: 25, width: 25 }} source={Backicon} />
                                    <Text style={styles.userName}>
                                        {user?.name} {user?.surname}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 18 }}>
                                {category}
                            </Text>
                        </View>
                        {/* <TouchableOpacity activeOpacity={0.7}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: 80, height: 80, resizeMode: 'contain' }}
                                    source={leaguesImages[vacation?.league]}
                                />
                            </View>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.profileData}>
                        <View style={styles.square}>
                            <View style={styles.indicators}>
                                <Text style={styles.squareTitle}>V aplikaci</Text>
                                <Text style={styles.squareCount}>{Activity(vacation)}</Text>
                            </View>
                            <View style={styles.indicators}>
                                <Text style={styles.squareTitle}>Práce</Text>
                                <Text style={styles.squareCount}>{vacation.order.length}</Text>
                            </View>
                            <View style={styles.indicators}>
                                <Text style={styles.squareTitle}>Hodnocení</Text>
                                <Text style={styles.squareCount}>{Rating ? Rating : 0}</Text>
                            </View>
                        </View>
                        <View style={styles.buttons}>
                            <Modal
                                isVisible={modalVisible}
                                backdropOpacity={0.5}
                                useNativeDriver={true}
                                onBackdropPress={() => {
                                    setModalVisible(!modalVisible)
                                }}
                                onBackButtonPress={() => {
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <View style={styles.description}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        V čem jsem dobrý
                                    </Text>
                                    <Text style={{ fontSize: 16, marginVertical: 10 }}>
                                        {vacation?.description}
                                    </Text>
                                    <MainButton
                                        title="OK"
                                        onPress={() => setModalVisible(!modalVisible)}
                                    />
                                </View>
                            </Modal>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.button}
                                onPress={() => Desc()}
                            >
                                <Text style={{ fontSize: 18, color: '#000' }}>
                                    V čem jsem dobrý
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.button}
                                onPress={() =>
                                    navigation.navigate('Recenze', {
                                        title: user?.name,
                                        vacation
                                    })
                                }
                            >
                                <Text style={{ fontSize: 18, color: '#000' }}>Recenze</Text>
                            </TouchableOpacity>
                            {data?.me?.id == user?.id ? null : (
                                <MainButton
                                    title="Najmout"
                                    onPress={() =>
                                        navigation.navigate('HireMeProfile', {
                                            vacation,
                                            category
                                        })
                                    }
                                />
                            )}
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    backgroundDarkLayer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 24
    },
    userName: {
        color: 'white',
        fontWeight: 'bold',
        maxWidth: 200,
        fontSize: 18,
        padding: 6
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-between'
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    description: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15
    },
    profileData: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    indicators: {
        backgroundColor: 'white',
        width: 90,
        height: 90,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    squareCount: { fontWeight: 'bold', fontSize: 24, lineHeight: 40 },
    squareTitle: { fontSize: 12, opacity: 0.5, lineHeight: 17 },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        borderRadius: 8,
        marginVertical: 7
    }
})
export default HireMe
