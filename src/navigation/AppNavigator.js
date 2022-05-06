import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ListScreen from '../screens/List'
import ModalScreen from '../screens/Modal'
import SettingScreen from '../screens/Settings'
import VideoScreen from '../screens/VideoScreen'

const Stack = createStackNavigator()
// App Navigator after successfully logging the user
export default function MainStackNavigator() {
  return (
         <Stack.Navigator>
        <Stack.Screen name='List' component={ListScreen} options={{headerShown: false}} />
        <Stack.Screen name='Modal' component={ModalScreen} options={{headerShown: false}} />
        <Stack.Screen name="Video" component={VideoScreen}/>
        <Stack.Screen name='Settings' component={SettingScreen} />
      </Stack.Navigator>
  )
}