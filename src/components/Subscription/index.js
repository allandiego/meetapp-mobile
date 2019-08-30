import React, { useMemo } from 'react';
import { parseISO, format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt-BR';

import {
  Container,
  BannerImage,
  Info,
  Title,
  InfoText,
  SubscribeButton,
  Header,
  InfoItem,
} from './styles';

export default function Subscription({ data, onButtonClick }) {
  const dateParsed = useMemo(() => {
    return format(
      parseISO(data.Meetup.date),
      "dd 'de' MMMM 'de' yyyy', às' HH:mm",
      {
        locale: pt,
      }
    );
  }, [data.Meetup.date]);

  return (
    <Container past={data.Meetup.past}>
      <Header>
        <BannerImage source={{ uri: data.Meetup.file.url }} />
      </Header>

      <Info>
        <Title past={data.Meetup.past}>{data.Meetup.title}</Title>

        <InfoItem>
          <Icon name="event" size={20} color="#999" />
          <InfoText past={data.Meetup.past}>{dateParsed}</InfoText>
        </InfoItem>

        <InfoItem>
          <Icon name="location-on" size={20} color="#999" />
          <InfoText past={data.Meetup.past}>{data.Meetup.location}</InfoText>
        </InfoItem>

        <InfoItem>
          <Icon name="person" size={20} color="#999" />
          <InfoText past={data.Meetup.past}>
            Organizador: {data.Meetup.owner.name}
          </InfoText>
        </InfoItem>

        {!data.past && (
          <SubscribeButton onPress={onButtonClick}>
            Cancelar inscrição
          </SubscribeButton>
        )}
      </Info>
    </Container>
  );
}

Subscription.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
