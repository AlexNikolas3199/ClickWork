import React, { useState } from 'react'
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    RefreshControl,
    View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@apollo/client'
import { THEME } from '../../utils/theme'
import MainButton from '../../components/MainButton'
import { ME } from '../../gqls/user/queries'
import LoadingIndicator from '../../components/LoadingIndicator'
import ProfSquare from '../../components/account/ProfSquare'
import Avatar from '../../components/account/Avatar'
import AccountPanel from '../../components/account/AccountPanel'
import PanelLink from '../../components/account/PanelLink'
import PanelLinkImage from '../../components/account/PanelLinkImage'
import mantegun from '../../assets/mantegun.png'
import settings1 from '../../assets/settings1.png'
import settings2 from '../../assets/settings2.png'
import { DateTime } from 'luxon'
import Blockedl from './../../assets/league/Blocked.png'
import Void from './../../assets/league/Void.png'
import BronzeDark from './../../assets/league/Bronze.png'
import SilverDark from './../../assets/league/Silver.png'
import GoldDark from './../../assets/league/Gold.png'
import DiamondDark from './../../assets/league/Diamond.png'

const DataCard = ({ isWorker, onPress, children }) => {
    if (isWorker)
        return (
            <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={styles.headerBox}>
                {children}
            </TouchableOpacity>
        )
    return <View style={styles.headerBox}>{children}</View>
}

const leaguesImages = {
    BLOCKED: Blockedl,
    VOID: Void,
    BRONZE: BronzeDark,
    SILVER: SilverDark,
    GOLD: GoldDark,
    DIAMOND: DiamondDark
}

