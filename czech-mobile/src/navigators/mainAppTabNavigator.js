import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Map from '../screens/map'
import { THEME } from '../utils/theme'
import Account from '../screens/account/account'
import Categories from '../screens/categories/categories'

const Tab = createBottomTabNavigator()

const MainAppTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: THEME.MAIN_COLOR,
                inactiveTintColor: 'gray'
            }}
        >
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarLabel: 'Mapa',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="map-marker-alt" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Categories"
                component={Categories}
                options={{
                    tabBarLabel: 'Kategorie',
                    tabBarIcon: ({ color, size }) => <Icon name="th" size={size} color={color} />
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: 'Účet',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user-circle" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default MainAppTabNavigator
