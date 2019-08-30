import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Subscriptions from './pages/Subscriptions';

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
            Subscriptions,
            Profile,
          },
          {
            // swipeEnabled: false,
            // animationEnabled: true,
            // voltar para rota inicial apos sair da rota atual ex agendamento
            resetOnBlur: true,
            tabBarOptions: {
              scrollEnabled: true,
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              // 'tabBarComponent': TabView.TabBarTop,
              style: {
                backgroundColor: '#2b1a2f',
                // shadowColor: 'transparent',
                // borderTopColor: 'transparent',
                borderTopWidth: 0,
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
