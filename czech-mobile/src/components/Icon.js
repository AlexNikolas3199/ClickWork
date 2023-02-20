import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

const Icon = (props) => {
    const renderIcon = () => {
        if (props.iconFamily == 'FontAwesome') {
            return <FontAwesome {...props} />
        }
        if (props.iconFamily == 'FontAwesome5') {
            return <FontAwesome5 {...props} />
        }
        if (props.iconFamily == 'MaterialIcons') {
            return <MaterialIcons {...props} />
        }
        if (props.iconFamily == 'Ionicons') {
            return <Ionicons {...props} />
        }
        if (props.iconFamily == 'Entypo') {
            return <Entypo {...props} />
        }
        if (props.iconFamily == 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons {...props} />
        }
        return <FontAwesome5 name="poo" {...props} />
    }
    return renderIcon()
}

export default Icon
