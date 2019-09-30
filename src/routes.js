import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';

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
      headerLayoutPreset: 'center',
      defaultNavigationOptions: {
        headerTitle: (
          <Image
            resizeMode="contain"
            style={{ width: 140, height: 50 }}
            source={logo}
          />
        ),
        headerStyle: {
          height: 80,
          backgroundColor: '#000',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
