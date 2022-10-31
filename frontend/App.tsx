import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Onboarding from './Components/CoinbaseClone/onboarding/Onboarding';
import CreateUsername from './Components/CoinbaseClone/onboarding/CreateUsername';
import RecoveryPhrase from './Components/CoinbaseClone/onboarding/RecoveryPhrase';
import Dashboard from './Components/CoinbaseClone/Dashboard';
import SignIn from './Components/CoinbaseClone/onboarding/SignIn';
import Scanqrcode from './Components/CoinbaseClone/dashboard_components/Qrcodescanner_v4';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateUsername"
          component={CreateUsername}
          options={{
            headerShown: true,
            headerStyle: {
              shadowColor: 'transparent',
            },
            headerTitle: '',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="RecoveryPhrase"
          component={RecoveryPhrase}
          options={{
            headerShown: true,
            headerStyle: {
              shadowColor: 'transparent',
            },
            headerTitle: 'Recovery Phrase',
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: true,
            headerStyle: {
              shadowColor: 'transparent',
            },
            headerTitle: '',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scanqrcode"
          component={Scanqrcode}
          options={{
            headerShown: true,
            headerStyle: {
              shadowColor: 'transparent',
              backgroundColor: 'black',
            },
            headerTitle: '',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
