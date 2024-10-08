import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import AccountStack from './AccountStack'
import SearchStack from './SearchStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import FavoritesStack from './FavoritesStack'
import RestaurantsStack from './RestaurantsStack'


const Tab = createBottomTabNavigator()

export default function Navigation() {

  const ScreenOptins = (route, color) => {
    let iconName
    switch (route.name) {
      case "restaurants":
        iconName = 'compass-outline'
        break;
      case "favorites":
        iconName = 'heart-outline'
        break;
      case "top-restaurants":
        iconName = 'star-outline'
        break;
      case "search":
        iconName = 'magnify'
        break;
      case "account":
        iconName = 'home-outline'
        break;
    }

    return (
      <Icon
        type='material-community'
        name={iconName}
        size={22}
        color={color}
      />
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='restaurants'
        screenOptions={({route}) => ({
          tabBarInactiveTintColor:  '#a17dc3',
          tabBarActiveTintColor: '#442484',
          tabBarIcon: ({color}) => ScreenOptins(route, color),
          headerShown: false
        })}
      >
        <Tab.Screen
          name='restaurants'
          component={RestaurantsStack}
          options={{title: 'Restaurants', headerShow: false}}
        />
        <Tab.Screen
          name='favorites'
          component={FavoritesStack}
          options={{title: 'Favorites'}}
        />
        <Tab.Screen
          name='top-restaurants'
          component={TopRestaurantsStack}
          options={{title: 'Top 5'}}
        />
        <Tab.Screen
          name='search'
          component={SearchStack}
          options={{title: 'Buscar'}}
        />
        <Tab.Screen
          name='account'
          component={AccountStack}
          options={{title: 'Cuenta'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}