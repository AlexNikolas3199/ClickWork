import React from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import { FIND_MANY_CATEGORY } from '../gqls/category/queries'
import LoadingIndicator from '../components/LoadingIndicator'
import CategoryItem from '../components/categoryItem'
import { THEME } from '../utils/theme'
import MainButton from '../components/MainButton'

const FilterMap = ({ navigation, route }) => {
    const { data, loading } = useQuery(FIND_MANY_CATEGORY)

    if (loading) return <LoadingIndicator />

    const categories = data?.findManyCategory ? data.findManyCategory : []
    const cancel = {
        color: THEME.GREY_COLOR,
        icon: 'cancel',
        iconFamily: 'MaterialIcons',
        id: undefined,
        name: 'Zrušit'
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.flat}
                data={route?.params?.search ? [cancel, ...categories] : categories}
                keyExtractor={(item) => item.id}
                numColumns={3}
                ListFooterComponent={
                    <MainButton
                        isGray
                        myStyle={{ marginHorizontal: 7.5 }}
                        onPress={() => navigation.goBack()}
                        title="Close"
                    />
                }
                renderItem={({ item }) => {
                    return (
                        <CategoryItem
                            item={item}
                            onPress={
                                route?.params?.bw
                                    ? () =>
                                          navigation.navigate('BecomeWorker', {
                                              categoryName: item.name
                                          })
                                    : () => navigation.navigate('Map', { search: item.id })
                            }
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    flat: {
        padding: 7.5,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexGrow: 0
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
})

export default FilterMap
