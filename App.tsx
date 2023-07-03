import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Connection from './components/connection/Connection';
import Monitor from './components/monitor/Monitor';
import {MicrocontrollerConnection} from './microcontroller/connection/microcontroller-connection';
import {GlobalStateProvider} from './GlobalState';

export type RootStackParamList = {
  Connection: undefined;
  Monitor: {connection: MicrocontrollerConnection};
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Connection" component={Connection} />
          <RootStack.Screen name="Monitor" component={Monitor} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}

export default App;
