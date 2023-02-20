import React, { useEffect, useState } from 'react'
import {
    Alert,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useMutation, useQuery } from '@apollo/client'
import MainButton from '../components/MainButton'
import UploadImage from '../components/UploadImage'
import { THEME } from '../utils/theme'
import { ME } from '../gqls/user/queries'
import { launchImageLibrary } from 'react-native-image-picker'
import { ReactNativeFile } from 'apollo-upload-client/public'
import { showMessage } from 'react-native-flash-message'
import { MULTI_UPLOAD } from '../gqls/upload/mutations'
import { UPDATE_ONE_USER } from '../gqls/user/mutation'
import Geolocation from '@react-native-community/geolocation'
import { CREATE_VACATION } from '../gqls/vacation/mutation'
import DarkLoadingIndicator from '../components/DarkLoadingIndicator'
import LoadingIndicator from '../components/LoadingIndicator'

const { height } = Dimensions.get('window')
const BecomeWorker = ({ navigation, route }) => {
    const { data: dataMe, loading: meLoading } = useQuery(ME, {
        onCompleted: (data) => {
            setName(data?.me.name)
            setSurname(data?.me.surname)
        }
    })
    const me = dataMe?.me

    const [category, setCategory] = useState('')
    const [myPosition, setMyPosition] = useState(null)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [passport, setPassport] = useState(null)
    const [description, setDescription] = useState(null)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setCategory(route?.params?.categoryName)
    }, [route?.params?.categoryName])

    const setStateMyPos = () => {
        Geolocation.getCurrentPosition((info) => {
            setMyPosition({ latitude: info.coords.latitude, longitude: info.coords.longitude })
        })
    }

    const [create_vacation] = useMutation(CREATE_VACATION, {
        onCompleted: () => {
            setLoader(false)
            Alert.alert('Úspěch!', 'Úspěšně jste se stal ClickBoder!', [{ text: 'OK' }])
            navigation.replace('Main')
        },
        onError: ({ message }) => {
            console.log(message)
            setLoader(false)
        }
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            setStateMyPos()
        }, 6000)
        return () => clearInterval(intervalId)
    }, [myPosition])

    const [updateOneUser] = useMutation(UPDATE_ONE_USER, {
        onError: ({ message }) => {
            console.log(message)
            setLoader(false)
        },
        onCompleted: async () => {
            create_vacation({
                variables: {
                    data: {
                        name: name,
                        user: { connect: { id: dataMe?.me.id } },
                        location: {
                            latitude: myPosition?.latitude,
                            longitude: myPosition?.longitude
                        },
                        category: { connect: { name: category } },
                        description
                    }
                }
            })
        }
    })

    const [upload] = useMutation(MULTI_UPLOAD, {
        onCompleted: ({ multiUpload }) => {
            updateOneUser({
                variables: {
                    data: {
                        name: {
                            set: name
                        },
                        surname: {
                            set: surname
                        },
                        passport: { set: multiUpload[0] }
                    },
                    where: {
                        id: me.id
                    }
                }
            })
        },
        onError: ({ message }) => {
            console.log(message)
            setLoader(false)
        }
    })
    const checkPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            )
            if (granted) {
                return true
            }
            try {
                return await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'access',
                        message: 'access'
                    }
                )
            } catch (e) {
                return false
            }
        }
        return true
    }

    const send = () => {
        if (!passport || !category || !name || !surname) {
            showMessage({
                message: 'Nedostatečná data, zkontrolujte poštu, telefon a údaje, které jste vyplnili!',
                type: 'danger'
            })
            return null
        }
        setLoader(true)
        upload({
            variables: {
                upload: [passport]
            }
        })
    }
    if (meLoading) return <LoadingIndicator />

    return (
        <KeyboardAvoidingView
            behavior="height"
            style={{ margin: 15, flexGrow: 1, justifyContent: 'space-between' }}
        >
            <ScrollView style={styles.flex}>
                <View>
                    <TextInput
                        style={styles.input}
                        autoCompleteType="name"
                        placeholder="Název"
                        defaultValue={name}
                        onChangeText={(value) => setName(value)}
                    />
                    <TextInput
                        style={styles.input}
                        autoCompleteType="name"
                        placeholder="Příjmení"
                        defaultValue={surname}
                        onChangeText={(value) => setSurname(value)}
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            navigation.navigate('FilterMap', {
                                bw: true
                            })
                        }}
                        style={styles.modalWrapper}
                    >
                        <Text style={styles.dropdown}>
                            {category ? category : 'Vyberte kategorii'}
                        </Text>
                        <Image
                            style={styles.iconArrow}
                            source={require('../assets/arrowdown.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.mB}>
                    <Text style={styles.title}>Napište v čem jste výjimečný</Text>
                    <TextInput
                        style={styles.input2}
                        onChangeText={(ia) => setDescription(ia)}
                        multiline={true}
                        numberOfLines={6}
                        placeholder="Mám diplom / certifikát..."
                    />
                </View>
                <View style={styles.mB}>
                    <Text style={styles.title}>Nahrajte své foto</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.mB}
                        onPress={async () => {
                            if (await checkPermission())
                                launchImageLibrary({}, (res) => {
                                    const { didCancel, error, customButton } = res
                                    if (didCancel || error || customButton) return null
                                    const file = new ReactNativeFile({
                                        uri: res.uri,
                                        type: res.type,
                                        name: res.fileName
                                    })
                                    setPassport(file)
                                })
                        }}
                    >
                        <UploadImage image={passport ? { uri: passport.uri } : null} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View>
                <MainButton onPress={send} title="Odeslat" />
            </View>
            <DarkLoadingIndicator isVisible={loader} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flexGrow: 1,
        maxHeight: height - 190
    },
    mB: { marginBottom: 5 },
    input: {
        marginVertical: 10,
        padding: 0,
        paddingLeft: 5,
        fontSize: 16,
        width: '100%',
        color: THEME.TEXT_COLOR,
        borderColor: THEME.GREY_COLOR,
        borderBottomWidth: 1
    },
    input2: {
        padding: 5,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        color: THEME.TEXT_COLOR,
        borderRadius: 5
    },
    modalWrapper: {
        width: '100%',
        marginVertical: 10,
        borderColor: THEME.GREY_COLOR,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dropdown: {
        flexGrow: 1,
        paddingLeft: 5,
        paddingBottom: 3
    },
    title: { marginVertical: 10, color: THEME.TEXT_COLOR, fontWeight: 'bold', fontSize: 18 },
    iconArrow: {
        width: 12.8,
        height: 6.5,
        resizeMode: 'contain',
        marginRight: 10
    }
})

export default BecomeWorker
