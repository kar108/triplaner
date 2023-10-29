import React from 'react';
import {navigationOptions} from './config';
import {useUserState} from '../../hooks/globalState';
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../screens/Home';
import Landing from '../../screens/Landing';
import SignUp from '../../screens/SignUp';
import Login from '../../screens/Login';
import AddTrip from '../../screens/AddTrip';
import TripsDetailPage from '../../screens/TripsDetailPage';
import AddTask from '../../screens/AddTask';


const Stack = createStackNavigator()



export default function RootStack() {
  const userState = useUserState();
    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            {userState?.auth? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTrip" component={AddTrip} />
          <Stack.Screen name="AddTask" component={AddTask} />
          <Stack.Screen name="TripsDetailPage" component={TripsDetailPage} />
        </>
      ) : (
        <>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
        </Stack.Navigator>
    )
}
