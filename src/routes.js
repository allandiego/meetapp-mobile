import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),

        App: createBottomTabNavigator(
          {
            Dashboard,
            New: {
              screen: createStackNavigator(
                {
                  SelectProvider,
                  SelectDateTime,
                  Confirm,
                },
                {
                  headerLayoutPreset: 'center',
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Inscrições',
                tabBarIcon: (
                  <Icon
                    name="insert-link"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                ),
              },
            },
            Profile,
          },
          {
            // swipeEnabled: false,
            // animationEnabled: true,
            // voltar para rota inicial apos sair dela exemplo confirmar agendamento
            resetOnBlur: true,
            tabBarOptions: {
              scrollEnabled: true,
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              // 'tabBarComponent': TabView.TabBarTop,
              style: {
                backgroundColor: '#2b1a2f',
              },
            },
          }
        ),

        // AppStack: createStackNavigator(
        //   {
        //     Dashboard,
        //   },
        //   {
        //     headerLayoutPreset: 'center',
        //     headerBackTitleVisible: false,
        //     defaultNavigationOptions: {
        //       headerStyle: {
        //         // backgroundColor: '#7159c1',
        //         backgroundColor: '#59c171',
        //         // backgroundColor: 'transparent',
        //         // borderBottomWidth: 0 // removes the border on the bottom
        //       },
        //       headerTintColor: '#FFF',
        //     },
        //   }
        // ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
