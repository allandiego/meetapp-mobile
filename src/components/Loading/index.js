import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Loading({ size, color }) {
  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
}

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 'small',
  color: '#fff',
};
