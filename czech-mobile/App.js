import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import RootStackNav from './src/navigators/rootStackNav'
import { ApolloProvider } from '@apollo/client'
import FlashMessage from "react-native-flash-message"
import client from './src/utils/apollo'


const App = () => {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <RootStackNav />
            </NavigationContainer>
            <FlashMessage position="top"/>
        </ApolloProvider>
    )
}

export default App
