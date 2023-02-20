import React, { useState, useEffect } from 'react'
import {
    Alert,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useMutation, useQuery } from '@apollo/client'
import Modal from 'react-native-modal'
import { ME } from '../gqls/user/queries'
import { CREATE_ONE_ORDER } from '../gqls/order/mutations'
import LoadingIndicator from '../components/LoadingIndicator'
import MainButton from '../components/MainButton'
import Blockedl from './../assets/league/Blocked.png'
import Void from './../assets/league/Void.png'
import BronzeDark from './../assets/league/Bronze.png'
import SilverDark from './../assets/league/Silver.png'
import GoldDark from './../assets/league/Gold.png'
import DiamondDark from './../assets/league/Diamond.png'
import { THEME } from '../utils/theme'
import { showMessage } from 'react-native-flash-message'
import Icon from '../components/Icon'

const HireMeProfile = ({ route, navigation }) => {
    const [address, onChangeAddress] = useState('No address')
    const [time, onChangeTime] = useState(new Date())
    const [hours, onChangeHours] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [league, setLeague] = useState(false)
    const [open, setOpen] = useState(false)

    const { data, loading } = useQuery(ME, {
        fetchPolicy: 'network-only',
        onCompleted: (dat1) => onChangeAddress(dat1?.me?.address)
    })
    const userData = data?.me
    const user = route?.params?.vacation?.user
    const Vacation = route?.params?.vacation
    const leaguesImages = {
        BLOCKED: Blockedl,
        VOID: Void,
        BRONZE: BronzeDark,
        SILVER: SilverDark,
        GOLD: GoldDark,
        DIAMOND: DiamondDark
    }

    useEffect(() => {
        setLeague(leaguesImages[route.params.vacation.league])
    }, [])

    const [createOneFeedback] = useMutation(CREATE_ONE_ORDER, {
        onCompleted: () => {
            Alert.alert('Objednat', `Žádost uživateli ${user.name} byla úspěšně odeslána.`, [
                {
                    text: 'OK',
                    onPress: () =>
                        navigation.reset({
                            routes: [
                                { name: 'Main' },
                                { name: 'ActiveOrders', params: { vacation: userData } }
                            ]
                        })
                }
            ])
        }
    })

    const confirmAction = () => {
        const id = userData?.id
        setModalVisible(false)
        createOneFeedback({
            variables: {
                data: {
                    address,
                    startTime: time,
                    duration: `${hours}`,
                    categoryName: route.params.category,
                    user: { connect: { id } },
                    vacation: { connect: { id: route.params.vacation.id } }
                }
            }
        })
    }

    const legs = ['BLOCKED', 'DEFAULT', 'VOID', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND']
    const TypePrice = legs.indexOf(Vacation?.league)

    if (loading || !userData) return <LoadingIndicator />
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={{ paddingHorizontal: 15 }}>
                <View style={styles.profile}>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={styles.name}>
                            {user.name} {user.surname}
                        </Text>
                        <Text style={styles.role}>{route.params.category}</Text>
                    </View>
                    <Image style={styles.status} source={league} />
                </View>
                <View>
                    <Text style={styles.text}>Adresa</Text>
                    <TextInput
                        style={[styles.input, { paddingHorizontal: 15 }]}
                        onChangeText={onChangeAddress}
                        value={address}
                    />
                    <Text style={styles.text}>Čas</Text>
                    <View style={styles.inputContainer}>
                        <Button title={`${time}`} onPress={() => setOpen(true)} />
                        <DatePicker
                            modal
                            open={open}
                            date={time}
                            locale="cs-CS"
                            minimumDate={new Date()}
                            androidVariant="nativeAndroid"
                            onConfirm={(date) => {
                                setOpen(false)
                                onChangeTime(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>
                    <View style={styles.align}>
                        <Text style={styles.text}>Délka v hodinách</Text>
                        <View style={styles.inputContainer}>
                            {/* <TextInput
                                style={[styles.input, { maxWidth: 40, minWidth: 40 }]}
                                onChangeText={onChangeHours}
                                keyboardType="number-pad"
                                maxLength={3}
                                value={hours}
                            /> */}
                            <Text style={styles.hours}>{hours}</Text>
                            <View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        onChangeHours(hours + 1)
                                    }}
                                >
                                    <Icon name="arrow-up" size={20} color={'#fff'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        hours > 1 ? onChangeHours(hours - 1) : null
                                    }}
                                >
                                    <Icon name="arrow-down" size={20} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={styles.infotext}>Cena za hodinu</Text>
                        <Text style={styles.infotext}>
                            {Vacation?.category.pricing[TypePrice].price + ' Kč'}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.infotext}>Cena celkem </Text>
                        <Text style={styles.infotext}>
                            {Vacation?.category.pricing[TypePrice].price * hours + ' Kč'}
                        </Text>
                    </View>
                </View>
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
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Objednat {user.name}?</Text>
                            <View style={styles.buttonWrapper}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.modalButton, styles.confirmButton]}
                                    onPress={confirmAction}
                                >
                                    <Text style={[styles.textStyle, { color: '#fff' }]}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <View style={{ paddingHorizontal: 15 }}>
                <MainButton
                    title="Objednat"
                    onPress={() => {
                        if (!address || !hours) {
                            showMessage({
                                message: 'Nejdříve změňte svůj email!',
                                type: 'danger'
                            })
                            return null
                        }
                        setModalVisible(true)
                    }}
                />
            </View>
        </SafeAreaView>
    )
}
export default HireMeProfile

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignContent: 'space-between'
    },
    profile: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'space-between'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20
    },
    role: {
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 6,
        flexGrow: 1
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: THEME.MAIN_COLOR,
        margin: 2.5,
        padding: 5,
        paddingHorizontal: 7.5,
        borderRadius: 5
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 7,
        height: 40
    },
    hours: {
        marginHorizontal: 2.5,
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 2
    },
    align: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'space-between',
        marginVertical: 16
    },
    infotext: {
        color: 'rgba(0,0,0,0.4)',
        fontSize: 18
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '96%'
    },
    buttonWrapper: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalButton: {
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 30,
        backgroundColor: THEME.GREY_COLOR
    },
    confirmButton: {
        backgroundColor: THEME.MAIN_COLOR
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        fontSize: 18,
        marginVertical: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    status: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    }
})
