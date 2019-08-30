import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
  opacity: ${props => (props.past ? 0.6 : 1)};
  display: flex;
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: 200;
  margin-bottom: 10px;
  border-radius: 4px;
  flex: 1;
`;

export const BannerImage = styled.Image`
  align-self: stretch;
  flex: 1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  padding: 10px;
  flex: 1;
  margin-bottom: 10px;
  align-self: stretch;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  text-decoration: ${props => (props.past ? 'line-through' : 'none')};
`;

export const InfoItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const InfoText = styled.Text`
  font-size: 13px;
  color: ${props => (props.past ? '#000' : '#999')};
  text-decoration: ${props => (props.past ? 'line-through' : 'none')};
  margin-left: 5px;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 15px;
  padding: 20px;
`;
