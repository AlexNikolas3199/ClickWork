import React, { useState } from 'react'
import {
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    Dimensions,
    Alert
} from 'react-native'
import MainButton from '../../components/MainButton'
import LoadingIndicator from '../../components/LoadingIndicator'
import { useQuery, useMutation } from '@apollo/client'
import { UPDATE_ONE_USER } from '../../gqls/user/mutation'
import { ME } from '../../gqls/user/queries'
import { THEME } from '../../utils/theme'
import DarkLoadingIndicator from '../../components/DarkLoadingIndicator'
import { showMessage } from 'react-native-flash-message'
const height = Dimensions.get('window').height
const EditPhone = ({ navigation }) => {
    const [phone, setPhone] = useState(null)
    const [loader, setLoader] = useState(false)
    const { data, loading } = useQuery(ME, {
        fetchPolicy: 'network-only'
    })
    const [updateOneUser] = useMutation(UPDATE_ONE_USER, {
        onError: ({ message }) => {
            console.log(message)
            setLoader(false)
        },
        onCompleted: () => {
            setLoader(false)
            navigation.goBack()
        }
    })

    const onChange = () => {
        if (!phone || phone === data.me.phone) {
            showMessage({
                message: 'Nejdříve změňte svůj telefon!',
                type: 'danger'
            })
            return null
        }
        Alert.alert('Změnit Telefon', 'Uložit změny?', [
            {
                text: 'Zrušit',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => {
                    setLoader(true)
                    updateOneUser({
                        variables: {
                            data: {
                                phone: {
                                    set: phone
                                }
                            },
                            where: {
                                id: data.me.id
                            }
                        }
                    })
                }
            }
        ])
    }
    if (loading) return <LoadingIndicator />
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.flex}>
                <ScrollView style={{ maxHeight: height - 190 }}>
                    <View>
                        <TextInput
                            style={styles.input}
                            defaultValue={data.me.phone}
                            keyboardType='phone-pad'
                            placeholder="Telefonní číslo"
                            onChangeText={(text) => setPhone(text)}
                        />
                    </View>
                </ScrollView>
                <View style={{ marginTop: 10 }}>
                    <MainButton onPress={onChange} title="Změna" />
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
    }
})

export default EditPhone
