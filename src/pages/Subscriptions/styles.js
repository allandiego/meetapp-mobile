import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

export const Container = styled.View.attrs({
  // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
})`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const DateNav = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 15 },
})``;

export const NoResultsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoResultsText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
`;
