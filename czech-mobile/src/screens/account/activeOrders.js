import React, { useState } from 'react'
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useMutation, useQuery } from '@apollo/client'
import { FIND_MANY_ORDER } from '../../gqls/order/queries'
import { ME } from '../../gqls/user/queries'
import ActivityOrdersCard from '../../components/account/activityOrdersCard'
import Modal from 'react-native-modal'
import { THEME } from '../../utils/theme'
import { TextInput } from 'react-native-gesture-handler'
import LoadingIndicator from '../../components/LoadingIndicator'
import { UPDATE_ONE_ORDER } from '../../gqls/order/mutations'
import { CREATE_ONE_FEEDBACK } from '../../gqls/feedback/mutations'
import { showMessage } from 'react-native-flash-message'
import DarkLoadingIndicator from '../../components/DarkLoadingIndicator'
import getDate from '../../components/getDate'
import Icon from '../../components/Icon'

const activeOrders = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [mark, setMark] = useState({ value: 0 })
    const [comment, setComment] = useState(null)
    const [order, setOrder] = useState(null)
    const [loader, setLoader] = useState(false)

    const { data: dataMe, loading: loadingMe } = useQuery(ME)
    const { data, loading, refetch } = useQuery(FIND_MANY_ORDER, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
        variables: {
            where: {
                OR: [{ status: { equals: 'IN_PROGRESS' } }, { status: { equals: 'AWAITING' } }],
                userId: { equals: dataMe?.me?.id }
            }
        }
    })
    const [save] = useMutation(UPDATE_ONE_ORDER, {
        onCompleted: () => {
            setLoader(false)
            Alert.alert('Úspěch', 'Přijali jste práci', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('History', dataMe)
                }
            ])
        },
        onError: ({ message }) => {
            console.log(message)
            setLoader(false)
        }
    })
    const giveLeague = (omr) => {
        if (omr <= 40) return 'BLOCKED'
        if (omr > 40 && omr < 150) return 'VOID'
        if (omr >= 150 && omr < 400) return 'BRONZE'
        if (omr >= 400 && omr < 1000) return 'SILVER'
        if (omr >= 1000 && omr < 2000) return 'GOLD'
        if (omr >= 2000) return 'DIAMOND'
    }
    const [addFeedback] = useMutation(CREATE_ONE_FEEDBACK, {
        onCompleted: () => {
            const totalOMR = order?.vacation?.OMR + mark.omr
            save({
                variables: {
                    where: {
                        id: order?.id
                    },
                    data: {
                        status: {
                            set: 'COMPLETE'
                        },
                        vacation: {
                            update: {
                                OMR: {
                                    set: totalOMR
                                },
                                league: {
                                    set: giveLeague(totalOMR)
                                }
                            }
                        }
                    }
                }
            })
        },
        onError: ({ message }) => {
            console.log(message)
            console.log('lol')
            setLoader(false)
        }
    })
    const acceptWork = () => {
        if (!order || !mark) {
            showMessage({
                message: 'Fill in all the fields!',
                type: 'danger'
            })
            return null
        }
        setModalVisible(false)
        Alert.alert('Přijmout práci', ' jste si jisti, že chcete přijmout práci?', [
            {
                text: 'Zrušit',
                onPress: () => setComment(null),
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => {
                    setLoader(true)
                    addFeedback({
                        variables: {
                            data: {
                                value: mark?.value,
                                comment: comment ? comment : '',
                                user: {
                                    connect: {
                                        id: order?.vacation?.user?.id
                                    }
                                },
                                userNanimatelName: dataMe?.me?.name,
                                userNanimatelImage: dataMe?.me?.image
                            }
                        }
                    })
                }
            }
        ])
    }
    const orders = data?.findManyOrder
    const marks = [
        { value: 1, omr: -20 },
        { value: 2, omr: -15 },
        { value: 3, omr: -10 },
        { value: 4, omr: -5 },
        { value: 5, omr: 0 },
        { value: 6, omr: 5 },
        { value: 7, omr: 10 },
        { value: 8, omr: 15 },
        { value: 9, omr: 20 },
        { value: 10, omr: 25 }
    ]

    const TypePriceCheck = (item) => {
        if (item?.vacation.league === 'BLOCKED') return 0
        if (item?.vacation.league === 'DEFAULT') return 1
        if (item?.vacation.league === 'VOID') return 2
        if (item?.vacation.league === 'BRONZE') return 3
        if (item?.vacation.league === 'SILVER') return 4
        if (item?.vacation.league === 'GOLD') return 5
        if (item?.vacation.league === 'DIAMOND') return 6
    }

    if (loadingMe || loading) return <LoadingIndicator />
    return (
        <SafeAreaView style={styles.container}>
            {orders?.length !== 0 ? (
                <FlatList
                    style={{ flex: 1, width: '100%', paddingTop: 7.5 }}
                    showsVerticalScrollIndicator={false}
                    data={orders ? orders : []}
                    refreshing={loading}
                    onRefresh={refetch}
                    keyExtractor={(item) => item?.id}
                    ListFooterComponent={<View style={{ marginTop: 15 }} />}
                    renderItem={({ item }) => {
                        return (
                            <ActivityOrdersCard
                                onPress={() => {
                                    setOrder(item)
                                    setModalVisible(true)
                                }}
                                toMap={() => {
                                    navigation.navigate('ActiveOrderMap', { item })
                                }}
                                name={item?.vacation?.user.name}
                                surname={item?.vacation?.user.surname}
                                address={item?.address}
                                phone={item?.vacation?.user.phone}
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
                    <Text>Žádné aktivní objednávky</Text>
                </View>
            )}
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
                        <Text style={styles.modalText}>
                            Rate the {order?.vacation?.user?.name}'s work
                        </Text>
                        <View style={styles.stars}>
                            {marks.map((item) => (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    key={item.value}
                                    style={[
                                        styles.star,
                                        item.value <= mark.value ? styles.starMarked : null
                                    ]}
                                    onPress={() => setMark(item)}
                                >
                                    <Icon
                                        name={'star'}
                                        iconFamily={'FontAwesome'}
                                        size={20}
                                        color="gold"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(ia) => setComment(ia)}
                            multiline={true}
                            numberOfLines={3}
                            placeholder="Komentář"
                        />
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.modalButton}
                                onPress={() => {
                                    setComment(null)
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={acceptWork}
                            >
                                <Text style={[styles.textStyle, { color: '#fff' }]}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <DarkLoadingIndicator isVisible={loader} />
        </SafeAreaView>
    )
}
export default activeOrders
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'center'
    },
    input: {
        width: '97%',
        maxHeight: '70%',
        marginVertical: 10,
        padding: 5,
        paddingLeft: 25,
        fontSize: 16,
        backgroundColor: '#fff',
        color: THEME.TEXT_COLOR,
        borderRadius: 5
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
        paddingVertical: 30,
        paddingHorizontal: 10,
        alignItems: 'center',
        width: '100%'
    },
    buttonWrapper: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    modalButton: {
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 30,
        backgroundColor: THEME.GREY_COLOR
    },
    confirmButton: {
        backgroundColor: '#0085FF'
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center'
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    stars: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    star: {
        margin: 1,
        borderWidth: 1,
        padding: 1,
        borderColor: 'transparent'
    },
    starMarked: {
        borderRadius: 100,
        borderColor: 'gold'
    }
})
