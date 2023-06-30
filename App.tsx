import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Connection from './components/connection/Connection';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Connection"
          component={Connection}
          options={{title: 'Connection'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
