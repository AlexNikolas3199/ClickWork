import React, { useEffect } from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useQuery } from '@apollo/client'
import { FIND_MANY_FEEDBACK } from '../gqls/feedback/queries.js'
import LoadingIndicator from '../components/LoadingIndicator'
import { UPLOAD_URL } from '../utils/urls'
import personDefault from '../assets/personDefault.png'
import Icon from '../components/Icon.js'
const Recenze = ({ route, navigation }) => {
    const title = route.params.title + "'s recenze"
    useEffect(() => {
        navigation.setOptions({ title })
    }, [])

    const user = route?.params?.vacation?.user

    const { data, loading, refetch } = useQuery(FIND_MANY_FEEDBACK, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
        variables: {
            where: {
                userId: {
                    equals: user?.id
                }
            }
        }
    })

    if (loading) return <LoadingIndicator />
    const recenze = data?.findManyFeedback
    console.log(recenze.userNanimatelImage)
    return (
        <View style={styles.wrapper}>
            {recenze.length === 0 ? (
                <Text>Žádné recenze :{'('} </Text>
            ) : loading ? null : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={recenze ? recenze : []}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                    refreshing={loading}
                    onRefresh={refetch}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.box}>
                            <Text style={styles.text}>{item.comment}</Text>
                            <View style={styles.footer}>
                                <View style={styles.profile}>
                                    <ImageBackground
                                        source={
                                            item?.userNanimatelImage
                                                ? { uri: UPLOAD_URL + item?.userNanimatelImage }
                                                : personDefault
                                        }
                                        style={styles.image}
                                    />
                                    <Text style={styles.text}>{item?.userNanimatelName}</Text>
                                </View>
                                <View style={styles.flex}>
                                    <Text style={styles.text}>{item.value} </Text>
                                    <Icon
                                        name={'star'}
                                        iconFamily={'FontAwesome'}
                                        size={20}
                                        color="gold"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )
}

export default Recenze

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        overflow: 'hidden',
        flexGrow: 1,
        flexBasis: 145,
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'space-between'
    },
    footer: {
        borderTopWidth: 0.5,
        borderColor: '#C4C4C4',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingTop: 16,
        marginTop: 16
    },
    image: {
        width: 28,
        height: 28,
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 10
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        alignItems: 'center'
    }
})