const Account = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false)
    const [isWorker, setIsWorker] = useState(undefined)
    const [Rating, setRating] = useState(0)
    const [league, setLeague] = useState(Void)

    const { data, loading, refetch } = useQuery(ME, {
        fetchPolicy: 'network-only',
        options: {
            awaitRefetchQueries: true
        },
        onCompleted: (data1) => updateData(data1),
        onError: (error) => console.log(error)
    })
    const updateData = (data11) => {
        CheckRating()
        CheckVacation()
        const d = data11?.me?.vacation
        if (d) setIsWorker(true)
        else setIsWorker(false)
        setLeague(leaguesImages[d?.league])
        setRefreshing(false)
    }
    const CheckRating = async () => {
        const RatingVal = data?.me?.feedbacks?.map((item) => 0 + item?.value)
        let sum = 0
        for (let i = 0; i < RatingVal?.length; i++) {
            sum += RatingVal[i]
        }
        let A = (await sum) / RatingVal?.length
        setRating(A)
    }
    const CheckVacation = () => {
        if (data?.me?.vacation) {
            setIsWorker(true)
        }
    }

    const Activity = (userData2) => {
        const startTime = DateTime.fromISO(userData2?.vacation?.createdAt)
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

    const logOut = () => {
        Alert.alert('Odhlásit se', ' jste si jisti, že se chcete odhlásit?', [
            {
                text: 'Zrušit',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: async () => {
                    await AsyncStorage.removeItem('token')
                    navigation.replace('Login')
                }
            }
        ])
    }

    const updateFullData = async () => {
        setRefreshing(true)
        await refetch()
        updateData(data)
    }
    if (loading || data?.me === undefined || isWorker === undefined) return <LoadingIndicator />

    const OrderLength = data?.me?.vacation?.order?.length

    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={updateFullData} />
                }
            >
                <View>
                    <View>
                        <View style={styles.blueBack} />
                        <DataCard
                            style={styles.headerBox}
                            isWorker={isWorker}
                            vacation={data?.me?.vacation}
                            onPress={() =>
                                navigation.navigate('HireMe', {
                                    vacation: data?.me?.vacation,
                                    category: data?.me?.vacation?.category.name
                                })
                            }
                        >
                            <View style={styles.flexRowSB}>
                                <View>
                                    <View
                                        style={{
                                            width: 40,
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        {isWorker ? (
                                            <Image
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    resizeMode: 'cover'
                                                }}
                                                source={league}
                                            />
                                        ) : null}
                                    </View>
                                    <Text style={[styles.boldText, { maxWidth: 220 }]}>
                                        {data?.me?.name} {data?.me?.surname}
                                    </Text>
                                    <Text style={styles.grayText}>
                                        {data?.me?.vacation?.category?.name}
                                    </Text>
                                </View>
                                <Avatar image={data?.me?.image} />
                            </View>
                            {isWorker ? (
                                <View>
                                    <View style={styles.headerBoxBottom}>
                                        <ProfSquare
                                            title="V aplikaci"
                                            value={Activity(data?.me ? data?.me : 0)}
                                        />
                                        <ProfSquare
                                            title="Práce"
                                            value={OrderLength ? OrderLength : 0}
                                        />
                                        <ProfSquare title="Hodnocení" value={Rating ? Rating : 0} />
                                    </View>
                                </View>
                            ) : (
                                <MainButton
                                    title={'Staňte se pracovníkem'}
                                    onPress={() => {
                                        navigation.navigate('BecomeWorker')
                                    }}
                                    myStyle={{ marginTop: 15, marginBottom: 0 }}
                                />
                            )}
                        </DataCard>
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <AccountPanel
                            title="Služba"
                            text="Správa vašich objednávek"
                            image={mantegun}
                            imageStyle={{ width: 50, height: 35, resizeMode: 'contain' }}
                        >
                            {isWorker ? (
                                <>
                                    <PanelLink
                                        title="Příchozí objednávky"
                                        onPress={() =>
                                            navigation.navigate('IncomingOrders', {
                                                vacation: data?.me
                                            })
                                        }
                                    />
                                    <View style={styles.border} />
                                </>
                            ) : null}
                            <PanelLink
                                title="Moje aktivní objednávky"
                                onPress={() =>
                                    navigation.navigate('ActiveOrders', {
                                        vacation: data?.me
                                    })
                                }
                            />
                            <View style={styles.border} />
                            <PanelLink
                                title="Historie"
                                onPress={() =>
                                    navigation.navigate('History', {
                                        dataMe: data.me
                                    })
                                }
                            />
                        </AccountPanel>
                        <AccountPanel
                            title="Účet"
                            text="Upravte a spravujte podrobnosti o svém účtu"
                            image={settings1}
                            imageStyle={{ width: 20, height: 14, resizeMode: 'contain' }}
                        >
                            <PanelLinkImage
                                title={data?.me?.name + ' ' + data?.me?.surname}
                                onPress={() => navigation.navigate('EditProfileData')}
                                image={data?.me?.image}
                            />
                            <View style={styles.border} />
                            <PanelLink
                                title={data?.me?.email}
                                onPress={() => navigation.navigate('EditEmail')}
                            >
                                <Text style={styles.panelGrayText}>Email</Text>
                            </PanelLink>
                            <View style={styles.border} />
                            <PanelLink
                                title={data?.me?.phone}
                                onPress={() => navigation.navigate('EditPhone')}
                            >
                                <Text style={styles.panelGrayText}>Telefonní číslo</Text>
                            </PanelLink>
                            <View style={styles.border} />
                            <PanelLink
                                title={data?.me?.address}
                                onPress={() => navigation.navigate('AddAddress')}
                            >
                                <Text style={styles.panelGrayText}>Adresa</Text>
                            </PanelLink>
                        </AccountPanel>
                        <AccountPanel
                            title="Nápověda a zpětná vazba"
                            text=""
                            image={settings2}
                            imageStyle={{ width: 20, height: 14, resizeMode: 'contain' }}
                        >
                            <PanelLink
                                title="Jak to funguje"
                                onPress={() => navigation.navigate('Intro', { info: true })}
                            />
                            <View style={styles.border} />
                            <PanelLink
                                title="FAQ - Časté dotazy"
                                onPress={() => navigation.navigate('QandA')}
                            />
                            <View style={styles.border} />

                            <PanelLink
                                title="Zpracování osobních údajů"
                                onPress={() => navigation.navigate('ConsentData')}
                            />
                            <View style={styles.border} />
                            <PanelLink
                                title="Kontaktujte nás"
                                onPress={() => navigation.navigate('Contacts')}
                            />
                        </AccountPanel>
                        <View style={styles.panelMain}>
                            <PanelLink
                                title="Odhlásit"
                                icon="sign-out-alt"
                                color="red"
                                onPress={() => logOut()}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    panelHeading: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconWrap: {
        backgroundColor: THEME.MAIN_COLOR,
        width: 40,
        marginRight: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    panelMain: {
        padding: 16,
        marginVertical: 15,
        backgroundColor: '#e6e6e6',
        borderRadius: 10
    },
    blueBack: {
        position: 'absolute',
        backgroundColor: '#7A9CBB',
        width: '100%',
        height: 230,
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        zIndex: 1
    },
    headerBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginVertical: 30,
        marginHorizontal: 15,
        padding: 20,
        borderColor: 'gray',
        borderWidth: 1,
        zIndex: 2
    },
    boldText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    panelText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    grayText: {
        color: 'gray',
        fontSize: 16
    },
    panelGrayText: {
        marginVertical: 3,
        color: 'gray',
        fontSize: 16
    },
    flexRowSB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerBoxBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    border: {
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10
    }
})
export default Account
