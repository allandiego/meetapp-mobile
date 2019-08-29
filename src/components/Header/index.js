import React from 'react';
import { TouchableOpacity } from 'react-native';

import NavigationService from '~/services/navigation';

import { Container, Logo } from './styles';

import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Container>
      <TouchableOpacity onPress={() => NavigationService.navigate('Dashboard')}>
        <Logo source={logo} />
      </TouchableOpacity>
    </Container>
  );
}
