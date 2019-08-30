import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { getError } from '~/util/errorHandler';
import AlertHelper from '~/components/AlertHelper';

import api from '~/services/api';
import NavigationService from '~/services/navigation';

import Background from '~/components/Background';
// import Loading from '~/components/Loading';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {
  Container,
  List,
  DateNav,
  DateText,
  NoResultsContainer,
  NoResultsText,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups() {
    console.tron.log(`page ${page} - ${date}`);
    if (loading) return;

    setLoading(true);
    const response = await api.get('meetups', {
      params: {
        // date,
        page,
      },
    });

    if (response.data.length === 0) {
      setIsListEnd(true);
    }

    const data = page !== 1 ? [...meetups, ...response.data] : response.data;

    console.tron.log(data);
    setMeetups(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMeetups();
  }, [date]); // eslint-disable-line

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setPage(1);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setPage(1);
  }

  function handleLoadMore() {
    if (!isListEnd) {
      setPage(page + 1);
      loadMeetups();
    }
  }

  async function handleSubscribe(meetup_id) {
    try {
      await api.post('subscriptions', { meetup_id });

      AlertHelper.show(
        'success',
        'Sucesso!',
        'Inscrição realizada com sucesso'
      );
      NavigationService.navigate('Subscriptions');
    } catch (err) {
      AlertHelper.show('error', 'Erro', getError(err));
    }
  }

  function renderFooter() {
    return loading ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateNav>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={40} color="#fff" />
          </TouchableOpacity>

          <DateText>{dateFormatted}</DateText>

          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={40} color="#fff" />
          </TouchableOpacity>
        </DateNav>
        {meetups.length > 0 ? (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                onButtonClick={() => handleSubscribe(item.id)}
                data={item}
              />
            )}
            onEndReachedThreshold={0.5} // (item position to load / total itens)
            onEndReached={handleLoadMore}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <NoResultsContainer>
            <NoResultsText>Nenhum evento nesta data</NoResultsText>
          </NoResultsContainer>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={30} color={tintColor} />
  ),
};
