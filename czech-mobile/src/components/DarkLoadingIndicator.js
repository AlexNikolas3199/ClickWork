import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { THEME } from '../utils/theme'
import Modal from 'react-native-modal'

const DarkLoadingIndicator = ({ isVisible }) => {
    return (
        <Modal
            style={styles.container}
            isVisible={isVisible}
            backdropOpacity={0.5}
            useNativeDriver={true}
        >
            <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
        </Modal>
    )
}

export default DarkLoadingIndicator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
