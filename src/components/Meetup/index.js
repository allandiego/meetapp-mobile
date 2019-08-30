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
  TimeText,
  LocationText,
  OwnerText,
  SubscribeButton,
  Header,
  InfoItem,
} from './styles';

export default function Meetup({ data, onButtonClick }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM 'de' yyyy', às' HH:mm", {
      locale: pt,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Header>
        {/* resizeMode="cover | contain" */}
        <BannerImage source={{ uri: data.file.url }} />
      </Header>

      <Info>
        <Title>{data.title}</Title>

        <InfoItem>
          <Icon name="event" size={20} color="#999" />
          <TimeText>{dateParsed}</TimeText>
        </InfoItem>

        <InfoItem>
          <Icon name="location-on" size={20} color="#999" />
          <LocationText>{data.location}</LocationText>
        </InfoItem>

        <InfoItem>
          <Icon name="person" size={20} color="#999" />
          <OwnerText>Organizador: {data.owner.name}</OwnerText>
        </InfoItem>

        {!data.past && (
          <SubscribeButton onPress={onButtonClick}>
            Realizar inscrição
          </SubscribeButton>
        )}
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
