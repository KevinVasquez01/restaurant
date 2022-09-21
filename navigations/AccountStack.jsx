import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Account from '../screens/account/Account'

import Login from '../screens/account/Login'
import Register from '../screens/account/Register'

const Stack = createNativeStackNavigator()

export default function AccountStack() {
  return (
      <Stack.Navigator>
          <Stack.Screen
              name="Account"
              component={Account}
              options={{title: 'Cuenta'}}
          />
          <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Iniciar Sesión'}}
          />
          <Stack.Screen
              name="Register"
              component={Register}
              options={{title: 'Registrar Usuario'}}
          />
      </Stack.Navigator>
  
  )
}