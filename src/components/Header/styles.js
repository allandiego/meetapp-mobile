import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.View`
  background: #19161f;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

export const Logo = styled(Image)`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
`;
