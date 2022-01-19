import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CompletedScreen from './src/screens/CompletedScreen'
import HomeScreen from './src/screens/HomeScreen'
import InProgressScreen from './src/screens/InProgressScreen'

const { Navigator, Screen } = createBottomTabNavigator()

const Navigation = () => {
  return (
    <Navigator>
      <Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <MaterialCommunityIcons
                name="home"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            )}
        }}
      />
      <Screen
        name='InProgress'
        component={InProgressScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <MaterialCommunityIcons
                name="progress-clock"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            )}
        }}
      />
      <Screen
        name='Completed'
        component={CompletedScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <MaterialCommunityIcons
                name="marker-check"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            )}
        }}
      />
    </Navigator>

  )
}

export default Navigation
