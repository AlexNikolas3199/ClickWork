import React, { useState } from 'react'
import {
    Alert,
    Dimensions,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { ReactNativeFile } from 'apollo-upload-client'
import { launchImageLibrary } from 'react-native-image-picker'
import { useMutation, useQuery } from '@apollo/client'
import LoadingIndicator from '../../components/LoadingIndicator'
import { UPDATE_ONE_USER } from '../../gqls/user/mutation'
import { ME } from '../../gqls/user/queries'
import { THEME } from '../../utils/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { UPLOAD } from '../../gqls/upload/mutations'
import MainButton from '../../components/MainButton'
import UploadImage from '../../components/UploadImage'
import { UPLOAD_URL } from '../../utils/urls'
import DarkLoadingIndicator from '../../components/DarkLoadingIndicator'
import { showMessage } from 'react-native-flash-message'

const height = Dimensions.get('window').height
const EditProfileData = ({ navigation }) => {
    //состояние
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [loader, setLoader] = useState(false)

    //загрузка данных пользователя
    const { data, loading } = useQuery(ME, {
        fetchPolicy: 'network-only',
        onCompleted: ({ me }) => {
            setName(me.name)
            setSurname(me.surname)
            setImage(me.image)
        }
    })
    const userData = data?.me

    //мутация обновления данных
    const [updateOneUser] = useMutation(UPDATE_ONE_USER, {
        onError: ({ message }) => {
            console.log(message)
            setLoader(false)
        },
        onCompleted: () => {
            navigation.goBack()
        }
    })
    const [upload] = useMutation(UPLOAD, {
        onCompleted: ({ singleUpload }) => {
            ssr: false
            updateOneUser({
                variables: {
                    data: {
                        name: {
                            set: name
                        },
                        surname: {
                            set: surname
                        },
                        image: { set: singleUpload }
                    },
                    where: {
                        id: userData?.id
                    }
                }
            })
        },
        onError: ({ message }) => {
            console.log(message)
            setLoader(false)
        }
    })

    //проверка разрешения
    const chekPermission = async () => {
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

    //при загрузке картинки
    const onChange = () => {
        // if (name === userData.name && surname === userData.surname) {
        //     showMessage({
        //         message: 'Change your data firstable!',
        //         type: 'danger'
        //     })
        //     return null
        // }
        Alert.alert('Změna údajů o profilu', 'Uložit změny?', [
            {
                text: 'Zrušit',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => {
                    setLoader(true)
                    if (file) {
                        upload({
                            variables: {
                                upload: file
                            }
                        })
                        return null
                    }
                    updateOneUser({
                        variables: {
                            data: {
                                name: { set: name },
                                surname: { set: surname }
                            },
                            where: { id: userData.id }
                        }
                    })
                }
            }
        ])
    }
    if (loading) return <LoadingIndicator />
    const getImage = () => {
        if (file) return { uri: file.uri }
        if (image) return { uri: UPLOAD_URL + image }
        return null
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.flex}>
                <ScrollView style={{ maxHeight: height - 190 }}>
                    <View>
                        <TextInput
                            style={styles.input}
                            defaultValue={name}
                            onChangeText={(ia) => setName(ia)}
                            placeholder="Název"
                        />
                        <TextInput
                            style={styles.input}
                            defaultValue={surname}
                            onChangeText={(ia) => setSurname(ia)}
                            placeholder="Příjmení"
                        />
                    </View>
                    <Text style={styles.title}>Profilový obrázek</Text>
                    <TouchableOpacity
                        style={{ marginBottom: 10 }}
                        onPress={async () => {
                            if (await chekPermission())
                                launchImageLibrary({}, (res) => {
                                    const { didCancel, error, customButton } = res
                                    if (didCancel || error || customButton) return null
                                    const file = new ReactNativeFile({
                                        uri: res.uri,
                                        type: res.type,
                                        name: res.fileName
                                    })
                                    setFile(file)
                                })
                        }}
                    >
                        <UploadImage image={getImage()} />
                    </TouchableOpacity>
                </ScrollView>
                <View style={{ marginTop: 10 }}>
                    <MainButton onPress={onChange} title="Uložit" />
                </View>
            </View>
            <DarkLoadingIndicator isVisible={loader} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 15
    },
    input: {
        borderBottomWidth: 1,
        marginVertical: 10,
        padding: 0,
        paddingLeft: 5,
        fontSize: 16,
        width: '100%',
        color: THEME.TEXT_COLOR,
        borderColor: THEME.GREY_COLOR
    },
    title: { marginVertical: 10, color: THEME.TEXT_COLOR, fontWeight: 'bold', fontSize: 20 }
})

export default EditProfileData
