import React, { useState } from 'react'
import {
    Dimensions,
    FlatList,
    View,
    Image,
    SafeAreaView,
    StyleSheet,
    TextInput
} from 'react-native'
import { useQuery } from '@apollo/client'
import { FIND_MANY_CATEGORY } from '../../gqls/category/queries'
import LoadingIndicator from '../../components/LoadingIndicator'
import CategoryItem from '../../components/categoryItem'
import { THEME } from '../../utils/theme'

const { width } = Dimensions.get('window')

const Categories = ({ navigation, route }) => {
    const [search, setSearch] = useState('')
    const { data, loading, refetch } = useQuery(FIND_MANY_CATEGORY, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only',
        variables: {
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        }
    })
    const categories = data?.findManyCategory ? data.findManyCategory : []
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.search}>
                <Image
                    style={{ width: 20, height: 20 }}
                    source={require('../../assets/search.png')}
                />
                <TextInput
                    autoFocus={route.params?.focus}
                    style={styles.searchInput}
                    placeholder="Hledání dotazu"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <FlatList
                    style={{ paddingHorizontal: 7.5 }}
                    data={categories}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    refreshing={loading}
                    onRefresh={refetch}
                    renderItem={({ item }) => {
                        return (
                            <CategoryItem
                                item={item}
                                onPress={() => {
                                    navigation.navigate('Category', {
                                        title: item.name,
                                        id: item.id
                                    })
                                }}
                            />
                        )
                    }}
                />
            )}
        </SafeAreaView>
    )
}
export default Categories

const styles = StyleSheet.create({
    // content
    container: {
        width: width / 3,
        margin: -5,
        padding: 10
    },
    search: {
        marginHorizontal: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderRadius: 2,
        borderColor: THEME.GREY_COLOR,
        alignItems: 'center'
    },
    searchInput: {
        padding: 0,
        paddingLeft: 5,
        flexGrow: 1
    },
    box: {
        borderRadius: 20,
        padding: 20,
        overflow: 'hidden',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxIcon: {
        width: 44,
        height: 44
    },
    boxTitle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 8
    }
})
