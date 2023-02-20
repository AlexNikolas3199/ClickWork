import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import Loader from '../screens/login/loader'
import Login from '../screens/login/login'
import EmailRegistration from '../screens/login/emailRegistration'
import ForgotPassword from '../screens/login/forgotPassword'
import Intro from '../screens/login/intro'
import MainAppTabNavigator from './mainAppTabNavigator'
import HireMe from '../screens/hireMe'
import HireMeProfile from '../screens/hireMeProfile'
import Recenze from '../screens/recenze'
import Categories from '../screens/categories/categories'
import Category from '../screens/categories/category'
import BecomeWorker from './../screens/becomeWorker'
import ActiveOrders from '../screens/account/activeOrders'
import IncomingOrders from '../screens/account/incomingOrders'
import EditProfileData from '../screens/account/editProfileData'
import EditEmail from '../screens/account/editEmail'
import EditPhone from '../screens/account/editPhone'
import History from '../screens/account/history'
import EditAddress from './../screens/account/addAddress'
import FilterMap from '../screens/filterMap'
import ConsentPersonalData from '../screens/account/consentPersonalData'
import ActiveOrderMap from '../screens/account/activeOrderMap'
import Contacts from '../screens/contacts'
import QandA from '../screens/qanda'
const Stack = createStackNavigator()

const RootStackNav = () => {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name="Loader" options={{ headerShown: false }} component={Loader} />
            <Stack.Screen name="Intro" options={{ headerShown: false }} component={Intro} />
            <Stack.Screen
                name="EmailRegistration"
                component={EmailRegistration}
                options={{ headerTitleAlign: 'center', headerTitle: 'Registrace' }}
            />
            <Stack.Screen
                name="Login"
                options={{ headerShown: false, headerTitle: 'Přihlášení' }}
                component={Login}
            />
            <Stack.Screen
                name="ForgotPassword"
                options={{ headerTitleAlign: 'center' }}
                component={ForgotPassword}
            />
            <Stack.Screen
                name="Main"
                options={{ headerShown: false, headerTitle: 'Domov' }}
                component={MainAppTabNavigator}
            />
            <Stack.Screen
                name="HireMe"
                options={{ headerShown: false, headerTitle: 'Najmi mě' }}
                component={HireMe}
            />
            <Stack.Screen
                name="HireMeProfile"
                options={{ headerTitleAlign: 'center', headerTitle: 'Objednat' }}
                component={HireMeProfile}
            />
            <Stack.Screen
                name="Categories"
                options={{ headerTitleAlign: 'center', headerTitle: 'Kategorie' }}
                component={Categories}
            />
            <Stack.Screen
                name="Category"
                options={{ headerTitleAlign: 'center', headerTitle: 'Kategorie' }}
                component={Category}
            />
            <Stack.Screen
                name="Recenze"
                options={{ headerTitleAlign: 'center' }}
                component={Recenze}
            />

            <Stack.Screen
                name="IncomingOrders"
                options={{ headerTitleAlign: 'center', headerTitle: 'Příchozí objednávky' }}
                component={IncomingOrders}
            />
            <Stack.Screen
                name="ActiveOrders"
                options={{ headerTitleAlign: 'center', headerTitle: 'Aktivní objednávky' }}
                component={ActiveOrders}
            />
            <Stack.Screen
                name="ActiveOrderMap"
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    cardOverlayEnabled: true,
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    cardStyle: {
                        backgroundColor: 'transparent'
                    }
                }}
                component={ActiveOrderMap}
            />
            <Stack.Screen
                name="AddAddress"
                options={{ headerTitleAlign: 'center', headerTitle: 'Změnit Adresu' }}
                component={EditAddress}
            />
            <Stack.Screen
                name="BecomeWorker"
                options={{ headerTitleAlign: 'center', headerTitle: 'Staňte se ClickBoderem' }}
                component={BecomeWorker}
            />
            <Stack.Screen
                name="EditProfileData"
                options={{ headerTitleAlign: 'center', headerTitle: 'Upravit údaje o profilu' }}
                component={EditProfileData}
            />
            <Stack.Screen
                name="EditEmail"
                options={{ headerTitleAlign: 'center', headerTitle: 'Upravit email' }}
                component={EditEmail}
            />
            <Stack.Screen
                name="EditPhone"
                options={{ headerTitleAlign: 'center', headerTitle: 'Upravit telefon' }}
                component={EditPhone}
            />
            <Stack.Screen
                name="History"
                options={{ headerTitleAlign: 'center', headerTitle: 'Historie' }}
                component={History}
            />
            <Stack.Screen
                name="FilterMap"
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    cardOverlayEnabled: true,
                    gestureEnabled: true,
                    gestureDirection: 'vertical',
                    cardStyle: {
                        backgroundColor: 'transparent'
                    }
                }}
                component={FilterMap}
            />
            <Stack.Screen
                name="ConsentData"
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'O osobních údajích',
                    presentation: 'modal'
                }}
                component={ConsentPersonalData}
            />
            <Stack.Screen
                name="Contacts"
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Kontakty',
                    presentation: 'modal'
                }}
                component={Contacts}
            />
            <Stack.Screen
                name="QandA"
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Otázky a odpovědi',
                    presentation: 'modal'
                }}
                component={QandA}
            />
        </Stack.Navigator>
    )
}

export default RootStackNav
