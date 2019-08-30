import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
})`
  flex: 1;
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
})``;

export const NoResultsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const NoResultsText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
`;
