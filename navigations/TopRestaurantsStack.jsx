import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TopRestaurants from '../screens/TopRestaurants'

const Stack = createNativeStackNavigator()

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name='Top-restaurants'
            component={TopRestaurants}
            options={{title: 'Top 5'}}
        />
    </Stack.Navigator>
  )
}