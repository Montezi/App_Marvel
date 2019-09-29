import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image, View } from 'react-native';

import Main from './pages/Main';
import Character from './pages/Character';

import logo from './assets/logo_marvel.png';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Character,
    },
    {
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerTitle: (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 140, height: 50 }}
              source={logo}
            />
          </View>
        ),
        headerStyle: {
          height: 80,
          backgroundColor: '#000',
          // elevation: 0,
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
