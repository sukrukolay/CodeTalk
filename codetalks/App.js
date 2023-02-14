import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login'
import Sign from './src/pages/Sign'
import Rooms from './src/pages/Rooms'
import ChatRoom from './src/pages/ChatRoom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth'

const Stack = createNativeStackNavigator();
const App = () => {
  const [userSession, setUserSession] = React.useState()

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user); // !!user demek user içi doluysa boolean değerini al yani true 
    })
  }, [])

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LoginPage' component={Login} />
        <Stack.Screen name='SignPage' component={Sign} />
      </Stack.Navigator>
    )
  }

  const ChatStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='RoomsPage' component={Rooms}
          options={{
            title: 'Odalar',
            headerTintColor: 'orange',
            headerShown: true,
            headerTitleAlign: 'center',
            headerRight: () => (<Icon name='logout' size={30} color={'orange'}
              onPress={() => auth().signOut()} />)
          }}
        />
        <Stack.Screen name='ChatRoomPage' component={ChatRoom}
          options={{
            title: 'Sohbet Odası',
            headerTintColor: 'orange',
            headerShown: true,
            headerTitleAlign: 'center',
            headerRight: () => (<Icon name='logout' size={30} color={'orange'}
              onPress={() => auth().signOut()} />)
          }} />
      </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          !userSession ? (
            <Stack.Screen name='AuthStack' component={AuthStack} />
          ) : (

            < Stack.Screen name='ChatStack' component={ChatStack} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
