import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Connect from './components/connect/Connect'
import {GlobalStateProvider} from './common/GlobalState'
import Dashboard from './components/dashboard/Dashboard'

export type RootStackParamList = {
  Connect: undefined
  Dashboard: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()
function App() {
  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Connect" component={Connect} />
          <RootStack.Screen name="Dashboard" component={Dashboard} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  )
}

export default App
