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
import { ME } from '../../gqls/user/queries'
import { UPDATE_ONE_USER } from '../../gqls/user/mutation'
import { THEME } from '../../utils/theme'
import DarkLoadingIndicator from '../../components/DarkLoadingIndicator'
import { showMessage } from 'react-native-flash-message'

const height = Dimensions.get('window').height
const EditAddress = ({ navigation }) => {
    const [address, setAddress] = useState(null)
    const [loader, setLoader] = useState(false)
    const { data, loading } = useQuery(ME, {
        fetchPolicy: 'network-only'
    })

    const [updateOneUser] = useMutation(UPDATE_ONE_USER, {
        onError: ({ message }) => {
            console.log(message)
            setLoader(false)
        },
        onCompleted: (data) => {
            setLoader(false)
            navigation.goBack()
        }
    })
    const onChange = () => {
        if (!address || address === data.me.address) {
            showMessage({
                message: 'Change your address firstable!',
                type: 'danger'
            })
            return null
        }
        Alert.alert('Change Address', 'Save changes?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => {
                    setLoader(true)
                    updateOneUser({
                        variables: {
                            data: {
                                address: {
                                    set: address
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
                            defaultValue={data.me.address}
                            placeholder="Adresa"
                            onChangeText={(ia) => setAddress(ia)}
                        />
                    </View>
                </ScrollView>
                <View style={{ marginTop: 10 }}>
                    <MainButton title="Změna" onPress={onChange} />
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

export default EditAddress
