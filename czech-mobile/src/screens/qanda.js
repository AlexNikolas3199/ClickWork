import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainButton from '../components/MainButton'
import { THEME } from '../utils/theme'
const QandA = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingVertical: 7.5 }}>
                <View style={styles.wrapper}>
                    <Text style={styles.q}>Bere si ClickBod podíl mého výdělku?</Text>
                    <Text style={styles.a}>
                        Ne, všechny Vámi vydělané peníze zůstavají Vám. Jediné co platíte, je drobný
                        měsíční poplatek.
                    </Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.q}>
                        Ovlivňuje můj pracovní a trestní rejstřík práci s ClickBodem?
                    </Text>
                    <Text style={styles.a}>
                        Ne, uživatele budou hodnoceny jen na základě recenzí a ohodnocení od jiných
                        zákazníků na ClickBod.
                    </Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.q}>
                        Když si zruším předplatné, ztratím na svém účtu svůj progres a recenze?
                    </Text>
                    <Text style={styles.a}>
                        Ne, Váš účet se pouze deaktivuje a při obnovení předplatného se aktivuje
                        zpět.
                    </Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.q}>Jsem nezletilá osoba, můžu používat ClickBod?</Text>
                    <Text style={styles.a}>ClickBod je pro uživatele starší 15-ti let.</Text>
                </View>
                <View style={{ height: 15 }} />
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <MainButton title="OK" onPress={() => navigation.goBack()} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        marginHorizontal: 15,
        marginVertical: 7.5,
        backgroundColor: '#fff',
        paddingVertical: 7.5
    },
    q: {
        fontSize: 18,
        paddingHorizontal: 15,
        paddingBottom: 7.5,
        borderBottomWidth: 2,
        borderColor: THEME.MAIN_COLOR
    },
    a: {
        fontSize: 16,
        paddingRight: 15,
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 7.5
    },
    buttonWrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 7.5,
        borderColor: THEME.MAIN_COLOR,
        borderTopWidth: 2
    }
})

export default QandA
